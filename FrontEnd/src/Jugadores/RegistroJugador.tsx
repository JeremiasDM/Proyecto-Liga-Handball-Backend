import React, { useState } from "react";
import type { Rol } from "../types/types";

type Props = {
  onRegistrar: (jugador: any) => void;
  rolUsuario: Rol; 
};

const RegistroJugador: React.FC<Props> = ({ onRegistrar, rolUsuario }) => {
  const [jugador, setJugador] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    club: "",
    categoria: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    
    if ((name === "nombre" || name === "apellido") && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "dni" && !/^\d{0,8}$/.test(value)) return; // hasta 8 números

    setJugador({ ...jugador, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!jugador.nombre || !jugador.apellido || !jugador.dni || !jugador.club || !jugador.categoria) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Guardar en MySQL (datos tabulares)
    // FUTURO: API → POST /jugadores { jugador }

    // Guardar en NoSQL (documentos relacionados: carnet, ficha médica)
    // FUTURO: Subida a Mongo

    onRegistrar(jugador);
    setJugador({ nombre: "", apellido: "", dni: "", club: "", categoria: "" });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Registro de Jugador</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre"
          placeholder="Nombre"
          value={jugador.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="apellido"
          placeholder="Apellido"
          value={jugador.apellido}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="dni"
          placeholder="DNI"
          value={jugador.dni}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="club"
          placeholder="Club"
          value={jugador.club}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="categoria"
          value={jugador.categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione Categoría</option>
          <option value="Infantil">Infantil</option>
          <option value="Juvenil">Juvenil</option>
          <option value="Mayor">Mayor</option>
        </select>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>

          
          {rolUsuario === "Presidenta" && (
            <button
              type="button"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Subir Documentación
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistroJugador;
