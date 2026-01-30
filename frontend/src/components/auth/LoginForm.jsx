import { Link } from 'react-router-dom'

export function LoginForm({ email, onEmailChange, password, onPasswordChange, onSubmit, loading, error }) {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sistema de Expediente Médico</h1>
        
        <form onSubmit={onSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="registro-link">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}
