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
        <h1>Bienvenido, {user?.nombre}</h1>
        <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
      </div>

      <div className="dashboard-content">
        <div className="profile-card">
          <h2>Tu Perfil</h2>
          <div className="profile-info">
            <p><strong>Nombre:</strong> {user?.nombre}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Rol:</strong> <span className={`role ${user?.rol?.toLowerCase()}`}>{user?.rol}</span></p>
          </div>
        </div>

        <div className="menu-card">
          <h2>Opciones</h2>
          <nav className="dashboard-nav">
            {user?.rol === 'ROLE_PACIENTE' && (
              <>
                <button 
                  onClick={() => navigate('/expediente')}
                  className="nav-btn"
                >
                  📋 Mi Expediente
                </button>
                <p className="nav-info">👁️ Solo lectura - Visualiza tus registros médicos, diagnósticos y medicamentos prescritos</p>
              </>
            )}
            {user?.rol === 'ROLE_ENFERMERA' && (
              <>
                <button 
                  onClick={() => navigate('/enfermera')}
                  className="nav-btn btn-action"
                >
                  ➕ Registrar Nuevo Paciente
                </button>
                <button 
                  onClick={() => navigate('/expediente')}
                  className="nav-btn"
                >
                  📋 Ver Expediente del Paciente
                </button>
                <p className="nav-info">✏️ Registra: Fecha de nacimiento, signos vitales (presión, peso, altura) y observaciones</p>
              </>
            )}
            {user?.rol === 'ROLE_MEDICA' && (
              <>
                <button 
                  onClick={() => navigate('/medica')}
                  className="nav-btn btn-action"
                >
                  👩‍⚕️ Registrar Diagnóstico
                </button>
                <button 
                  onClick={() => navigate('/expediente')}
                  className="nav-btn"
                >
                  📋 Ver Expediente del Paciente
                </button>
                <p className="nav-info">✏️ Revisa los signos vitales y registra: Diagnóstico, Medicamentos y Observaciones</p>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
