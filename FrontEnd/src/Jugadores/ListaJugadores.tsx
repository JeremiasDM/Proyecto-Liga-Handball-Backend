import React, { useState } from "react";
import type { Jugador } from "./FormularioDatos";

type Props = {
  jugadores: Jugador[];
  onEditar?: (jugador: Jugador) => void;
  onEliminar: (id: number) => void;
};

const ListaJugadores: React.FC<Props> = ({ jugadores, onEditar, onEliminar }) => {
  if (!jugadores || jugadores.length === 0) {
    return <p className="text-gray-500">No hay jugadores cargados.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse shadow bg-white rounded-xl">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">Club</th>
            <th className="p-2">DNI</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((j) => (
            <tr key={j.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{j.nombre}</td>
              <td className="p-2">{j.apellido}</td>
              <td className="p-2">{j.club}</td>
              <td className="p-2">{j.dni}</td>
              <td className="p-2 flex gap-2">
                {onEditar && (
                  <button onClick={() => onEditar(j)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Editar
                  </button>
                )}
                <button onClick={() => onEliminar(j.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaJugadores;
