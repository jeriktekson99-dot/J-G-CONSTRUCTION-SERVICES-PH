import { HistoricalRecord } from '../types';
import { supabaseSync } from './supabaseSync';

export interface Lead {
  id: string;
  fullName: string;
  companyEmail: string;
  phone: string;
  projectScope: string;
  timestamp: string;
  status: 'Pending' | 'Reviewed' | 'Archived';
  isDeleted?: boolean;
  serviceCategory?: string;
  attachments?: { name: string; size: string; type?: string; dataUrl?: string }[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Structural Design' | 'Commercial Build' | 'Industrial Frameworks' | 'Civil Works' | string;
  location: string;
  image: string;
  images?: string[];
  scope: string;
  client: string;
  completedYear: string;
  complianceRatio: string;
  description: string;
  status: 'Completed' | 'Ongoing';
  isDeleted?: boolean;
  updatedAt?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  metric: string;
  metricLabel: string;
  scopeItems: string[];
  isDeleted?: boolean;
}

// Default Projects
export const DEFAULT_PROJECTS: Project[] = [];



// Default Leads
export const DEFAULT_LEADS: Lead[] = [];

// Default Services Detail
export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "ser-1",
    title: "Architectural Planning & Drafting",
    tagline: "Excellent Workmanship & Aesthetic Space Utilization",
    description: "Detailed space planning, custom office/residence structural layouts, custom architectural renderings, and drafting tailored to total client satisfaction. We ensure spatial efficiency meets complete functional expectations.",
    image: "/assets/images/about_construction_site_1780503065020.png",
    metric: "100%",
    metricLabel: "Client Satisfaction Approval on Drafting Concepts",
    scopeItems: [
      "Bespoke schematic spatial design and interior layout drafting.",
      "3D model architectural renderings and visualization structures.",
      "Space utilization surveys to maximize square footage and layout efficiency.",
      "Detailed CAD elevation drawings and regulatory zoning documentation."
    ]
  },
  {
    id: "ser-2",
    title: "Interior Fit-Out & Finishing Works",
    tagline: "Premium Quality Finishings for Commercial & Corporate Spaces",
    description: "High-grade finishing, custom partition walls, false ceilings, architectural trims, surface detailing, and cabinetry designed with exacting structural standards to ensure beautiful and durable interiors.",
    image: "/assets/images/commercial_fitout_1780503646291.png",
    metric: "45 Days",
    metricLabel: "Average Completion Timeline for Corporate Store Outlets",
    scopeItems: [
      "Drywall framing, acoustical partition structures, and decorative columns.",
      "Acoustical false ceilings, raised floor tiling, and tailored carpentry.",
      "Premium painting, custom wood veneer application, and surface treatments.",
      "Final fit-out inspections, equipment mounting, and detailing schedules."
    ]
  },
  {
    id: "ser-3",
    title: "General Building Renovation",
    tagline: "Transformative Modernizations & Extension Architectures",
    description: "Modernizing corporate spaces and private residences. We execute structural repairs, spatial extensions, structural load transfers, and facade renovations to renew functional utilities without safety compromise.",
    image: "/assets/images/commercial_development_1780500228422.png",
    metric: "₱0.00",
    metricLabel: "Unapproved Budget Spillover in Scope Upgrades",
    scopeItems: [
      "Complete electrical/plumbing strip-outs and safe load-bearing transfers.",
      "Structural floor mezzanine installations and safety staircases.",
      "Modern facade cladding, exterior sealant works, and waterproofing coatings.",
      "Structural rehabilitation of aging columns and historical elements."
    ]
  },
  {
    id: "ser-4",
    title: "Civil Works & Site Infrastructure",
    tagline: "High-Grade Earthworks, Roads & Demarcations",
    description: "Heavy site layout grading, site volume clearing, robust drainage pipes, concrete roadways, and retaining systems designed for regional slope and soil stability.",
    image: "/assets/images/civil_infrastructure_1780500263690.png",
    metric: "Factor Safety >= 1.5",
    metricLabel: "Soil Shear Safety Factor and Slope Stability Margin",
    scopeItems: [
      "Site volumetric balancing analysis and heavy earthworks grading.",
      "Storm drainage arrays, precast concrete box culverts, and channels.",
      "Concrete road networks, industrial parking spaces, and site paving.",
      "Slope erosion protection walls, bio-engineering layers, and soil checks."
    ]
  },
  {
    id: "ser-5",
    title: "Structural Engineering & Design",
    tagline: "Uncompromising Concrete & Structural Steel Computations",
    description: "Rigid calculation models under building codes, structural steel truss detailing, finite element shear load analysis, and seismic stability guarantees to prevent structural vulnerabilities.",
    image: "/assets/images/field_excellence_operations_1780503096054.png",
    metric: "100%",
    metricLabel: "Calculation Success Rate on Initial Building Permit Reviews",
    scopeItems: [
      "Finite element calculations (FEA) and dynamic seismic shear-wall designs.",
      "Concrete framing computations, tie-bar details, and beam loads.",
      "Structural steel roof truss detailing, connection plates, and welding QA.",
      "Rigid wind-tunnel load computations and roof load distributions."
    ]
  },
  {
    id: "ser-6",
    title: "Foundations & Concrete Works",
    tagline: "Monolithic Foundations & Subgrade Stability Checking",
    description: "Ensuring structural permanence with monolithic slab pours, high-PSI concrete column pouring, soil suitability check, piling, and footing integrity certifications.",
    image: "/assets/images/rebar_foundation_1780503628161.png",
    metric: "f'_c ≥ Spec",
    metricLabel: "Concrete Strength Verification Curing Compliance Rate",
    scopeItems: [
      "High-strength monolithic footing pours and foundation mat setups.",
      "Deep micropiling checks, concrete grade beams, and retaining walls.",
      "Reinforcing steel rebar schedules and continuous on-site civil checkouts.",
      "Standard concrete cylinder specimen casting and 28-day compression checks."
    ]
  },
  {
    id: "ser-7",
    title: "Electrical Systems Engineering",
    tagline: "Safe Power Distribution Paneling & Feeds",
    description: "Comprehensive electrical network design and installation. We craft distribution panel layouts, safe conduits and wire runs, lighting circuits, and emergency power setups.",
    image: "/assets/images/industrial_retrofit_1780500246965.png",
    metric: "0",
    metricLabel: "On-Site Mechanical-Electrical Clashes during execution",
    scopeItems: [
      "Balanced power panel layouts and circuit load calculations.",
      "Fire-rated conduit paths and electrical riser configurations.",
      "Energy-efficient indoor/outdoor industrial lighting distribution networks.",
      "Auxiliary system integration, fire detection alerts, and CCTV setups."
    ]
  },
  {
    id: "ser-8",
    title: "Plumbing & Sanitary Engineering",
    tagline: "Hygienic Waste Piping & Pressure Clean Water Loops",
    description: "Expert design and plumbing layout execution. We plan sanitary vents, booster-fed clean water networks, storm rooftop drainage downspouts, and high-efficiency sanitary fixtures installation.",
    image: "/assets/images/commercial_fitout_1780503646291.png",
    metric: "100%",
    metricLabel: "Hydrostatic Static Water Piping Defect-Free Pass Rate",
    scopeItems: [
      "Sewer connection line configurations and sanitary building vents.",
      "Thermal-welded PPR piping channels for safe domestic water loops.",
      "Rooftop drainage downspouts, collectors, and grease interceptors.",
      "High-efficiency sanitary fixtures installation and plumbing insulation."
    ]
  }
];

