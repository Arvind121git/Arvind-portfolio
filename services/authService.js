import { fetcher } from './api';

export const authService = {
  login: (email, password) =>
    fetcher('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    fetcher('/api/auth', {
      method: 'DELETE',
    }),
  checkSession: () =>
    fetcher('/api/auth', {
      method: 'GET',
    }),
};
