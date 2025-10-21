import React, { useState } from "react";

// Inlined Pago type (canonical shape)
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

// Inlined validarPago (simplified, uses partidos only as provided)
function validarPago(
    nuevo: Pago,
    montoMinimo: number,
    partidos: any[],
    comprobanteArchivo?: File
): string | null {
    if (!nuevo.club) {
        return "Debes seleccionar un club.";
    }
    if (!nuevo.partidoId && nuevo.tipo === "arbitraje") {
        return "Debes seleccionar un partido.";
    }
    if (!nuevo.comprobante && !nuevo.comprobanteArchivo) {
        return "Debes ingresar el comprobante o adjuntar el archivo.";
    }
    if (nuevo.monto < montoMinimo) {
        return `El monto debe ser igual o mayor al mínimo ($${montoMinimo}).`;
    }

    // fecha límite sencilla: si partido tiene fecha, valida que pago no sea posterior al viernes siguiente
    const partido = partidos
        .flatMap((f: any) => f.partidos)
        .find((p: any) => p.jornada === nuevo.partidoId);
    if (partido && (partido as any).fecha) {
        const fechaLimite = new Date((partido as any).fecha);
        fechaLimite.setDate(fechaLimite.getDate() + (5 - fechaLimite.getDay()));
        fechaLimite.setHours(23, 59, 59, 999);
        if (new Date(nuevo.fecha) > fechaLimite) {
            return "La fecha de pago superó el límite permitido.";
        }
    }

    if (comprobanteArchivo) {
        if (comprobanteArchivo.size > 5 * 1024 * 1024) {
            return "El archivo no puede superar los 5MB.";
        }
        if (!["image/jpeg", "image/png", "application/pdf"].includes(comprobanteArchivo.type)) {
            return "Solo se permiten imágenes JPG/PNG o PDF.";
        }
    }
    return null;
}

type Props = {
    pago: Pago;
    montoMinimo: number;
    partidos: any[]; 
    onGuardar: (actualizado: Pago) => void;
    onCancelar: () => void;
};

// ============================================
// SECCIÓN DE ESTILOS CSS PLANOS INYECTADOS
// ============================================
const globalStyles = `
/* Contenedor principal y Modal */
.edit-form-card {
    max-width: 450px;
    margin: 2rem auto;
    background-color: #ffffff; 
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); 
    border-radius: 1rem; /* rounded-2xl */
    padding: 1.5rem; /* p-6 */
    border: 1px solid #f3f4f6; /* border-gray-100 */
    display: flex;
    flex-direction: column;
    gap: 1.25rem; /* space-y-5 */
}

/* Título */
.form-edit-title {
    font-size: 1.875rem; /* text-3xl */
    font-weight: 800; /* font-extrabold */
    text-align: center;
    color: #ea580c; /* text-orange-600 */
    border-bottom: 1px solid #e5e7eb; /* border-b pb-3 */
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
}

/* Contenedor de Error */
.alert-error {
    background-color: #fee2e2; /* bg-red-100 */
    border: 1px solid #f87171; /* border-red-400 */
    color: #b91c1c; /* text-red-700 */
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    position: relative;
}

/* Formulario */
.form-edit-body {
    display: flex;
    flex-direction: column;
    gap: 1rem; /* space-y-4 */
}

/* Etiqueta */
.form-label {
    display: block;
    font-size: 0.875rem; /* text-sm */
    font-weight: 500; /* font-medium */
    color: #374151; /* text-gray-700 */
    margin-bottom: 0.25rem;
}

/* Input/Select Control */
.form-input-control {
    width: 100%;
    padding: 0.75rem; /* p-3 */
    border: 1px solid #d1d5db; /* border-gray-300 */
    border-radius: 0.5rem; /* rounded-lg */
    transition: border-color 0.15s, box-shadow 0.15s;
    font-size: 1rem;
    color: #1f2937;
    appearance: none; /* para el select */
    background-color: #ffffff; /* Asegura el fondo blanco */
}

.form-input-control:focus {
    border-color: #ea580c; /* focus:border-orange-500 */
    box-shadow: 0 0 0 1px #ea580c; /* focus:ring-orange-500 */
    outline: none;
}

/* Estilo para club de solo lectura */
.form-input-control[readonly] {
    background-color: #f9fafb; /* bg-gray-50 */
    cursor: default;
}

/* Contenedor de Botones */
.button-group {
    display: flex;
    gap: 1rem; /* gap-4 */
    padding-top: 0.5rem; /* pt-2 */
}

/* Botón Guardar */
.btn-save-edit {
    flex: 1;
    background-color: #ea580c; /* bg-orange-600 */
    color: #ffffff;
    padding: 0.75rem 1rem; /* px-4 py-3 */
    border-radius: 0.75rem; /* rounded-xl */
    font-weight: 700; /* font-bold */
    box-shadow: 0 4px 6px -1px rgba(234, 88, 12, 0.1), 0 2px 4px -2px rgba(234, 88, 12, 0.06);
    transition: background-color 0.2s;
    border: none;
    cursor: pointer;
}
.btn-save-edit:hover {
    background-color: #c2410c; /* hover:bg-orange-700 */
}

/* Botón Cancelar */
.btn-cancel-edit {
    flex: 1;
    background-color: #d1d5db; /* bg-gray-300 */
    color: #1f2937; /* text-gray-800 */
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-weight: 600; /* font-semibold */
    transition: background-color 0.2s;
    border: none;
    cursor: pointer;
}
.btn-cancel-edit:hover {
    background-color: #9ca3af; /* hover:bg-gray-400 */
}
`;
// ============================================


