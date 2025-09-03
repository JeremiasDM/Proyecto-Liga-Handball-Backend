import React from "react";
import type { Noticia } from "./FormularioNoticia";

type Props = {
  noticias: Noticia[];
  onEditar: (noticia: Noticia) => void;
  onEliminar: (id: number) => void;
};

const NoticiasLista: React.FC<Props> = ({ noticias, onEditar, onEliminar }) => {
  if (!Array.isArray(noticias) || noticias.length === 0) {
    return <p className="text-gray-500">No hay noticias publicadas.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {noticias.map((noticia) => (
        <div key={noticia.id} className="bg-white p-4 rounded-xl shadow flex flex-col">
          {noticia.imagenUrl && (
            <img src={noticia.imagenUrl} alt={noticia.titulo} className="rounded-lg mb-3 h-40 object-cover" />
          )}
          <h3 className="text-lg font-bold text-gray-800">{noticia.titulo}</h3>
          <p className="text-sm text-gray-600">{noticia.resumen}</p>
          <small className="text-xs text-gray-400 mb-2">
            {new Date(noticia.fecha).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </small>
          <p className="text-sm text-gray-700 flex-1">{noticia.contenido}</p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => onEditar(noticia)} className="flex-1 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
              Editar
            </button>
            <button onClick={() => onEliminar(noticia.id)} className="flex-1 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticiasLista;
