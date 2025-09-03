import React, { useState } from "react";
import type { Noticia } from "./FormularioNoticia";

type Props = {
  noticias: Noticia[];
  onEditar: (noticia: Noticia) => void;
  onEliminar: (id: number) => void;
};

const CarruselNoticias: React.FC<Props> = ({ noticias, onEditar, onEliminar }) => {
  const [indice, setIndice] = useState(0);

  if (!Array.isArray(noticias) || noticias.length === 0) {
    return <p className="text-center text-gray-500">No hay noticias disponibles.</p>;
  }

  const noticiasValidas = noticias.filter((n) => n.titulo && n.imagenUrl && n.resumen);
  const avanzar = () => setIndice((prev) => (prev + 1) % noticiasValidas.length);
  const retroceder = () => setIndice((prev) => (prev - 1 + noticiasValidas.length) % noticiasValidas.length);

  const noticia = noticiasValidas[indice];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <img src={noticia.imagenUrl} alt={noticia.titulo} className="w-full h-64 object-cover" />
        <div className="p-4 text-center">
          <h3 className="text-xl font-bold text-gray-800">{noticia.titulo}</h3>
          <p className="text-gray-600">{noticia.resumen}</p>
          <small className="text-xs text-gray-400">
            {new Date(noticia.fecha).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </small>
          <div className="flex gap-2 justify-center mt-3">
            <button onClick={() => onEditar(noticia)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Editar
            </button>
            <button onClick={() => onEliminar(noticia.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <button onClick={retroceder} className="absolute top-1/2 -left-8 bg-black text-white rounded-full w-10 h-10">‹</button>
      <button onClick={avanzar} className="absolute top-1/2 -right-8 bg-black text-white rounded-full w-10 h-10">›</button>
    </div>
  );
};

export default CarruselNoticias;
