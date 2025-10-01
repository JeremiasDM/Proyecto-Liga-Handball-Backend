import React, { useState } from "react";
import type { Pago, Fixture } from "../types/types";

type Props = {
  club: string;
  partidos: Fixture[];
  montoMinimo: number;
  onGuardar: (pago: Pago) => void;
};

const categorias = ["Masculino", "Femenino"];

const FormularioArbitraje: React.FC<Props> = ({ club, partidos, montoMinimo, onGuardar }) => {
  const [categoria, setCategoria] = useState("Masculino");
  const [partidoId, setPartidoId] = useState<number | "">("");
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
    if (!categoria || !partidoId || !comprobante || monto < montoMinimo) {
      alert("Completa todos los campos y verifica el monto.");
      return;
    }
    const pago: Pago = {
      id: Date.now(),
      tipo: "arbitraje",
      club,
      categoria: categoria as any,
      partidoId: Number(partidoId),
      monto,
      comprobante,
      comprobanteArchivo,
      fecha: new Date().toISOString(),
      estado: "pendiente"
    };
    onGuardar(pago);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4 text-center">Pago de Arbitraje</h2>
      <label className="block font-semibold">Categoría</label>
      <select value={categoria} onChange={e => setCategoria(e.target.value)} className="w-full p-2 border rounded mb-2" required>
        {categorias.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <label className="block font-semibold">Partido</label>
      <select value={partidoId} onChange={e => setPartidoId(Number(e.target.value))} className="w-full p-2 border rounded mb-2" required>
        <option value="">Seleccione Partido</option>
        {partidos.flatMap(f =>
          f.partidos.map(p => (
            <option key={p.jornada + p.club1 + p.club2} value={p.jornada}>
              Jornada {p.jornada} - {p.club1} vs {p.club2}
            </option>
          ))
        )}
      </select>
      <label className="block font-semibold">Monto a pagar</label>
      <input
        type="number"
        min={montoMinimo}
        value={monto}
        onChange={e => setMonto(Number(e.target.value))}
        placeholder={`Monto mínimo: $${montoMinimo}`}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <label className="block font-semibold">Número de comprobante</label>
      <input
        type="text"
        value={comprobante}
        onChange={e => setComprobante(e.target.value)}
        placeholder="Ej: 12345678"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <label className="block font-semibold">Adjuntar comprobante (opcional)</label>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileUpload}
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
        Registrar Pago
      </button>
    </form>
  );
};

export default FormularioArbitraje;