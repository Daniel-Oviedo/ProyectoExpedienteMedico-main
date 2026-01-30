import { createContext, useState, useCallback, useContext } from 'react'
import { pacienteService } from '../services'

/**
 * Context para manejar el paciente actual de la aplicación
 * Almacena: paciente actual, lista de pacientes, búsqueda
 * Evita prop drilling y centraliza el estado
 */

const PacienteContext = createContext(null)

export function PacienteProvider({ children }) {
  const [pacienteActual, setPacienteActual] = useState(null)
  const [pacientesLista, setPacientesLista] = useState([])
  const [termoBusqueda, setTermoBusqueda] = useState('')
  const [loadingPac, setLoadingPac] = useState(false)
  const [errorPac, setErrorPac] = useState('')

  const cargarPacientes = useCallback(async () => {
    try {
      setLoadingPac(true)
      setErrorPac('')
      
      const pacientes = await pacienteService.listarTodos()
      setPacientesLista(pacientes)
      
    } catch (err) {
      setErrorPac(err.message || 'Error al cargar pacientes')
      setPacientesLista([])
    } finally {
      setLoadingPac(false)
    }
  }, [])

  const cargarPacienteActual = useCallback(async (pacienteId) => {
    try {
      setLoadingPac(true)
      setErrorPac('')
      
      const paciente = await pacienteService.obtenerPorId(pacienteId)
      setPacienteActual(paciente)
      
    } catch (err) {
      setErrorPac(err.message || 'Error al cargar paciente')
      setPacienteActual(null)
    } finally {
      setLoadingPac(false)
    }
  }, [])

  const buscarPacientes = useCallback((termino) => {
    setTermoBusqueda(termino)
  }, [])

  const seleccionarPaciente = useCallback((paciente) => {
    setPacienteActual(paciente)
  }, [])

  const pacientesFiltrados = termoBusqueda
    ? pacientesLista.filter(p =>
        p.nombre?.toLowerCase().includes(termoBusqueda.toLowerCase()) ||
        p.apellido?.toLowerCase().includes(termoBusqueda.toLowerCase()) ||
        p.email?.toLowerCase().includes(termoBusqueda.toLowerCase()) ||
        p.numeroIdentificacion?.includes(termoBusqueda)
      )
    : pacientesLista

  const limpiarPaciente = useCallback(() => {
    setPacienteActual(null)
    setPacientesLista([])
    setTermoBusqueda('')
    setErrorPac('')
  }, [])

  const value = {
    // Estado
    pacienteActual,
    pacientesLista,
    pacientesFiltrados,
    termoBusqueda,
    loadingPac,
    errorPac,
    
    // Acciones
    cargarPacientes,
    cargarPacienteActual,
    buscarPacientes,
    seleccionarPaciente,
    limpiarPaciente
  }

  return (
    <PacienteContext.Provider value={value}>
      {children}
    </PacienteContext.Provider>
  )
}

/**
 * Hook para usar el contexto de pacientes
 * @returns {Object} paciente, lista, funciones de manejo
 */
export function usePacienteContext() {
  const context = useContext(PacienteContext)
  if (!context) {
    throw new Error('usePacienteContext debe usarse dentro de PacienteProvider')
  }
  return context
}
