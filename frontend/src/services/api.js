import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080'

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ============ AUTH ENDPOINTS ============
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
}

// ============ USUARIOS ENDPOINTS ============
export const usuariosAPI = {
  obtenerPerfil: () =>
    api.get('/api/usuarios/perfil'),
}

// ============ EXPEDIENTES ENDPOINTS ============
export const expedientesAPI = {
  listar: () =>
    api.get('/api/expedientes'),
  
  obtenerPorId: (id) =>
    api.get(`/api/expedientes/${id}`),
  
  obtenerMio: () =>
    api.get('/api/expedientes/mio'),
  
  crear: (pacienteId) =>
    api.post('/api/expedientes', { pacienteId }),
}

// ============ REGISTROS MÉDICOS ENDPOINTS ============
export const registrosMedicosAPI = {
  listarPorExpediente: (expedienteId) =>
    api.get(`/api/registros-medicos/expediente/${expedienteId}`),
  
  crear: (datos) =>
    api.post('/api/registros-medicos', datos),
}

export default api
