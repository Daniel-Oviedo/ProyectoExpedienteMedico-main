/**
 * Funciones de Validación
 * Utilidades para validar datos
 */

/**
 * Valida si un email es correcto
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export const esEmailValido = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Valida si una contraseña es fuerte
 * @param {string} password - Contraseña a validar
 * @returns {Object} { esValida, fuerza, mensajes }
 */
export const esPasswordFuerte = (password) => {
  if (!password || password.length < 6) {
    return {
      esValida: false,
      fuerza: 'muy-debil',
      mensajes: ['Mínimo 6 caracteres']
    }
  }

  const validaciones = {
    mayuscula: /[A-Z]/.test(password),
    minuscula: /[a-z]/.test(password),
    numero: /[0-9]/.test(password),
    caracter: /[!@#$%^&*]/.test(password)
  }

  const puntos = Object.values(validaciones).filter(Boolean).length
  const fuerza = puntos <= 1 ? 'debil' : puntos <= 2 ? 'media' : 'fuerte'

  const mensajes = []
  if (!validaciones.mayuscula) mensajes.push('Agrega una mayúscula')
  if (!validaciones.numero) mensajes.push('Agrega un número')
  if (!validaciones.caracter) mensajes.push('Agrega un carácter especial')

  return {
    esValida: puntos >= 3,
    fuerza,
    mensajes
  }
}

/**
 * Valida si es mayor de edad
 * @param {string|Date} fechaNacimiento - Fecha de nacimiento
 * @param {number} edad - Edad mínima (default: 18)
 * @returns {boolean} true si es mayor
 */
export const esMayorDeEdad = (fechaNacimiento, edad = 18) => {
  const fechaNac = new Date(fechaNacimiento)
  const hoy = new Date()
  const diferencia = hoy.getFullYear() - fechaNac.getFullYear()
  const hayCumpleaños = hoy.getMonth() >= fechaNac.getMonth() &&
    hoy.getDate() >= fechaNac.getDate()
  const edadActual = hayCumpleaños ? diferencia : diferencia - 1

  return edadActual >= edad
}

/**
 * Valida un número de identificación
 * @param {string} numero - Número de identificación
 * @param {string} tipo - Tipo de documento (cedula, pasaporte, etc)
 * @returns {boolean} true si es válido
 */
export const esIdentificacionValida = (numero, tipo = 'cedula') => {
  if (!numero) return false

  const soloNumeros = numero.replace(/\D/g, '')

  if (tipo === 'cedula') {
    return soloNumeros.length >= 8 && soloNumeros.length <= 11
  }

  return soloNumeros.length > 0
}

/**
 * Valida teléfono
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} true si es válido
 */
export const esTelefonoValido = (telefono) => {
  const soloNumeros = telefono.replace(/\D/g, '')
  return soloNumeros.length >= 10
}

/**
 * Valida URL
 * @param {string} url - URL a validar
 * @returns {boolean} true si es válida
 */
export const esUrlValida = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Valida si es un número
 * @param {any} valor - Valor a validar
 * @returns {boolean} true si es número
 */
export const esNumero = (valor) => {
  return !isNaN(parseFloat(valor)) && isFinite(valor)
}

/**
 * Valida rango de números
 * @param {number} valor - Valor a validar
 * @param {number} min - Mínimo
 * @param {number} max - Máximo
 * @returns {boolean} true si está en rango
 */
export const esRangoValido = (valor, min, max) => {
  return esNumero(valor) && valor >= min && valor <= max
}

/**
 * Valida fecha futura
 * @param {string|Date} fecha - Fecha a validar
 * @returns {boolean} true si es futura
 */
export const esFechaFutura = (fecha) => {
  return new Date(fecha) > new Date()
}

/**
 * Valida fecha pasada
 * @param {string|Date} fecha - Fecha a validar
 * @returns {boolean} true si es pasada
 */
export const esFechaPasada = (fecha) => {
  return new Date(fecha) < new Date()
}

/**
 * Valida longitud de texto
 * @param {string} texto - Texto a validar
 * @param {number} min - Mínimo
 * @param {number} max - Máximo
 * @returns {boolean} true si está dentro del rango
 */
export const esLongitudValida = (texto, min = 0, max = 255) => {
  if (!texto) return min === 0
  return texto.length >= min && texto.length <= max
}

/**
 * Valida presión arterial
 * @param {string} presion - Presión (ej: 120/80)
 * @returns {boolean} true si es válida
 */
export const esPresionValida = (presion) => {
  if (!presion) return false
  const [sistolica, diastolica] = presion.split('/').map(Number)
  return esRangoValido(sistolica, 60, 200) && esRangoValido(diastolica, 40, 120)
}

/**
 * Valida peso (en kg)
 * @param {number} peso - Peso en kg
 * @returns {boolean} true si es válido
 */
export const esPesoValido = (peso) => {
  return esRangoValido(peso, 1, 500)
}

/**
 * Valida altura (en cm)
 * @param {number} altura - Altura en cm
 * @returns {boolean} true si es válida
 */
export const esAlturaValida = (altura) => {
  return esRangoValido(altura, 30, 300)
}
