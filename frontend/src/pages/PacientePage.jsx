import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { registroMedicoService } from '../services'
import { Button, Alert } from '../components/ui'
import { useFetchExpedientes } from '../hooks'
import { InfoPaciente } from '../components/paciente/InfoPaciente'
import { HistorialMedico } from '../components/paciente/HistorialMedico'
import { ROUTES, MESSAGES } from '../constants'
import '../styles/pages/PacientePage.css'

export function PacientePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { expediente, loading, error } = useFetchExpedientes()
  const [registros, setRegistros] = useState([])

  useEffect(() => {
    if (expediente?.id) {
      cargarRegistros()
    }
  }, [expediente?.id])

  const cargarRegistros = async () => {
    try {
      const registros = await registroMedicoService.listarPorExpediente(expediente.id)
      setRegistros(registros || [])
    } catch (err) {
      console.error('Error al cargar registros:', err)
    }
  }

  const handleLogout = () => {
    logout()
    navigate(ROUTES.LOGIN)
  }

  if (loading) {
    return (
      <div className="paciente-container">
        <div className="loading">{MESSAGES.LOADING_EXPEDIENTE}</div>
      </div>
    )
  }

  return (
    <div className="paciente-container">
      <div className="paciente-header">
        <h1>Mi Expediente Médico</h1>
        <div className="header-buttons">
          <Button 
            variant="secondary"
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="btn-back"
          >
            Volver
          </Button>
          <Button 
            variant="danger"
            onClick={handleLogout}
            className="btn-logout"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {error && <Alert type="warning">{error}</Alert>}

      {expediente && (
        <div className="expediente-section">
          <InfoPaciente 
            paciente={expediente.paciente}
            expediente={expediente}
            user={user}
          />

          <HistorialMedico registros={registros} />
        </div>
      )}

      {!expediente && !error && (
        <div className="no-expediente">
          <Alert type="info">
            📋 Aún no tienes expediente. La enfermera debe registrarte primero.
          </Alert>
        </div>
      )}
    </div>
  )
}
