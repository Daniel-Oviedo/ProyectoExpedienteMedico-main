import { useState, useCallback } from 'react'
import { registroMedicoService } from '../services/registroMedicoService'

/**
 * Hook personalizado para manejar la creación de registros médicos
 * Abstrae la lógica de formulario y API
 */

export function useRegistroDiagnostico() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const crearRegistroVitales = useCallback(async (expedienteId, vitales) => {
    try {
      setLoading(true)
      setError('')
      setSuccess(false)

      // Validar campos requeridos
      if (!vitales.presionArterial || !vitales.peso || !vitales.altura) {
        throw new Error('Presión arterial, peso y altura son requeridos')
      }

      const data = {
        expedienteId: parseInt(expedienteId),
        tipoRegistro: 'vitales',
        presionArterial: vitales.presionArterial,
        peso: parseFloat(vitales.peso),
        altura: parseInt(vitales.altura),
        observaciones: vitales.observaciones || ''
      }

      const resultado = await registroMedicoService.crear(data)
      setSuccess(true)
      setError('')
      
      return resultado
    } catch (err) {
      const mensajeError = err.response?.data?.message || err.message || 'Error al crear registro de vitales'
      setError(mensajeError)
      setSuccess(false)
      throw new Error(mensajeError)
    } finally {
      setLoading(false)
    }
  }, [])

  const crearRegistroDiagnostico = useCallback(async (expedienteId, diagnostico) => {
    try {
      setLoading(true)
      setError('')
      setSuccess(false)

      // Validar campos requeridos
      if (!diagnostico.diagnostico) {
        throw new Error('El diagnóstico es requerido')
      }

      const data = {
        expedienteId: parseInt(expedienteId),
        tipoRegistro: 'diagnostico',
        diagnostico: diagnostico.diagnostico,
        medicamentos: diagnostico.medicamentos || '',
        observaciones: diagnostico.observaciones || ''
      }

      const resultado = await registroMedicoService.crear(data)
      setSuccess(true)
      setError('')
      
      return resultado
    } catch (err) {
      const mensajeError = err.response?.data?.message || err.message || 'Error al crear diagnóstico'
      setError(mensajeError)
      setSuccess(false)
      throw new Error(mensajeError)
    } finally {
      setLoading(false)
    }
  }, [])

  const crearRegistroConsulta = useCallback(async (expedienteId, consulta) => {
    try {
      setLoading(true)
      setError('')
      setSuccess(false)

      const data = {
        expedienteId: parseInt(expedienteId),
        tipoRegistro: 'consulta',
        ...consulta
      }

      const resultado = await registroMedicoService.crear(data)
      setSuccess(true)
      setError('')
      
      return resultado
    } catch (err) {
      const mensajeError = err.response?.data?.message || err.message || 'Error al crear consulta'
      setError(mensajeError)
      setSuccess(false)
      throw new Error(mensajeError)
    } finally {
      setLoading(false)
    }
  }, [])

  const limpiarEstado = useCallback(() => {
    setError('')
    setSuccess(false)
    setLoading(false)
  }, [])

  return {
    loading,
    error,
    success,
    crearRegistroVitales,
    crearRegistroDiagnostico,
    crearRegistroConsulta,
    limpiarEstado
  }
}
