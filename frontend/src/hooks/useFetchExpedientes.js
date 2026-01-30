import { useState, useEffect, useCallback } from 'react'
import { expedienteService } from '../services/expedienteService'

/**
 * Hook personalizado para obtener expedientes
 * Maneja loading, error y cacheo de datos
 */

export function useFetchExpedientes(expedienteId = null) {
  const [expediente, setExpediente] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const cargarExpediente = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      let data
      if (expedienteId) {
        data = await expedienteService.obtenerPorId(expedienteId)
      } else {
        data = await expedienteService.obtenerMio()
      }
      
      setExpediente(data)
    } catch (err) {
      setError(err.message || 'Error al cargar expediente')
      setExpediente(null)
    } finally {
      setLoading(false)
    }
  }, [expedienteId])

  useEffect(() => {
    cargarExpediente()
  }, [cargarExpediente])

  const refetch = useCallback(() => {
    cargarExpediente()
  }, [cargarExpediente])

  return {
    expediente,
    loading,
    error,
    refetch
  }
}
