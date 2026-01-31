export function ExpedientesList({ expedientes, loading, onSelect, onBack }) {
  return (
    <div className="paso-expedientes">
      <div className="lista-header">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clipboard-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.997 4.17a3 3 0 0 1 2.003 2.83v12a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 2.003 -2.83a4 4 0 0 0 3.997 3.83h4a4 4 0 0 0 3.98 -3.597zm-2.997 10.83h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m-1 -9a2 2 0 1 1 0 4h-4a2 2 0 1 1 0 -4z" /></svg>
          Expedientes Pendientes
        </h2>
        <button onClick={onBack} className="btn-back">← Atrás</button>
      </div>
      
      {loading ? (
        <p className="loading">⏳ Cargando...</p>
      ) : expedientes.length === 0 ? (
        <p className="no-data">No hay expedientes disponibles</p>
      ) : (
        <div className="expedientes-lista">
          {expedientes.map(paciente => (
            <div 
              key={paciente.id} 
              className="expediente-item"
              onClick={() => onSelect(paciente)}
              role="button"
              tabIndex={0}
            >
              <div className="expediente-info">
                <h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                  {paciente.nombre}
                </h3>
                <p><strong>Cédula:</strong> {paciente.identificacion}</p>
              </div>
              <div className="expediente-action">
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
