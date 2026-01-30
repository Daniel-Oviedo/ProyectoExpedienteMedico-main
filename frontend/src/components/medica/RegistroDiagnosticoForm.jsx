export function RegistroDiagnosticoForm({ 
  formData, 
  onInputChange, 
  onSubmit, 
  onBack, 
  loading, 
  error, 
  success 
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Historia Clínica:</label>
        <textarea 
          name="historiaClinica" 
          value={formData.historiaClinica} 
          onChange={onInputChange} 
          placeholder="Antecedentes, alergias, condiciones previas..." 
          rows="4" 
          disabled={loading} 
        />
      </div>

      <div className="form-group">
        <label>Impresión Diagnóstica:</label>
        <textarea 
          name="diagnostico" 
          value={formData.diagnostico} 
          onChange={onInputChange} 
          placeholder="Descripción..." 
          rows="4" 
          required 
          disabled={loading} 
        />
      </div>

      <div className="form-group">
        <label>Medicamentos:</label>
        <textarea 
          name="medicamentos" 
          value={formData.medicamentos} 
          onChange={onInputChange} 
          placeholder="Medicamentos..." 
          rows="4" 
          required 
          disabled={loading} 
        />
      </div>

      <div className="form-group">
        <label>Plan de Seguimiento:</label>
        <textarea 
          name="planSeguimiento" 
          value={formData.planSeguimiento} 
          onChange={onInputChange} 
          placeholder="Notas..." 
          rows="3" 
          disabled={loading} 
        />
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
          ← Volver
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Registrando...' : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .358 8.283 3.864 8.479 8.651l.005 .312l.005 .147l.003 .457l.001 .553l-.003 .552l-.005 .306c-.233 4.776 -3.707 8.271 -8.479 8.644l-.553 .046l-.579 .034l-.299 .013l-.616 .017l-.318 .004l-.324 .001h-.324l-.318 -.004l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.358 -8.283 -3.864 -8.479 -8.651l-.005 -.312l-.005 -.147l-.003 -.457l-.001 -.553l.003 -.552l.005 -.306c.233 -4.776 3.707 -8.271 8.479 -8.644l.553 -.046l.579 -.034l.299 -.013l.616 -.017l.318 -.004l.324 -.001h.324m0 3h-7l.005 1.662l-.003 1.338l.006 .5l.008 .5l.009 .5l.013 .5l.015 1.5l.001 .5l.002 .5l.003 .5l.004 .5l7 -.006l-.004 -.5l-.004 -.5l.002 -.5l-.001 -.5l-.015 -1.5l-.013 -.5l-.009 -.5l-.008 -.5l-.006 -.5l.003 -1.338l-.005 -1.662z"/>
              </svg>
              <span>Registrar Diagnóstico</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
