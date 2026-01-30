import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Card, Alert, Input } from '../components/ui'
import { BuscarPaciente } from '../components/enfermera/BuscarPaciente'
import { RegistrarVitales } from '../components/enfermera/RegistrarVitales'
import { ROUTES, MESSAGES } from '../constants'
import { pacienteService } from '../services/pacienteService'
import '../styles/pages/EnfermeraPage.css'

export function EnfermeraPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [step, setStep] = useState(1)
  const [cedula, setCedula] = useState('')
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null)
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState('success')
  
  const [formData, setFormData] = useState({
    usuarioId: null,
    fechaNacimiento: '',
    presionArterial: '',
    peso: '',
    altura: '',
    temperatura: '',
    saturacionOxigeno: '',
    observaciones: ''
  })
  
  const [loading, setLoading] = useState(false)

  const handleBuscarPaciente = async (e) => {
    e.preventDefault()
    setAlertMessage(null)
    setLoading(true)

    try {
      const usuario = await pacienteService.buscar(cedula)
      if (!usuario) {
        throw new Error('No se encontró el paciente')
      }
      setUsuarioEncontrado(usuario)
      setFormData(prev => ({
        ...prev,
        usuarioId: usuario.id
      }))
      setStep(2)
    } catch (err) {
      setAlertMessage(err.message || MESSAGES.ERROR_LOAD)
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

  const handleRegistrar = async (e) => {
    e.preventDefault()
    setAlertMessage(null)
    setLoading(true)

    try {
      // Llamar al API para registrar paciente con vitales
      await pacienteService.registrarConVitales({
        usuarioId: formData.usuarioId,
        fechaNacimiento: formData.fechaNacimiento,
        presionArterial: formData.presionArterial,
        peso: parseFloat(formData.peso),
        altura: parseFloat(formData.altura),
        temperatura: parseFloat(formData.temperatura),
        saturacionOxigeno: parseFloat(formData.saturacionOxigeno),
        observaciones: formData.observaciones
      })
      
      setAlertMessage(MESSAGES.SUCCESS_CREATE)
      setAlertType('success')
      
      setTimeout(() => {
        setStep(1)
        setUsuarioEncontrado(null)
        setCedula('')
        setFormData({
          usuarioId: null,
          fechaNacimiento: '',
          presionArterial: '',
          peso: '',
          altura: '',
          temperatura: '',
          saturacionOxigeno: '',
          observaciones: ''
        })
        setAlertMessage(null)
      }, 2000)
    } catch (err) {
      setAlertMessage(err.message || MESSAGES.ERROR_CREATE)
      setAlertType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleVolver = () => {
    setStep(1)
    setUsuarioEncontrado(null)
    setCedula('')
  }

  return (
    <div className="enfermera-container">
      <div className="enfermera-header">
        <div className="header-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 5c2.941 0 6.685 1.537 9 3l-2 11h-14l-2 -11c2.394 -1.513 6.168 -3.005 9 -3" />
            <path d="M10 12h4" />
            <path d="M12 10v4" />
          </svg>
          <h1>Panel de Enfermería</h1>
          <p>Registra nuevos pacientes con sus signos vitales</p>
        </div>
        <button 
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="btn-volver"
        >
          ← Volver
        </button>
      </div>

      <div className="enfermera-card">
        {alertMessage && (
          <Alert 
            type={alertType}
            onClose={() => setAlertMessage(null)}
          >
            {alertMessage}
          </Alert>
        )}

        {step === 1 ? (
          <Card title="Buscar Paciente">
            <BuscarPaciente 
              cedula={cedula}
              onCedulaChange={setCedula}
              onSubmit={handleBuscarPaciente}
              loading={loading}
            />
          </Card>
        ) : (
          <Card title="Registrar Signos Vitales">
            <RegistrarVitales
              usuario={usuarioEncontrado}
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleRegistrar}
              onBack={handleVolver}
              loading={loading}
            />
          </Card>
        )}
      </div>
    </div>
  )
}
