import React from "react";
import PartidoItem from "./PartidoItem";
import type { Partido } from "./FormularioPartido";

interface Props {
  partidos: Partido[];
  onEditar: (partido: Partido) => void;
  onEliminar: (id: number) => void;
}

const ListaFixture: React.FC<Props> = ({ partidos, onEditar, onEliminar }) => {
  if (partidos.length === 0) {
    return <p>No hay partidos cargados.</p>;
  }

  // Ordenar por jornada y hora
  const partidosOrdenados = [...partidos].sort((a, b) => {
    if (a.jornada !== b.jornada) return a.jornada - b.jornada;
    if (a.hora && b.hora) return a.hora.localeCompare(b.hora);
    return 0;
  });

  return (
    <div className="space-y-3 mt-4">
      {partidosOrdenados.map((p) => (
        <div key={p.id} className="flex justify-between items-center p-3 bg-gray-50 border rounded">
          <PartidoItem partido={p} />
          <div className="space-x-2">
            <button onClick={() => onEditar(p)} className="px-3 py-1 bg-blue-600 text-white rounded">
              Editar
            </button>
            <button onClick={() => onEliminar(p.id!)} className="px-3 py-1 bg-red-600 text-white rounded">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaFixture;
