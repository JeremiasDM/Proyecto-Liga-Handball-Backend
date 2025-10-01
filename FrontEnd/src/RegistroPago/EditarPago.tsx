import React, { useState } from "react";
import type { Pago } from "../types/types";
import { validarPago } from "../utils/validaciones";

type Props = {
  pago: Pago;
  montoMinimo: number;
  partidos: any[]; 
  onGuardar: (actualizado: Pago) => void;
  onCancelar: () => void;
};

const EditarPago: React.FC<Props> = ({ pago, montoMinimo, partidos, onGuardar, onCancelar }) => {
  const [form, setForm] = useState<Pago>({ ...pago });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "monto" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validarPago(form, montoMinimo, partidos);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    onGuardar(form);
    setError(null);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Editar Pago</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold">Club</label>
        <input
          name="club"
          placeholder="Ej: Club A1"
          value={form.club}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <label className="block font-semibold">ID Partido</label>
        <input
          name="partidoId"
          type="number"
          placeholder="Ej: 1"
          value={form.partidoId}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <label className="block font-semibold">Monto</label>
        <input
          name="monto"
          type="number"
          min={montoMinimo}
          placeholder={`Monto mínimo: $${montoMinimo}`}
          value={form.monto}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <label className="block font-semibold">Comprobante</label>
        <input
          name="comprobante"
          placeholder="Ej: 12345678"
          value={form.comprobante}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <label className="block font-semibold">Fecha</label>
        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
          required
        />
        {form.tipo === "cuota" && (
          <>
            <label className="block font-semibold">Cantidad de jugadores <span className="text-xs text-gray-500">(máx. 80)</span></label>
            <input
              name="cantidadJugadores"
              type="number"
              min={1}
              max={80}
              placeholder="Ej: 25"
              value={form.cantidadJugadores || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
          </>
        )}
        <label className="block font-semibold">Estado</label>
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="pendiente">Pendiente</option>
          <option value="validado">Validado</option>
          <option value="rechazado">Rechazado</option>
        </select>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Guardar Cambios</button>
          <button type="button" onClick={onCancelar} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarPago;