import { useState, useEffect, useCallback } from 'react'
import { pacienteService } from '../services/pacienteService'

/**
 * Hook personalizado para obtener pacientes
 * Maneja loading, error, búsqueda y cacheo de datos
 */

export function useFetchPacientes() {
  const [pacientes, setPacientes] = useState([])
  const [pacientesFiltrados, setPacientesFiltrados] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const cargarPacientes = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      
      const data = await pacienteService.listarTodos()
      setPacientes(data)
      setPacientesFiltrados(data)
    } catch (err) {
      setError(err.message || 'Error al cargar pacientes')
      setpacientes([])
      setPacientesFiltrados([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    cargarPacientes()
  }, [cargarPacientes])

  // Filtrar pacientes cuando cambia searchTerm
  useEffect(() => {
    if (!searchTerm) {
      setPacientesFiltrados(pacientes)
    } else {
      const filtrados = pacientes.filter(p =>
        p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.numeroIdentificacion?.includes(searchTerm)
      )
      setPacientesFiltrados(filtrados)
    }
  }, [searchTerm, pacientes])

  const refetch = useCallback(() => {
    cargarPacientes()
  }, [cargarPacientes])

  const buscar = useCallback((term) => {
    setSearchTerm(term)
  }, [])

  const limpiarBusqueda = useCallback(() => {
    setSearchTerm('')
  }, [])

  return {
    pacientes,
    pacientesFiltrados,
    loading,
    error,
    searchTerm,
    buscar,
    limpiarBusqueda,
    refetch
  }
}
