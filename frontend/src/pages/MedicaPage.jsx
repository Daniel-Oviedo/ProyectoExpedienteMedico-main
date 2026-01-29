import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import './MedicaPage.css'

export function MedicaPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [step, setStep] = useState(1) // 1: menú, 2: pendientes, 3: diagnóstico, 4: historial, 5: ver historial
  const [expedientes, setExpedientes] = useState([])
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null)
  const [registros, setRegistros] = useState([])
  const [historicoCompleto, setHistoricoCompleto] = useState([])
  
  const [formData, setFormData] = useState({
    expedienteId: null,
    diagnostico: '',
    medicamentos: '',
    planSeguimiento: '',
    historiaClinica: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    setError('')
    try {
      const response = await api.get('/api/pacientes/sin-diagnostico')
      setExpedientes(response.data || [])
    } catch (err) {
      console.error('Error:', err)
      setError('Error al cargar expedientes')
    } finally {
      setLoading(false)
    }
  }

  const handleSeleccionarExpediente = async (paciente) => {
    setLoading(true)
    try {
      const expedienteResponse = await api.get(`/api/expedientes/paciente/${paciente.id}`)
      setExpedienteSeleccionado(expedienteResponse.data)
      
      const registrosResponse = await api.get(`/api/registros-medicos/expediente/${expedienteResponse.data.id}`)
      let registrosPendientes = (registrosResponse.data || []).filter(r => !r.diagnostico)
      registrosPendientes = registrosPendientes.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro)).slice(0, 1)
      setRegistros(registrosPendientes)
      
      setFormData(prev => ({
        ...prev,
        expedienteId: expedienteResponse.data.id
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
    try {
      const expedienteResponse = await api.get(`/api/expedientes/paciente/${paciente.id}`)
      setExpedienteSeleccionado(expedienteResponse.data)
      
      const registrosResponse = await api.get(`/api/registros-medicos/expediente/${expedienteResponse.data.id}`)
      setHistoricoCompleto(registrosResponse.data || [])
      
      setStep(5)
    } catch (err) {
      setError('Error al cargar historial')
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
      setError(err.response?.data?.message || 'Error al registrar')
    } finally {
      setLoading(false)
    }
  }

  const handleVolverHeader = () => {
    if (step === 1) {
      navigate('/dashboard')
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
        <h1>👩‍⚕️ Panel de Médica</h1>
        <p>Revisa expedientes y registra diagnósticos</p>
        <button onClick={handleVolverHeader} className="btn-back">← Volver</button>
      </div>

      <div className="medica-card">
        {step === 1 ? (
          <div className="paso-menu">
            <h2>¿Qué deseas hacer?</h2>
            <div className="menu-buttons">
              <button onClick={() => setStep(2)} className="menu-btn">
                <span className="icon">📋</span>
                <span className="text">Ver Expedientes Pendientes</span>
              </button>
              <button onClick={() => setStep(4)} className="menu-btn">
                <span className="icon">📚</span>
                <span className="text">Ver Historial de Pacientes</span>
              </button>
            </div>
          </div>
        ) : step === 2 ? (
          <div className="paso-expedientes">
            <h2>Expedientes Pendientes</h2>
            <button onClick={() => setStep(1)} className="btn-back">← Atrás</button>
            {loading ? (
              <p className="loading">⏳ Cargando...</p>
            ) : expedientes.length === 0 ? (
              <p className="no-data">No hay expedientes disponibles</p>
            ) : (
              <div className="expedientes-lista">
                {expedientes.map(paciente => (
                  <div key={paciente.id} className="expediente-item">
                    <div className="expediente-info">
                      <h3>👤 {paciente.nombre}</h3>
                      <p><strong>Cédula:</strong> {paciente.identificacion}</p>
                    </div>
                    <button onClick={() => handleSeleccionarExpediente(paciente)} disabled={loading} className="btn-seleccionar">
                      📋 Ver Expediente
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : step === 3 ? (
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
                </div>
              </div>
            )}

            {registros.length > 0 && (
              <div className="registros-section">
                <h3>📊 Información de la Consulta</h3>
                <div className="registros-grid">
                  {registros.map(registro => (
                    <div key={registro.id} className="registro-card">
                      {registro.observaciones && (
                        <>
                          <div className="registro-subseccion">
                            <h4>💬 Motivo de Consulta</h4>
                            <p>{registro.observaciones}</p>
                          </div>
                          <hr className="registro-divider" />
                        </>
                      )}
                      
                      <div className="registro-subseccion">
                        <h4>📈 Signos Vitales</h4>
                        <p><strong>Presión Arterial:</strong> {registro.presionArterial || 'N/A'}</p>
                        <p><strong>Peso:</strong> {registro.peso || 'N/A'} kg</p>
                        <p><strong>Altura:</strong> {registro.altura || 'N/A'} m</p>
                        <p><strong>Temperatura:</strong> {registro.temperatura ? `${registro.temperatura} °C` : 'N/A'}</p>
                        <p><strong>Saturación O₂:</strong> {registro.saturacionOxigeno ? `${registro.saturacionOxigeno} %` : 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleRegistrarDiagnostico}>
              <div className="form-group">
                <label>Historia Clínica:</label>
                <textarea name="historiaClinica" value={formData.historiaClinica} onChange={handleInputChange} placeholder="Antecedentes, alergias, condiciones previas..." rows="4" disabled={loading} />
              </div>

              <div className="form-group">
                <label>Impresión Diagnóstica:</label>
                <textarea name="diagnostico" value={formData.diagnostico} onChange={handleInputChange} placeholder="Descripción..." rows="4" required disabled={loading} />
              </div>

              <div className="form-group">
                <label>Medicamentos:</label>
                <textarea name="medicamentos" value={formData.medicamentos} onChange={handleInputChange} placeholder="Medicamentos..." rows="4" required disabled={loading} />
              </div>

              <div className="form-group">
                <label>Plan de Seguimiento:</label>
                <textarea name="planSeguimiento" value={formData.planSeguimiento} onChange={handleInputChange} placeholder="Notas..." rows="3" disabled={loading} />
              </div>

              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <div className="form-buttons">
                <button type="button" onClick={() => setStep(2)} disabled={loading} className="btn-secondary">← Volver</button>
                <button type="submit" disabled={loading || tieneDiagnostico} className="btn-primary">{loading ? 'Registrando...' : 'Registrar Diagnóstico'}</button>
              </div>
            </form>
          </div>
        ) : step === 4 ? (
          <div className="paso-historial">
            <h2>Historial de Pacientes Pendientes</h2>
            <button onClick={() => setStep(1)} className="btn-back">← Atrás</button>
            {loading ? (
              <p className="loading">⏳ Cargando...</p>
            ) : expedientes.length === 0 ? (
              <p className="no-data">No hay pacientes pendientes</p>
            ) : (
              <div className="pacientes-lista">
                {expedientes.map(paciente => (
                  <div key={paciente.id} className="paciente-item">
                    <div className="paciente-info">
                      <h3>👤 {paciente.nombre}</h3>
                      <p><strong>Cédula:</strong> {paciente.identificacion}</p>
                    </div>
                    <button onClick={() => handleVerHistorial(paciente)} disabled={loading} className="btn-seleccionar">📚 Ver Historial</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="paso-historial-detalle">
            <h2>Historial Médico</h2>
            <button onClick={() => setStep(4)} className="btn-back">← Atrás</button>
            {expedienteSeleccionado && <h3>👤 {expedienteSeleccionado.paciente.nombre}</h3>}
            {historicoCompleto.length === 0 ? (
              <p className="no-data">No hay registros</p>
            ) : (
              <div className="historial-completo">
                {(() => {
                  // Agrupar registros por fecha
                  const registrosPorFecha = {}
                  historicoCompleto.forEach(registro => {
                    const fecha = registro.fechaRegistro 
                      ? new Date(registro.fechaRegistro).toLocaleDateString('es-ES')
                      : 'Sin fecha'
                    
                    if (!registrosPorFecha[fecha]) {
                      registrosPorFecha[fecha] = []
                    }
                    registrosPorFecha[fecha].push(registro)
                  })
                  
                  return Object.entries(registrosPorFecha)
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([fecha, registros]) => (
                      <div key={fecha} className="registro-historial">
                        <div className="registro-fecha">
                          <h4>📅 {fecha}</h4>
                        </div>
                        
                        <div className="consultas-grid">
                          {registros.map((registro, idx) => (
                            <div key={registro.id} className="registro-contenido">
                              {registros.length > 1 && (
                                <div className="numero-consulta">
                                  <p><strong>Consulta #{idx + 1}</strong></p>
                                </div>
                              )}
                            
                            {registro.observaciones && (
                              <div className="registro-seccion">
                                <h5>💬 Motivo de Consulta</h5>
                                <p>{registro.observaciones}</p>
                              </div>
                            )}
                            
                            {(registro.presionArterial || registro.peso || registro.altura || registro.temperatura || registro.saturacionOxigeno) && (
                              <div className="registro-seccion">
                                <h5>📈 Signos Vitales</h5>
                                <div className="signos-vitales-grid">
                                  {registro.presionArterial && <p><strong>Presión:</strong> {registro.presionArterial}</p>}
                                  {registro.peso && <p><strong>Peso:</strong> {registro.peso} kg</p>}
                                  {registro.altura && <p><strong>Altura:</strong> {registro.altura} m</p>}
                                  {registro.temperatura && <p><strong>Temperatura:</strong> {registro.temperatura} °C</p>}
                                  {registro.saturacionOxigeno && <p><strong>Sat. O₂:</strong> {registro.saturacionOxigeno} %</p>}
                                </div>
                              </div>
                            )}
                            
                            {registro.diagnostico && (
                              <div className="registro-seccion">
                                <h5>🩺 Impresión Diagnóstica</h5>
                                <p>{registro.diagnostico}</p>
                              </div>
                            )}
                            
                            {registro.medicamentos && (
                              <div className="registro-seccion">
                                <h5>💊 Medicamentos</h5>
                                <p>{registro.medicamentos}</p>
                              </div>
                            )}
                            
                            {registro.planSeguimiento && (
                              <div className="registro-seccion">
                                <h5>📋 Plan de Seguimiento</h5>
                                <p>{registro.planSeguimiento}</p>
                              </div>
                            )}
                            
                            {registro.historiaClinica && (
                              <div className="registro-seccion">
                                <h5>📚 Historia Clínica</h5>
                                <p>{registro.historiaClinica}</p>
                              </div>
                            )}
                            
                            {idx < registros.length - 1 && <hr className="registro-divider" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
