import React from "react";
import type { CSSProperties } from "react";

// --- TIPOS (Asegúrate que coincidan con PagosPage) ---
type TipoPago = "cuota" | "arbitraje" | "multa" | "otro";

interface Pago {
    id: number;
    tipo: TipoPago;
    club: string; // Nombre del club
    monto: number;
    comprobante: string;
    fecha: string; // ISO String
    estado: "pendiente" | "pagado" | "validado" | "invalido";
    // ... otros campos
}

type Props = {
    clubes: string[];
    pagos: Pago[];
    onRealizarPago: (club: string, tipo: TipoPago) => void;
};

// --- CONSTANTES DE ESTILO Y CLASES ---
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
    // 🆕 Nueva clase base para los botones de pago
    btnPagoBase: "btn-pago-base", 
};

// ============================================
// SECCIÓN DE ESTILOS CSS PLANOS INYECTADOS
// (Estilos Globales de la Tabla)
// ============================================
const globalStyles = `
/* Contenedor de la Tabla */
.table-pagos-club-wrapper {
    overflow-x: auto;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06);
}

/* Estilo principal de la tabla */
.table-pagos-club {
    width: 100%;
    min-width: 500px; 
    table-layout: auto; 
    
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

.table-header-club {
    width: 30%; 
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

.payment-cell, .payment-cell-arbitraje {
    padding: 0.75rem 0.5rem;
    text-align: center;
    border-bottom: 1px solid #e5e7eb;
    width: 35%; 
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

/* 🆕 Botones de Pago Base (Aplicado a todos los tipos de pago) */
.btn-pago-base {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem; /* text-xs */
    font-weight: 600;
    border-radius: 0.375rem; /* rounded-md */
    cursor: pointer;
    transition: background-color 0.2s;
    border: none;
    width: 90%;
    max-width: 140px;
    color: #ffffff; /* Texto blanco */
    background-color: #1f3c88; /* Fondo azul fuerte solicitado */
}

.btn-pago-base:hover {
    background-color: #1a316e; /* Un tono ligeramente más oscuro para el hover */
}

/* Botones Deshabilitados (Mantienen el color gris) */
.btn-pago-base:disabled {
    background-color: #e5e7eb; /* disabled:bg-gray-200 */
    color: #6b7280; /* disabled:text-gray-500 */
    cursor: not-allowed;
}
`;

// ============================================
// NUEVA SECCIÓN DE ESTILOS CSS INYECTADOS
// (Estilos Adicionales o Específicos)
// ============================================
const additionalStyles = `
/* Ejemplos de estilos adicionales */
.table-body-bg {
    /* Un pequeño ajuste de margen/padding si fuera necesario */
    padding: 0.5rem; 
}

.status-badge {
    /* Estilo para que el texto sea más legible */
    text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
}

.club-name-cell {
    /* Un estilo específico para el nombre del club */
    font-style: italic;
}
`;
// ============================================

// La configuración de los tipos de tabla ahora solo necesita el 'tipo' y 'label',
// ya que el 'buttonClass' será el mismo para todos.
const tiposTabla: Array<{ tipo: TipoPago, label: string }> = [
    { tipo: "cuota", label: "Cuota Anual" },
    { tipo: "arbitraje", label: "Pago Arbitraje" },
    // Puedes añadir 'multa', 'otro' si quieres columnas separadas
];

const TablaPagosClub: React.FC<Props> = ({ clubes, pagos, onRealizarPago }) => (
    <>
        <style>{globalStyles}</style> {/* Inyecta estilos Globales */}
        <style>{additionalStyles}</style> {/* Inyecta estilos Adicionales */}
        <div className={styleConfig.tableWrapper}>
            <table className={styleConfig.table}>
                <thead className={styleConfig.tableHeader}>
                    <tr className={styleConfig.tableHeaderRow}>
                        <th className={styleConfig.tableHeaderCellClub}>Club</th>
                        {/* Genera cabeceras dinámicamente */}
                        {tiposTabla.map((t, index) => (
                            <th 
                                key={t.tipo} 
                                className={`${styleConfig.tableHeaderCellOther} ${index === tiposTabla.length - 1 ? styleConfig.tableHeaderCellArbitraje : ''}`}
                            >
                                {t.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styleConfig.tableBody}>
                    {clubes.map(club => (
                        <tr key={club} className={styleConfig.tableRow}>
                            <td className={styleConfig.clubNameCell}>{club}</td>
                            {/* Genera celdas dinámicamente */}
                            {tiposTabla.map((t) => {
                                // Encuentra el último pago de ese tipo para el club
                                const ultimoPago = pagos
                                    .filter(p => p.club === club && p.tipo === t.tipo)
                                    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]; // Ordena por fecha desc

                                const estado = ultimoPago?.estado || "pendiente"; // Estado del último pago o pendiente por defecto
                                const estadoClass = estadosColor[estado as keyof typeof estadosColor] || estadosColor.pendiente;

                                return (
                                    <td 
                                        key={t.tipo} 
                                        className={`${styleConfig.paymentCell} ${t.tipo === 'arbitraje' ? styleConfig.paymentCellArbitraje : ''}`}
                                    >
                                        <div className={styleConfig.paymentInfoContainer}>
                                            <span className={`${styleConfig.statusBadge} ${estadoClass}`}>
                                                {estado.toUpperCase()}
                                            </span>
                                            <button
                                                className={styleConfig.btnPagoBase} // 🆕 Aplica la nueva clase base
                                                onClick={() => onRealizarPago(club, t.tipo)}
                                                // Deshabilitar podría tener lógica más compleja (ej. no permitir si ya está validado)
                                                // disabled={estado === "pagado" || estado === "validado"}
                                            >
                                                Registrar Pago
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
