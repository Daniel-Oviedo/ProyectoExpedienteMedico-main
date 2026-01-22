import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI, usuariosAPI } from '../services/api'

// Crear contexto
const AuthContext = createContext(null)

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Al montar, verificar si hay token guardado
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    
    setLoading(false)
  }, [])

  // Login
  const login = async (email, password) => {
    try {
      setError(null)
      setLoading(true)

      // 1. Obtener token
      const response = await authAPI.login(email, password)
      const token = response.data.token

      // 2. Obtener datos del usuario
      localStorage.setItem('token', token)
      setToken(token)

      const profileResponse = await usuariosAPI.obtenerPerfil()
      const userData = {
        id: profileResponse.data.id,
        nombre: profileResponse.data.nombre,
        email: profileResponse.data.email,
        rol: `ROLE_${profileResponse.data.rol}`
      }

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      return userData
    } catch (err) {
      const message = err.response?.data?.message || 'Error al iniciar sesión'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  // Verificar si está autenticado
  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      error,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
