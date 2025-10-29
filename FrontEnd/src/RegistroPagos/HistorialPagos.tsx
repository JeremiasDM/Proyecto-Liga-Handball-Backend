import React, { useState } from "react";

// ============================================
// TIPOS REQUERIDOS
// ============================================

type TipoPago = "cuota" | "arbitraje" | "multa" | "otro";
interface Pago {
    id: number;
    tipo: TipoPago;
    club: string; // Nombre del club
    monto: number;
    comprobante: string;
    comprobanteArchivo?: string;
    fecha: string;
    estado: "pendiente" | "pagado" | "validado" | "invalido";
    categoria?: "Masculino" | "Femenino" | "Ambos";
    partidoId?: number;
    cantidadJugadores?: number;
    motivo?: string;
}

type Props = {
    pagos: Pago[];
    clubes: string[]; // <-- Recibe nombres de clubes para el filtro
    onEditar: (pago: Pago) => void; // <-- Función para iniciar edición
    onEliminar: (id: number) => void; // <-- Función para eliminar
};

// ============================================
// SECCIÓN DE ESTILOS Y CLASES MEJORADOS
// ============================================

// 1. Configuración de nombres de clase
const styleConfig = {
    wrapper: "historial-wrapper",
    filterBar: "historial-filter-bar",
    filterSelect: "historial-filter-select",
    table: "historial-table",
    header: "historial-table-header",
    row: "historial-table-row",
    cell: "historial-table-cell",
    actionsCell: "historial-actions-cell", 
    editButton: "historial-edit-button",
    deleteButton: "historial-delete-button",
    badge: "historial-badge",
    pendiente: "badge-pendiente",
    pagado: "badge-pagado",
    validado: "badge-validado",
    invalido: "badge-invalido",
};

// 2. Estilos CSS planos inyectados (con mejoras estéticas)
const globalStyles = `
/* Contenedor principal */
.${styleConfig.wrapper} {
    margin-top: 2rem;
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra mejorada */
}

/* Barra de Filtros */
.${styleConfig.filterBar} {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem; 
    flex-wrap: wrap;
}

.${styleConfig.filterSelect} {
    padding: 0.6rem 0.8rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: #ffffff; 
    color: #374151;
    font-size: 0.875rem;
    min-width: 150px; 
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.${styleConfig.filterSelect}:focus {
    border-color: #3b82f6; 
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    outline: none;
}

/* Tabla */
.${styleConfig.table} {
    width: 100%;
    min-width: 900px; 
    border-collapse: collapse;
    font-size: 0.875rem;
}

.${styleConfig.header} tr {
    background-color: #1f2937; /* Fondo oscuro */
    color: #ffffff;
    border-bottom: 3px solid #3b82f6;
}

.${styleConfig.table} th {
    padding: 1rem 0.75rem; /* Más padding */
    text-align: left;
    font-weight: 700; 
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
}

.${styleConfig.row}:nth-child(even) {
    background-color: #f9fafb;
}

.${styleConfig.row}:hover {
    background-color: #f3f4f6;
}

.${styleConfig.cell} {
    padding: 1rem 0.75rem; /* Más padding */
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle; 
    color: #4b5563;
}
.${styleConfig.actionsCell} {
    white-space: nowrap;
    width: 1%; 
}

/* Botones de Acción */
.${styleConfig.editButton}, .${styleConfig.deleteButton} {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-right: 0.5rem; /* Espacio entre botones */
}

.${styleConfig.editButton} {
    background-color: #3b82f6;
    color: white;
}
.${styleConfig.editButton}:hover {
    background-color: #2563eb; 
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(59, 130, 246, 0.3);
}

.${styleConfig.deleteButton} {
    background-color: #ef4444;
    color: white;
    margin-right: 0;
}
.${styleConfig.deleteButton}:hover {
    background-color: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(239, 68, 68, 0.3);
}

/* Badges de Estado */
.${styleConfig.badge} {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 9999px;
    font-size: 0.7rem; 
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.025em;
}

.${styleConfig.pendiente} { background-color: #fcd34d; color: #92400e; }
.${styleConfig.pagado} { background-color: #6ee7b7; color: #065f46; }
.${styleConfig.validado} { background-color: #93c5fd; color: #1e40af; }
.${styleConfig.invalido} { background-color: #fca5a5; color: #991b1b; }
`;

// ============================================
// COMPONENTE REACT LÓGICA
// ============================================

const tiposPago: TipoPago[] = ["cuota", "arbitraje", "multa", "otro"];
const estadosPago = ["pendiente", "pagado", "validado", "invalido"];

