import React, { useState } from "react";

// Inlined Jugador type (previously from src/Types/types.ts)
type Jugador = {
  estado?: string;
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  club: string;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
};

// Inlined validarJugador (previously from src/utils/validaciones.ts)
function validarJugador(nuevo: Jugador, jugadores: Jugador[]): string | null {
  if (jugadores.some(j => j.dni === nuevo.dni && j.id !== nuevo.id)) {
    return "El DNI ingresado ya pertenece a otro jugador.";
  }

  if (nuevo.telefono && jugadores.some(j => j.telefono === nuevo.telefono && j.id !== nuevo.id)) {
    return "El teléfono ingresado ya pertenece a otro jugador.";
  }

  if (
    !nuevo.nombre.trim() ||
    !nuevo.apellido.trim() ||
    !nuevo.dni.trim() ||
    !nuevo.club.trim() ||
    !nuevo.categoria
  ) {
    return "Todos los campos son obligatorios.";
  }

  if (nuevo.nombre.trim().length < 2 || nuevo.apellido.trim().length < 2) {
    return "El nombre y apellido deben tener al menos 2 caracteres.";
  }

  if (!/^\d{7,8}$/.test(nuevo.dni)) {
    return "El DNI debe tener 7 u 8 dígitos numéricos.";
  }

  if (nuevo.telefono && !/^\d{7,15}$/.test(nuevo.telefono)) {
    return "El teléfono debe tener entre 7 y 15 dígitos numéricos.";
  }

  if (nuevo.vencimiento) {
    const fecha = new Date(nuevo.vencimiento);
    if (isNaN(fecha.getTime()) || fecha <= new Date()) {
      return "La fecha de vencimiento debe ser válida y posterior a hoy.";
    }
  }
  return null;
}

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
    estado: "activo"
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
    onRegistrar({ ...jugador, id: Date.now(), estado: "activo" });
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
      estado: "activo"
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
