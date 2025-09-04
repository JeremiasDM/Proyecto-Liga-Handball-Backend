import React from "react";
import type { Referente } from "./ReferentesPage";

interface Props {
  referentes: Referente[];
  onVer: (referente: Referente) => void;
  onEditar: (referente: Referente) => void;
  onEliminar: (id: number) => void;
}

const ListaReferente: React.FC<Props> = ({ referentes, onVer, onEditar, onEliminar }) => {
  if (referentes.length === 0) {
    return <p className="text-gray-600">No hay referentes registrados.</p>;
  }

  return (
    <div className="space-y-4">
      {referentes.map((ref) => (
        <div
          key={ref.id}
          className="p-4 bg-white shadow rounded flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {ref.nombre} {ref.apellido} – {ref.equipo}
            </p>
            <p className="text-sm text-gray-500">{ref.correo}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onVer(ref)}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Ver
            </button>
            <button
              onClick={() => onEditar(ref)}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(ref.id)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaReferente;
