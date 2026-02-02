import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  github_url?: string
  demo_url?: string
  image_url?: string
  created_at: string
}

export interface Skill {
  id: number
  name: string
  category: string
  level: number
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

export const portfolioAPI = {
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get('/api/projects')
    return response.data
  },

  getProject: async (id: number): Promise<Project> => {
    const response = await api.get(`/api/projects/${id}`)
    return response.data
  },

  getSkills: async (): Promise<Skill[]> => {
    const response = await api.get('/api/skills')
    return response.data
  },

  submitContact: async (data: ContactForm): Promise<void> => {
    await api.post('/api/contact', data)
  },
}
