import React, { useState, useEffect } from "react"; // <-- Importar useEffect

// (Define o importa tipos: Pago, TipoPago, Fixture)
// Necesitarás definir estos tipos para que el código compile correctamente en un entorno real.
// Para este ejemplo, usaré 'any' en las propiedades de 'Pago' para evitar errores de tipo si no las definiste.

type TipoPago = 'cuota' | 'arbitraje' | 'multa' | 'otro';
type EstadoPago = 'pendiente' | 'validado' | 'invalido';

interface Pago {
    id: number;
    club: string;
    tipo: TipoPago;
    monto: number;
    comprobante: string;
    fecha: string; // ISO string o Date
    estado: EstadoPago;
    categoria?: 'Masculino' | 'Femenino' | 'Ambos';
    cantidadJugadores?: number;
    partidoId?: number;
    motivo?: string;
    // comprobanteArchivo?: any; // Si usas archivos
}

// Nota: 'loadingPagos' no está definido en el scope, lo he añadido como 'false'
// para que el código sea funcional, asumiendo que el componente padre lo proporcionaría.
const loadingPagos = false; 


type Props = {
    pago: Pago; // Recibe el pago completo a editar
    montoMinimo: number; // Podría variar según el tipo
    partidos: any[]; // Lista de partidos para el selector si es arbitraje
    onGuardar: (actualizado: Pago) => void; // <-- Recibe la función que llama a PATCH
    onCancelar: () => void;
    // No necesita clubes si no permites cambiar el club
};

// (Pega tu globalStyles aquí)
// --- INICIO DE ESTILOS ---
const globalStyles = `
    .edit-form-card {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 20px auto;
        border-top: 5px solid #007bff; /* Color primario para destacar */
    }

    .form-edit-title {
        color: #333;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 20px;
        font-size: 1.5rem;
        text-align: center;
    }

    .alert-error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
        padding: 10px;
        margin-bottom: 15px;
        border-radius: 4px;
        font-weight: bold;
    }

    .form-edit-body > div {
        margin-bottom: 15px;
    }

    .form-label {
        display: block;
        margin-bottom: 5px;
        color: #555;
        font-weight: 600;
    }

    .form-input-control,
    .form-edit-body input[type="text"],
    .form-edit-body input[type="number"],
    .form-edit-body input[type="date"],
    .form-edit-body select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box; 
        font-size: 1rem;
        transition: border-color 0.2s;
    }

    .form-edit-body input[readOnly] {
        background-color: #f1f1f1;
        color: #777;
        cursor: not-allowed;
    }

    .form-input-control:focus,
    .form-edit-body input:focus,
    .form-edit-body select:focus {
        border-color: #007bff;
        outline: none;
    }

    /* Botones */
    .button-group {
        display: flex;
        justify-content: flex-end; /* Alinea a la derecha */
        gap: 10px;
        margin-top: 25px;
    }

    .button-group button {
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s, opacity 0.2s;
        min-width: 120px;
    }

    .btn-save-edit {
        background-color: #28a745; /* Verde para guardar */
        color: white;
    }

    .btn-save-edit:hover:not(:disabled) {
        background-color: #218838;
    }

    .btn-cancel-edit {
        background-color: #dc3545; /* Rojo para cancelar */
        color: white;
    }

    .btn-cancel-edit:hover:not(:disabled) {
        background-color: #c82333;
    }

    .button-group button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    /* Pequeño ajuste para small */
    .form-edit-body small {
        display: block;
        margin-top: 5px;
        color: #6c757d;
        font-size: 0.85rem;
    }
`;
// --- FIN DE ESTILOS ---


