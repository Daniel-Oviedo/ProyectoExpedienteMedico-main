import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import './MedicaPage.css'

export function MedicaPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [step, setStep] = useState(1) // 1: ver expedientes, 2: registrar diagnóstico
  const [expedientes, setExpedientes] = useState([])
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null)
  const [registros, setRegistros] = useState([])
  
  const [formData, setFormData] = useState({
    expedienteId: null,
    diagnostico: '',
    medicamentos: '',
    observaciones: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    cargarExpedientes()
  }, [])

  useEffect(() => {
    if (step === 1) {
      cargarExpedientes()
    }
  }, [step])

  const cargarExpedientes = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/api/pacientes/sin-diagnostico')
      const pacientes = response.data || []
      setExpedientes(pacientes)
    } catch (err) {
      console.error('Error al cargar expedientes:', err)
      setError('Error al cargar expedientes')
    } finally {
      setLoading(false)
    }
  }

  const handleSeleccionarExpediente = async (paciente) => {
    setLoading(true)
    try {
      // Obtener el expediente del paciente
      const expedienteResponse = await api.get(`/api/expedientes/paciente/${paciente.id}`)
      setExpedienteSeleccionado(expedienteResponse.data)
      
      // Obtener registros médicos
      const registrosResponse = await api.get(`/api/registros-medicos/expediente/${expedienteResponse.data.id}`)
      // Filtrar solo los registros SIN diagnóstico (los pendientes)
      let registrosPendientes = (registrosResponse.data || []).filter(r => !r.diagnostico)
      
      // Ordenar por fecha descendente y tomar solo el más reciente
      registrosPendientes = registrosPendientes.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro)).slice(0, 1)
      setRegistros(registrosPendientes)
      
      setFormData(prev => ({
        ...prev,
        expedienteId: expedienteResponse.data.id
      }))
      
      setStep(2)
    } catch (err) {
      setError('Error al cargar expediente')
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
    setError('')
    setLoading(true)

    try {
      await api.post('/api/registros-medicos/diagnostico', formData)
      setSuccess('Diagnóstico registrado exitosamente')
      
      setTimeout(() => {
        setStep(1)
        setExpedienteSeleccionado(null)
        setRegistros([])
        setFormData({
          expedienteId: null,
          diagnostico: '',
          medicamentos: '',
          observaciones: ''
        })
        cargarExpedientes() // Recargar lista filtrada
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar')
    } finally {
      setLoading(false)
    }
  }

  const handleVolver = () => {
    setStep(1)
    setExpedienteSeleccionado(null)
    setRegistros([])
    setFormData({
      expedienteId: null,
      diagnostico: '',
      medicamentos: '',
      observaciones: ''
    })
  }

  const tieneDiagnostico = registros.length > 0 && registros.every(r => r.diagnostico)

  return (
    <div className="medica-container">
      <div className="medica-header">
        <h1>👩‍⚕️ Panel de Médica</h1>
        <p>Revisa expedientes y registra diagnósticos</p>
        <button onClick={() => navigate('/dashboard')} className="btn-back">← Volver</button>
      </div>

      <div className="medica-card">
        {step === 1 ? (
          // PASO 1: VER EXPEDIENTES
          <div className="paso-expedientes">
            <h2>Expedientes Pendientes</h2>
            
            {loading ? (
              <p className="loading">⏳ Cargando expedientes...</p>
            ) : expedientes.length === 0 ? (
              <p className="no-data">No hay expedientes disponibles</p>
            ) : (
              <div className="expedientes-lista">
                {expedientes.map(paciente => (
                  <div key={paciente.id} className="expediente-item">
                    <div className="expediente-info">
                      <h3>👤 {paciente.nombre}</h3>
                      <p>
                        <strong>Cédula:</strong> {paciente.identificacion}
                      </p>
                      <p>
                        <strong>Fecha de Nacimiento:</strong> {new Date(paciente.fechaNacimiento).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSeleccionarExpediente(paciente)}
                      disabled={loading}
                      className="btn-seleccionar"
                    >
                      📋 Ver Expediente
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // PASO 2: REGISTRAR DIAGNÓSTICO
          <div className="paso-diagnostico">
            <h2>Registrar Diagnóstico</h2>
            
            {expedienteSeleccionado && (
              <div className="expediente-info-card">
                <h3>👤 {expedienteSeleccionado.paciente.nombre}</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">Cédula:</span>
                    <span className="value">{expedienteSeleccionado.paciente.identificacion}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Estado:</span>
                    <span className="value">{expedienteSeleccionado.estado}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Signos Vitales */}
            {registros.length > 0 && (
              <div className="registros-section">
                <h3>📊 Signos Vitales</h3>
                <div className="registros-grid">
                  {registros.map(registro => (
                    <div key={registro.id} className="registro-item">
                      <p><strong>Presión:</strong> {registro.presionArterial || 'N/A'}</p>
                      <p><strong>Peso:</strong> {registro.peso ? `${registro.peso} kg` : 'N/A'}</p>
                      <p><strong>Altura:</strong> {registro.altura ? `${registro.altura} m` : 'N/A'}</p>
                      {registro.observaciones && (
                        <p><strong>Observaciones:</strong> {registro.observaciones}</p>
                      )}
                      <small>{new Date(registro.fechaRegistro).toLocaleString()}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tieneDiagnostico && (
              <div className="alert alert-info">
                ℹ️ Este expediente ya tiene diagnóstico registrado
              </div>
            )}

            <form onSubmit={handleRegistrarDiagnostico} className="form-diagnostico">
              <h3>Nuevo Diagnóstico</h3>

              <div className="form-group">
                <label htmlFor="diagnostico">Diagnóstico:</label>
                <textarea
                  id="diagnostico"
                  name="diagnostico"
                  value={formData.diagnostico}
                  onChange={handleInputChange}
                  placeholder="Descripción del diagnóstico..."
                  rows="4"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="medicamentos">Medicamentos:</label>
                <textarea
                  id="medicamentos"
                  name="medicamentos"
                  value={formData.medicamentos}
                  onChange={handleInputChange}
                  placeholder="Medicamentos prescritos..."
                  rows="4"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="observaciones">Observaciones Finales:</label>
                <textarea
                  id="observaciones"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  placeholder="Notas adicionales..."
                  rows="3"
                  disabled={loading}
                />
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
                  ← Volver
                </button>
                <button 
                  type="submit" 
                  disabled={loading || tieneDiagnostico}
                  className="btn-primary"
                >
                  {loading ? 'Registrando...' : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                        <path strokeNone d="M0 0h24v24H0z" fill="none"/>
                        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                      </svg>
                      <span>Registrar Diagnóstico</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
