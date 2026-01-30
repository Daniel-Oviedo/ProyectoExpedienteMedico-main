/**
 * Funciones de Formato
 * Utilidades para formatear datos
 */

/**
 * Formatea una fecha a formato legible
 * @param {string|Date} fecha - Fecha a formatear
 * @param {string} locale - Idioma (default: es-ES)
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha, locale = 'es-ES') => {
  if (!fecha) return '-'
  const date = new Date(fecha)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Formatea fecha y hora
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha y hora formateadas
 */
export const formatearFechaHora = (fecha) => {
  if (!fecha) return '-'
  const date = new Date(fecha)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Formatea un número como peso (kg)
 * @param {number} peso - Peso en kg
 * @returns {string} Peso formateado
 */
export const formatearPeso = (peso) => {
  if (!peso) return '-'
  return `${parseFloat(peso).toFixed(2)} kg`
}

/**
 * Formatea presión arterial
 * @param {string} presion - Presión (ej: 120/80)
 * @returns {string} Presión formateada
 */
export const formatearPresion = (presion) => {
  if (!presion) return '-'
  return `${presion} mmHg`
}

/**
 * Formatea altura en cm
 * @param {number} altura - Altura en cm
 * @returns {string} Altura formateada
 */
export const formatearAltura = (altura) => {
  if (!altura) return '-'
  return `${altura} cm`
}

/**
 * Formatea nombre completo
 * @param {string} nombre - Nombre
 * @param {string} apellido - Apellido
 * @returns {string} Nombre completo
 */
export const formatearNombreCompleto = (nombre, apellido) => {
  if (!nombre || !apellido) return '-'
  return `${nombre} ${apellido}`
}

/**
 * Trunca texto a un máximo de caracteres
 * @param {string} texto - Texto a truncar
 * @param {number} max - Máximo de caracteres
 * @returns {string} Texto truncado
 */
export const truncarTexto = (texto, max = 50) => {
  if (!texto || texto.length <= max) return texto
  return `${texto.substring(0, max)}...`
}

/**
 * Formatea un número como moneda
 * @param {number} numero - Número a formatear
 * @param {string} currency - Moneda (default: USD)
 * @returns {string} Número formateado como moneda
 */
export const formatearMoneda = (numero, currency = 'USD') => {
  if (numero === undefined || numero === null) return '-'
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency
  }).format(numero)
}

/**
 * Formatea un teléfono
 * @param {string} telefono - Teléfono sin formato
 * @returns {string} Teléfono formateado
 */
export const formatearTelefono = (telefono) => {
  if (!telefono) return '-'
  const digitos = telefono.replace(/\D/g, '')
  if (digitos.length === 10) {
    return `${digitos.substring(0, 3)}-${digitos.substring(3, 6)}-${digitos.substring(6)}`
  }
  return telefono
}

/**
 * Capitaliza la primera letra de un texto
 * @param {string} texto - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalizarPrimera = (texto) => {
  if (!texto) return ''
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}

/**
 * Convierte estado a etiqueta legible
 * @param {string} estado - Estado (ej: ABIERTO, CERRADO)
 * @returns {string} Estado formateado
 */
export const formatearEstado = (estado) => {
  const estadoMap = {
    ABIERTO: 'Abierto',
    CERRADO: 'Cerrado',
    PENDIENTE: 'Pendiente',
    ACTIVO: 'Activo',
    INACTIVO: 'Inactivo'
  }
  return estadoMap[estado] || estado
}
