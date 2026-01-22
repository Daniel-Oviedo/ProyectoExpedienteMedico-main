import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ExpedientePage } from './pages/ExpedientePage'
import { RegistrosMedicoPage } from './pages/RegistrosMedicoPage'
import { CrearRegistroPage } from './pages/CrearRegistroPage'
import './App.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/expediente"
            element={
              <ProtectedRoute>
                <ExpedientePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/registros/:expedienteId"
            element={
              <ProtectedRoute>
                <RegistrosMedicoPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/crear-registro/:expedienteId"
            element={
              <ProtectedRoute>
                <CrearRegistroPage />
              </ProtectedRoute>
            }
          />

          {/* Redirigir root a dashboard o login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
