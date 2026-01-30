import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRegistroDiagnostico } from '../hooks'
import { Button, Card, Alert } from '../components/ui'
import { AccessDenied } from '../components/registros/AccessDenied'
import { RegistroVitalesForm } from '../components/registros/RegistroVitalesForm'
import { RegistroDiagnosticoSimpleForm } from '../components/registros/RegistroDiagnosticoSimpleForm'
import { ROUTES, buildRoute, MESSAGES } from '../constants'
import '../styles/pages/CrearRegistroPage.css'

export function CrearRegistroPage() {
  const { expedienteId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [vitales, setVitales] = useState({
    presionArterial: '',
    peso: '',
    altura: '',
    observaciones: ''
  })

  const [diagnostico, setDiagnostico] = useState({
    diagnostico: '',
    medicamentos: '',
    observaciones: ''
  })
  
  const {
    loading,
    error,
    success,
    crearRegistroVitales,
    crearRegistroDiagnostico
  } = useRegistroDiagnostico()
  
  const esEnfermera = user?.rol === 'ROLE_ENFERMERA'
  const esMedica = user?.rol === 'ROLE_MEDICA'
  const esPaciente = user?.rol === 'ROLE_PACIENTE'
  
  // Si es paciente, no puede crear registros
  if (esPaciente) {
    return (
      <div className="crear-registro-container">
        <div className="crear-registro-header">
          <h1>Crear Registro</h1>
          <Button 
            variant="secondary"
            onClick={() => navigate(buildRoute(ROUTES.REGISTROS_MEDICO, { expedienteId }))}
            className="btn-back"
          >
            ← Volver
          </Button>
        </div>
        <div className="crear-registro-card">
          <AccessDenied />
        </div>
      </div>
    )
  }

  const handleVitalesChange = (e) => {
    const { name, value } = e.target
    setVitales(prev => ({ ...prev, [name]: value }))
  }

  const handleDiagnosticoChange = (e) => {
    const { name, value } = e.target
    setDiagnostico(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitVitales = async (e) => {
    e.preventDefault()
    try {
      await crearRegistroVitales(expedienteId, vitales)
      setTimeout(() => {
        navigate(buildRoute(ROUTES.REGISTROS_MEDICO, { expedienteId }))
      }, 1500)
    } catch (err) {
      // Error manejado por el hook
    }
  }

  const handleSubmitDiagnostico = async (e) => {
    e.preventDefault()
    try {
      await crearRegistroDiagnostico(expedienteId, diagnostico)
      setTimeout(() => {
        navigate(buildRoute(ROUTES.REGISTROS_MEDICO, { expedienteId }))
      }, 1500)
    } catch (err) {
      // Error manejado por el hook
    }
  }

  return (
    <div className="crear-registro-container">
      <div className="crear-registro-header">
        <h1>Crear Nuevo Registro Médico</h1>
        <Button 
          variant="secondary"
          onClick={() => navigate(buildRoute(ROUTES.REGISTROS_MEDICO, { expedienteId }))}
          className="btn-back"
        >
          ← Cancelar
        </Button>
      </div>

      <Card className="crear-registro-card">
        {success && (
          <Alert type="success">
            {MESSAGES.REGISTRO_CREADO_EXITOSO}
          </Alert>
        )}

        {error && (
          <Alert type="error">
            {error}
          </Alert>
        )}

        {esEnfermera && (
          <RegistroVitalesForm
            vitales={vitales}
            onInputChange={handleVitalesChange}
            onSubmit={handleSubmitVitales}
            loading={loading}
            error={error}
          />
        )}

        {esMedica && (
          <RegistroDiagnosticoSimpleForm
            diagnostico={diagnostico}
            onInputChange={handleDiagnosticoChange}
            onSubmit={handleSubmitDiagnostico}
            loading={loading}
            error={error}
          />
        )}
      </Card>
    </div>
  )
}
