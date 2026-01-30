export function RegistrosList({ registros, formatearFecha }) {
  if (registros.length === 0) {
    return <div className="no-registros">No hay registros médicos</div>
  }

  return (
    <div className="registros-list">
      {registros.map((registro) => (
        <div key={registro.id} className="registro-item">
          <div className="registro-header">
            <span className="tipo-badge">{registro.tipoRegistro?.toUpperCase()}</span>
            <span className="fecha">{formatearFecha(registro.fechaRegistro)}</span>
          </div>
          
          <div className="registro-contenido">
            {registro.presionArterial && (
              <div className="data-line">
                <span className="label">Presión:</span>
                <span>{registro.presionArterial}</span>
              </div>
            )}
            {registro.peso && (
              <div className="data-line">
                <span className="label">Peso:</span>
                <span>{registro.peso} kg</span>
              </div>
            )}
            {registro.diagnostico && (
              <div className="data-line">
                <span className="label">Diagnóstico:</span>
                <span>{registro.diagnostico}</span>
              </div>
            )}
            {registro.observaciones && (
              <div className="data-line">
                <span className="label">Observaciones:</span>
                <span>{registro.observaciones}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
