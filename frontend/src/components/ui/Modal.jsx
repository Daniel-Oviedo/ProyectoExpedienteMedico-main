import { useState } from 'react'

/**
 * Componente Modal Genérico
 * Modal reutilizable con header, body y footer
 */

export function Modal({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',  // sm, md, lg
  closeOnBackdrop = true
}) {
  if (!isOpen) return null

  const sizeClass = {
    sm: 'modal-sm',
    md: 'modal-md',
    lg: 'modal-lg'
  }[size] || 'modal-md'

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={`modal ${sizeClass}`}>
        {title && (
          <div className="modal-header">
            <h2>{title}</h2>
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.Header = function ModalHeader({ children }) {
  return <div className="modal-header">{children}</div>
}

Modal.Body = function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>
}

Modal.Footer = function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>
}
