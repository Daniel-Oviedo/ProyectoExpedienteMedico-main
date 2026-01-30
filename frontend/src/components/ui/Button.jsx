/**
 * Componente Button Genérico
 * Reutilizable en toda la app
 */

export function Button({
  children,
  variant = 'primary',    // primary, secondary, danger
  size = 'md',            // sm, md, lg
  onClick,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ...props
}) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    warning: 'btn-warning'
  }[variant] || 'btn-primary'

  const sizeClass = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  }[size] || 'btn-md'

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  )
}
