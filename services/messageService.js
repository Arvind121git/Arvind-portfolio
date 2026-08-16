import { fetcher } from './api';

export const messageService = {
  getAll: () => fetcher('/api/messages', { cache: 'no-store' }),
  send: (data) => fetcher('/api/messages', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => fetcher(`/api/messages?id=${id}`, { method: 'DELETE' }),
};
