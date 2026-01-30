export function InfoPaciente({ paciente, expediente, user }) {
  return (
    <div className="patient-info-card">
      <h2>👤 Información Personal</h2>
      <div className="info-grid">
        <div className="info-item">
          <label>Nombre:</label>
          <span>{paciente?.nombre || user?.nombre}</span>
        </div>
        <div className="info-item">
          <label>Cédula:</label>
          <span>{paciente?.identificacion}</span>
        </div>
        <div className="info-item">
          <label>Fecha de Nacimiento:</label>
          <span>
            {paciente?.fechaNacimiento 
              ? new Date(paciente.fechaNacimiento).toLocaleDateString('es-ES')
              : 'N/A'}
          </span>
        </div>
        <div className="info-item">
          <label>Estado del Expediente:</label>
          <span className="estado-badge">{expediente.estado}</span>
        </div>
      </div>
    </div>
  )
}
