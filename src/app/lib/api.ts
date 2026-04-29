// ─── API Configuration ──────────────────────────────────────────────────────────
// Update API_BASE_URL to point to your deployed FastAPI backend.
// In production, set the VITE_API_URL environment variable.

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

interface ContactResponse {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface ProjectResponse {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  created_at: string;
}

interface SkillResponse {
  id: number;
  name: string;
  category: string;
  level: number;
}

// ─── API Functions ──────────────────────────────────────────────────────────────

export async function submitContactForm(data: ContactPayload): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to send message" }));
    throw new Error(err.detail || "Failed to send message");
  }
  return res.json();
}

export async function fetchProjects(): Promise<ProjectResponse[]> {
  const res = await fetch(`${API_BASE_URL}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchSkills(): Promise<SkillResponse[]> {
  const res = await fetch(`${API_BASE_URL}/api/skills`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/`);
    return res.ok;
  } catch {
    return false;
  }
}
