import React, { useState } from "react";

// Inlined Pago type
type Pago = {
  motivo: string;
  id: number;
  tipo: "cuota" | "arbitraje";
  club: string;
  categoria: "Masculino" | "Femenino" | "Ambos";
  partidoId?: number;
  monto: number;
  comprobante: string;
  comprobanteArchivo?: string;
  fecha: string;
  estado: "pendiente" | "pagado" | "invalido";
  cantidadJugadores?: number;
  sancion?: string;
};

type TipoPago = "cuota" | "arbitraje" | "multa" | "otro";


interface Props {
  pagos: Pago[];
  clubes: string[];
  onEditar?: (pago: Pago) => void;
  onEliminar?: (id: number) => void;
}

const styleConfig = {
  wrapper: "historial-wrapper",
  table: "historial-table",
  header: "historial-header",
  row: "historial-row",
  cell: "historial-cell",
  filterBar: "historial-filter-bar",
  filterSelect: "historial-filter-select",
  editButton: "btn-edit-historial",
  deleteButton: "btn-delete-historial"
};

const globalStyles = `
.historial-wrapper {
  margin: 2rem auto;
  max-width: 1100px;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: 2rem;
}
.historial-filter-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.historial-filter-select {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  font-size: 1rem;
}
.historial-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.95rem;
}
.historial-header th {
  background: #1f2937;
  color: #fff;
  padding: 0.75rem 0.5rem;
  text-align: left;
  font-weight: 600;
  text-transform: uppercase;
}
.historial-row:nth-child(even) {
  background: #f9fafb;
}
.historial-row:hover {
  background: #f3f4f6;
}
.historial-cell {
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}
.btn-edit-historial {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  margin-right: 0.5rem;
  cursor: pointer;
}
.btn-edit-historial:hover {
  background: #2563eb;
}
.btn-delete-historial {
  background: #ef4444;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
}
.btn-delete-historial:hover {
  background: #b91c1c;
}
`;

const tiposPago: TipoPago[] = ["cuota", "arbitraje", "multa", "otro"];
const estadosPago = ["pendiente", "pagado", "validado", "invalido"];

const HistorialPagos: React.FC<Props> = ({ pagos, clubes, onEditar, onEliminar }) => {

  const [clubFiltro, setClubFiltro] = useState<string>("");
  const [tipoFiltro, setTipoFiltro] = useState<string>("");
  const [estadoFiltro, setEstadoFiltro] = useState<string>("");


  const pagosFiltrados = pagos.filter(p =>
    (!clubFiltro || p.club === clubFiltro) &&
    (!tipoFiltro || p.tipo === tipoFiltro) &&
    (!estadoFiltro || p.estado === estadoFiltro)
  ).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

  return (
    <>
      <style>{globalStyles}</style>
      <div className={styleConfig.wrapper}>
        <h2 style={{fontWeight:800, fontSize:'1.5rem', marginBottom:'1rem'}}>Historial de Pagos</h2>
        <div className={styleConfig.filterBar}>
          <select className={styleConfig.filterSelect} value={clubFiltro} onChange={e => setClubFiltro(e.target.value)}>
            <option value="">Todos los clubes</option>
            {clubes.map(club => <option key={club} value={club}>{club}</option>)}
          </select>
          <select className={styleConfig.filterSelect} value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)}>
            <option value="">Todos los tipos</option>
            {tiposPago.map(tipo => <option key={tipo} value={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>)}
          </select>
          <select className={styleConfig.filterSelect} value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)}>
            <option value="">Todos los estados</option>
            {estadosPago.map(estado => <option key={estado} value={estado}>{estado.charAt(0).toUpperCase() + estado.slice(1)}</option>)}
          </select>
        </div>
        <table className={styleConfig.table}>
          <thead className={styleConfig.header}>
            <tr>
              <th>Club</th>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Comprobante</th>
              <th>Motivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagosFiltrados.length === 0 ? (
              <tr><td colSpan={8} className={styleConfig.cell}>No hay pagos registrados con estos filtros.</td></tr>
            ) : pagosFiltrados.map(pago => (
              <tr key={pago.id} className={styleConfig.row}>
                <td className={styleConfig.cell}>{pago.club}</td>
                <td className={styleConfig.cell}>{pago.tipo.charAt(0).toUpperCase() + pago.tipo.slice(1)}</td>
                <td className={styleConfig.cell}>${pago.monto.toLocaleString('es-CL')}</td>
                <td className={styleConfig.cell}>{pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1)}</td>
                <td className={styleConfig.cell}>{new Date(pago.fecha).toLocaleDateString()}</td>
                <td className={styleConfig.cell}>{pago.comprobante}</td>
                <td className={styleConfig.cell}>{pago.motivo || '-'}</td>
                <td className={styleConfig.cell}>
                  {onEditar && <button className={styleConfig.editButton} onClick={() => onEditar(pago)}>Editar</button>}
                  {onEliminar && <button className={styleConfig.deleteButton} onClick={() => onEliminar(pago.id)}>Eliminar</button>}
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
