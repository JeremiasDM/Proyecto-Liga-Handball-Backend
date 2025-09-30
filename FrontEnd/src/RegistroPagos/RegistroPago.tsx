import React, { useState } from "react";
import type { Pago, Fixture } from "../types/types";
import { usePagos } from "../hooks/usePagos";

type Props = {
  clubes: string[];
  partidos: Fixture[]; 
  montoMinimo: number;
};

const RegistroPago: React.FC<Props> = ({ clubes, partidos, montoMinimo }) => {
  const { agregar } = usePagos();
  const [club, setClub] = useState("");
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
    if (!club || !partidoId || !comprobante || monto < montoMinimo) {
      alert("Completa todos los campos y verifica el monto.");
      return;
    }
    const pago: Pago = {
      id: Date.now(),
      club,
      partidoId: Number(partidoId),
      monto,
      comprobante,
      comprobanteArchivo,
      fecha: new Date().toISOString(),
      estado: "pendiente"
    };
    agregar(pago);
    setClub("");
    setPartidoId("");
    setMonto(montoMinimo);
    setComprobante("");
    setComprobanteArchivo(undefined);
    alert("Pago registrado correctamente.");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4 text-center">Registro de Pago</h2>
      <select value={club} onChange={e => setClub(e.target.value)} className="w-full p-2 border rounded" required>
        <option value="">Seleccione Club</option>
        {clubes.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={partidoId} onChange={e => setPartidoId(Number(e.target.value))} className="w-full p-2 border rounded" required>
        <option value="">Seleccione Partido</option>
        {partidos.map(p => (
          <option key={p.fecha + p.lugar} value={p.partidos[0]?.jornada}>
            {p.lugar} - {p.fecha}
          </option>
        ))}
      </select>
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

export default RegistroPago;