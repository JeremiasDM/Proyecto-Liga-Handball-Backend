import React, { useState, useEffect } from "react"; // <-- Añadir useEffect si cargas algo aquí

// (Define o importa tipos: Pago, TipoPago, Fixture)
// ...

type Props = {
  tipo: TipoPago;
  club: string;
  montoMinimo: number;
  partidos: any[]; // <-- Recibe partidos
  // La función ahora recibe un objeto más simple para crear
  onGuardar: (pagoFormData: Omit<Pago, 'id' | 'fecha' | 'estado' | 'club'> & {club: string}) => void;
  onCerrar: () => void;
};

const categorias = ["Masculino", "Femenino", "Ambos"];

// (Pega tu styleConfig y globalStyles aquí)
// ...

const FormularioPago: React.FC<Props> = ({ tipo, club, montoMinimo, partidos = [], onGuardar, onCerrar }) => {

  // Estados iniciales
  const [categoria, setCategoria] = useState<string>("Masculino");
  const [cantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const [monto, setMonto] = useState<number>(montoMinimo);
  const [comprobante, setComprobante] = useState("");
  const [comprobanteArchivo, setComprobanteArchivo] = useState<string | undefined>(undefined);
  const [partidoId, setPartidoId] = useState<number | "">("");
  const [motivo, setMotivo] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Ajusta el monto inicial si cambia el tipo
  useEffect(() => {
    setMonto(montoMinimo);
  }, [montoMinimo, tipo]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (sin cambios)
     const file = e.target.files?.[0];
    if (!file) return;
    // Validación de tamaño/tipo (opcional pero recomendado)
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("El archivo no debe superar los 5MB.");
        e.target.value = ''; // Limpiar input
        return;
    }
     if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
         setError("Formato de archivo inválido. Solo JPG, PNG o PDF.");
         e.target.value = ''; // Limpiar input
         return;
     }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setComprobanteArchivo(reader.result);
    };
    reader.readAsDataURL(file);
    setError(null); // Limpiar error si la carga fue ok
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    // Validaciones
    if (!comprobante && !comprobanteArchivo) {
        setError("Debes ingresar el número de comprobante o adjuntar el archivo.");
        return;
    }
    if (monto < montoMinimo) {
      setError(`El monto mínimo para ${tipo} es $${montoMinimo.toLocaleString()}.`);
      return;
    }
    if (tipo === "cuota" && (!cantidadJugadores || cantidadJugadores < 1)) {
      setError("Ingresa una cantidad válida de jugadores para la cuota.");
      return;
    }
    if (tipo === "arbitraje" && !partidoId) {
      setError("Debes seleccionar el partido correspondiente al arbitraje.");
      return;
    }
    if ((tipo === "multa" || tipo === "otro") && !motivo.trim()) {
      setError(`Debes ingresar un motivo para el tipo de pago '${tipo}'.`);
      return;
    }

    // Construye el objeto SIN id, fecha, estado
    const pagoFormData = {
      tipo: tipo,
      club: club, // Pasa el nombre
      monto: monto,
      comprobante: comprobante,
      comprobanteArchivo: comprobanteArchivo,
      // --- Campos condicionales ---
      categoria: (tipo === "cuota" || tipo === "arbitraje") ? categoria as any : undefined,
      partidoId: tipo === "arbitraje" ? Number(partidoId) : undefined,
      cantidadJugadores: tipo === "cuota" ? cantidadJugadores : undefined,
      motivo: (tipo === "multa" || tipo === "otro") ? motivo : ""
    };

    onGuardar(pagoFormData); // Llama a la función del padre
  };

  // Filtra partidos relevantes para arbitraje (si aplica)
  const partidosRelevantes = tipo === 'arbitraje'
    ? partidos.flatMap((f: any) => // Asume estructura de Fixture con array 'partidos'
        (f.partidos || []).filter((p: any) => p.club1 === club || p.club2 === club).map((p: any)=> ({
            // Crear un ID único si no viene del backend o usar uno existente
            // Aquí usamos jornada + índice como key temporal, idealmente la API daría ID único
            // Necesitas adaptar esto a la estructura REAL de tus partidos
            id: p.id || `${f.fecha}-${p.jornada}-${p.club1}-${p.club2}`,
            display: `J${p.jornada} (${f.fecha || 'N/F'}): ${p.club1} vs ${p.club2}`
        }))
      )
    : [];


  // Renderizado dinámico
  return (
    <>
      {/* <style>{globalStyles}</style> */}
      <div /* className={styleConfig.modalContainer} */>
        <button type="button" onClick={onCerrar} /* className={styleConfig.closeButton} */>&times;</button>
        <h2 /* className={styleConfig.title} */>
            {/* Títulos dinámicos */}
            {tipo === "cuota" && `💸 Pago de Cuota Anual: ${club}`}
            {tipo === "arbitraje" && `⚖️ Pago de Arbitraje: ${club}`}
            {tipo === "multa" && ` штраф Pago de Multa: ${club}`}
            {tipo === "otro" && `🧾 Otro Pago: ${club}`}
        </h2>

        {/* Mensaje de Error */}
        {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit} /* className={styleConfig.form} */>
          {/* Campos dinámicos */}
          {(tipo === "cuota" || tipo === "arbitraje") && (
            <div>
              <label /* className={styleConfig.label} */ htmlFor="categoria">Categoría *</label>
              <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} /* className={styleConfig.input} */ required>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          )}
          {tipo === "cuota" && (
            <div>
              <label /* className={styleConfig.label} */ htmlFor="jugadores">Cantidad de Jugadores *</label>
              <input id="jugadores" type="number" min={1} value={cantidadJugadores} onChange={e => setCantidadJugadores(Number(e.target.value))} /* className={styleConfig.input} */ required />
            </div>
          )}
          {tipo === "arbitraje" && (
            <div>
              <label /* className={styleConfig.label} */ htmlFor="partido">Partido *</label>
              <select id="partido" value={partidoId} onChange={e => setPartidoId(e.target.value === "" ? "" : Number(e.target.value))} /* className={styleConfig.input} */ required>
                <option value="" disabled>Selecciona un partido</option>
                 {/* Mapea los partidos relevantes */}
                 {partidosRelevantes.map((p) => (
                  // Usa el ID único generado o real como 'value'
                  <option key={p.id} value={p.id}>
                    {p.display}
                  </option>
                ))}
              </select>
            </div>
          )}
          {(tipo === "multa" || tipo === "otro") && (
            <div>
              <label /* className={styleConfig.label} */ htmlFor="motivo">Motivo *</label>
              <input id="motivo" type="text" value={motivo} placeholder="Descripción del pago" onChange={e => setMotivo(e.target.value)} /* className={styleConfig.input} */ required />
            </div>
          )}

          {/* Campos comunes */}
          <div>
            <label /* className={styleConfig.label} */ htmlFor="monto">Monto ($) *</label>
            <input id="monto" type="number" min={montoMinimo} value={monto} onChange={e => setMonto(Number(e.target.value))} /* className={styleConfig.input} */ required />
             <small>Monto mínimo: ${montoMinimo.toLocaleString()}</small>
          </div>
          <div>
            <label /* className={styleConfig.label} */ htmlFor="comprobante">Nº Comprobante / Código *</label>
            <input id="comprobante" type="text" value={comprobante} placeholder="Ej: Transf-12345" onChange={e => setComprobante(e.target.value)} /* className={styleConfig.input} */ required />
             <small>Ingresa el número o código único del comprobante.</small>
          </div>
          <div>
            <label /* className={styleConfig.label} */ htmlFor="archivo">Adjuntar Comprobante (JPG, PNG, PDF - Max 5MB)</label>
            <input id="archivo" type="file" accept="image/jpeg,image/png,application/pdf" onChange={handleFileUpload} /* className={styleConfig.fileInput} */ />
             {comprobanteArchivo && <small style={{color: 'green'}}> Archivo adjunto.</small>}
          </div>

          <button type="submit" /* className={styleConfig.submitButton} */ disabled={loadingPagos}> {/* Deshabilita mientras guarda */}
            {loadingPagos ? 'Guardando...' : 'Registrar Pago'}
          </button>
        </form>
      </div>
    </>
  );
};

export default FormularioPago;
