import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import './RegistroPage.css'

export function RegistroPage() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validaciones
    if (!formData.cedula.trim()) {
      setError('La cédula es requerida')
      return
    }
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido')
      return
    }
    if (!formData.email.trim()) {
      setError('El email es requerido')
      return
    }
    if (!formData.password.trim()) {
      setError('La contraseña es requerida')
      return
    }
    if (formData.password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres')
      return
    }
    if (formData.password !== formData.confirmarPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    try {
      await api.post('/auth/registro', {
        cedula: formData.cedula,
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        rolId: 1 // PACIENTE role ID = 1
      })

      setSuccess('Registro exitoso. Redirigiendo a login...')
      
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse. Verifica los datos.')
    } finally {
      setLoading(false)
    }
  }

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

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cedula">Cédula:</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={formData.cedula}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              placeholder="Repite la contraseña"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Registrando...' : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                  <path strokeNone d="M0 0h24v24H0z" fill="none"/>
                  <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                </svg>
                Registrarse
              </>
            )}
          </button>
        </form>

        <p className="link-text">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  )
}