const EditarPago: React.FC<Props> = ({ pago, montoMinimo, partidos, onGuardar, onCancelar }) => {
    const [form, setForm] = useState<Pago>({ ...pago });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === "monto" || name === "partidoId" ? Number(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // El campo 'partidos' se pasa a la utilidad de validación si es necesario.
        const errorMsg = validarPago(form, montoMinimo, partidos); 
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        onGuardar(form);
        setError(null);
    };

    // Formato de fecha para el input type="date"
    const formattedDate = form.fecha ? new Date(form.fecha).toISOString().substring(0, 10) : '';

    return (
        <>
            {/* ⚠️ INYECCIÓN DE ESTILOS CSS PLANOS ⚠️ */}
            <style>{globalStyles}</style>

            <div className="edit-form-card">
                <h2 className="form-edit-title">
                    ✏️ Editar Pago
                </h2>
                
                {error && (
                    <div className="alert-error" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="form-edit-body">
                    
                    {/* Club (Solo Lectura) */}
                    <div>
                        <label htmlFor="club" className="form-label">Club</label>
                        <input
                            id="club"
                            name="club"
                            placeholder="Club"
                            value={form.club}
                            onChange={handleChange}
                            className="form-input-control"
                            readOnly 
                        />
                    </div>
                    
                    {/* ID Partido / Jornada (Visible solo para Arbitraje) */}
                    {form.tipo === "arbitraje" && (
                        <div>
                            <label htmlFor="partidoId" className="form-label">ID Partido / Jornada</label>
                            <input
                                id="partidoId"
                                name="partidoId"
                                type="number"
                                placeholder="ID Partido"
                                value={form.partidoId || ''}
                                onChange={handleChange}
                                className="form-input-control"
                                required
                            />
                        </div>
                    )}
                    
                    {/* Monto */}
                    <div>
                        <label htmlFor="monto" className="form-label">Monto ($)</label>
                        <input
                            id="monto"
                            name="monto"
                            type="number"
                            min={montoMinimo}
                            placeholder={`Monto mínimo: $${montoMinimo.toLocaleString()}`}
                            value={form.monto}
                            onChange={handleChange}
                            className="form-input-control"
                            required
                        />
                         <p className="text-xs text-gray-500 mt-1">Monto mínimo: ${montoMinimo.toLocaleString()}</p>
                    </div>
                    
                    {/* Comprobante */}
                    <div>
                        <label htmlFor="comprobante" className="form-label">Número de Comprobante</label>
                        <input
                            id="comprobante"
                            name="comprobante"
                            placeholder="Comprobante"
                            value={form.comprobante}
                            onChange={handleChange}
                            className="form-input-control"
                        />
                    </div>

                    {/* Fecha */}
                    <div>
                        <label htmlFor="fecha" className="form-label">Fecha de Pago</label>
                        <input
                            id="fecha"
                            name="fecha"
                            type="date"
                            value={formattedDate} 
                            onChange={handleChange}
                            className="form-input-control"
                            required
                        />
                    </div>

                    {/* Estado Selector */}
                    <div>
                        <label htmlFor="estado" className="form-label">Estado de Validación</label>
                        <select
                            id="estado"
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                            className="form-input-control"
                        >
                            <option value="pendiente">🟠 Pendiente</option>
                            <option value="pagado">🟡 Pagado</option>
                            <option value="validado">🟢 Validado</option>
                            <option value="invalido">🔴 Inválido / Rechazado</option>
                        </select>
                    </div>
                    
                    {/* Botones de Acción */}
                    <div className="button-group">
                        <button 
                            type="submit" 
                            className="btn-save-edit"
                        >
                            💾 Guardar Cambios
                        </button>
                        <button 
                            type="button" 
                            onClick={onCancelar} 
                            className="btn-cancel-edit"
                        >
                            ❌ Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditarPago;
