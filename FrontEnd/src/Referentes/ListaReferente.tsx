import React from "react";
import type { Referente } from "../types/types";

interface Props {
  referentes: Referente[];
  onVer: (referente: Referente) => void;
  onEditar?: (referente: Referente) => void;
  onEliminar?: (id: number) => void;
}

const ListaReferente: React.FC<Props> = ({ referentes, onVer, onEditar, onEliminar }) => {
  if (!referentes || referentes.length === 0) {
    return <p className="text-gray-500">No hay referentes registrados.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse shadow bg-white rounded-xl">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">Equipo</th>
            <th className="p-2">Correo</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {referentes.map((ref) => (
            <tr key={ref.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{ref.nombre}</td>
              <td className="p-2">{ref.apellido}</td>
              <td className="p-2">{ref.equipo}</td>
              <td className="p-2">{ref.correo}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => onVer(ref)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Ver
                </button>
                {onEditar && (
                  <button
                    onClick={() => onEditar(ref)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                )}
                {onEliminar && (
                  <button
                    onClick={() => onEliminar(ref.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaReferente;
