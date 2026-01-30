import { registrosMedicosAPI } from './api'

/**
 * Servicio de Registros Médicos
 * Centraliza todas las operaciones relacionadas con registros médicos
 */

export const registroMedicoService = {
  /**
   * Crea un nuevo registro médico
   * @param {Object} data - Datos del registro
   * @returns {Promise} Registro creado
   */
  crear: async (data) => {
    try {
      const response = await registrosMedicosAPI.crear(data)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear registro')
    }
  },

  /**
   * Obtiene todos los registros de un expediente
   * @param {number} expedienteId - ID del expediente
   * @returns {Promise} Lista de registros
   */
  listarPorExpediente: async (expedienteId) => {
    try {
      const response = await registrosMedicosAPI.listarPorExpediente(expedienteId)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al listar registros')
    }
  },

  /**
   * Registra un diagnóstico (solo para médicas)
   * @param {Object} dto - Datos del diagnóstico
   * @returns {Promise} Registro creado
   */
  registrarDiagnostico: async (dto) => {
    try {
      const response = await registrosMedicosAPI.registrarDiagnostico(dto)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar diagnóstico')
    }
  }
}
