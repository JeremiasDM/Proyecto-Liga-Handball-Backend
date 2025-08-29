import React from "react";
import type { Noticia } from "../types/types";

type Props = {
  noticias: Noticia[];
  onVer: (n: Noticia) => void;
  onEditar: (n: Noticia) => void;
  onEliminar: (id: number) => void;
};

const NoticiasLista: React.FC<Props> = ({ noticias, onVer, onEditar, onEliminar }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {noticias.map((n) => (
        <div
          key={n.id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
        >
          {n.imagenUrl && (
            <img
              src={n.imagenUrl}
              alt={n.titulo}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-3 space-y-2">
            <h4 className="font-semibold text-lg">{n.titulo}</h4>
            <small className="text-gray-500">
              {new Date(n.fecha).toLocaleDateString()}
            </small>
            <p className="text-gray-700 text-sm line-clamp-3">{n.resumen}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onVer(n)}
                className="text-blue-600 hover:underline"
              >
                Ver más
              </button>
              <button
                onClick={() => onEditar(n)}
                className="text-yellow-600 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => onEliminar(n.id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticiasLista;