export const DEFAULT_HISTORICAL_RECORDS: HistoricalRecord[] = [
  {
    id: "2026-05",
    label: "May 2026",
    type: "MONTHLY",
    year: 2026,
    monthIndex: 4,
    dataPoints: [14, 19, 11, 23],
    totalLeads: 67
  },
  {
    id: "2026-04",
    label: "April 2026",
    type: "MONTHLY",
    year: 2026,
    monthIndex: 3,
    dataPoints: [10, 15, 18, 12],
    totalLeads: 55
  },
  {
    id: "2026-03",
    label: "March 2026",
    type: "MONTHLY",
    year: 2026,
    monthIndex: 2,
    dataPoints: [8, 12, 14, 16],
    totalLeads: 50
  },
  {
    id: "2025-fiscal",
    label: "2025 Fiscal Year",
    type: "YEARLY",
    year: 2025,
    dataPoints: [12, 15, 18, 22, 25, 20, 24, 28, 30, 26, 24, 29],
    totalLeads: 273
  },
  {
    id: "2024-fiscal",
    label: "2024 Fiscal Year",
    type: "YEARLY",
    year: 2024,
    dataPoints: [10, 11, 14, 15, 18, 16, 19, 21, 20, 18, 17, 22],
    totalLeads: 201
  }
];

