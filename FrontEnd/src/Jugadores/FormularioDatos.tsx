import React, { useState } from "react";
import type { Jugador } from "../types/types";
import { validarJugador } from "../utils/validaciones";

type Props = {
  jugador: Jugador;
  onGuardar: (jugador: Jugador) => void;
  onCancelar: () => void;
  jugadores?: Jugador[]; // Opcional, para validar duplicados si lo necesitas
};

const FormularioDatos: React.FC<Props> = ({ jugador, onGuardar, onCancelar, jugadores = [] }) => {
  const [form, setForm] = useState<Jugador>({ ...jugador });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validarJugador(form, jugadores);
    if (error) {
      alert(error);
      return;
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
