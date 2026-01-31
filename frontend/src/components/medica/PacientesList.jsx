export function PacientesList({ expedientes, loading, onSelectHistorial, onBack }) {
  return (
    <div className="paso-historial">
      <div className="lista-header">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-folders"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a1 1 0 0 1 .707 .293l1.708 1.707h4.585a3 3 0 0 1 2.995 2.824l.005 .176v7a3 3 0 0 1 -3 3h-1v1a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h1v-1a3 3 0 0 1 3 -3zm-6 6h-1a1 1 0 0 0 -1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1 -1v-1h-7a3 3 0 0 1 -3 -3z" /></svg>
          Historial de Pacientes
        </h2>
        <button onClick={onBack} className="btn-back">← Atrás</button>
      </div>
      
      {loading ? (
        <p className="loading">⏳ Cargando...</p>
      ) : expedientes.length === 0 ? (
        <p className="no-data">No hay pacientes disponibles</p>
      ) : (
        <div className="pacientes-lista">
          {expedientes.map(paciente => (
            <div 
              key={paciente.id} 
              className="paciente-item"
              onClick={() => onSelectHistorial(paciente)}
              role="button"
              tabIndex={0}
            >
              <div className="paciente-info">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                  {paciente.nombre}
                </h3>
                <p><strong>Cédula:</strong> {paciente.identificacion}</p>
              </div>
              <div className="paciente-action">
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