// Helper to check if running in browser
const isClient = typeof window !== 'undefined';

const listeners = new Set<() => void>();

import { getAllAttachments, saveAttachment, deleteAttachment } from './indexedDB';

// In-memory cache for attachment dataUrl strings
const attachmentCache = new Map<string, string>();
let isCacheLoaded = false;

if (typeof window !== 'undefined') {
  window.addEventListener('jg_database_sync_updated', () => {
    listeners.forEach(fn => fn());
  });

  // Zero-latency cross-tab local storage synchronization
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('jg_')) {
      listeners.forEach(fn => fn());
    }
  });

  // Load attachments from IndexedDB into memory cache in the background on startup
  getAllAttachments().then((all) => {
    for (const [key, dataUrl] of Object.entries(all)) {
      attachmentCache.set(key, dataUrl);
    }
    isCacheLoaded = true;
    listeners.forEach(fn => fn());
  }).catch((err) => {
    console.error("Error populating attachment cache:", err);
  });
}

const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
    listeners.forEach(fn => fn());
  } catch (e) {
    console.error(`[dataStore] QuotaExceededError or general storage failure for key "${key}".`, e);
  }
};

// Standalone top-level exported helper functions for lead attachments inside the projectScope TEXT field
export function serializeLeadAttachments(lead: Lead): Lead {
  if (!lead.attachments || lead.attachments.length === 0) {
    return lead;
  }
  if (lead.projectScope.includes("---ATTACHMENTS_JSON_START---")) {
    return lead;
  }
  // Strip dataUrl from attachments before serializing to localStorage / Supabase
  const cleanAttachments = lead.attachments.map(att => ({
    name: att.name,
    size: att.size,
    type: att.type
  }));
  const attachmentsJson = JSON.stringify(cleanAttachments);
  const serializedScope = `${lead.projectScope}\n---ATTACHMENTS_JSON_START---\n${attachmentsJson}\n---ATTACHMENTS_JSON_END---`;
  return {
    ...lead,
    projectScope: serializedScope
  };
}

export function deserializeLeadAttachments(lead: any): Lead {
  if (!lead || !lead.projectScope) return lead;
  
  const scope = lead.projectScope;
  const startTag = "---ATTACHMENTS_JSON_START---";
  const endTag = "---ATTACHMENTS_JSON_END---";
  
  const startIndex = scope.indexOf(startTag);
  const endIndex = scope.indexOf(endTag);
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    try {
      const jsonStr = scope.substring(startIndex + startTag.length, endIndex).trim();
      const attachments = JSON.parse(jsonStr);
      const cleanScope = scope.substring(0, startIndex).trim();
      return {
        ...lead,
        projectScope: cleanScope,
        attachments: Array.isArray(attachments) ? attachments : []
      };
    } catch (e) {
      console.warn("Failed to parse serialized attachments:", e);
    }
  }
  return lead;
}

