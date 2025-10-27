import React, { useState } from "react";

// (Define o importa el tipo Pago como se usa en el frontend)
// ...

type Props = {
  pagos: Pago[];
  clubes: string[]; // <-- Recibe nombres de clubes para el filtro
  onEditar: (pago: Pago) => void; // <-- Función para iniciar edición
  onEliminar: (id: number) => void; // <-- Función para eliminar
};

// (Pega tu styleConfig y globalStyles aquí)
// ...
const tiposPago: TipoPago[] = ["cuota", "arbitraje", "multa", "otro"];
const estadosPago = ["pendiente", "pagado", "validado", "invalido"];


const HistorialPagos: React.FC<Props> = ({ pagos, clubes, onEditar, onEliminar }) => {
  const [clubFiltro, setClubFiltro] = useState<string>("");
  const [tipoFiltro, setTipoFiltro] = useState<string>("");
  const [estadoFiltro, setEstadoFiltro] = useState<string>("");

  const pagosFiltrados = pagos.filter(p =>
    (!clubFiltro || p.club === clubFiltro) && // Filtra por nombre de club
    (!tipoFiltro || p.tipo === tipoFiltro) &&
    (!estadoFiltro || p.estado === estadoFiltro)
  ).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  const formatFecha = (fechaISO: string) => {
      try {
          return new Date(fechaISO).toLocaleDateString('es-AR'); // Formato DD/MM/YYYY
      } catch (e) {
          return fechaISO; // Devuelve el string original si hay error
      }
  };


  return (
    <>
      {/* <style>{globalStyles}</style> */}
      <div /* className={styleConfig.wrapper} */>
        <h2 style={{fontWeight:800, fontSize:'1.5rem', marginBottom:'1rem'}}>Historial de Pagos</h2>
        {/* Filtros */}
        <div /* className={styleConfig.filterBar} */>
          <select /* className={styleConfig.filterSelect} */ value={clubFiltro} onChange={e => setClubFiltro(e.target.value)}>
            <option value="">Todos los clubes</option>
            {/* Usa la lista de nombres pasada por props */}
            {clubes.map(clubNombre => <option key={clubNombre} value={clubNombre}>{clubNombre}</option>)}
          </select>
          <select /* className={styleConfig.filterSelect} */ value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)}>
             <option value="">Todos los tipos</option>
             {tiposPago.map(tipo => <option key={tipo} value={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>)}
          </select>
          <select /* className={styleConfig.filterSelect} */ value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)}>
            <option value="">Todos los estados</option>
             {estadosPago.map(estado => <option key={estado} value={estado}>{estado.charAt(0).toUpperCase() + estado.slice(1)}</option>)}
          </select>
        </div>
        {/* Tabla */}
        <table /* className={styleConfig.table} */>
          <thead /* className={styleConfig.header} */>
            <tr>
              <th>Club</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Comprobante</th>
              <th>Motivo/Detalle</th> {/* Columna unificada */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagosFiltrados.length === 0 ? (
              <tr><td colSpan={8} /* className={styleConfig.cell} */ style={{textAlign: 'center', padding: '1rem'}}>No hay pagos registrados con estos filtros.</td></tr>
            ) : pagosFiltrados.map(pago => (
              <tr key={pago.id} /* className={styleConfig.row} */>
                <td /* className={styleConfig.cell} */>{pago.club}</td> {/* Muestra el nombre */}
                <td /* className={styleConfig.cell} */>{pago.tipo.charAt(0).toUpperCase() + pago.tipo.slice(1)}</td>
                <td /* className={styleConfig.cell} */>${pago.monto.toLocaleString('es-AR')}</td> {/* Formato ARS */}
                <td /* className={styleConfig.cell} */>{pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1)}</td>
                <td /* className={styleConfig.cell} */>{formatFecha(pago.fecha)}</td>
                <td /* className={styleConfig.cell} */>{pago.comprobante}</td>
                 {/* Muestra el detalle relevante */}
                <td /* className={styleConfig.cell} */>
                    {pago.tipo === 'cuota' && `Jugadores: ${pago.cantidadJugadores || 'N/A'}`}
                    {pago.tipo === 'arbitraje' && `Partido ID: ${pago.partidoId || 'N/A'}`}
                    {(pago.tipo === 'multa' || pago.tipo === 'otro') && `${pago.motivo || '-'}`}
                </td>
                <td /* className={styleConfig.cell} */>
                    {/* Llama a las funciones pasadas por props */}
                    <button /* className={styleConfig.editButton} */ onClick={() => onEditar(pago)}>Editar</button>
                    <button /* className={styleConfig.deleteButton} */ onClick={() => onEliminar(pago.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistorialPagos;
