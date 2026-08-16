import { fetcher } from './api';

export const skillService = {
  getAll: () => fetcher('/api/skills', { cache: 'no-store' }),
  create: (data) => fetcher('/api/skills', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetcher(`/api/skills?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetcher(`/api/skills?id=${id}`, { method: 'DELETE' }),
};