const EditarPago: React.FC<Props> = ({ pago, montoMinimo, partidos, onGuardar, onCancelar }) => {
    // Estado inicial con los datos del pago a editar
    const [form, setForm] = useState<Pago>({ ...pago });
    const [error, setError] = useState<string | null>(null);

    // Sincroniza si el pago prop cambia (por si acaso)
    useEffect(() => {
        setForm({ ...pago });
    }, [pago]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setError(null);
        setForm(prev => ({
             ...prev,
             // Convierte a número si es monto, partidoId o cantidadJugadores
             [name]: (name === "monto" || name === "partidoId" || name === "cantidadJugadores") ? Number(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validaciones (puedes reutilizar la lógica de FormularioPago o validaciones específicas aquí)
        if (!form.comprobante /* && !form.comprobanteArchivo */) { // Validación comprobante
            setError("Debe ingresar el número de comprobante.");
            return;
        }
         if (form.monto < montoMinimo) {
            setError(`El monto mínimo es $${montoMinimo.toLocaleString()}.`);
            return;
        }
        if (form.tipo === 'arbitraje' && !form.partidoId) {
             setError("Debe seleccionar un partido para el pago de arbitraje.");
             return;
        }
        // ... otras validaciones ...

        // Llama a onGuardar del padre pasando el objeto 'form' completo
        // PagosPage se encargará de extraer los campos necesarios para el DTO de actualización
        onGuardar(form);
    };

    // Formato de fecha para input 'date'
    const formattedDate = form.fecha ? new Date(form.fecha).toISOString().substring(0, 10) : '';

    // Filtra partidos si es arbitraje (igual que en FormularioPago)
     const partidosRelevantes = form.tipo === 'arbitraje'
     ? partidos.flatMap((f: any) =>
         (f.partidos || []).filter((p: any) => p.club1 === form.club || p.club2 === form.club).map((p: any)=> ({
             id: p.id || `${f.fecha}-${p.jornada}-${p.club1}-${p.club2}`,
             display: `J${p.jornada} (${f.fecha || 'N/F'}): ${p.club1} vs ${p.club2}`
         }))
       )
     : [];


    return (
        <>
            <style>{globalStyles}</style> {/* <-- INYECCIÓN DE ESTILOS */}
            <div className="edit-form-card"> {/* <-- CLASE APLICADA */}
                <h2 className="form-edit-title"> Editar Pago (ID: {form.id})</h2> {/* <-- CLASE APLICADA */}
                {error && <div className="alert-error" role="alert">{error}</div>} {/* <-- CLASE APLICADA */}

                <form onSubmit={handleSubmit} className="form-edit-body"> {/* <-- CLASE APLICADA */}
                    {/* Club (Solo Lectura) */}
                    <div>
                        <label htmlFor="club" className="form-label">Club</label> {/* <-- CLASE APLICADA */}
                        <input id="club" value={form.club} className="form-input-control" readOnly /> {/* <-- CLASE APLICADA */}
                    </div>

                    {/* Tipo (Solo Lectura) */}
                     <div>
                        <label htmlFor="tipo" className="form-label">Tipo</label> {/* <-- CLASE APLICADA */}
                        <input id="tipo" value={form.tipo.charAt(0).toUpperCase() + form.tipo.slice(1)} className="form-input-control" readOnly /> {/* <-- CLASE APLICADA */}
                    </div>


                    {/* Campos editables según el tipo */}
                    {(form.tipo === "cuota" || form.tipo === "arbitraje") && form.categoria && (
                        <div>
                            <label htmlFor="categoria" className="form-label">Categoría</label>
                            <select id="categoria" name="categoria" value={form.categoria} onChange={handleChange} required>
                                {["Masculino", "Femenino", "Ambos"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    )}
                    {form.tipo === "cuota" && form.cantidadJugadores !== undefined && (
                        <div>
                            <label htmlFor="cantidadJugadores" className="form-label">Cantidad Jugadores</label>
                            <input id="cantidadJugadores" name="cantidadJugadores" type="number" min={1} value={form.cantidadJugadores} onChange={handleChange} required/>
                        </div>
                    )}
                     {form.tipo === "arbitraje" && (
                        <div>
                            <label htmlFor="partidoId" className="form-label">Partido</label>
                            <select id="partidoId" name="partidoId" value={form.partidoId || ""} onChange={handleChange} required>
                                <option value="" disabled>Selecciona un partido</option>
                                {partidosRelevantes.map((p) => (
                                    <option key={p.id} value={p.id}> {p.display} </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {(form.tipo === "multa" || form.tipo === "otro") && form.motivo !== undefined && (
                        <div>
                            <label htmlFor="motivo" className="form-label">Motivo</label>
                            <input id="motivo" name="motivo" type="text" value={form.motivo} onChange={handleChange} required/>
                        </div>
                    )}


                    {/* Campos Comunes Editables */}
                    <div>
                        <label htmlFor="monto" className="form-label">Monto ($)</label>
                        <input id="monto" name="monto" type="number" min={montoMinimo} value={form.monto} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="comprobante" className="form-label">Nº Comprobante</label>
                        <input id="comprobante" name="comprobante" value={form.comprobante} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="fecha" className="form-label">Fecha de Pago</label>
                        <input id="fecha" name="fecha" type="date" value={formattedDate} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="estado" className="form-label">Estado Validación</label>
                        <select id="estado" name="estado" value={form.estado} onChange={handleChange}>
                            <option value="pendiente">🟠 Pendiente</option>
                            {/* <option value="pagado">🟡 Pagado</option> */} {/* Quitado si "pagado" es un estado intermedio */}
                            <option value="validado">🟢 Validado</option>
                            <option value="invalido">🔴 Inválido</option>
                        </select>
                    </div>

                    {/* TODO: Manejo de Archivo (más complejo en edición) */}
                    {/* <div>
                         <label htmlFor="archivo">Adjuntar Nuevo Comprobante (Opcional)</label>
                         <input id="archivo" type="file" accept="image/*,application/pdf" onChange={handleFileUpload}/>
                         {form.comprobanteArchivo && <small>Archivo anterior adjunto.</small>}
                     </div> */}


                    {/* Botones */}
                    <div className="button-group"> {/* <-- CLASE APLICADA */}
                        <button type="submit" className="btn-save-edit" disabled={loadingPagos}> {/* <-- CLASE APLICADA */}
                             {loadingPagos ? 'Guardando...' : ' Guardar Cambios'}
                        </button>
                        <button type="button" onClick={onCancelar} className="btn-cancel-edit" disabled={loadingPagos}> {/* <-- CLASE APLICADA */}
                             Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditarPago;
