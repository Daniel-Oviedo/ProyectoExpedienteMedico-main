import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { registrosMedicosAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './CrearRegistroPage.css'

export function CrearRegistroPage() {
  const { expedienteId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const esEnfermera = user?.rol === 'ROLE_ENFERMERA'
  const esMedica = user?.rol === 'ROLE_MEDICA'
  const esPaciente = user?.rol === 'ROLE_PACIENTE'
  
  // Si es paciente, no puede crear registros
  if (esPaciente) {
    return (
      <div className="crear-registro-container">
        <div className="crear-registro-header">
          <h1>Crear Registro</h1>
          <button onClick={() => navigate(`/registros/${expedienteId}`)} className="btn-back">
            ← Volver
          </button>
        </div>
        <div className="crear-registro-card">
          <div className="error-message">
            ❌ Los pacientes no pueden crear registros médicos. Solo pueden visualizar su información.
          </div>
        </div>
      </div>
    )
  }
  
  const [tipoRegistro, setTipoRegistro] = useState(esEnfermera ? 'vitales' : 'diagnostico')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Formulario de signos vitales
  const [vitales, setVitales] = useState({
    presionArterial: '',
    peso: '',
    altura: '',
    observaciones: ''
  })

  // Formulario de diagnóstico
  const [diagnostico, setDiagnostico] = useState({
    diagnostico: '',
    medicamentos: '',
    observaciones: ''
  })

  const handleVitalesChange = (e) => {
    const { name, value } = e.target
    setVitales(prev => ({ ...prev, [name]: value }))
  }

  const handleDiagnosticoChange = (e) => {
    const { name, value } = e.target
    setDiagnostico(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitVitales = async (e) => {
    e.preventDefault()
    
    if (!vitales.presionArterial || !vitales.peso || !vitales.altura) {
      setError('Todos los campos marcados con * son requeridos')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      const data = {
        expedienteId: parseInt(expedienteId),
        tipoRegistro: 'vitales',
        presionArterial: vitales.presionArterial,
        peso: parseFloat(vitales.peso),
        altura: parseInt(vitales.altura),
        observaciones: vitales.observaciones
      }

      await registrosMedicosAPI.crear(data)
      setSuccess(true)
      
      setTimeout(() => {
        navigate(`/registros/${expedienteId}`)
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el registro')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitDiagnostico = async (e) => {
    e.preventDefault()
    
    if (!diagnostico.diagnostico) {
      setError('El diagnóstico es requerido')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      const data = {
        expedienteId: parseInt(expedienteId),
        tipoRegistro: 'diagnostico',
        diagnostico: diagnostico.diagnostico,
        medicamentos: diagnostico.medicamentos,
        observaciones: diagnostico.observaciones
      }

      await registrosMedicosAPI.crear(data)
      setSuccess(true)
      
      setTimeout(() => {
        navigate(`/registros/${expedienteId}`)
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="crear-registro-container">
      <div className="crear-registro-header">
        <h1>Crear Nuevo Registro Médico</h1>
        <button onClick={() => navigate(`/registros/${expedienteId}`)} className="btn-back">
          ← Cancelar
        </button>
      </div>

      <div className="crear-registro-card">
        {success && (
          <div className="success-message">
            ✓ Registro creado exitosamente. Redirigiendo...
          </div>
        )}

        {error && (
          <div className="error-message">{error}</div>
        )}

        {/* Mostrar tipo de registro según rol */}
        <div className="tipo-selector">
          <label>Tipo de Registro:</label>
          <div className="tipo-info">
            {esEnfermera && (
              <p className="tipo-badge-info">📊 Registrando Signos Vitales</p>
            )}
            {esMedica && (
              <p className="tipo-badge-info">📋 Registrando Diagnóstico</p>
            )}
          </div>
        </div>

        {/* Formulario de signos vitales - Solo para enfermera */}
        {tipoRegistro === 'vitales' && esEnfermera && (
          <form onSubmit={handleSubmitVitales} className="form-vitales">
            <h2>Registrar Signos Vitales</h2>

            <div className="form-group">
              <label htmlFor="presionArterial">Presión Arterial (mmHg) *</label>
              <input
                type="text"
                id="presionArterial"
                name="presionArterial"
                placeholder="Ej: 120/80"
                value={vitales.presionArterial}
                onChange={handleVitalesChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="peso">Peso (kg) *</label>
                <input
                  type="number"
                  id="peso"
                  name="peso"
                  placeholder="Ej: 75.5"
                  value={vitales.peso}
                  onChange={handleVitalesChange}
                  step="0.1"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="altura">Altura (cm) *</label>
                <input
                  type="number"
                  id="altura"
                  name="altura"
                  placeholder="Ej: 170"
                  value={vitales.altura}
                  onChange={handleVitalesChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="observaciones-vitales">Observaciones</label>
              <textarea
                id="observaciones-vitales"
                name="observaciones"
                placeholder="Notas adicionales..."
                value={vitales.observaciones}
                onChange={handleVitalesChange}
                rows="4"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate(`/registros/${expedienteId}`)}
                className="btn-cancel"
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Registro'}
              </button>
            </div>
          </form>
        )}

        {/* Formulario de diagnóstico - Solo para médica */}
        {tipoRegistro === 'diagnostico' && esMedica && (
          <form onSubmit={handleSubmitDiagnostico} className="form-diagnostico">
            <h2>Registrar Diagnóstico</h2>

            <div className="form-group">
              <label htmlFor="diagnostico">Diagnóstico *</label>
              <textarea
                id="diagnostico"
                name="diagnostico"
                placeholder="Escriba el diagnóstico aquí..."
                value={diagnostico.diagnostico}
                onChange={handleDiagnosticoChange}
                rows="5"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="medicamentos">Medicamentos Prescritos</label>
              <textarea
                id="medicamentos"
                name="medicamentos"
                placeholder="Escriba los medicamentos prescritos aquí..."
                value={diagnostico.medicamentos}
                onChange={handleDiagnosticoChange}
                rows="4"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="observaciones-diagnostico">Observaciones</label>
              <textarea
                id="observaciones-diagnostico"
                name="observaciones"
                placeholder="Notas adicionales..."
                value={diagnostico.observaciones}
                onChange={handleDiagnosticoChange}
                rows="3"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate(`/registros/${expedienteId}`)}
                className="btn-cancel"
                disabled={loading}
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Diagnóstico'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
