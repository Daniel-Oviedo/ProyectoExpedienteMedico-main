import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import './PacientePage.css'

export function PacientePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [paciente, setPaciente] = useState(null)
  const [expediente, setExpediente] = useState(null)
  const [registros, setRegistros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarExpediente()
  }, [user])

  const agruparRegistrosPorConsulta = (registros) => {
    // Agrupar por fecha (día completo)
    const agrupados = {}
    
    registros.forEach(registro => {
      const fecha = registro.fechaRegistro 
        ? new Date(registro.fechaRegistro).toLocaleDateString('es-ES')
        : 'Sin fecha'
      
      if (!agrupados[fecha]) {
        agrupados[fecha] = []
      }
      agrupados[fecha].push(registro)
    })

    // Convertir a array de consultas
    return Object.entries(agrupados).map(([fecha, regs]) => ({
      fecha,
      registros: regs
    }))
  }

  const cargarExpediente = async () => {
    setLoading(true)
    try {
      // Obtener expediente del paciente autenticado
      const response = await api.get('/api/expedientes/mio')
      setExpediente(response.data)

      // Si existe expediente, obtener registros médicos
      if (response.data && response.data.id) {
        const registrosResponse = await api.get(`/api/registros-medicos/expediente/${response.data.id}`)
        setRegistros(registrosResponse.data || [])

        // Obtener datos del paciente
        if (response.data.paciente) {
          setPaciente(response.data.paciente)
        }
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError('📋 Aún no tienes expediente. La enfermera debe registrarte primero buscando tu cédula y registrando tus signos vitales.')
      } else if (err.response?.status === 403) {
        setError('⚠️ No tienes acceso. Verifica que hayas iniciado sesión como paciente.')
      } else {
        setError(err.response?.data?.message || 'Error al cargar expediente')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="paciente-container">
        <div className="loading">⏳ Cargando expediente...</div>
      </div>
    )
  }

  return (
    <div className="paciente-container">
      <div className="paciente-header">
        <h1>Mi Expediente Médico</h1>
        <div className="header-buttons">
          <button className="btn-back" onClick={() => navigate('/dashboard')}>Volver</button>
          <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      {error && <div className="alert alert-warning">{error}</div>}

      {expediente && (
        <div className="expediente-section">
          <div className="patient-info-card">
            <h2>👤 Información Personal</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Nombre:</label>
                <span>{paciente?.nombre || user?.nombre}</span>
              </div>
              <div className="info-item">
                <label>Cédula:</label>
                <span>{paciente?.identificacion}</span>
              </div>
              <div className="info-item">
                <label>Fecha de Nacimiento:</label>
                <span>
                  {paciente?.fechaNacimiento 
                    ? new Date(paciente.fechaNacimiento).toLocaleDateString('es-ES')
                    : 'N/A'}
                </span>
              </div>
              <div className="info-item">
                <label>Estado del Expediente:</label>
                <span className="estado-badge">{expediente.estado}</span>
              </div>
            </div>
          </div>

          <div className="registros-section">
            <h2>📊 Historial Médico</h2>
            
            {registros.length === 0 ? (
              <div className="no-records">
                <p>No hay registros médicos aún.</p>
              </div>
            ) : (
              <div className="registros-list">
                {agruparRegistrosPorConsulta(registros).map((consulta, consultaIdx) => (
                  <div key={consultaIdx} className="registro-card">
                    <div className="registro-header">
                      <h3>Consulta #{consultaIdx + 1}</h3>
                      <span className="fecha">{consulta.fecha}</span>
                    </div>

                    {/* Mostrar todos los registros de esta consulta */}
                    {consulta.registros.map((registro) => (
                      <div key={registro.id}>
                        {/* Signos Vitales */}
                        {(registro.presionArterial || registro.peso || registro.altura || registro.temperatura || registro.saturacionOxigeno) && (
                          <div className="section">
                            <h4>📈 Signos Vitales</h4>
                            <div className="data-grid">
                              {registro.presionArterial && (
                                <div className="data-item">
                                  <label>Presión Arterial:</label>
                                  <span>{registro.presionArterial}</span>
                                </div>
                              )}
                              {registro.peso && (
                                <div className="data-item">
                                  <label>Peso:</label>
                                  <span>{registro.peso} kg</span>
                                </div>
                              )}
                              {registro.altura && (
                                <div className="data-item">
                                  <label>Altura:</label>
                                  <span>{registro.altura} cm</span>
                                </div>
                              )}
                              {registro.temperatura && (
                                <div className="data-item">
                                  <label>Temperatura:</label>
                                  <span>{registro.temperatura} °C</span>
                                </div>
                              )}
                              {registro.saturacionOxigeno && (
                                <div className="data-item">
                                  <label>Saturación O₂:</label>
                                  <span>{registro.saturacionOxigeno} %</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Diagnóstico */}
                        {registro.diagnostico && (
                          <div className="section">
                            <h4>🩺 Diagnóstico</h4>
                            <p className="diagnostico-text">{registro.diagnostico}</p>
                          </div>
                        )}

                        {/* Medicamentos */}
                        {registro.medicamentos && (
                          <div className="section">
                            <h4>💊 Medicamentos</h4>
                            <p className="medicamentos-text">{registro.medicamentos}</p>
                          </div>
                        )}

                        {/* Observaciones */}
                        {registro.observaciones && (
                          <div className="section">
                            <h4>📝 Observaciones</h4>
                            <p className="observaciones-text">{registro.observaciones}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {!expediente && !error && (
        <div className="no-expediente">
          <p>No se pudo cargar tu expediente.</p>
        </div>
      )}
    </div>
  )
}
