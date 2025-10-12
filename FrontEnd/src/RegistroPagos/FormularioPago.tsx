import React, { useState } from "react";
import type { Pago, TipoPago } from "../types/types";

type Props = {
  tipo: TipoPago;
  club: string;
  montoMinimo: number;
  partidos?: any[]; 
  onGuardar: (pago: Pago) => void;
  onCerrar: () => void;
};

const categorias = ["Masculino", "Femenino", "Ambos"];

const styleConfig = {
  modalContainer: "modal-form-container",
  closeButton: "modal-close-btn",
  title: "form-title-pago",
  form: "form-body",
  label: "form-label",
  input: "form-input-control",
  fileInput: "form-file-input",
  submitButton: "btn-submit-pago"
};

const globalStyles = `
/* ...puedes reutilizar los estilos de los formularios previos aquí... */
`;

const FormularioPago: React.FC<Props> = ({ tipo, club, montoMinimo, partidos = [], onGuardar, onCerrar }) => {
  
  const [categoria, setCategoria] = useState<string>("Masculino");
  const [cantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const [monto, setMonto] = useState<number>(montoMinimo);
  const [comprobante, setComprobante] = useState("");
  const [comprobanteArchivo, setComprobanteArchivo] = useState<string | undefined>(undefined);
  const [partidoId, setPartidoId] = useState<number | "">("");
  const [motivo, setMotivo] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setComprobanteArchivo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comprobante || monto < montoMinimo) {
      alert("Completa todos los campos y verifica el monto.");
      return;
    }
    if (tipo === "cuota" && cantidadJugadores < 1) {
      alert("Debes ingresar la cantidad de jugadores.");
      return;
    }
    if (tipo === "arbitraje" && !partidoId) {
      alert("Debes seleccionar el partido.");
      return;
    }
    if (tipo === "multa" && !motivo) {
      alert("Debes ingresar el motivo de la multa.");
      return;
    }
    
    const pago: Pago = {
      id: Date.now(),
      tipo,
      club,
      monto,
      comprobante,
      comprobanteArchivo,
      fecha: new Date().toISOString(),
      estado: "pendiente",
      categoria: tipo === "cuota" || tipo === "arbitraje" ? categoria as any : undefined,
      partidoId: tipo === "arbitraje" ? Number(partidoId) : undefined,
      cantidadJugadores: tipo === "cuota" ? cantidadJugadores : undefined,
      motivo: tipo === "multa" ? motivo : undefined
    };
    onGuardar(pago);
  };

  // Renderizado dinámico de campos
  return (
    <>
      <style>{globalStyles}</style>
      <div className={styleConfig.modalContainer}>
        <button type="button" onClick={onCerrar} className={styleConfig.closeButton} aria-label="Cerrar formulario">&times;</button>
        <h2 className={styleConfig.title}>
          {tipo === "cuota" && ` Pago de Cuota Anual: ${club}`}
          {tipo === "arbitraje" && ` Pago de Arbitraje: ${club}`}
          {tipo === "multa" && ` Pago de Multa: ${club}`}
          {tipo === "otro" && ` Otro Pago: ${club}`}
        </h2>
        <form onSubmit={handleSubmit} className={styleConfig.form}>
          {/* Campos dinámicos según tipo */}
          {(tipo === "cuota" || tipo === "arbitraje") && (
            <div>
              <label className={styleConfig.label} htmlFor="categoria">Categoría</label>
              <select id="categoria" value={categoria} onChange={e => setCategoria(e.target.value)} className={styleConfig.input} required>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          )}
          {tipo === "cuota" && (
            <div>
              <label className={styleConfig.label} htmlFor="jugadores">Cantidad de Jugadores</label>
              <input id="jugadores" type="number" min={1} value={cantidadJugadores} onChange={e => setCantidadJugadores(Number(e.target.value))} className={styleConfig.input} required />
            </div>
          )}
          {tipo === "arbitraje" && (
            <div>
              <label className={styleConfig.label} htmlFor="partido">Partido</label>
              <select id="partido" value={partidoId} onChange={e => setPartidoId(Number(e.target.value))} className={styleConfig.input} required>
                <option value="">Selecciona un partido</option>
                {partidos.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.club1} vs {p.club2} - {p.fecha}</option>
                ))}
              </select>
            </div>
          )}
          {tipo === "multa" && (
            <div>
              <label className={styleConfig.label} htmlFor="motivo">Motivo de la multa</label>
              <input id="motivo" type="text" value={motivo} onChange={e => setMotivo(e.target.value)} className={styleConfig.input} required />
            </div>
          )}
          {/* Campos comunes */}
          <div>
            <label className={styleConfig.label} htmlFor="monto">Monto</label>
            <input id="monto" type="number" min={montoMinimo} value={monto} onChange={e => setMonto(Number(e.target.value))} className={styleConfig.input} required />
          </div>
          <div>
            <label className={styleConfig.label} htmlFor="comprobante">Nº Comprobante</label>
            <input id="comprobante" type="text" value={comprobante} onChange={e => setComprobante(e.target.value)} className={styleConfig.input} required />
          </div>
          <div>
            <label className={styleConfig.label} htmlFor="archivo">Adjuntar comprobante (opcional)</label>
            <input id="archivo" type="file" accept="image/*,application/pdf" onChange={handleFileUpload} className={styleConfig.fileInput} />
          </div>
          <button type="submit" className={styleConfig.submitButton}>Registrar Pago</button>
        </form>
      </div>
    </>
  );
};

export default FormularioPago;
