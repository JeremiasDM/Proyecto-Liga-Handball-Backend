import React, { useState } from "react";

export type Jugador = {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  club: string;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
};

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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if ((name === "nombre" || name === "apellido") && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "dni" && !/^\d{0,8}$/.test(value)) return;
    if (name === "telefono" && !/^\d{0,15}$/.test(value)) return;

    setJugador({ ...jugador, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !jugador.nombre.trim() ||
      !jugador.apellido.trim() ||
      !jugador.dni.trim() ||
      !jugador.club.trim() ||
      !jugador.categoria
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (jugador.nombre.trim().length < 2 || jugador.apellido.trim().length < 2) {
      alert("El nombre y apellido deben tener al menos 2 caracteres.");
      return;
    }

    if (!/^\d{7,8}$/.test(jugador.dni)) {
      alert("El DNI debe tener 7 u 8 dígitos numéricos.");
      return;
    }

    if (jugador.telefono && !/^\d{7,15}$/.test(jugador.telefono)) {
      alert("El teléfono debe tener entre 7 y 15 dígitos numéricos.");
      return;
    }

    if (jugador.vencimiento) {
      const fecha = new Date(jugador.vencimiento);
      if (isNaN(fecha.getTime()) || fecha <= new Date()) {
        alert("La fecha de vencimiento debe ser válida y posterior a hoy.");
        return;
      }
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
          <option value="Infantil">Infantil</option>
          <option value="Juvenil">Juvenil</option>
          <option value="Mayor">Mayor</option>
        </select>
        <input name="telefono" placeholder="Teléfono" value={jugador.telefono} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="vencimiento" value={jugador.vencimiento} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Guardar</button>
      </form>
    </div>
  );
};

export default RegistroJugador;
