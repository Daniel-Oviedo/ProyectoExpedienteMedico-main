export function BuscarPaciente({ cedula, onCedulaChange, onSubmit, loading, error }) {
  return (
    <form onSubmit={onSubmit} className="form-buscar">
      <h2>Buscar Paciente por Cédula</h2>
      
      <div className="form-group">
        <label htmlFor="cedula">Número de Cédula:</label>
        <input
          type="text"
          id="cedula"
          value={cedula}
          onChange={(e) => onCedulaChange(e.target.value)}
          placeholder="Ej: 1234567890"
          required
          disabled={loading}
        />
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? (
          <>
            <span>Buscando...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="button-icon">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" />
              <path d="M14 17.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
              <path d="M18.5 19.5l2.5 2.5" />
            </svg>
            <span>Buscar Paciente</span>
          </>
        )}
      </button>
    </form>
  )
}
