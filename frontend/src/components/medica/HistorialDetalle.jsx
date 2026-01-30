import { HistorialConsulta } from './HistorialConsulta';
import { RegistroContenido } from './RegistroContenido';

export function HistorialDetalle({ paciente, registros, onBack }) {
  const registrosPorFecha = registros.reduce((acc, registro) => {
    const fechaObj = new Date(registro.fechaRegistro);
    const fechaKey = fechaObj.toISOString().split('T')[0]; // Agrupa por "YYYY-MM-DD"
    if (!acc[fechaKey]) acc[fechaKey] = { fecha: fechaObj, registros: [] };
    acc[fechaKey].registros.push(registro);
    return acc;
  }, {});

  const fechasOrdenadas = Object.keys(registrosPorFecha).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  if (fechasOrdenadas.length === 0) {
    return (
      <div className="historial-vacio">
        <p>No hay registros médicos para este paciente</p>
        <button className="btn-back" onClick={onBack}>← Atrás</button>
      </div>
    );
  }

  return (
    <div className="historial-detalle">
      <div className="historial-paciente-info">
        <h2>{paciente.nombre}</h2>
        <p>Cédula: {paciente.identificacion}</p>
      </div>

      <div className="consultas-grid">
        {fechasOrdenadas.map((fechaKey, idx) => {
          const fechaObj = registrosPorFecha[fechaKey].fecha;
          return (
            <div key={idx} className="consulta-card">
              <div className="fecha-header">
                <h4>{fechaObj.toLocaleDateString('es-ES', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</h4>
                <span className="num-registros">{registrosPorFecha[fechaKey].registros.length} consulta{registrosPorFecha[fechaKey].registros.length > 1 ? 's' : ''}</span>
              </div>

              <div className="consulta-contenido">
                {registrosPorFecha[fechaKey].registros.map((registro, regIdx) => (
                  <RegistroContenido
                    key={regIdx}
                    registro={registro}
                    idx={regIdx}
                    registros={registrosPorFecha[fechaKey].registros}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn-back" onClick={onBack}>← Atrás</button>
    </div>
  );
}
