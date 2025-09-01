import React, { useState } from "react";

type Jugador = {
  id: number;
  nombre: string;
  apellido: string;
  club: string;
  dni: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
};

type Props = {
  jugador: Jugador;
  onGuardar: (jugador: Jugador) => void;
  onCancelar: () => void;
};

// Simulación de rol
const rolActual = localStorage.getItem("rol") || "Referente";

const FormularioDatos: React.FC<Props> = ({ jugador, onGuardar, onCancelar }) => {
  const [form, setForm] = useState<Jugador>({ ...jugador });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.dni || !form.club) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    if (rolActual !== "Presidenta") {
      alert("No tienes permisos para guardar cambios.");
      return;
    }
    onGuardar(form);
    onCancelar();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
      <h4>Editar Datos del Jugador</h4>
      <input
        name="nombre"
        placeholder="Nombre"
        value={form.nombre}
        onChange={handleChange}
      />
      <input
        name="apellido"
        placeholder="Apellido"
        value={form.apellido}
        onChange={handleChange}
      />
      <input
        name="dni"
        placeholder="DNI"
        value={form.dni}
        onChange={handleChange}
      />
      <input
        name="club"
        placeholder="Club"
        value={form.club}
        onChange={handleChange}
      />

      <div style={{ marginTop: 10 }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioDatos;
