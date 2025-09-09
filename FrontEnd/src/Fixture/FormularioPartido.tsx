import React, { useState } from "react";

export interface Partido {
  id?: number;
  jornada: number;
  grupo: string;
  categoria: "Masculino" | "Femenino";
  club1: string;
  club2: string;
  hora: string;
  resultado?: string;
  estado: "Pendiente" | "En juego" | "Finalizado";
}

interface Props {
  onSubmit: (partido: Partido) => void;
  partidoInicial?: Partido;
}

const FormularioPartido: React.FC<Props> = ({ onSubmit, partidoInicial }) => {
  const [form, setForm] = useState<Partido>(
    partidoInicial || {
      jornada: 1,
      grupo: "",
      categoria: "Masculino",
      club1: "",
      club2: "",
      hora: "",
      resultado: "",
      estado: "Pendiente",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.club1 || !form.club2 || !form.hora) {
      alert("Todos los campos obligatorios deben completarse.");
      return;
    }

    onSubmit(form);
    setForm({
      jornada: 1,
      grupo: "",
      categoria: "Masculino",
      club1: "",
      club2: "",
      hora: "",
      resultado: "",
      estado: "Pendiente",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="number"
        name="jornada"
        placeholder="Jornada"
        value={form.jornada}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="grupo"
        placeholder="Grupo"
        value={form.grupo}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="categoria"
        value={form.categoria}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
      <input
        type="text"
        name="club1"
        placeholder="Club 1"
        value={form.club1}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="club2"
        placeholder="Club 2"
        value={form.club2}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="time"
        name="hora"
        value={form.hora}
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
        <option value="Pendiente">Pendiente</option>
        <option value="En juego">En juego</option>
        <option value="Finalizado">Finalizado</option>
      </select>
      <input
        type="text"
        name="resultado"
        placeholder="Resultado (opcional)"
        value={form.resultado}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        Guardar Partido
      </button>
    </form>
  );
};

export default FormularioPartido;
