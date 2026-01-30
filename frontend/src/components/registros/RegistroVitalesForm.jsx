export function RegistroVitalesForm({ vitales, onInputChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="form-registro">
      <h2>Registrar Signos Vitales</h2>

      <div className="form-group">
        <label htmlFor="presionArterial">Presión Arterial *</label>
        <input
          type="text"
          id="presionArterial"
          name="presionArterial"
          value={vitales.presionArterial}
          onChange={onInputChange}
          placeholder="Ej: 120/80"
          disabled={loading}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="peso">Peso (kg) *</label>
          <input
            type="number"
            id="peso"
            name="peso"
            value={vitales.peso}
            onChange={onInputChange}
            placeholder="75.5"
            step="0.1"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="altura">Altura (cm) *</label>
          <input
            type="number"
            id="altura"
            name="altura"
            value={vitales.altura}
            onChange={onInputChange}
            placeholder="175"
            step="1"
            disabled={loading}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="observaciones">Observaciones</label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={vitales.observaciones}
          onChange={onInputChange}
          placeholder="Notas adicionales"
          rows="4"
          disabled={loading}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Guardando...' : 'Guardar Signos Vitales'}
      </button>
    </form>
  )
}
