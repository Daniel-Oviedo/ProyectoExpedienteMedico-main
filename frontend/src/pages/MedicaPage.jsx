import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { pacienteService, registroMedicoService, expedienteService } from '../services'
import { Button, Card, Alert } from '../components/ui'
import { MedicaMenu } from '../components/medica/MedicaMenu'
import { ExpedientesList } from '../components/medica/ExpedientesList'
import { SignosVitalesCard } from '../components/medica/SignosVitalesCard'
import { RegistroDiagnosticoForm } from '../components/medica/RegistroDiagnosticoForm'
import { PacientesList } from '../components/medica/PacientesList'
import { HistorialDetalle } from '../components/medica/HistorialDetalle'
import { ROUTES, MESSAGES } from '../constants'
import '../styles/pages/MedicaPage.css'

export function MedicaPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [step, setStep] = useState(1)
  const [expedientes, setExpedientes] = useState([])
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null)
  const [registros, setRegistros] = useState([])
  const [historicoCompleto, setHistoricoCompleto] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState('success')
  
  const [formData, setFormData] = useState({
    expedienteId: null,
    diagnostico: '',
    medicamentos: '',
    planSeguimiento: '',
    historiaClinica: ''
  })
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    cargarExpedientes()
  }, [])

  useEffect(() => {
    if (step === 2 || step === 4) {
      cargarExpedientes()
    }
  }, [step])

  const cargarExpedientes = async () => {
    setLoading(true)
    setAlertMessage(null)
    try {
      // Cargar pacientes sin diagnóstico (pendientes)
      const pacientes = await pacienteService.listarSinDiagnostico()
      setExpedientes(pacientes || [])
    } catch (err) {
      console.error('Error:', err)
      setAlertMessage(MESSAGES.ERROR_LOAD)
      setAlertType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleSeleccionarExpediente = async (paciente) => {
    setLoading(true)
    try {
      const expediente = await expedienteService.obtenerPorPaciente(paciente.id)
      setExpedienteSeleccionado(expediente)
      
      const registros = await registroMedicoService.listarPorExpediente(expediente.id)
      let registrosPendientes = (registros || []).filter(r => !r.diagnostico)
      registrosPendientes = registrosPendientes.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro)).slice(0, 1)
      setRegistros(registrosPendientes)
      
      setFormData(prev => ({
        ...prev,
        expedienteId: expediente.id
      }))
      
      setStep(3)
    } catch (err) {
      setError('Error al cargar expediente')
    } finally {
      setLoading(false)
    }
  }

  const handleVerHistorial = async (paciente) => {
    setLoading(true)
    setAlertMessage(null)
    try {
      const expediente = await expedienteService.obtenerPorPaciente(paciente.id)
      setExpedienteSeleccionado(expediente)
      
      const registros = await registroMedicoService.listarPorExpediente(expediente.id)
      setHistoricoCompleto(registros || [])
      
      setStep(5)
    } catch (err) {
      setAlertMessage(MESSAGES.ERROR_LOAD)
      setAlertType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegistrarDiagnostico = async (e) => {
    e.preventDefault()
    setAlertMessage(null)
    setLoading(true)

    try {
      await registroMedicoService.registrarDiagnostico(formData)
      setAlertMessage(MESSAGES.DIAGNOSTICO_REGISTRADO)
      setAlertType('success')
      
      setTimeout(() => {
        setStep(2)
        setExpedienteSeleccionado(null)
        setRegistros([])
        setFormData({
          expedienteId: null,
          diagnostico: '',
          medicamentos: '',
          planSeguimiento: '',
          historiaClinica: ''
        })
        cargarExpedientes()
      }, 2000)
    } catch (err) {
      setAlertMessage(err.response?.data?.message || MESSAGES.ERROR_REGISTRAR)
      setAlertType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleVolverHeader = () => {
    if (step === 1) {
      navigate(ROUTES.DASHBOARD)
    } else if (step === 2 || step === 4) {
      setStep(1)
    } else if (step === 3) {
      setStep(2)
    } else if (step === 5) {
      setStep(4)
    }
  }

  const tieneDiagnostico = registros.length > 0 && registros.every(r => r.diagnostico)

  return (
    <div className="medica-container">
      <div className="medica-header">
        <div className="header-content">
          <h1>👩‍⚕️ Panel de Médica</h1>
          <p>Revisa expedientes y registra diagnósticos</p>
        </div>
        <button 
          onClick={handleVolverHeader}
          className="btn-volver"
        >
          ← Volver
        </button>
      </div>

      {alertMessage && (
        <Alert type={alertType}>
          {alertMessage}
        </Alert>
      )}

      <Card className="medica-card">
        {step === 1 && (
          <MedicaMenu onNavigate={(page) => setStep(page)} />
        )}
        
        {step === 2 && (
          <ExpedientesList 
            expedientes={expedientes}
            loading={loading}
            onSelect={handleSeleccionarExpediente}
            onBack={() => setStep(1)}
          />
        )}
        
        {step === 3 && (
          <div className="paso-diagnostico">
            <h2>Registrar Diagnóstico</h2>
            {expedienteSeleccionado && (
              <Card className="expediente-info-card">
                <h3>👤 {expedienteSeleccionado.paciente.nombre}</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Cédula:</span>
                    <span className="value">{expedienteSeleccionado.paciente.identificacion}</span>
                  </div>
                </div>
              </Card>
            )}

            {registros.length > 0 && (
              <div className="registros-section">
                <h3>📊 Información de la Consulta</h3>
                <div className="registros-grid">
                  {registros.map(registro => (
                    <SignosVitalesCard key={registro.id} registro={registro} />
                  ))}
                </div>
              </div>
            )}

            <RegistroDiagnosticoForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleRegistrarDiagnostico}
              onBack={() => setStep(2)}
              loading={loading}
              error={alertMessage}
              success={alertMessage && alertType === 'success'}
              tieneDiagnostico={tieneDiagnostico}
            />
          </div>
        )}
        
        {step === 4 && (
          <PacientesList
            expedientes={expedientes}
            loading={loading}
            onSelectHistorial={handleVerHistorial}
            onBack={() => setStep(1)}
          />
        )}
        
        {step === 5 && expedienteSeleccionado && (
          <HistorialDetalle
            paciente={expedienteSeleccionado.paciente}
            registros={historicoCompleto}
            onBack={() => setStep(4)}
          />
        )}
      </Card>
    </div>
  )
}

