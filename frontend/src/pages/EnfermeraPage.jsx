import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import './EnfermeraPage.css'

export function EnfermeraPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [step, setStep] = useState(1) // 1: buscar, 2: registrar
  const [cedula, setCedula] = useState('')
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null)
  
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
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleBuscarPaciente = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.get(`/api/pacientes/buscar?cedula=${cedula}`)
      setUsuarioEncontrado(response.data)
      setFormData(prev => ({
        ...prev,
        usuarioId: response.data.id
      }))
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.message || 'No se encontró el usuario')
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
    setError('')
    setLoading(true)

    try {
      await api.post('/api/pacientes/registrar-con-vitales', formData)
      setSuccess('Paciente, expediente y signos vitales registrados exitosamente')
      
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
        setSuccess('')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar')
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
        </div>
        <p>Registra nuevos pacientes con sus signos vitales</p>
        <button onClick={() => navigate('/dashboard')} className="btn-back">← Volver</button>
      </div>

      <div className="enfermera-card">
        {step === 1 ? (
          // PASO 1: BUSCAR PACIENTE
          <form onSubmit={handleBuscarPaciente} className="form-buscar">
            <h2>Buscar Paciente por Cédula</h2>
            
            <div className="form-group">
              <label htmlFor="cedula">Número de Cédula:</label>
              <input
                type="text"
                id="cedula"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="Ej: 1234567890"
                required
                disabled={loading}
              />
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <>
                  <span>Buscando...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="button-icon">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
                    <path d="M14 17.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
                    <path d="M18.5 19.5l2.5 2.5" />
                  </svg>
                  <span>Buscar Paciente</span>
                </>
              )}
            </button>
          </form>
        ) : (
          // PASO 2: REGISTRAR DATOS
          <form onSubmit={handleRegistrar} className="form-registrar">
            <h2>Paso 2: Completar Datos del Paciente</h2>
            
            {usuarioEncontrado && (
              <div className="usuario-info">
                <div className="info-item">
                  <span className="label">👤 Nombre:</span>
                  <span className="value">{usuarioEncontrado.nombre}</span>
                </div>
                <div className="info-item">
                  <span className="label">📧 Email:</span>
                  <span className="value">{usuarioEncontrado.email}</span>
                </div>
              </div>
            )}

            <div className="form-section">
              <h3>Datos del Paciente</h3>
              <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Signos Vitales</h3>
              
              <div className="form-group">
                <label htmlFor="presionArterial">Presión Arterial (ej: 120/80):</label>
                <input
                  type="text"
                  id="presionArterial"
                  name="presionArterial"
                  value={formData.presionArterial}
                  onChange={handleInputChange}
                  placeholder="120/80"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="peso">Peso (kg):</label>
                  <input
                    type="number"
                    id="peso"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                    placeholder="75.5"
                    step="0.1"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="altura">Altura (cm):</label>
                  <input
                    type="number"
                    id="altura"
                    name="altura"
                    value={formData.altura}
                    onChange={handleInputChange}
                    placeholder="175"
                    step="1"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="temperatura">Temperatura (°C):</label>
                  <input
                    type="number"
                    id="temperatura"
                    name="temperatura"
                    value={formData.temperatura}
                    onChange={handleInputChange}
                    placeholder="36.5"
                    step="0.1"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="saturacionOxigeno">Saturación de Oxígeno (%):</label>
                  <input
                    type="number"
                    id="saturacionOxigeno"
                    name="saturacionOxigeno"
                    value={formData.saturacionOxigeno}
                    onChange={handleInputChange}
                    placeholder="98"
                    step="0.1"
                    min="0"
                    max="100"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="observaciones">Motivo de Consulta:</label>
                <textarea
                  id="observaciones"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  placeholder="Notas adicionales sobre el paciente"
                  rows="4"
                  disabled={loading}
                />
              </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="form-buttons">
              <button 
                type="button" 
                onClick={handleVolver} 
                disabled={loading}
                className="btn-secondary"
              >
                ← Volver a Buscar
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Registrando...' : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                      <path strokeNone d="M0 0h24v24H0z" fill="none"/>
                      <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                    </svg>
                    <span>Registrar Paciente</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
