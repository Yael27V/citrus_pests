const API_BASE = '/api';

// Fetch helper con manejo de errores
async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ==================== RANCHOS ====================

export async function getRanchos() {
  return fetchAPI('/ranchos');
}

export async function getRancho(id) {
  return fetchAPI(`/ranchos/${id}`);
}

export async function createRancho(data) {
  return fetchAPI('/ranchos', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== PLAGAS ====================

export async function getPlagas(ranchoId = null) {
  const query = ranchoId ? `?rancho_id=${ranchoId}` : '';
  return fetchAPI(`/plagas${query}`);
}

export async function getPlaga(id) {
  return fetchAPI(`/plagas/${id}`);
}

export async function createPlaga(data) {
  return fetchAPI('/plagas', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== UPLOAD ====================

export async function uploadImagen(file, plagaId = null, tipo = 'campo') {
  const formData = new FormData();
  formData.append('imagen', file);
  if (plagaId) formData.append('plaga_id', plagaId);
  formData.append('tipo', tipo);

  const response = await fetch(`${API_BASE}/upload/imagen`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error al subir imagen' }));
    throw new Error(error.error);
  }

  return response.json();
}
