import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useExpedienteContext } from '../context/ExpedienteContext'
import { Card, Button, Alert } from '../components/ui'
import { RegistrosFilter } from '../components/registros/RegistrosFilter'
import { CrearRegistroButton } from '../components/registros/CrearRegistroButton'
import { RegistrosList } from '../components/registros/RegistrosList'
import { ROUTES, buildRoute, MESSAGES } from '../constants'
import { formatearFechaHora } from '../utils'
import '../styles/pages/RegistrosMedicoPage.css'

export function RegistrosMedicoPage() {
  const { expedienteId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const {
    expedienteActual,
    registrosFiltrados,
    filtroActivo,
    loadingExp,
    errorExp,
    cargarExpediente,
    actualizarFiltro
  } = useExpedienteContext()

  const formatearFecha = (fecha) => {
    return formatearFechaHora(fecha)
  }

  useEffect(() => {
    if (expedienteId) {
      cargarExpediente(expedienteId)
    }
  }, [expedienteId, cargarExpediente])

  const handleCrearRegistro = () => {
    navigate(buildRoute(ROUTES.CREAR_REGISTRO, { expedienteId }))
  }

  const loading = loadingExp
  const error = errorExp

  if (loading) return <div className="loading">{MESSAGES.LOADING_REGISTROS}</div>
  if (error) return <Alert type="error">{error}</Alert>

  return (
    <div className="registros-container">
      <div className="registros-header">
        <div>
          <h1>Registros Médicos</h1>
          {expedienteActual && <p className="expediente-ref">Expediente #{expedienteActual.id}</p>}
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate(ROUTES.EXPEDIENTE)}
          className="btn-back"
        >
          ← Volver al Expediente
        </Button>
      </div>

      <div className="registros-content">
        <RegistrosFilter filtro={filtroActivo} onFilterChange={actualizarFiltro} />
        <CrearRegistroButton expedienteId={expedienteId} user={user} onClick={handleCrearRegistro} />
        <RegistrosList registros={registrosFiltrados} formatearFecha={formatearFecha} />
      </div>
    </div>
  )
}
