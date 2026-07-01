const DB_NAME = 'jg_construction_db';
const STORE_NAME = 'attachments';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    
    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };
    
    request.onerror = (event) => {
      console.error("IndexedDB open error:", request.error);
      reject(request.error);
    };
  });
  
  return dbPromise;
}

// Helper to safely get a raw value from IndexedDB
function getRaw(store: IDBObjectStore, key: string): Promise<any> {
  return new Promise((resolve) => {
    const request = store.get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null); // Resolve with null on error to be resilient
  });
}

const CHUNK_SIZE = 50000; // 50KB chunks to stay safely below Chrome's 64KB threshold

export async function saveAttachment(key: string, dataUrl: string): Promise<void> {
  try {
    const db = await getDB();
    
    // First, clean up any existing chunks or metadata to avoid orphans
    await deleteAttachment(key);

    const len = dataUrl.length;
    if (len <= CHUNK_SIZE) {
      // Save normally as a single string
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(dataUrl, key);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } else {
      // Chunk the dataUrl into pieces
      const chunks: string[] = [];
      for (let i = 0; i < len; i += CHUNK_SIZE) {
        chunks.push(dataUrl.substring(i, i + CHUNK_SIZE));
      }

      // Save chunk metadata under the main key
      const metadata = {
        _isChunked: true,
        count: chunks.length,
        size: len
      };

      // Perform all writes inside a single transaction
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        // Write metadata
        const metaRequest = store.put(metadata, key);
        metaRequest.onerror = () => reject(metaRequest.error);

        // Write all chunks
        chunks.forEach((chunk, index) => {
          const chunkKey = `${key}_chunk_${index}`;
          const chunkRequest = store.put(chunk, chunkKey);
          chunkRequest.onerror = () => reject(chunkRequest.error);
        });

        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      });
    }
  } catch (err) {
    console.error("Failed to save to IndexedDB:", err);
  }
}

export async function getAttachment(key: string): Promise<string | null> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      
      request.onsuccess = async () => {
        const val = request.result;
        if (!val) {
          resolve(null);
          return;
        }

        if (typeof val === 'object' && val._isChunked) {
          // Reassemble from chunks
          const count = val.count;
          try {
            const chunkTransaction = db.transaction(STORE_NAME, 'readonly');
            const chunkStore = chunkTransaction.objectStore(STORE_NAME);
            
            const chunks: string[] = [];
            for (let i = 0; i < count; i++) {
              const chunkKey = `${key}_chunk_${i}`;
              const chunkVal = await getRaw(chunkStore, chunkKey);
              chunks.push(chunkVal || "");
            }
            resolve(chunks.join(''));
          } catch (chunkErr) {
            reject(chunkErr);
          }
        } else {
          // Normal string
          resolve(val);
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error(`Failed to read "${key}" from IndexedDB:`, err);
    return null;
  }
}

export async function getAllAttachments(): Promise<Record<string, string>> {
  try {
    const db = await getDB();
    
    // Get all keys first (extremely fast and doesn't fail on large external blobs)
    const keys: string[] = await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAllKeys();
      request.onsuccess = () => resolve((request.result as string[]) || []);
      request.onerror = () => reject(request.error);
    });

    const result: Record<string, string> = {};

    // Only load top-level metadata/original keys, skip actual chunk records
    const parentKeys = keys.filter(k => !k.includes('_chunk_'));

    // Fetch them in parallel with individual try-catch boundary for self-healing
    await Promise.all(
      parentKeys.map(async (key) => {
        try {
          const val = await getAttachment(key);
          if (val) {
            result[key] = val;
          }
        } catch (err) {
          console.warn(`Skipping corrupted/unreadable attachment "${key}" due to read error:`, err);
          // Auto-clean the corrupted key to prevent infinite failures
          try {
            await deleteAttachment(key);
          } catch {
            // ignore
          }
        }
      })
    );

    return result;
  } catch (err) {
    console.error("Failed to read all from IndexedDB:", err);
    return {};
  }
}

export async function deleteAttachment(key: string): Promise<void> {
  try {
    const db = await getDB();
    
    // Check if it was chunked by checking metadata
    let metadata: any = null;
    try {
      metadata = await new Promise((resolve) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => resolve(null);
      });
    } catch {
      // ignore
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      // Delete main metadata key
      store.delete(key);

      // Delete all chunks
      if (metadata && typeof metadata === 'object' && metadata._isChunked) {
        for (let i = 0; i < metadata.count; i++) {
          store.delete(`${key}_chunk_${i}`);
        }
      }

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (err) {
    console.error("Failed to delete from IndexedDB:", err);
  }
}
