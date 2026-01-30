export function RegistroDiagnosticoSimpleForm({ diagnostico, onInputChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="form-registro">
      <h2>Registrar Diagnóstico</h2>

      <div className="form-group">
        <label htmlFor="diagnostico">Diagnóstico *</label>
        <textarea
          id="diagnostico"
          name="diagnostico"
          value={diagnostico.diagnostico}
          onChange={onInputChange}
          placeholder="Descripción del diagnóstico"
          rows="4"
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="medicamentos">Medicamentos</label>
        <textarea
          id="medicamentos"
          name="medicamentos"
          value={diagnostico.medicamentos}
          onChange={onInputChange}
          placeholder="Medicamentos prescritos"
          rows="4"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="observaciones">Observaciones</label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={diagnostico.observaciones}
          onChange={onInputChange}
          placeholder="Notas adicionales"
          rows="4"
          disabled={loading}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" disabled={loading} className="btn-submit">
        {loading ? 'Guardando...' : 'Guardar Diagnóstico'}
      </button>
    </form>
  )
}
