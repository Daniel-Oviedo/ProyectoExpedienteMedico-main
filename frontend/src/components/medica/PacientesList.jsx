export function PacientesList({ expedientes, loading, onSelectHistorial, onBack }) {
  return (
    <div className="paso-historial">
      <div className="lista-header">
        <h2>📚 Historial de Pacientes</h2>
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
                <h3>👤 {paciente.nombre}</h3>
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
