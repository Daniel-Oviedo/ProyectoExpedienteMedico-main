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
      setSuccess('✅ Paciente, expediente y signos vitales registrados exitosamente')
      
      setTimeout(() => {
        navigate('/dashboard')
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
        <h1>🩺 Panel de Enfermería</h1>
        <p>Registra nuevos pacientes con sus signos vitales</p>
        <button onClick={() => navigate('/dashboard')} className="btn-back">← Volver</button>
      </div>

      <div className="enfermera-card">
        {step === 1 ? (
          // PASO 1: BUSCAR PACIENTE
          <form onSubmit={handleBuscarPaciente} className="form-buscar">
            <h2>Paso 1: Buscar Paciente por Cédula</h2>
            
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
              {loading ? '⏳ Buscando...' : '🔍 Buscar Paciente'}
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
                  <label htmlFor="altura">Altura (m):</label>
                  <input
                    type="number"
                    id="altura"
                    name="altura"
                    value={formData.altura}
                    onChange={handleInputChange}
                    placeholder="1.75"
                    step="0.01"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="observaciones">Observaciones:</label>
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
                {loading ? '⏳ Registrando...' : '✅ Registrar Paciente'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
