import React, { useState } from "react";
import type { Referente } from "../types/types";
import { validarReferente } from "../utils/validaciones";

type Props = {
  referente: Referente;
  onActualizar: (referente: Referente) => void;
  onCancelar: () => void;
  referentes?: Referente[]; 
};

const categorias = ["Masculino", "Femenino"];

const EditarReferente: React.FC<Props> = ({ referente, onActualizar, onCancelar, referentes = [] }) => {
  const [form, setForm] = useState<Referente>({ ...referente });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validarReferente(form, referentes);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    onActualizar(form);
    setError(null);
    onCancelar();
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Editar Referente</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="categoria" value={form.categoria} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Seleccione Categoría</option>
          {categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="equipo" placeholder="Equipo" value={form.equipo} onChange={handleChange} className="w-full p-2 border rounded" required />
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Actualizar</button>
          <button type="button" onClick={onCancelar} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarReferente;
