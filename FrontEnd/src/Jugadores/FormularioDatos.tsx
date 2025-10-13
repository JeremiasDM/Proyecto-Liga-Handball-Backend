import React, { useState } from "react";
import type { Jugador } from "../types/types";
import { validarJugador } from "../utils/validaciones";

type Props = {
  jugador: Jugador;
  onGuardar: (jugador: Jugador) => void;
  onCancelar: () => void;
  jugadores?: Jugador[];
};

const FormularioDatos: React.FC<Props> = ({ jugador, onGuardar, onCancelar, jugadores = [] }) => {
  const [form, setForm] = useState<Jugador>({ ...jugador });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === "nombre" || name === "apellido") && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "dni" && !/^\d{0,8}$/.test(value)) return;
    if (name === "telefono" && !/^\d{0,15}$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.apellido.trim() || !form.dni.trim() || !form.club.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (form.nombre.trim().length < 2 || form.apellido.trim().length < 2) {
      alert("El nombre y apellido deben tener al menos 2 caracteres.");
      return;
    }

    if (!/^\d{7,8}$/.test(form.dni)) {
      alert("El DNI debe tener 7 u 8 dígitos.");
      return;
    }

    if (form.telefono && !/^\d{7,15}$/.test(form.telefono)) {
      alert("El teléfono debe tener entre 7 y 15 dígitos numéricos.");
      return;
    }

    if (form.vencimiento) {
      const fecha = new Date(form.vencimiento);
      if (isNaN(fecha.getTime()) || fecha <= new Date()) {
        alert("La fecha de vencimiento debe ser válida y futura.");
        return;
      }
    }

    onGuardar(form);
    onCancelar();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
      <h4>Editar Datos del Jugador</h4>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
      <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
      <input name="club" placeholder="Club" value={form.club} onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" value={form.telefono || ""} onChange={handleChange} />
      <input type="date" name="vencimiento" value={form.vencimiento || ""} onChange={handleChange} />
      <div style={{ marginTop: 10 }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioDatos;
