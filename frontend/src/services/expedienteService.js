import { expedientesAPI } from './api'

/**
 * Servicio de Expedientes
 * Centraliza todas las operaciones relacionadas con expedientes médicos
 */

export const expedienteService = {
  /**
   * Obtiene el expediente actual del usuario autenticado
   * @returns {Promise} Datos del expediente
   */
  obtenerMio: async () => {
    try {
      const response = await expedientesAPI.obtenerMio()
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener expediente')
    }
  },

  /**
   * Obtiene un expediente por ID
   * @param {number} expedienteId - ID del expediente
   * @returns {Promise} Datos del expediente
   */
  obtenerPorId: async (expedienteId) => {
    try {
      const response = await expedientesAPI.obtenerPorId(expedienteId)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener expediente')
    }
  },

  /**
   * Lista todos los expedientes
   * @returns {Promise} Lista de expedientes
   */
  listarTodos: async () => {
    try {
      const response = await expedientesAPI.listar()
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al listar expedientes')
    }
  },

  /**
   * Obtiene expediente de un paciente específico
   * @param {number} pacienteId - ID del paciente
   * @returns {Promise} Expediente del paciente
   */
  obtenerPorPaciente: async (pacienteId) => {
    try {
      const response = await expedientesAPI.obtenerPorPaciente(pacienteId)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener expediente del paciente')
    }
  },

  /**
   * Crea un nuevo expediente
   * @param {Object} data - Datos del expediente (pacienteId)
   * @returns {Promise} Expediente creado
   */
  crear: async (data) => {
    try {
      const response = await expedientesAPI.crear(data)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear expediente')
    }
  }
}