export const dataStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // PROJECTS CRUD
  getProjects(includeDeleted = false, includeSystemSettings = false): Project[] {
    if (!isClient) return DEFAULT_PROJECTS;
    const raw = localStorage.getItem('jg_projects');
    if (!raw) {
      safeSetItem('jg_projects', JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    let projects: Project[] = JSON.parse(raw);
    
    // Auto-migrate stale path prefixes to "/assets/images/"
    let migrated = false;
    const cleanPath = (pStr: string | undefined): string | undefined => {
      if (!pStr) return pStr;
      let cleaned = pStr;
      if (cleaned.startsWith('/src/assets/images/')) {
        cleaned = cleaned.replace('/src/assets/images/', '/assets/images/');
      } else if (cleaned.startsWith('src/assets/images/')) {
        cleaned = '/' + cleaned.replace('src/assets/images/', 'assets/images/');
      } else if (cleaned.startsWith('/public/assets/images/')) {
        cleaned = cleaned.replace('/public/assets/images/', '/assets/images/');
      } else if (cleaned.startsWith('public/assets/images/')) {
        cleaned = '/' + cleaned.replace('public/assets/images/', 'assets/images/');
      } else if (cleaned.startsWith('assets/images/')) {
        cleaned = '/' + cleaned;
      }
      return cleaned;
    };

    projects = projects.map(p => {
      let pMigrated = false;
      const img = cleanPath(p.image);
      if (img !== p.image) {
        pMigrated = true;
      }
      let imgs = p.images || [];
      if (imgs.length > 0) {
        const cleanedImgs = imgs.map(item => cleanPath(item) || '');
        if (JSON.stringify(cleanedImgs) !== JSON.stringify(imgs)) {
          imgs = cleanedImgs;
          pMigrated = true;
        }
      }
      if (pMigrated) {
        migrated = true;
        return { ...p, image: img || '', images: imgs };
      }
      return p;
    });

    if (migrated) {
      safeSetItem('jg_projects', JSON.stringify(projects));
    }

    let filteredProjects = includeDeleted ? projects : projects.filter(p => !p.isDeleted);
    
    // Always filter out default template projects completely for good
    filteredProjects = filteredProjects.filter(p => !p.id || !p.id.match(/^proj-[1-8]$/));

    // Filter out our system social settings pseudo-project
    if (!includeSystemSettings) {
      filteredProjects = filteredProjects.filter(p => p.id !== 'sys_social_links');
    }

    // Sort projects: Newest first (descending order of updatedAt/timestamp)
    filteredProjects.sort((a, b) => {
      const getProjectTimestamp = (p: Project): number => {
        if (p.updatedAt) return p.updatedAt;
        if (p.id && p.id.startsWith('proj-')) {
          const tsStr = p.id.substring(5);
          const ts = Number(tsStr);
          if (!isNaN(ts)) return ts;
        }
        return 0;
      };
      const timeA = getProjectTimestamp(a);
      const timeB = getProjectTimestamp(b);
      if (timeB !== timeA) {
        return timeB - timeA;
      }
      const numA = Number(a.id) || 0;
      const numB = Number(b.id) || 0;
      if (numB !== numA) {
        return numB - numA;
      }
      return b.id.localeCompare(a.id);
    });

    // Deduplicate projects by id
    const uniqueProjects: Project[] = [];
    const projectIds = new Set<string>();
    for (const proj of filteredProjects) {
      if (proj && proj.id && !projectIds.has(proj.id)) {
        projectIds.add(proj.id);
        uniqueProjects.push(proj);
      }
    }

    return uniqueProjects;
  },

  getProjectById(id: string): Project | undefined {
    return this.getProjects(true).find(p => p.id === id);
  },

  saveProject(project: Project): void {
    if (!isClient) return;
    const projects = this.getProjects(true, true);
    const index = projects.findIndex(p => p.id === project.id);
    const updatedProject = { ...project, updatedAt: Date.now() };
    if (index >= 0) {
      projects[index] = updatedProject;
    } else {
      projects.unshift(updatedProject);
    }
    safeSetItem('jg_projects', JSON.stringify(projects));
    supabaseSync.pushProject(updatedProject);
  },

  async deleteProjectSoft(id: string): Promise<void> {
    if (!isClient) return;
    const projects = this.getProjects(true);
    const index = projects.findIndex(p => p.id === id);
    if (index >= 0) {
      projects[index].isDeleted = true;
      safeSetItem('jg_projects', JSON.stringify(projects));
      await supabaseSync.pushProject(projects[index]);
    }
  },

  async restoreProject(id: string): Promise<void> {
    if (!isClient) return;
    const projects = this.getProjects(true);
    const index = projects.findIndex(p => p.id === id);
    if (index >= 0) {
      projects[index].isDeleted = false;
      safeSetItem('jg_projects', JSON.stringify(projects));
      await supabaseSync.pushProject(projects[index]);
    }
  },

  async hardDeleteProject(id: string): Promise<void> {
    if (!isClient) return;
    const projects = this.getProjects(true).filter(p => p.id !== id);
    safeSetItem('jg_projects', JSON.stringify(projects));
    await supabaseSync.deleteProject(id);
  },

  // LEADS (Inbound Data capture) CRUD
  getLeads(includeDeleted = false): Lead[] {
    if (!isClient) return DEFAULT_LEADS;
    const raw = localStorage.getItem('jg_leads');
    if (!raw) {
      safeSetItem('jg_leads', JSON.stringify(DEFAULT_LEADS));
      return DEFAULT_LEADS;
    }
    const leads: Lead[] = JSON.parse(raw).map(deserializeLeadAttachments);
    
    // Hydrate each lead's attachments from the in-memory cache
    for (const lead of leads) {
      if (lead && lead.attachments && lead.attachments.length > 0) {
        lead.attachments = lead.attachments.map((file) => {
          const cacheKey = `${lead.id}_${file.name}`;
          const cachedDataUrl = attachmentCache.get(cacheKey);
          if (cachedDataUrl) {
            return { ...file, dataUrl: cachedDataUrl };
          }
          return file;
        });
      }
    }

    // Deduplicate leads by id
    const uniqueLeads: Lead[] = [];
    const leadIds = new Set<string>();
    for (const lead of leads) {
      if (lead && lead.id && !leadIds.has(lead.id)) {
        leadIds.add(lead.id);
        uniqueLeads.push(lead);
      }
    }

    let filtered = includeDeleted ? uniqueLeads : uniqueLeads.filter(l => !l.isDeleted);
    
    // Always filter out default template leads completely for good
    filtered = filtered.filter(l => !l.id || !l.id.match(/^lead-[1-2]$/));

    // Sort leads: Newest first (descending order of timestamp)
    filtered.sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA;
    });

    return filtered;
  },

  addLead(lead: Omit<Lead, 'id' | 'timestamp' | 'status'>): Lead {
    const leads = this.getLeads(true);
    const newId = 'lead-' + Date.now();
    
    // Move attachments' dataUrl into IndexedDB and cache, and strip them from the local storage object!
    let processedAttachments = lead.attachments;
    if (processedAttachments && processedAttachments.length > 0) {
      processedAttachments = processedAttachments.map((file) => {
        if (file.dataUrl) {
          const cacheKey = `${newId}_${file.name}`;
          attachmentCache.set(cacheKey, file.dataUrl);
          saveAttachment(cacheKey, file.dataUrl).catch(err => console.error("IndexedDB save failed:", err));
          // Strip dataUrl from what goes into localStorage
          return { ...file, dataUrl: undefined };
        }
        return file;
      });
    }

    const newLead: Lead = {
      ...lead,
      id: newId,
      attachments: processedAttachments,
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };
    leads.unshift(newLead);
    if (isClient) {
      const serializedLeads = leads.map(serializeLeadAttachments);
      safeSetItem('jg_leads', JSON.stringify(serializedLeads));
      supabaseSync.pushLead(serializeLeadAttachments(newLead));
    }
    return newLead;
  },

  updateLeadStatus(id: string, status: 'Pending' | 'Reviewed' | 'Archived'): void {
    if (!isClient) return;
    const leads = this.getLeads(true);
    const index = leads.findIndex(l => l.id === id);
    if (index >= 0) {
      leads[index].status = status;
      const serializedLeads = leads.map(serializeLeadAttachments);
      safeSetItem('jg_leads', JSON.stringify(serializedLeads));
      supabaseSync.pushLead(serializeLeadAttachments(leads[index]));
    }
  },

  async deleteLeadSoft(id: string): Promise<void> {
    if (!isClient) return;
    const leads = this.getLeads(true);
    const index = leads.findIndex(l => l.id === id);
    if (index >= 0) {
      leads[index].isDeleted = true;
      const serializedLeads = leads.map(serializeLeadAttachments);
      safeSetItem('jg_leads', JSON.stringify(serializedLeads));
      await supabaseSync.pushLead(serializeLeadAttachments(leads[index]));
    }
  },

  async restoreLead(id: string): Promise<void> {
    if (!isClient) return;
    const leads = this.getLeads(true);
    const index = leads.findIndex(l => l.id === id);
    if (index >= 0) {
      leads[index].isDeleted = false;
      const serializedLeads = leads.map(serializeLeadAttachments);
      safeSetItem('jg_leads', JSON.stringify(serializedLeads));
      await supabaseSync.pushLead(serializeLeadAttachments(leads[index]));
    }
  },

  async hardDeleteLead(id: string): Promise<void> {
    if (!isClient) return;
    const leads = this.getLeads(true).filter(l => l.id !== id);
    const serializedLeads = leads.map(serializeLeadAttachments);
    safeSetItem('jg_leads', JSON.stringify(serializedLeads));
    await supabaseSync.deleteLead(id);

    // Also clean up IndexedDB for all attachments of this lead in the background
    try {
      const all = await getAllAttachments();
      for (const key of Object.keys(all)) {
        if (key.startsWith(id + "_")) {
          attachmentCache.delete(key);
          await deleteAttachment(key);
        }
      }
    } catch (e) {
      console.warn("Error cleaning up deleted lead attachments from IndexedDB:", e);
    }
  },

  // SERVICES CRUD
  getServices(): ServiceItem[] {
    if (!isClient) return DEFAULT_SERVICES;
    const raw = localStorage.getItem('jg_services');
    if (!raw) {
      safeSetItem('jg_services', JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    const parsed = JSON.parse(raw);
    if (parsed.length < DEFAULT_SERVICES.length) {
      safeSetItem('jg_services', JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    const uniqueServices: ServiceItem[] = [];
    const serviceIds = new Set<string>();
    for (const svc of parsed) {
      if (svc && svc.id && !serviceIds.has(svc.id)) {
        serviceIds.add(svc.id);
        uniqueServices.push(svc);
      }
    }
    return uniqueServices;
  },

  saveService(service: ServiceItem): void {
    if (!isClient) return;
    const services = this.getServices();
    const index = services.findIndex(s => s.id === service.id);
    if (index >= 0) {
      services[index] = service;
    } else {
      services.push(service);
    }
    safeSetItem('jg_services', JSON.stringify(services));
    supabaseSync.pushService(service);
  },

  getHistoricalRecords(): HistoricalRecord[] {
    if (!isClient) return DEFAULT_HISTORICAL_RECORDS;
    const raw = localStorage.getItem('jg_historical_records');
    if (!raw) {
      safeSetItem('jg_historical_records', JSON.stringify(DEFAULT_HISTORICAL_RECORDS));
      return DEFAULT_HISTORICAL_RECORDS;
    }
    return JSON.parse(raw);
  },

  saveHistoricalRecord(record: HistoricalRecord): void {
    if (!isClient) return;
    const records = this.getHistoricalRecords();
    const index = records.findIndex(r => r.id === record.id);
    if (index >= 0) {
      records[index] = record;
    } else {
      records.push(record);
    }
    safeSetItem('jg_historical_records', JSON.stringify(records));
    supabaseSync.pushHistoricalRecord(record);
  },

  getLeadsMetricsForMonth(year: number, monthIndex: number): number[] {
    const leads = this.getLeads(true);
    const basePoints = [0, 0, 0, 0];
    const monthPrefix = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
    const monthlyLeads = leads.filter(l => !l.isDeleted && l.timestamp.startsWith(monthPrefix));
    
    monthlyLeads.forEach(lead => {
      const day = new Date(lead.timestamp).getDate();
      if (day <= 7) basePoints[0]++;
      else if (day <= 14) basePoints[1]++;
      else if (day <= 21) basePoints[2]++;
      else basePoints[3]++;
    });
    return basePoints;
  },

  checkAndApplyRollover(): void {
    if (!isClient) return;
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const lastActiveMonth = localStorage.getItem('jg_last_active_month');

    if (lastActiveMonth && lastActiveMonth !== currentMonthKey) {
      const [lastYear, lastMonth] = lastActiveMonth.split('-').map(Number);
      const monthIndex = lastMonth - 1;
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      const dataPoints = this.getLeadsMetricsForMonth(lastYear, monthIndex);
      const totalLeads = dataPoints.reduce((a, b) => a + b, 0);

      const archivedRecord: HistoricalRecord = {
        id: lastActiveMonth,
        label: `${monthNames[monthIndex]} ${lastYear}`,
        type: 'MONTHLY',
        year: lastYear,
        monthIndex: monthIndex,
        dataPoints: dataPoints,
        totalLeads: totalLeads
      };

      this.saveHistoricalRecord(archivedRecord);
    }
    
    localStorage.setItem('jg_last_active_month', currentMonthKey);
  }
};
