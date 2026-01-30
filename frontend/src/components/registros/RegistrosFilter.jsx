export function RegistrosFilter({ filtro, onFilterChange }) {
  return (
    <div className="filtros-section">
      <label htmlFor="filtro">Filtrar por tipo:</label>
      <select 
        id="filtro"
        value={filtro} 
        onChange={(e) => onFilterChange(e.target.value)}
        className="filtro-select"
      >
        <option value="">Todos los registros</option>
        <option value="vitales">Signos Vitales</option>
        <option value="diagnostico">Diagnósticos</option>
      </select>
    </div>
  )
}
