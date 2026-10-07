const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function fetchCollection(path, signal) {
  const response = await fetch(`${apiBase}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`);
  }

  const data = await response.json();
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  throw new Error('The API returned an unsupported collection response.');
}

export default apiBase;
