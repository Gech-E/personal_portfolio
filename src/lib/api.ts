const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');

// ─── Types ───────────────────────────────────────────────────────────

export interface ProjectFromAPI {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string | null;
  demo_url?: string | null;
  image_url?: string | null;
  icon_name?: string | null;
  color?: string | null;
  category?: string | null;
  created_at: string;
}

export interface SkillFromAPI {
  id: number;
  name: string;
  category: string;
  level: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface ChatRequestPayload {
  session_id: string;
  messages: { role: string; content: string }[];
}

export interface ChatResponse {
  reply: string;
  sources: string[];
  intent?: string;
  confidence?: number;
}

// ─── Fetch helpers ───────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

// ─── API functions ───────────────────────────────────────────────────

export const portfolioAPI = {
  getProjects: () => apiFetch<ProjectFromAPI[]>('/api/projects'),

  getProject: (id: number) => apiFetch<ProjectFromAPI>(`/api/projects/${id}`),

  getSkills: () => apiFetch<SkillFromAPI[]>('/api/skills'),

  submitContact: (data: ContactPayload) =>
    apiFetch<ContactResponse>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  chat: (data: ChatRequestPayload) =>
    apiFetch<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
