import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { expedientesAPI } from '../services/api'
import './ExpedientePage.css'

export function ExpedientePage() {
  const [expediente, setExpediente] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    cargarExpediente()
  }, [])

  const cargarExpediente = async () => {
    try {
      setLoading(true)
      const response = await expedientesAPI.obtenerMio()
      setExpediente(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar expediente')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Cargando expediente...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="expediente-container">
      <div className="expediente-header">
        <h1>Mi Expediente Médico</h1>
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          ← Volver al Dashboard
        </button>
      </div>

      {expediente && (
        <div className="expediente-card">
          <div className="expediente-info">
            <h2>Detalles del Expediente</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>ID del Expediente:</label>
                <span>{expediente.id}</span>
              </div>
              <div className="info-item">
                <label>Estado:</label>
                <span className={`status ${expediente.estado.toLowerCase()}`}>
                  {expediente.estado}
                </span>
              </div>
              <div className="info-item">
                <label>Fecha de Creación:</label>
                <span>{new Date(expediente.fechaCreacion).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="info-item">
                <label>ID del Paciente:</label>
                <span>{expediente.pacienteId}</span>
              </div>
            </div>
          </div>

          <div className="expediente-actions">
            <button 
              onClick={() => navigate(`/registros/${expediente.id}`)}
              className="btn-primary"
            >
              📋 Ver Registros Médicos
            </button>
            {expediente.estado === 'ACTIVO' && (
              <button 
                onClick={() => navigate(`/crear-registro/${expediente.id}`)}
                className="btn-secondary"
              >
                ➕ Crear Nuevo Registro
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
