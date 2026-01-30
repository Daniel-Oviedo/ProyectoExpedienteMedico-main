/**
 * Componente Alert Genérico
 * Alertas reutilizables para mensajes de éxito, error, etc
 */

export function Alert({
  type = 'info',      // success, error, warning, info
  children,
  onClose,
  dismissible = true,
  className = ''
}) {
  const typeClass = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  }[type] || 'alert-info'

  const icon = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }[type]

  return (
    <div className={`alert ${typeClass} ${className}`} role="alert">
      <span className="alert-icon">{icon}</span>
      <div className="alert-content">
        {children}
      </div>
      {dismissible && onClose && (
        <button
          className="alert-close"
          onClick={onClose}
          aria-label="Cerrar alerta"
        >
          ✕
        </button>
      )}
    </div>
  )
}
