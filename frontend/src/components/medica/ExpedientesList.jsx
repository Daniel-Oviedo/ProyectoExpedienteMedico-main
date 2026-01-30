export function ExpedientesList({ expedientes, loading, onSelect, onBack }) {
  return (
    <div className="paso-expedientes">
      <div className="lista-header">
        <h2>📋 Expedientes Pendientes</h2>
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
                <h3>👤 {paciente.nombre}</h3>
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
