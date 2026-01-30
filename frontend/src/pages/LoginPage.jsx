import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFormValidation } from '../hooks'
import { Input, Button, Card, Alert } from '../components/ui'
import { MESSAGES, ROUTES, buildRoute } from '../constants'
import { esEmailValido } from '../utils'
import '../styles/pages/LoginPage.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldError
  } = useFormValidation(
    { email: '', password: '' },
    async (data) => {
      try {
        await login(data.email, data.password)
        navigate(ROUTES.DASHBOARD)
      } catch (err) {
        setFieldError('email', err.message || MESSAGES.ERROR_LOGIN)
      }
    }
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    handleChange({ target: { name, value } })
    
    // Validación en tiempo real
    if (name === 'email' && value && !esEmailValido(value)) {
      setFieldError(name, MESSAGES.EMAIL_INVALID)
    } else if (name === 'email') {
      setFieldError(name, '')
    }
  }

  return (
    <div className="login-container">
      <Card title="Iniciar Sesión" className="login-card">
        <form onSubmit={(e) => handleSubmit(e, {
          email: { required: true, pattern: { test: () => esEmailValido(formData.email) } },
          password: { required: true }
        })}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            error={errors.email}
            required
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
            required
          />

          {errors.email && <Alert type="error">{errors.email}</Alert>}

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            className="w-full"
          >
            Ingresar
          </Button>

          <p className="registro-link">
            ¿No tienes cuenta? <a href={ROUTES.REGISTRO}>Regístrate aquí</a>
          </p>
        </form>
      </Card>
    </div>
  )
}
