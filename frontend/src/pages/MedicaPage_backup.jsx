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
  const [todosPacientes, setTodosPacientes] = useState([])
  const [expedienteSeleccionado, setExpedienteSeleccionado] = useState(null)
  const [registros, setRegistros] = useState([])
  const [historicoCompleto, setHistoricoCompleto] = useState([])
  
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
    if (step === 2) {
      cargarExpedientes()
    } else if (step === 4) {
      cargarTodosPacientes()
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

  const cargarTodosPacientes = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.get('/api/pacientes')
      setTodosPacientes(response.data || [])
    } catch (err) {
      console.error('Error:', err)
      setError('Error al cargar pacientes')
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
          observaciones: ''
        })
        cargarExpedientes()
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar')
    } finally {
      setLoading(false)
    }
  }

  const handleVolver = () => {
    setStep(2)
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
                <h3>📊 Signos Vitales</h3>
                <div className="registros-grid">
                  {registros.map(registro => (
                    <div key={registro.id} className="registro-card">
                      <p><strong>Presión Arterial:</strong> {registro.presionArterial || 'N/A'}</p>
                      <p><strong>Peso:</strong> {registro.peso || 'N/A'} kg</p>
                      <p><strong>Altura:</strong> {registro.altura || 'N/A'} m</p>
                      <p><strong>Temperatura:</strong> {registro.temperatura ? `${registro.temperatura} °C` : 'N/A'}</p>
                      <p><strong>Saturación O₂:</strong> {registro.saturacionOxigeno ? `${registro.saturacionOxigeno} %` : 'N/A'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleRegistrarDiagnostico}>
              <div className="form-group">
                <label>Diagnóstico:</label>
                <textarea name="diagnostico" value={formData.diagnostico} onChange={handleInputChange} placeholder="Descripción..." rows="4" required disabled={loading} />
              </div>

              <div className="form-group">
                <label>Medicamentos:</label>
                <textarea name="medicamentos" value={formData.medicamentos} onChange={handleInputChange} placeholder="Medicamentos..." rows="4" required disabled={loading} />
              </div>

              <div className="form-group">
                <label>Observaciones:</label>
                <textarea name="observaciones" value={formData.observaciones} onChange={handleInputChange} placeholder="Notas..." rows="3" disabled={loading} />
              </div>

              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <div className="form-buttons">
                <button type="button" onClick={handleVolver} disabled={loading} className="btn-secondary">← Volver</button>
                <button type="submit" disabled={loading || tieneDiagnostico} className="btn-primary">{loading ? 'Registrando...' : 'Registrar Diagnóstico'}</button>
              </div>
            </form>
          </div>
        ) : step === 4 ? (
          <div className="paso-historial">
            <h2>Historial de Pacientes</h2>
            <button onClick={() => setStep(1)} className="btn-back">← Atrás</button>
            {loading ? (
              <p className="loading">⏳ Cargando...</p>
            ) : todosPacientes.length === 0 ? (
              <p className="no-data">No hay pacientes</p>
            ) : (
              <div className="pacientes-lista">
                {todosPacientes.map(paciente => (
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
                {historicoCompleto.map((registro, idx) => (
                  <div key={registro.id} className="registro-historial">
                    <h4>Registro #{idx + 1}</h4>
                    {registro.presionArterial && <p><strong>Presión:</strong> {registro.presionArterial}</p>}
                    {registro.peso && <p><strong>Peso:</strong> {registro.peso} kg</p>}
                    {registro.altura && <p><strong>Altura:</strong> {registro.altura} m</p>}
                    {registro.temperatura && <p><strong>Temperatura:</strong> {registro.temperatura} °C</p>}
                    {registro.saturacionOxigeno && <p><strong>Sat. O₂:</strong> {registro.saturacionOxigeno} %</p>}
                    {registro.diagnostico && <p><strong>Diagnóstico:</strong> {registro.diagnostico}</p>}
                    {registro.medicamentos && <p><strong>Medicamentos:</strong> {registro.medicamentos}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
