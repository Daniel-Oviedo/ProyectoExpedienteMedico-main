/**
 * Constantes de Rutas
 * Centralizadas para evitar typos
 */

export const ROUTES = {
  // Autenticación
  LOGIN: '/login',
  REGISTRO: '/registro',

  // Páginas principales
  DASHBOARD: '/dashboard',
  EXPEDIENTE: '/expediente',

  // Registros y operaciones
  REGISTROS: '/registros/:expedienteId',
  REGISTROS_MEDICO: '/registros/:expedienteId',
  CREAR_REGISTRO: '/crear-registro/:expedienteId',

  // Roles específicos
  MEDICA: '/medica',
  ENFERMERA: '/enfermera',
  PACIENTE: '/paciente',

  // Utilidad
  ROOT: '/',
  NOT_FOUND: '*'
}

/**
 * Función helper para generar rutas dinámicas
 * @param {string} template - Template con :param
 * @param {Object} params - Parámetros a reemplazar
 * @returns {string} Ruta completa
 * 
 * Uso: buildRoute(ROUTES.REGISTROS, { expedienteId: 123 })
 * Retorna: /registros/123
 */
export function buildRoute(template, params = {}) {
  let route = template
  Object.entries(params).forEach(([key, value]) => {
    route = route.replace(`:${key}`, value)
  })
  return route
}
