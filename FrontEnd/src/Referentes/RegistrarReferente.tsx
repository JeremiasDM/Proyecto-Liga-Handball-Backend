import React, { useState } from "react";
import type { Referente } from "../types/types";
import { validarReferente } from "../utils/validaciones";

type Props = {
  onGuardar: (referente: Referente) => void;
};

const categorias = ["Masculino", "Femenino"];

const RegistrarReferente: React.FC<Props> = ({ onGuardar }) => {
  const [form, setForm] = useState<Referente>({
    id: Date.now(),
    nombre: "",
    apellido: "",
    categoria: "Masculino",
    dni: "",
    correo: "",
    equipo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validarReferente(form, []);
    if (error) {
      alert(error);
      return;
    }
    onGuardar({ ...form, id: Date.now() });
    setForm({
      id: Date.now(),
      nombre: "",
      apellido: "",
      categoria: "Masculino",
      dni: "",
      correo: "",
      equipo: "",
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Registrar Referente</h2>
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Guardar</button>
      </form>
    </div>
  );
};

export default RegistrarReferente;
