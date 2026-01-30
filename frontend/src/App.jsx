import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { RegistroPage } from './pages/RegistroPage'
import { DashboardPage } from './pages/DashboardPage'
import { ExpedientePage } from './pages/ExpedientePage'
import { RegistrosMedicoPage } from './pages/RegistrosMedicoPage'
import { CrearRegistroPage } from './pages/CrearRegistroPage'
import { EnfermeraPage } from './pages/EnfermeraPage'
import { MedicaPage } from './pages/MedicaPage'
import { PacientePage } from './pages/PacientePage'
import './styles/components.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroPage />} />
          
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

          <Route
            path="/enfermera"
            element={
              <ProtectedRoute>
                <EnfermeraPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/medica"
            element={
              <ProtectedRoute>
                <MedicaPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/paciente"
            element={
              <ProtectedRoute>
                <PacientePage />
              </ProtectedRoute>
            }
          />

          {/* Redirigir root a login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
