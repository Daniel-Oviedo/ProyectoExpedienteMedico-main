import { Link } from 'react-router-dom'

export function RegistroForm({ formData, onInputChange, onSubmit, loading, error, success }) {
  return (
    <div className="registro-container">
      <div className="registro-card">
        <div className="registro-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header-icon">
            <path strokeNone d="M0 0h24v24H0z" fill="none"/>
            <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
            <path d="M4 16v2a2 2 0 0 0 2 2h2" />
            <path d="M16 4h2a2 2 0 0 1 2 2v2" />
            <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
            <path d="M8 12a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1l0 -3" />
            <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
          </svg>
          <h1>Registro de Paciente</h1>
        </div>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="cedula">Cédula:</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={onInputChange}
              placeholder="Ej: 1234567890"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={onInputChange}
              placeholder="Ej: Juan Pérez"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              placeholder="Ej: juan@correo.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              placeholder="Contraseña segura"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={onInputChange}
              placeholder="Confirma tu contraseña"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-registro">
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  )
}
