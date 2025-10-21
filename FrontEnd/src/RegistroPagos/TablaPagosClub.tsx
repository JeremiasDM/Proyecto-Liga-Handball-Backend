import React from "react";

// Inlined Pago type (canonical)
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

type Props = {
    clubes: string[];
    pagos: Pago[];
    onRealizarPago: (club: string, tipo: "cuota" | "arbitraje") => void;
};

// Clases CSS específicas para el estado del pago (Estas sí deben ser definidas)
const estadosColor = {
    pendiente: "estado-pendiente",
    pagado: "estado-pagado",
    validado: "estado-pagado", 
    invalido: "estado-invalido"
};

const styleConfig = {
    tableWrapper: "table-pagos-club-wrapper",
    table: "table-pagos-club", 
    tableHeader: "table-header-left",
    tableHeaderRow: "table-header-row",
    tableHeaderCellClub: "table-header-club",
    tableHeaderCellOther: "table-header-center",
    tableHeaderCellArbitraje: "table-header-arbitraje",
    tableBody: "table-body-bg",
    tableRow: "table-row-club",
    clubNameCell: "club-name-cell",
    paymentCell: "payment-cell",
    paymentCellArbitraje: "payment-cell-arbitraje",
    paymentInfoContainer: "payment-info-container",
    statusBadge: "status-badge",
    cuotaButton: "btn-pago-cuota",
    arbitrajeButton: "btn-pago-arbitraje"
};

// ============================================
// SECCIÓN DE ESTILOS CSS PLANOS INYECTADOS
// ============================================
const globalStyles = `
/* Contenedor de la Tabla */
.table-pagos-club-wrapper {
    /* Contenedor que permite el scroll horizontal si la tabla es demasiado ancha */
    overflow-x: auto;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
}

/* Estilo principal de la tabla */
.table-pagos-club {
    /* 🛠️ MODIFICADO: Estira la tabla al 100% del ancho del contenedor */
    width: 100%;
    min-width: 500px; /* Mínimo para móviles, si es menor activa overflow-x */
    table-layout: auto; /* Permite que las columnas se ajusten para llenar el 100% */
    
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.875rem; /* text-sm */
    background-color: #ffffff;
}

/* Cabecera de la tabla */
.table-header-left {
    background-color: #1f2937; /* bg-gray-800 */
    color: #ffffff; /* text-white */
}

.table-header-row th {
    padding: 1rem 0.75rem;
    text-align: left;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem; /* text-xs */
    letter-spacing: 0.05em;
}

/* 🛠️ MODIFICADO: Ancho de Columna Club */
.table-header-club {
    width: 30%; /* Asigna un 30% del ancho al club */
    border-top-left-radius: 0.5rem;
}
.table-header-center {
    text-align: center !important;
}
.table-header-arbitraje {
    text-align: center !important;
    border-top-right-radius: 0.5rem;
}

/* Filas del Cuerpo */
.table-body-bg .table-row-club:nth-child(even) {
    background-color: #f9fafb; /* bg-gray-50 */
}

.table-row-club:hover {
    background-color: #f3f4f6; /* hover:bg-gray-100 */
}

/* Celdas */
.club-name-cell {
    padding: 1rem 0.75rem;
    font-weight: 600; /* font-semibold */
    color: #1f2937; /* text-gray-800 */
    border-bottom: 1px solid #e5e7eb; /* border-gray-200 */
}

/* 🛠️ MODIFICADO: Ancho de Columnas de Pagos */
.payment-cell, .payment-cell-arbitraje {
    padding: 0.75rem 0.5rem;
    text-align: center;
    border-bottom: 1px solid #e5e7eb;
    width: 35%; /* Asigna un 35% del ancho a cada pago (30+35+35=100%) */
}

/* Contenedor de Información (Badge + Botón) */
.payment-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem; /* space-y-2 */
}

/* Badge de Estado */
.status-badge {
    padding: 0.25rem 0.6rem;
    border-radius: 9999px; /* rounded-full */
    font-size: 0.7rem; /* text-xs */
    font-weight: 700;
    letter-spacing: 0.05em;
}

/* Colores de Estado */
.estado-pendiente {
    background-color: #fef3c7; /* bg-amber-100 */
    color: #92400e; /* text-amber-800 */
}
.estado-pagado {
    background-color: #d1fae5; /* bg-green-100 */
    color: #065f46; /* text-green-800 */
}
.estado-invalido {
    background-color: #fee2e2; /* bg-red-100 */
    color: #991b1b; /* text-red-800 */
}

/* Botones de Pago */
.btn-pago-cuota, .btn-pago-arbitraje {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem; /* text-xs */
    font-weight: 600;
    border-radius: 0.375rem; /* rounded-md */
    cursor: pointer;
    transition: background-color 0.2s;
    border: none;
    width: 90%;
    max-width: 140px;
}

/* Botón Cuota (Verde) */
.btn-pago-cuota {
    color: #ffffff;
    background-color: #059669; /* bg-emerald-600 */
}
.btn-pago-cuota:hover {
    background-color: #047857; /* hover:bg-emerald-700 */
}

/* Botón Arbitraje (Naranja/Ámbar) */
.btn-pago-arbitraje {
    color: #ffffff;
    background-color: #d97706; /* bg-amber-700 */
}
.btn-pago-arbitraje:hover {
    background-color: #b45309; /* hover:bg-amber-800 */
}

/* Botones Deshabilitados */
.btn-pago-cuota:disabled, .btn-pago-arbitraje:disabled {
    background-color: #e5e7eb; /* disabled:bg-gray-200 */
    color: #6b7280; /* disabled:text-gray-500 */
    cursor: not-allowed;
}
`;
// ============================================


