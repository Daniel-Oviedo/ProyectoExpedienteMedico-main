export function RegistrarVitales({ usuario, formData, onInputChange, onSubmit, onBack, loading, error, success }) {
  return (
    <form onSubmit={onSubmit} className="form-registrar">
      <h2>Paso 2: Completar Datos del Paciente</h2>
      
      {usuario && (
        <div className="usuario-info">
          <div className="info-item">
            <span className="label">👤 Nombre:</span>
            <span className="value">{usuario.nombre}</span>
          </div>
          <div className="info-item">
            <span className="label">📧 Email:</span>
            <span className="value">{usuario.email}</span>
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            onChange={onInputChange}
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
          onClick={onBack} 
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
  )
}
