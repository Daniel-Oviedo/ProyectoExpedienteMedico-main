export function AccessDenied() {
  return (
    <div className="crear-registro-container">
      <div className="crear-registro-header">
        <h1>Crear Registro</h1>
      </div>
      <div className="crear-registro-card">
        <div className="error-message">
          ❌ Los pacientes no pueden crear registros médicos. Solo pueden visualizar su información.
        </div>
      </div>
    </div>
  )
}
