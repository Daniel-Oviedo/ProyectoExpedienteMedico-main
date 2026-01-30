/**
 * Componente Card Genérico
 * Tarjeta reutilizable en toda la app
 */

export function Card({
  title,
  subtitle,
  children,
  className = '',
  noPadding = false,
  ...props
}) {
  return (
    <div className={`card ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className={`card-body ${noPadding ? 'no-padding' : ''}`}>
        {children}
      </div>
    </div>
  )
}
