export function CrearRegistroButton({ expedienteId, user, onClick }) {
  const puedoCrear = user?.rol === 'ROLE_ENFERMERA' || user?.rol === 'ROLE_MEDICA'
  
  if (!puedoCrear) return null
  
  return (
    <div className="crear-registro-section">
      <button 
        onClick={onClick}
        className="btn-crear-registro"
      >
        {user?.rol === 'ROLE_ENFERMERA' ? '➕ Registrar Signos Vitales' : '➕ Registrar Diagnóstico'}
      </button>
    </div>
  )
}
