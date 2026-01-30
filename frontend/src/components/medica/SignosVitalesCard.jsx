export function SignosVitalesCard({ registro }) {
  return (
    <div className="registro-card">
      {registro.observaciones && (
        <>
          <div className="registro-subseccion">
            <h4>💬 Motivo de Consulta</h4>
            <p>{registro.observaciones}</p>
          </div>
          <hr className="registro-divider" />
        </>
      )}
      
      <div className="registro-subseccion">
        <h4>📈 Signos Vitales</h4>
        <p><strong>Presión Arterial:</strong> {registro.presionArterial || 'N/A'}</p>
        <p><strong>Peso:</strong> {registro.peso || 'N/A'} kg</p>
        <p><strong>Altura:</strong> {registro.altura || 'N/A'} m</p>
        <p><strong>Temperatura:</strong> {registro.temperatura ? `${registro.temperatura} °C` : 'N/A'}</p>
        <p><strong>Saturación O₂:</strong> {registro.saturacionOxigeno ? `${registro.saturacionOxigeno} %` : 'N/A'}</p>
      </div>
    </div>
  )
}
