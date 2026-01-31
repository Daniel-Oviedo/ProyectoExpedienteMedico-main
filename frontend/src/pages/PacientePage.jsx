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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{display: 'inline', marginRight: '8px', verticalAlign: 'middle'}} className="icon icon-tabler icons-tabler-filled icon-tabler-clipboard-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.997 4.17a3 3 0 0 1 2.003 2.83v12a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 2.003 -2.83a4 4 0 0 0 3.997 3.83h4a4 4 0 0 0 3.98 -3.597zm-2.997 10.83h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m-1 -9a2 2 0 1 1 0 4h-4a2 2 0 1 1 0 -4z" /></svg>
            Aún no tienes expediente. La enfermera debe registrarte primero.
          </Alert>
        </div>
      )}
    </div>
  )
}
