import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { registrosMedicosAPI, expedientesAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './RegistrosMedicoPage.css'

export function RegistrosMedicoPage() {
  const { expedienteId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [registros, setRegistros] = useState([])
  const [expediente, setExpediente] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState('') // 'vitales', 'diagnostico' o ''

  useEffect(() => {
    cargarDatos()
  }, [expedienteId])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      // Cargar detalles del expediente
      const expResponse = await expedientesAPI.obtenerMio()
      setExpediente(expResponse.data)
      
      // Cargar registros médicos
      const regsResponse = await registrosMedicosAPI.listarPorExpediente(expedienteId)
      setRegistros(regsResponse.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar registros')
    } finally {
      setLoading(false)
    }
  }

  const registrosFiltrados = filtro 
    ? registros.filter(r => r.tipoRegistro?.toLowerCase() === filtro.toLowerCase())
    : registros

  const formatearFecha = (fecha) => {
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const puedoCrearRegistro = () => {
    return user?.rol === 'ROLE_ENFERMERA' || user?.rol === 'ROLE_MEDICA'
  }

  if (loading) return <div className="loading">Cargando registros médicos...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="registros-container">
      <div className="registros-header">
        <div>
          <h1>Registros Médicos</h1>
          {expediente && <p className="expediente-ref">Expediente #{expediente.id}</p>}
        </div>
        <button onClick={() => navigate('/expediente')} className="btn-back">
          ← Volver al Expediente
        </button>
      </div>

      <div className="registros-content">
        {/* Filtros */}
        <div className="filtros-section">
          <label htmlFor="filtro">Filtrar por tipo:</label>
          <select 
            id="filtro"
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
            className="filtro-select"
          >
            <option value="">Todos los registros</option>
            <option value="vitales">Signos Vitales</option>
            <option value="diagnostico">Diagnósticos</option>
          </select>
        </div>

        {/* Botón crear registro (solo para enfermera y médica) */}
        {puedoCrearRegistro() && (
          <div className="crear-registro-section">
            <button 
              onClick={() => navigate(`/crear-registro/${expedienteId}`)}
              className="btn-crear-registro"
            >
              {user?.rol === 'ROLE_ENFERMERA' ? '➕ Registrar Signos Vitales' : '➕ Registrar Diagnóstico'}
            </button>
          </div>
        )}

        {/* Lista de registros */}
        {registrosFiltrados.length === 0 ? (
          <div className="no-registros">
            <p>No hay registros médicos disponibles</p>
          </div>
        ) : (
          <div className="registros-list">
            {registrosFiltrados.map((registro) => (
              <div key={registro.id} className="registro-card">
                <div className="registro-header">
                  <div className="tipo-badge" style={{
                    backgroundColor: registro.tipoRegistro?.toLowerCase() === 'vitales' ? '#dbeafe' : '#fce7f3'
                  }}>
                    {registro.tipoRegistro}
                  </div>
                  <span className="fecha">{formatearFecha(registro.fechaRegistro)}</span>
                </div>

                <div className="registro-body">
                  {registro.tipoRegistro?.toLowerCase() === 'vitales' && (
                    <div className="vitales-info">
                      {registro.presionArterial && (
                        <div className="dato-item">
                          <span className="label">Presión Arterial:</span>
                          <span className="valor">{registro.presionArterial} mmHg</span>
                        </div>
                      )}
                      {registro.peso && (
                        <div className="dato-item">
                          <span className="label">Peso:</span>
                          <span className="valor">{registro.peso} kg</span>
                        </div>
                      )}
                      {registro.altura && (
                        <div className="dato-item">
                          <span className="label">Altura:</span>
                          <span className="valor">{registro.altura} cm</span>
                        </div>
                      )}
                    </div>
                  )}

                  {registro.tipoRegistro?.toLowerCase() === 'diagnostico' && (
                    <div className="diagnostico-info">
                      {registro.diagnostico && (
                        <div className="dato-item full-width">
                          <span className="label">Diagnóstico:</span>
                          <span className="valor">{registro.diagnostico}</span>
                        </div>
                      )}
                      {registro.medicamentos && (
                        <div className="dato-item full-width">
                          <span className="label">Medicamentos:</span>
                          <span className="valor">{registro.medicamentos}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {registro.observaciones && (
                    <div className="observaciones">
                      <span className="label">Observaciones:</span>
                      <p>{registro.observaciones}</p>
                    </div>
                  )}

                  <div className="registro-footer">
                    <span className="responsable">Registrado por: {registro.responsable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
