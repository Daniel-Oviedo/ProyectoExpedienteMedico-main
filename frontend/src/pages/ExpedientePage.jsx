import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetchExpedientes } from '../hooks'
import { Button, Card, Alert } from '../components/ui'
import { ExpedienteInfo } from '../components/expediente/ExpedienteInfo'
import { ExpedienteActions } from '../components/expediente/ExpedienteActions'
import { ROUTES, buildRoute, MESSAGES } from '../constants'
import '../styles/pages/ExpedientePage.css'

export function ExpedientePage() {
  const navigate = useNavigate()
  const { expediente, loading, error } = useFetchExpedientes()

  const handleVerRegistros = () => {
    navigate(buildRoute(ROUTES.REGISTROS, { expedienteId: expediente.id }))
  }

  const handleCrearRegistro = () => {
    navigate(buildRoute(ROUTES.CREAR_REGISTRO, { expedienteId: expediente.id }))
  }

  if (loading) return <div className="loading">{MESSAGES.LOADING_EXPEDIENTE}</div>
  if (error) return <Alert type="error">{error}</Alert>

  return (
    <div className="expediente-container">
      <div className="expediente-header">
        <h1>Mi Expediente Médico</h1>
        <Button 
          variant="secondary"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="btn-back"
        >
          ← Volver
        </Button>
      </div>

      {expediente && (
        <>
          <ExpedienteInfo expediente={expediente} />
          <ExpedienteActions
            expediente={expediente}
            onVerRegistros={handleVerRegistros}
            onCrearRegistro={handleCrearRegistro}
          />
        </>
      )}
    </div>
  )
}
