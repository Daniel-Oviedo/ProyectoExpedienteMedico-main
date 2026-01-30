import { createContext, useState, useCallback, useContext } from 'react'
import { expedienteService, registroMedicoService } from '../services'

/**
 * Context para manejar el expediente actual de la aplicación
 * Almacena: expediente actual, registros, filtro
 * Evita prop drilling y centraliza el estado
 */

const ExpedienteContext = createContext(null)

export function ExpedienteProvider({ children }) {
  const [expedienteActual, setExpedienteActual] = useState(null)
  const [registrosActuales, setRegistrosActuales] = useState([])
  const [filtroActivo, setFiltroActivo] = useState('')
  const [loadingExp, setLoadingExp] = useState(false)
  const [errorExp, setErrorExp] = useState('')

  const cargarExpediente = useCallback(async (expedienteId = null) => {
    try {
      setLoadingExp(true)
      setErrorExp('')
      
      let expediente
      if (expedienteId) {
        expediente = await expedienteService.obtenerPorId(expedienteId)
      } else {
        expediente = await expedienteService.obtenerMio()
      }
      
      setExpedienteActual(expediente)
      
      // Cargar registros del expediente
      const registros = await registroMedicoService.listarPorExpediente(expediente.id)
      setRegistrosActuales(registros)
      
    } catch (err) {
      setErrorExp(err.message || 'Error al cargar expediente')
      setExpedienteActual(null)
      setRegistrosActuales([])
    } finally {
      setLoadingExp(false)
    }
  }, [])

  const actualizarFiltro = useCallback((nuevoFiltro) => {
    setFiltroActivo(nuevoFiltro)
  }, [])

  const registrosFiltrados = filtroActivo
    ? registrosActuales.filter(r => 
        r.tipoRegistro?.toLowerCase() === filtroActivo.toLowerCase()
      )
    : registrosActuales

  const agregarRegistro = useCallback((nuevoRegistro) => {
    setRegistrosActuales(prev => [nuevoRegistro, ...prev])
  }, [])

  const actualizarRegistro = useCallback((registroId, datosActualizados) => {
    setRegistrosActuales(prev =>
      prev.map(r => r.id === registroId ? { ...r, ...datosActualizados } : r)
    )
  }, [])

  const eliminarRegistro = useCallback((registroId) => {
    setRegistrosActuales(prev => prev.filter(r => r.id !== registroId))
  }, [])

  const limpiarExpediente = useCallback(() => {
    setExpedienteActual(null)
    setRegistrosActuales([])
    setFiltroActivo('')
    setErrorExp('')
  }, [])

  const value = {
    // Estado
    expedienteActual,
    registrosActuales,
    registrosFiltrados,
    filtroActivo,
    loadingExp,
    errorExp,
    
    // Acciones
    cargarExpediente,
    actualizarFiltro,
    agregarRegistro,
    actualizarRegistro,
    eliminarRegistro,
    limpiarExpediente
  }

  return (
    <ExpedienteContext.Provider value={value}>
      {children}
    </ExpedienteContext.Provider>
  )
}

/**
 * Hook para usar el contexto de expedientes
 * @returns {Object} expediente, registros, funciones de manejo
 */
export function useExpedienteContext() {
  const context = useContext(ExpedienteContext)
  if (!context) {
    throw new Error('useExpedienteContext debe usarse dentro de ExpedienteProvider')
  }
  return context
}
