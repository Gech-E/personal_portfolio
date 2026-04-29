import { useState, useEffect } from 'react';
import { portfolioAPI, type ProjectFromAPI, type SkillFromAPI } from './api';

// ─── useProjects ─────────────────────────────────────────────────────

export function useProjects() {
  const [projects, setProjects] = useState<ProjectFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    portfolioAPI
      .getProjects()
      .then((data) => {
        if (!cancelled) {
          setProjects(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('Failed to fetch projects from API, using fallback:', err.message);
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, loading, error };
}

// ─── useSkills ───────────────────────────────────────────────────────

export function useSkills() {
  const [skills, setSkills] = useState<SkillFromAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    portfolioAPI
      .getSkills()
      .then((data) => {
        if (!cancelled) {
          setSkills(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('Failed to fetch skills from API, using fallback:', err.message);
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { skills, loading, error };
}
