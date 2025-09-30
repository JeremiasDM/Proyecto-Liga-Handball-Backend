import React, { useState } from "react";
import type { Pago } from "../types/types";

type Props = {
  club: string;
  onGuardar: (pago: Pago) => void;
  montoMinimo: number;
};

const categorias = ["Masculino", "Femenino", "Ambos"];

const FormularioCuota: React.FC<Props> = ({ club, onGuardar, montoMinimo }) => {
  const [categoria, setCategoria] = useState("Masculino");
  const [cantidadJugadores, setCantidadJugadores] = useState<number>(0);
  const [monto, setMonto] = useState<number>(montoMinimo);
  const [comprobante, setComprobante] = useState("");
  const [comprobanteArchivo, setComprobanteArchivo] = useState<string | undefined>(undefined);

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
    if (!categoria || !comprobante || monto < montoMinimo || cantidadJugadores < 1) {
      alert("Completa todos los campos y verifica el monto y cantidad de jugadores.");
      return;
    }
    const pago: Pago = {
      id: Date.now(),
      tipo: "cuota",
      club,
      categoria: categoria as any,
      monto,
      comprobante,
      comprobanteArchivo,
      fecha: new Date().toISOString(),
      estado: "pendiente",
      cantidadJugadores
    };
    onGuardar(pago);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4 text-center">Pago de Cuota Anual</h2>
      <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full p-2 border rounded" required>
        {categorias.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input
        type="number"
        min={1}
        value={cantidadJugadores}
        onChange={e => setCantidadJugadores(Number(e.target.value))}
        placeholder="Cantidad de jugadores"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        min={montoMinimo}
        value={monto}
        onChange={e => setMonto(Number(e.target.value))}
        placeholder={`Monto mínimo: $${montoMinimo}`}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={comprobante}
        onChange={e => setComprobante(e.target.value)}
        placeholder="Número de comprobante"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileUpload}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Registrar Pago
      </button>
    </form>
  );
};

export default FormularioCuota;