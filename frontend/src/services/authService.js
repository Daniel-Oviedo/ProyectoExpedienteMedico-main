import { usuariosAPI, expedientesAPI } from './api'

/**
 * Servicio de Autenticación
 * Centraliza toda la lógica de login, registro y validación de sesión
 */

export const authService = {
  /**
   * Login de usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   * @returns {Promise} Respuesta con token y datos de usuario
   */
  login: async (email, password) => {
    try {
      const response = await usuariosAPI.login(email, password)
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en login')
    }
  },

  /**
   * Registro de nuevo usuario
   * @param {Object} userData - Datos del usuario (email, password, nombre, apellido)
   * @returns {Promise} Respuesta del registro
   */
  registro: async (userData) => {
    try {
      const response = await usuariosAPI.crear(userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en registro')
    }
  },

  /**
   * Logout del usuario
   * Limpia token y datos locales
   */
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  /**
   * Obtiene el usuario guardado localmente
   * @returns {Object} Datos del usuario o null
   */
  getLocalUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  /**
   * Obtiene el token guardado localmente
   * @returns {string} Token o null
   */
  getToken: () => localStorage.getItem('token'),

  /**
   * Valida si el usuario está autenticado
   * @returns {boolean} true si está autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  /**
   * Valida el rol del usuario
   * @param {string} role - Rol a validar
   * @returns {boolean} true si el usuario tiene ese rol
   */
  hasRole: (role) => {
    const user = authService.getLocalUser()
    return user?.rol === role
  }
}