// Tipos de pago a mostrar en la tabla principal (canonical)
const tiposTabla: Array<{ tipo: "cuota" | "arbitraje", label: string, buttonClass: string }> = [
    { tipo: "cuota", label: "Cuota Anual", buttonClass: styleConfig.cuotaButton },
    { tipo: "arbitraje", label: "Pago Arbitraje", buttonClass: styleConfig.arbitrajeButton },
];

const TablaPagosClub: React.FC<Props> = ({ clubes, pagos, onRealizarPago }) => (
    <>
        {/* ⚠️ INYECCIÓN DE ESTILOS CSS PLANOS ⚠️ */}
        <style>{globalStyles}</style>

        <div className={styleConfig.tableWrapper}>
            <table className={styleConfig.table}>
                <thead className={styleConfig.tableHeader}>
                    <tr className={styleConfig.tableHeaderRow}>
                        <th className={styleConfig.tableHeaderCellClub}>Club</th>
                        {tiposTabla.map(t => (
                            <th key={t.tipo} className={styleConfig.tableHeaderCellOther}>{t.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styleConfig.tableBody}>
                    {clubes.map(club => (
                        <tr key={club} className={styleConfig.tableRow}>
                            {/* Celda de Club */}
                            <td className={styleConfig.clubNameCell}>{club}</td>
                            {/* Celdas dinámicas por tipo de pago */}
                            {tiposTabla.map(t => {
                                const pago = pagos.filter(p => p.club === club && p.tipo === t.tipo).sort((a, b) => b.id - a.id)[0];
                                const estado = pago?.estado || "pendiente";
                                return (
                                    <td key={t.tipo} className={styleConfig.paymentCell}>
                                        <div className={styleConfig.paymentInfoContainer}>
                                            <span className={`${styleConfig.statusBadge} ${estadosColor[estado as keyof typeof estadosColor]}`}>
                                                {estado.toUpperCase()}
                                            </span>
                                            <button
                                                className={t.buttonClass}
                                                onClick={() => onRealizarPago(club, t.tipo)}
                                                disabled={estado === "pagado" || estado === "invalido"}
                                            >
                                                Realizar Pago
                                            </button>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
);

export default TablaPagosClub;
