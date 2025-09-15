import React from "react";

type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
};

type Props = {
  noticias: Noticia[];
  onEliminar: (id: number) => void;
};

const NoticiasLista: React.FC<Props> = ({ noticias, onEliminar }) => {
  if (noticias.length === 0) return <p>No hay noticias cargadas.</p>;

  const noticiasOrdenadas = [...noticias].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return (
    <div className="space-y-3 mt-4">
      {noticiasOrdenadas.map((n) => (
        <div key={n.id} className="p-3 border rounded bg-gray-50 flex justify-between">
          <div>
            <h4 className="font-bold">{n.titulo}</h4>
            <p className="text-sm text-gray-500">{n.fecha}</p>
            <p>{n.contenido}</p>
          </div>
          <button
            onClick={() => onEliminar(n.id)}
            className="px-3 py-1 bg-red-600 text-white rounded h-fit"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoticiasLista;
