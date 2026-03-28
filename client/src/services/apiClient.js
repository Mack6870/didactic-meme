const BASE_URL = '/api';

async function request(path, options = {}) {
  const url = path.startsWith('/health') ? path : `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const apiClient = {
  get: (path, absolute = false) =>
    request(absolute ? path : path),
  post: (path, data) =>
    request(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path, data) =>
    request(path, { method: 'PUT', body: JSON.stringify(data) }),
  del: (path) =>
    request(path, { method: 'DELETE' }),
};
