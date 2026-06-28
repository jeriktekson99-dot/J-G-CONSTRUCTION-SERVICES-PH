import { createClient } from '@supabase/supabase-js';

const rawUrl = ((import.meta as any).env?.VITE_SUPABASE_URL || '').trim();
const rawKey = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '').trim();

// Strips wrapping quotes if any (e.g. from copy-pasting VITE_SUPABASE_URL="https://...")
function stripQuotes(val: string): string {
  if (!val) return '';
  let clean = val.trim();
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
}

// Sanitize URL to handle common configuration mistakes
function sanitizeSupabaseUrl(url: string): string {
  if (!url) return '';
  
  let cleanUrl = stripQuotes(url);
  
  // Remove trailing slashes
  cleanUrl = cleanUrl.replace(/\/+$/, '');
  
  // Strip duplicate /rest/v1 if the user mistakenly appended it
  cleanUrl = cleanUrl.replace(/\/rest\/v1$/, '');
  cleanUrl = cleanUrl.replace(/\/+$/, ''); // clean trailing slashes again just in case
  
  // Ensure it starts with http:// or https:// (unless it is a placeholder or database URI)
  if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('postgresql://')) {
    cleanUrl = `https://${cleanUrl}`;
  }
  
  return cleanUrl;
}

export const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
export const supabaseKey = stripQuotes(rawKey);
export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder'));

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

