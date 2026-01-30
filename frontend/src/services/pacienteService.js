import { pacientesAPI } from './api'

/**
 * Servicio de Pacientes
 * Centraliza todas las operaciones relacionadas con pacientes
 */

export const pacienteService = {
  /**
   * Crea un nuevo paciente (registro de usuario)
   * @param {Object} datos - Datos del nuevo paciente
   * @returns {Promise} Usuario creado
   */
  crear: async (datos) => {
    try {
      const response = await pacientesAPI.crear(datos)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar paciente')
    }
  },

  /**
   * Obtiene la lista de todos los pacientes
   * @returns {Promise} Lista de pacientes
   */
  listarTodos: async () => {
    try {
      const response = await pacientesAPI.listar()
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al listar pacientes')
    }
  },

  /**
   * Busca un paciente por cédula
   * @param {string} cedula - Cédula del paciente
   * @returns {Promise} Datos del usuario encontrado
   */
  buscar: async (cedula) => {
    try {
      // El backend retorna un objeto único, no un array
      const response = await pacientesAPI.buscarPorCedula(cedula)
      return response.data // Retorna el objeto directamente
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Paciente no encontrado')
    }
  },

  /**
   * Obtiene pacientes sin diagnóstico (solo para médicas)
   * @returns {Promise} Pacientes sin diagnóstico
   */
  listarSinDiagnostico: async () => {
    try {
      const response = await pacientesAPI.listarSinDiagnostico()
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al listar pacientes')
    }
  },

  /**
   * Registra un paciente con vitales (solo para enfermeras)
   * @param {Object} datos - Datos del paciente con vitales
   * @returns {Promise} Paciente registrado
   */
  registrarConVitales: async (datos) => {
    try {
      const response = await pacientesAPI.registrarConVitales(datos)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar paciente con vitales')
    }
  }
}
