import React from "react";
import type { Fixture } from "../types/types";
import PartidoItem from "./PartidoItem";

type Props = {
  fixtures: Fixture[];
  onEdit?: (fixture: Fixture, index: number) => void;
};

const ListaFixture: React.FC<Props> = ({ fixtures, onEdit }) => {
  if (fixtures.length === 0) {
    return <p className="text-gray-500">No hay fixtures registrados.</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-xl">
      <h3 className="text-xl font-bold mb-4 text-blue-900">Listado de Fixtures</h3>
      {fixtures.map((fixture, i) => (
        <div
          key={i}
          className="mb-6 bg-white rounded-xl p-4 shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span>
              <strong>Fecha:</strong> {fixture.fecha} | <strong>Lugar:</strong> {fixture.lugar}
            </span>
            {onEdit && (
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => onEdit(fixture, i)}
              >
                Editar
              </button>
            )}
          </div>
          <ul className="pl-4 mt-2">
            {fixture.partidos.map((p, j) => (
              <PartidoItem key={j} partido={p} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListaFixture;
