export function RegistroContenido({ registro, idx, registros }) {
  return (
    <div className="registro-contenido">
      {registros.length > 1 && (
        <div className="numero-consulta">
          <p><strong>Consulta #{idx + 1}</strong></p>
        </div>
      )}
      
      {registro.observaciones && (
        <div className="registro-seccion">
          <h5>💬 Motivo de Consulta</h5>
          <p>{registro.observaciones}</p>
        </div>
      )}
      
      {(registro.presionArterial || registro.peso || registro.altura || registro.temperatura || registro.saturacionOxigeno) && (
        <div className="registro-seccion">
          <h5>📈 Signos Vitales</h5>
          <div className="signos-vitales-grid">
            {registro.presionArterial && <p><strong>Presión:</strong> {registro.presionArterial}</p>}
            {registro.peso && <p><strong>Peso:</strong> {registro.peso} kg</p>}
            {registro.altura && <p><strong>Altura:</strong> {registro.altura} m</p>}
            {registro.temperatura && <p><strong>Temperatura:</strong> {registro.temperatura} °C</p>}
            {registro.saturacionOxigeno && <p><strong>Sat. O₂:</strong> {registro.saturacionOxigeno} %</p>}
          </div>
        </div>
      )}
      
      {registro.diagnostico && (
        <div className="registro-seccion">
          <h5>🩺 Impresión Diagnóstica</h5>
          <p>{registro.diagnostico}</p>
        </div>
      )}
      
      {registro.medicamentos && (
        <div className="registro-seccion">
          <h5>💊 Medicamentos</h5>
          <p>{registro.medicamentos}</p>
        </div>
      )}
      
      {registro.planSeguimiento && (
        <div className="registro-seccion">
          <h5>📋 Plan de Seguimiento</h5>
          <p>{registro.planSeguimiento}</p>
        </div>
      )}
      
      {registro.historiaClinica && (
        <div className="registro-seccion">
          <h5>📚 Historia Clínica</h5>
          <p>{registro.historiaClinica}</p>
        </div>
      )}
      
      {idx < registros.length - 1 && <hr className="registro-divider" />}
    </div>
  )
}
