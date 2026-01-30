import { useState, useEffect, useCallback } from 'react'
import { registroMedicoService } from '../services/registroMedicoService'

/**
 * Hook personalizado para obtener registros médicos
 * Maneja loading, error, filtrado y refetch de registros
 */

export function useFetchRegistros(expedienteId) {
  const [registros, setRegistros] = useState([])
  const [filtroTipo, setFiltroTipo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const cargarRegistros = useCallback(async () => {
    if (!expedienteId) return

    try {
      setLoading(true)
      setError('')
      
      let data
      if (filtroTipo) {
        data = await registroMedicoService.listarPorTipo(expedienteId, filtroTipo)
      } else {
        data = await registroMedicoService.listarPorExpediente(expedienteId)
      }
      
      setRegistros(data)
    } catch (err) {
      setError(err.message || 'Error al cargar registros')
      setRegistros([])
    } finally {
      setLoading(false)
    }
  }, [expedienteId, filtroTipo])

  useEffect(() => {
    cargarRegistros()
  }, [cargarRegistros])

  const refetch = useCallback(() => {
    cargarRegistros()
  }, [cargarRegistros])

  const agregarRegistro = useCallback((nuevoRegistro) => {
    setRegistros(prev => [nuevoRegistro, ...prev])
  }, [])

  const eliminarRegistro = useCallback((registroId) => {
    setRegistros(prev => prev.filter(r => r.id !== registroId))
  }, [])

  const actualizarRegistro = useCallback((registroId, datosActualizados) => {
    setRegistros(prev => 
      prev.map(r => r.id === registroId ? { ...r, ...datosActualizados } : r)
    )
  }, [])

  return {
    registros,
    filtroTipo,
    setFiltroTipo,
    loading,
    error,
    refetch,
    agregarRegistro,
    eliminarRegistro,
    actualizarRegistro
  }
}
