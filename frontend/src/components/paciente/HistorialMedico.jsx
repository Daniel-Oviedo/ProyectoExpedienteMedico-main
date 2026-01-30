import { RegistroDetalle } from './RegistroDetalle'

export function HistorialMedico({ registros }) {
  const agruparRegistrosPorConsulta = (registros) => {
    const agrupados = {}
    
    registros.forEach(registro => {
      const fecha = registro.fechaRegistro 
        ? new Date(registro.fechaRegistro).toLocaleDateString('es-ES')
        : 'Sin fecha'
      
      if (!agrupados[fecha]) {
        agrupados[fecha] = []
      }
      agrupados[fecha].push(registro)
    })

    return Object.entries(agrupados).map(([fecha, regs]) => ({
      fecha,
      registros: regs
    }))
  }

  return (
    <div className="registros-section">
      <h2>📊 Historial Médico</h2>
      
      {registros.length === 0 ? (
        <div className="no-records">
          <p>No hay registros médicos aún.</p>
        </div>
      ) : (
        <div className="registros-list">
          {agruparRegistrosPorConsulta(registros).map((consulta, consultaIdx) => (
            <div key={consultaIdx} className="registro-card">
              <div className="registro-header">
                <h3>Consulta #{consultaIdx + 1}</h3>
                <span className="fecha">{consulta.fecha}</span>
              </div>

              {consulta.registros.map((registro) => (
                <RegistroDetalle key={registro.id} registro={registro} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
