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
        <input
          name="club"
          placeholder="Club"
          value={form.club}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="partidoId"
          type="number"
          placeholder="ID Partido"
          value={form.partidoId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="monto"
          type="number"
          min={montoMinimo}
          placeholder="Monto"
          value={form.monto}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="comprobante"
          placeholder="Comprobante"
          value={form.comprobante}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="w-full p-2 border rounded"
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