'use client';

import { useState, useEffect, useCallback } from 'react';
import { skillService } from '../services/skillService';

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const data = await skillService.getAll();
      setSkills(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skills, loading, error, refetch: fetchSkills };
}
