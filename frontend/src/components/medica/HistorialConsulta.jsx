export function HistorialConsulta({ fecha, registros, onBack }) {
  const handleBack = (e) => {
    e.preventDefault();
    onBack();
  };

  return (
    <div className="historial-consulta">
      <div className="historial-header">
        <button className="btn-back" onClick={handleBack}>← Atrás</button>
        <h3>📅 {new Date(fecha).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</h3>
      </div>

      <div className="consultas-contenedor">
        {registros.map((registro, idx) => {
          const RegistroContenido = require('./RegistroContenido').RegistroContenido;
          return (
            <RegistroContenido
              key={idx}
              registro={registro}
              idx={idx}
              registros={registros}
            />
          );
        })}
      </div>
    </div>
  );
}
