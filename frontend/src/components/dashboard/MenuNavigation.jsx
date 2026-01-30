export function MenuNavigation({ user, onNavigate }) {
  return (
    <div className="menu-section">
      <h2 className="section-title">Opciones</h2>
      
      {user?.rol === 'ROLE_PACIENTE' && (
        <div className="card-menu">
          <button 
            onClick={() => onNavigate('/paciente')}
            className="menu-card-item"
          >
            <div className="card-icon">📋</div>
            <div className="card-content">
              <span className="card-title">Mi Expediente</span>
              <span className="card-subtitle">Ver tus registros médicos</span>
            </div>
            <div className="card-arrow">›</div>
          </button>
        </div>
      )}

      {user?.rol === 'ROLE_ENFERMERA' && (
        <div className="card-menu">
          <button 
            onClick={() => onNavigate('/enfermera')}
            className="menu-card-item"
          >
            <div className="card-icon">➕</div>
            <div className="card-content">
              <span className="card-title">Registrar Paciente</span>
              <span className="card-subtitle">Agregar nuevos pacientes</span>
            </div>
            <div className="card-arrow">›</div>
          </button>
        </div>
      )}

      {user?.rol === 'ROLE_MEDICA' && (
        <div className="card-menu">
          <button 
            onClick={() => onNavigate('/medica')}
            className="menu-card-item"
          >
            <div className="card-icon">👩‍⚕️</div>
            <div className="card-content">
              <span className="card-title">Registrar Diagnóstico</span>
              <span className="card-subtitle">Crear diagnóstico y medicamentos</span>
            </div>
            <div className="card-arrow">›</div>
          </button>
        </div>
      )}
    </div>
  )
}
