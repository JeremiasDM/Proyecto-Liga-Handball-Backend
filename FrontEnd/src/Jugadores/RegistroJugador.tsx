import React, { useState } from "react";
import type { Jugador } from "../types/types";
import { validarJugador } from "../utils/validaciones";

type Props = {
  onRegistrar: (jugador: Jugador) => void;
};

const RegistroJugador: React.FC<Props> = ({ onRegistrar }) => {
  const [jugador, setJugador] = useState<Jugador>({
    id: Date.now(),
    nombre: "",
    apellido: "",
    dni: "",
    club: "",
    categoria: "",
    telefono: "",
    vencimiento: "",
    carnetUrl: undefined,
    fichaMedicaUrl: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJugador({ ...jugador, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validarJugador(jugador, []);
    if (error) {
      alert(error);
      return;
    }
    onRegistrar({ ...jugador, id: Date.now() });
    setJugador({
      id: Date.now(),
      nombre: "",
      apellido: "",
      dni: "",
      club: "",
      categoria: "",
      telefono: "",
      vencimiento: "",
      carnetUrl: undefined,
      fichaMedicaUrl: undefined,
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Registro de Jugador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" placeholder="Nombre" value={jugador.nombre} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="apellido" placeholder="Apellido" value={jugador.apellido} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="dni" placeholder="DNI" value={jugador.dni} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="club" placeholder="Club" value={jugador.club} onChange={handleChange} className="w-full p-2 border rounded" required />
        <select name="categoria" value={jugador.categoria} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Seleccione Categoría</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
        </select>
        <input name="telefono" placeholder="Teléfono" value={jugador.telefono} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="vencimiento" value={jugador.vencimiento} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Guardar</button>
      </form>
    </div>
  );
};

export default RegistroJugador;