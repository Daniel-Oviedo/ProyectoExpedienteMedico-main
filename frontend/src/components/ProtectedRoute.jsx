import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <h2>Cargando...</h2>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Si se requiere un rol específico, validar
  if (requiredRole) {
    const userRole = user?.rol?.replace('ROLE_', '').toUpperCase()
    const required = requiredRole.toUpperCase()
    
    if (userRole !== required) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}>
          <h2>No tienes permiso para acceder a esta página</h2>
        </div>
      )
    }
  }

  return children
}