// Función auxiliar para obtener la clase de estilo basada en el estado
const getEstadoClass = (estado: Pago['estado']): string => {
    switch (estado) {
        case 'pendiente':
            return styleConfig.pendiente;
        case 'pagado':
            return styleConfig.pagado;
        case 'validado':
            return styleConfig.validado;
        case 'invalido':
            return styleConfig.invalido;
        default:
            return '';
    }
}

const HistorialPagos: React.FC<Props> = ({ pagos, clubes, onEditar, onEliminar }) => {
    const [clubFiltro, setClubFiltro] = useState<string>("");
    const [tipoFiltro, setTipoFiltro] = useState<string>("");
    const [estadoFiltro, setEstadoFiltro] = useState<string>("");

    const pagosFiltrados = pagos.filter(p =>
        (!clubFiltro || p.club === clubFiltro) &&
        (!tipoFiltro || p.tipo === tipoFiltro) &&
        (!estadoFiltro || p.estado === estadoFiltro)
    ).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    const formatFecha = (fechaISO: string) => {
        try {
            return new Date(fechaISO).toLocaleDateString('es-AR'); 
        } catch (e) {
            return fechaISO;
        }
    };


    return (
        <>
            {/* Inyecta los estilos mejorados */}
            <style>{globalStyles}</style> 
            
            <div className={styleConfig.wrapper}>
                <h2 style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '1.5rem', color: '#1f2937' }}>💰 Historial de Pagos Registrados</h2>
                
                {/* --- Filtros --- */}
                <div className={styleConfig.filterBar}>
                    <select className={styleConfig.filterSelect} value={clubFiltro} onChange={e => setClubFiltro(e.target.value)}>
                        <option value="">Club: Todos</option>
                        {clubes.map(clubNombre => <option key={clubNombre} value={clubNombre}>{clubNombre}</option>)}
                    </select>
                    
                    <select className={styleConfig.filterSelect} value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)}>
                        <option value="">Tipo: Todos</option>
                        {tiposPago.map(tipo => <option key={tipo} value={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>)}
                    </select>
                    
                    <select className={styleConfig.filterSelect} value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)}>
                        <option value="">Estado: Todos</option>
                        {estadosPago.map(estado => <option key={estado} value={estado}>{estado.charAt(0).toUpperCase() + estado.slice(1)}</option>)}
                    </select>
                </div>
                
                {/* --- Tabla --- */}
                <div style={{ overflowX: 'auto' }}> 
                    <table className={styleConfig.table}>
                        <thead className={styleConfig.header}>
                            <tr>
                                <th>Club</th>
                                <th>Tipo</th>
                                <th>Monto</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Comprobante</th>
                                <th>Detalle / Motivo</th>
                                <th className={styleConfig.actionsCell}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className={styleConfig.cell} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                        No se encontraron pagos que coincidan con los filtros aplicados.
                                    </td>
                                </tr>
                            ) : pagosFiltrados.map(pago => (
                                <tr key={pago.id} className={styleConfig.row}>
                                    <td className={styleConfig.cell} style={{ fontWeight: 600 }}>{pago.club}</td>
                                    <td className={styleConfig.cell}>{pago.tipo.charAt(0).toUpperCase() + pago.tipo.slice(1)}</td>
                                    <td className={styleConfig.cell} style={{ fontWeight: 700, color: '#065f46' }}>$**{pago.monto.toLocaleString('es-AR')}**</td>
                                    <td className={styleConfig.cell}>
                                        <span className={`${styleConfig.badge} ${getEstadoClass(pago.estado)}`}>
                                            {pago.estado.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className={styleConfig.cell}>{formatFecha(pago.fecha)}</td>
                                    <td className={styleConfig.cell} style={{ fontSize: '0.7rem' }}>{pago.comprobante}</td>
                                    
                                    {/* Muestra el detalle relevante */}
                                    <td className={styleConfig.cell}>
                                        {pago.tipo === 'cuota' && `Jugadores: **${pago.cantidadJugadores || '0'}** (${pago.categoria || '-'})`}
                                        {pago.tipo === 'arbitraje' && `Partido ID: **${pago.partidoId || 'N/A'}**`}
                                        {(pago.tipo === 'multa' || pago.tipo === 'otro') && `${pago.motivo || 'Motivo no especificado'}`}
                                    </td>
                                    
                                    <td className={`${styleConfig.cell} ${styleConfig.actionsCell}`}>
                                        <button className={styleConfig.editButton} onClick={() => onEditar(pago)}>Editar</button>
                                        <button className={styleConfig.deleteButton} onClick={() => onEliminar(pago.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HistorialPagos;