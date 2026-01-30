import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormValidation } from '../hooks'
import { Input, Button, Card, Alert } from '../components/ui'
import { MESSAGES, ROUTES } from '../constants'
import { esEmailValido, esPasswordFuerte, esIdentificacionValida } from '../utils'
import { pacienteService } from '../services'
import '../styles/pages/RegistroPage.css'

export function RegistroPage() {
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType, setAlertType] = useState('success')
  
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldError
  } = useFormValidation(
    {
      cedula: '',
      nombre: '',
      email: '',
      password: '',
      confirmarPassword: ''
    },
    async (data) => {
      try {
        // Validaciones adicionales
        if (!esIdentificacionValida(data.cedula)) {
          throw new Error('Cédula inválida')
        }

        const passwordCheck = esPasswordFuerte(data.password)
        if (!passwordCheck.esValida) {
          throw new Error('Contraseña débil. ' + passwordCheck.mensajes.join(', '))
        }

        if (data.password !== data.confirmarPassword) {
          setFieldError('confirmarPassword', 'Las contraseñas no coinciden')
          throw new Error('Las contraseñas no coinciden')
        }

        await pacienteService.crear({
          cedula: data.cedula,
          nombre: data.nombre,
          email: data.email,
          password: data.password,
          rolId: 1
        })

        setAlertMessage(MESSAGES.SUCCESS_REGISTRO)
        setAlertType('success')
        
        setTimeout(() => {
          navigate(ROUTES.LOGIN)
        }, 2000)
      } catch (err) {
        setAlertMessage(err.message || MESSAGES.ERROR_REGISTRO)
        setAlertType('error')
      }
    }
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    handleChange({ target: { name, value } })
    
    // Validación en tiempo real
    if (name === 'email' && value && !esEmailValido(value)) {
      setFieldError(name, MESSAGES.EMAIL_INVALID)
    } else if (name === 'cedula' && value && !esIdentificacionValida(value)) {
      setFieldError(name, 'Cédula inválida')
    } else {
      setFieldError(name, '')
    }
  }

  return (
    <div className="registro-container">
      <Card title="Crear Cuenta" className="registro-card">
        <form onSubmit={(e) => handleSubmit(e, {
          cedula: { required: true },
          nombre: { required: true },
          email: { required: true },
          password: { required: true },
          confirmarPassword: { required: true }
        })}>
          {alertMessage && (
            <Alert 
              type={alertType} 
              onClose={() => setAlertMessage(null)}
            >
              {alertMessage}
            </Alert>
          )}

          <Input
            label="Cédula"
            name="cedula"
            value={formData.cedula}
            onChange={handleInputChange}
            placeholder="12345678"
            error={errors.cedula}
            required
          />

          <Input
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Juan Pérez"
            error={errors.nombre}
            required
          />

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
            onChange={handleInputChange}
            placeholder="••••••••"
            error={errors.password}
            required
          />

          <Input
            label="Confirmar Contraseña"
            name="confirmarPassword"
            type="password"
            value={formData.confirmarPassword}
            onChange={handleInputChange}
            placeholder="••••••••"
            error={errors.confirmarPassword}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
            className="w-full"
          >
            Registrarse
          </Button>

          <p className="login-link">
            ¿Ya tienes cuenta? <a href={ROUTES.LOGIN}>Inicia sesión</a>
          </p>
        </form>
      </Card>
    </div>
  )
}

