import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './DashboardPage.css'

export function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Bienvenido, {user?.nombre}</h1>
          <span className={`role-badge role-${user?.rol?.toLowerCase().replace('role_', '')}`}>
            {user?.rol?.replace('ROLE_', '')}
          </span>
        </div>
        <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
      </div>

      <div className="dashboard-content">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="profile-icon">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
            <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
            </svg>
            <h2>Tu Perfil</h2>
          </div>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Nombre</span>
              <span className="info-value">{user?.nombre}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu - EDUS Style Cards */}
        <div className="menu-section">
          <h2 className="section-title">Opciones</h2>
          
          {user?.rol === 'ROLE_PACIENTE' && (
            <div className="card-menu">
              <button 
                onClick={() => navigate('/paciente')}
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
                onClick={() => navigate('/enfermera')}
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
                onClick={() => navigate('/medica')}
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
      </div>
    </div>
  )
}
