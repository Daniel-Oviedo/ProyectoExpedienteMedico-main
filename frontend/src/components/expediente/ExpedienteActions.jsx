export function ExpedienteActions({ expediente, onVerRegistros, onCrearRegistro }) {
  return (
    <div className="expediente-actions">
      <button 
        onClick={onVerRegistros}
        className="btn-primary"
      >
        📋 Ver Registros Médicos
      </button>
      {expediente.estado === 'ACTIVO' && (
        <button 
          onClick={onCrearRegistro}
          className="btn-secondary"
        >
          ➕ Crear Nuevo Registro
        </button>
      )}
    </div>
  )
}
