const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');

// ─── Configuration ──────────────────────────────────────────────────
const API_TIMEOUT_MS = 20_000;  // 20 seconds
const MAX_RETRIES = 1;          // 1 automatic retry on network errors

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

// ─── Error Types ─────────────────────────────────────────────────────

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public isRetryable: boolean,
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// ─── Fetch helpers ───────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options?: RequestInit & { timeout?: number; retries?: number },
): Promise<T> {
  const timeout = options?.timeout ?? API_TIMEOUT_MS;
  const maxRetries = options?.retries ?? 0;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetch(`${API_BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const isRetryable = res.status >= 500 || res.status === 429;
        const errorBody = await res.text().catch(() => res.statusText);

        // Don't retry client errors (4xx)
        if (!isRetryable || attempt >= maxRetries) {
          throw new APIError(
            `API error ${res.status}: ${errorBody}`,
            res.status,
            isRetryable,
          );
        }

        lastError = new APIError(errorBody, res.status, true);
        // Brief pause before retry
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }

      return res.json();
    } catch (err) {
      clearTimeout(timeoutId);

      // Abort/timeout error
      if (err instanceof DOMException && err.name === 'AbortError') {
        lastError = new APIError('Request timed out', 0, true);
        if (attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, 500));
          continue;
        }
        throw new APIError(
          'The server took too long to respond. Please try again.',
          0,
          true,
        );
      }

      // Network error (offline, DNS, etc.)
      if (err instanceof TypeError && err.message.includes('fetch')) {
        lastError = new APIError('Network error', 0, true);
        if (attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, 500));
          continue;
        }
        throw new APIError(
          'Unable to reach the server. Please check your connection.',
          0,
          true,
        );
      }

      // Re-throw APIError as-is
      if (err instanceof APIError) throw err;

      // Unknown error
      throw new APIError(
        err instanceof Error ? err.message : 'Unknown error',
        0,
        false,
      );
    }
  }

  throw lastError ?? new APIError('Request failed', 0, false);
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

  // Chat gets timeout + 1 retry on network/server errors
  chat: (data: ChatRequestPayload) =>
    apiFetch<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify(data),
      timeout: API_TIMEOUT_MS,
      retries: MAX_RETRIES,
    }),
};
