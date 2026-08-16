import { fetcher } from './api';

export const projectService = {
  getAll: () => fetcher('/api/projects', { cache: 'no-store' }),
  create: (data) => fetcher('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => fetcher(`/api/projects?id=${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => fetcher(`/api/projects?id=${id}`, { method: 'DELETE' }),
};
