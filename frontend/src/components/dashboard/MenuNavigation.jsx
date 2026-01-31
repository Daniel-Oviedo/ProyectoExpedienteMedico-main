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
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-clipboard-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.997 4.17a3 3 0 0 1 2.003 2.83v12a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 2.003 -2.83a4 4 0 0 0 3.997 3.83h4a4 4 0 0 0 3.98 -3.597zm-2.997 10.83h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m-1 -9a2 2 0 1 1 0 4h-4a2 2 0 1 1 0 -4z" /></svg>
            </div>
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
