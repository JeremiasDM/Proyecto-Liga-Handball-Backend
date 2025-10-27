import React from "react";

// (Asegúrate que el tipo Pago esté definido o importado)
type Pago = { /* ... */ };
type TipoPago = "cuota" | "arbitraje" | "multa" | "otro";


type Props = {
    clubes: string[];
    pagos: Pago[];
    onRealizarPago: (club: string, tipo: TipoPago) => void; // Ajusta el tipo si es necesario
    // Podrías añadir onEditar/onEliminar aquí si quieres botones en la tabla principal
};

// (Pega tu estadosColor, styleConfig y globalStyles aquí)
const estadosColor = { /* ... */ };
const styleConfig = { /* ... */ };
const globalStyles = ` /* ... */ `;

const tiposTabla: Array<{ tipo: TipoPago, label: string, buttonClass: string }> = [
    { tipo: "cuota", label: "Cuota Anual", buttonClass: styleConfig.cuotaButton },
    { tipo: "arbitraje", label: "Pago Arbitraje", buttonClass: styleConfig.arbitrajeButton },
    // Puedes añadir 'multa', 'otro' si quieres columnas separadas
];

const TablaPagosClub: React.FC<Props> = ({ clubes, pagos, onRealizarPago }) => (
    <>
        <style>{globalStyles}</style> {/* Inyecta estilos */}
        <div className={styleConfig.tableWrapper}>
            <table className={styleConfig.table}>
                <thead className={styleConfig.tableHeader}>
                    <tr className={styleConfig.tableHeaderRow}>
                        <th className={styleConfig.tableHeaderCellClub}>Club</th>
                        {/* Genera cabeceras dinámicamente */}
                        {tiposTabla.map(t => (
                            <th key={t.tipo} className={styleConfig.tableHeaderCellOther}>{t.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styleConfig.tableBody}>
                    {clubes.map(club => (
                        <tr key={club} className={styleConfig.tableRow}>
                            <td className={styleConfig.clubNameCell}>{club}</td>
                            {/* Genera celdas dinámicamente */}
                            {tiposTabla.map(t => {
                                // Encuentra el último pago de ese tipo para el club
                                const ultimoPago = pagos
                                    .filter(p => p.club === club && p.tipo === t.tipo)
                                    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0]; // Ordena por fecha desc

                                const estado = ultimoPago?.estado || "pendiente"; // Estado del último pago o pendiente por defecto
                                const estadoClass = estadosColor[estado as keyof typeof estadosColor] || estadosColor.pendiente;

                                return (
                                    <td key={t.tipo} className={styleConfig.paymentCell}>
                                        <div className={styleConfig.paymentInfoContainer}>
                                            <span className={`${styleConfig.statusBadge} ${estadoClass}`}>
                                                {estado.toUpperCase()}
                                            </span>
                                            {/* Podrías mostrar fecha del último pago: {ultimoPago ? new Date(ultimoPago.fecha).toLocaleDateString() : '-'} */}
                                            <button
                                                className={t.buttonClass}
                                                onClick={() => onRealizarPago(club, t.tipo)}
                                                // Deshabilitar podría tener lógica más compleja (ej. no permitir si ya está validado)
                                                // disabled={estado === "pagado" || estado === "validado"}
                                            >
                                                Registrar Pago {/* Texto del botón */}
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
