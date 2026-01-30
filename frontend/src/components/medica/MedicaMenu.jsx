export function MedicaMenu({ onNavigate }) {
  return (
    <div className="paso-menu">
      <h2>¿Qué deseas hacer?</h2>
      <div className="menu-buttons">
        <button onClick={() => onNavigate(2)} className="menu-btn">
          <span className="icon">📋</span>
          <span className="text">Ver Expedientes Pendientes</span>
        </button>
        <button onClick={() => onNavigate(4)} className="menu-btn">
          <span className="icon">📚</span>
          <span className="text">Ver Historial de Pacientes</span>
        </button>
      </div>
    </div>
  )
}
