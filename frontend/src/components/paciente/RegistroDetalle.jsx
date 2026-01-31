export function RegistroDetalle({ registro }) {
  return (
    <div>
      {/* Signos Vitales */}
      {(registro.presionArterial || registro.peso || registro.altura || registro.temperatura || registro.saturacionOxigeno) && (
        <div className="section">
          <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /><path d="M11.993 16.75l2.747 -2.815a1.9 1.9 0 0 0 0 -2.632a1.775 1.775 0 0 0 -2.56 0l-.183 .188l-.183 -.189a1.775 1.775 0 0 0 -2.56 0a1.899 1.899 0 0 0 0 2.632l2.738 2.825l.001 -.009" /></svg>
            Signos Vitales
          </h4>
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
          <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-bubble-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.4 2l.253 .005a6.34 6.34 0 0 1 5.235 3.166l.089 .163l.178 .039a6.33 6.33 0 0 1 4.254 3.406l.105 .228a6.334 6.334 0 0 1 -5.74 8.865l-.144 -.002l-.037 .052a5.26 5.26 0 0 1 -5.458 1.926l-.186 -.051l-3.435 2.06a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2.435l-.055 -.026a3.67 3.67 0 0 1 -1.554 -1.498l-.102 -.199a3.67 3.67 0 0 1 -.312 -2.14l.038 -.21l-.116 -.092a5.8 5.8 0 0 1 -1.887 -6.025l.071 -.238a5.8 5.8 0 0 1 5.42 -4.004h.157l.15 -.165a6.33 6.33 0 0 1 4.33 -1.963zm1.6 11h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0 -2m3 -4h-10a1 1 0 1 0 0 2h10a1 1 0 0 0 0 -2" /></svg>
            Motivo de Consulta
          </h4>
          <p className="observaciones-text">{registro.observaciones}</p>
        </div>
      )}

      {/* Impresión Diagnóstica */}
      {registro.diagnostico && (
        <div className="section">
          <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-stethoscope"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 4h-1a2 2 0 0 0 -2 2v3.5a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" /><path d="M8 15a6 6 0 1 0 12 0v-3" /><path d="M11 3v2" /><path d="M6 3v2" /><path d="M18 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>
            Impresión Diagnóstica
          </h4>
          <p className="diagnostico-text">{registro.diagnostico}</p>
        </div>
      )}

      {/* Medicamentos */}
      {registro.medicamentos && (
        <div className="section">
          <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-pill"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.207 3.793a5.95 5.95 0 0 1 0 8.414l-8 8a5.95 5.95 0 0 1 -8.414 -8.414l8 -8a5.95 5.95 0 0 1 8.414 0m-7 1.414l-4.294 4.293l5.586 5.586l4.294 -4.292a3.95 3.95 0 1 0 -5.586 -5.586" /></svg>
            Medicamentos
          </h4>
          <p className="medicamentos-text">{registro.medicamentos}</p>
        </div>
      )}

      {/* Plan de Seguimiento */}
      {registro.planSeguimiento && (
        <div className="section">
          <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clipboard-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.997 4.17a3 3 0 0 1 2.003 2.83v12a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 2.003 -2.83a4 4 0 0 0 3.997 3.83h4a4 4 0 0 0 3.98 -3.597zm-2.997 10.83h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m-1 -9a2 2 0 1 1 0 4h-4a2 2 0 1 1 0 -4z" /></svg>
            Plan de Seguimiento
          </h4>
          <p className="planSeguimiento-text">{registro.planSeguimiento}</p>
        </div>
      )}

      {/* Historia Clínica */}
      {registro.historiaClinica && (
        <div className="section">
          <h4>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-folders"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a1 1 0 0 1 .707 .293l1.708 1.707h4.585a3 3 0 0 1 2.995 2.824l.005 .176v7a3 3 0 0 1 -3 3h-1v1a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-9a3 3 0 0 1 3 -3h1v-1a3 3 0 0 1 3 -3zm-6 6h-1a1 1 0 0 0 -1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1 -1v-1h-7a3 3 0 0 1 -3 -3z" /></svg>
            Historia Clínica
          </h4>
          <p className="historiaClinica-text">{registro.historiaClinica}</p>
        </div>
      )}
    </div>
  )
}
