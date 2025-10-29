import React, { useState, useEffect } from "react"; // <-- Importar useEffect

// (Define o importa tipos: Pago, TipoPago, Fixture)
// ...

type Props = {
  pago: Pago;
  montoMinimo: number;
  partidos: any[];
  onGuardar: (pagoActualizado: Pago) => void;
  onCancelar: () => void;
  loadingPagos: boolean; // <-- AÑADIR ESTA LÍNEA
};

// (Pega tu globalStyles aquí)
// ...

const EditarPago: React.FC<Props> = ({
  pago,
  montoMinimo,
  partidos,
  onGuardar,
  onCancelar,
  loadingPagos // <-- AÑADIR ESTA LÍNEA
}) => {
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
            {/* <style>{globalStyles}</style> */}
            <div /* className="edit-form-card" */>
                <h2 /* className="form-edit-title" */>✏️ Editar Pago (ID: {form.id})</h2>
                {error && <div /* className="alert-error" */ role="alert">{error}</div>}

                <form onSubmit={handleSubmit} /* className="form-edit-body" */>
                    {/* Club (Solo Lectura) */}
                    <div>
                        <label htmlFor="club" /* className="form-label" */>Club</label>
                        <input id="club" value={form.club} /* className="form-input-control" */ readOnly />
                    </div>

                    {/* Tipo (Solo Lectura) */}
                     <div>
                        <label htmlFor="tipo" /* className="form-label" */>Tipo</label>
                        <input id="tipo" value={form.tipo.charAt(0).toUpperCase() + form.tipo.slice(1)} /* className="form-input-control" */ readOnly />
                    </div>


                    {/* Campos editables según el tipo */}
                    {(form.tipo === "cuota" || form.tipo === "arbitraje") && form.categoria && (
                        <div>
                            <label htmlFor="categoria">Categoría</label>
                            <select id="categoria" name="categoria" value={form.categoria} onChange={handleChange} required>
                                {["Masculino", "Femenino", "Ambos"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    )}
                    {form.tipo === "cuota" && form.cantidadJugadores !== undefined && (
                        <div>
                            <label htmlFor="cantidadJugadores">Cantidad Jugadores</label>
                            <input id="cantidadJugadores" name="cantidadJugadores" type="number" min={1} value={form.cantidadJugadores} onChange={handleChange} required/>
                        </div>
                    )}
                     {form.tipo === "arbitraje" && (
                        <div>
                            <label htmlFor="partidoId">Partido</label>
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
                            <label htmlFor="motivo">Motivo</label>
                            <input id="motivo" name="motivo" type="text" value={form.motivo} onChange={handleChange} required/>
                        </div>
                    )}


                    {/* Campos Comunes Editables */}
                    <div>
                        <label htmlFor="monto">Monto ($)</label>
                        <input id="monto" name="monto" type="number" min={montoMinimo} value={form.monto} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="comprobante">Nº Comprobante</label>
                        <input id="comprobante" name="comprobante" value={form.comprobante} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="fecha">Fecha de Pago</label>
                        <input id="fecha" name="fecha" type="date" value={formattedDate} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label htmlFor="estado">Estado Validación</label>
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
                    <div /* className="button-group" */>
                        <button type="submit" /* className="btn-save-edit" */ disabled={loadingPagos}>
                             {loadingPagos ? 'Guardando...' : '💾 Guardar Cambios'}
                        </button>
                        <button type="button" onClick={onCancelar} /* className="btn-cancel-edit" */ disabled={loadingPagos}>
                            ❌ Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditarPago;
