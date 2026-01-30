export function RegistroDetalle({ registro }) {
  return (
    <div>
      {/* Signos Vitales */}
      {(registro.presionArterial || registro.peso || registro.altura || registro.temperatura || registro.saturacionOxigeno) && (
        <div className="section">
          <h4>📈 Signos Vitales</h4>
          <div className="data-grid">
            {registro.presionArterial && (
              <div className="data-item">
                <label>Presión Arterial:</label>
                <span>{registro.presionArterial}</span>
              </div>
            )}
            {registro.peso && (
              <div className="data-item">
                <label>Peso:</label>
                <span>{registro.peso} kg</span>
              </div>
            )}
            {registro.altura && (
              <div className="data-item">
                <label>Altura:</label>
                <span>{registro.altura} cm</span>
              </div>
            )}
            {registro.temperatura && (
              <div className="data-item">
                <label>Temperatura:</label>
                <span>{registro.temperatura} °C</span>
              </div>
            )}
            {registro.saturacionOxigeno && (
              <div className="data-item">
                <label>Saturación O₂:</label>
                <span>{registro.saturacionOxigeno} %</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Motivo de Consulta */}
      {registro.observaciones && (
        <div className="section">
          <h4>💬 Motivo de Consulta</h4>
          <p className="observaciones-text">{registro.observaciones}</p>
        </div>
      )}

      {/* Impresión Diagnóstica */}
      {registro.diagnostico && (
        <div className="section">
          <h4>🩺 Impresión Diagnóstica</h4>
          <p className="diagnostico-text">{registro.diagnostico}</p>
        </div>
      )}

      {/* Medicamentos */}
      {registro.medicamentos && (
        <div className="section">
          <h4>💊 Medicamentos</h4>
          <p className="medicamentos-text">{registro.medicamentos}</p>
        </div>
      )}

      {/* Plan de Seguimiento */}
      {registro.planSeguimiento && (
        <div className="section">
          <h4>📋 Plan de Seguimiento</h4>
          <p className="planSeguimiento-text">{registro.planSeguimiento}</p>
        </div>
      )}

      {/* Historia Clínica */}
      {registro.historiaClinica && (
        <div className="section">
          <h4>📚 Historia Clínica</h4>
          <p className="historiaClinica-text">{registro.historiaClinica}</p>
        </div>
      )}
    </div>
  )
}
