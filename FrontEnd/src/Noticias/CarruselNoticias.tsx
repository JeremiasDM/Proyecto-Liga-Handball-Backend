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
};

const CarrouselNoticias: React.FC<Props> = ({ noticias }) => {
  if (noticias.length === 0) return <p>No hay noticias para mostrar.</p>;

  const ultimas = [...noticias]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5);

  return (
    <div className="flex overflow-x-auto space-x-4 p-2 border rounded bg-gray-100">
      {ultimas.map((n) => (
        <div key={n.id} className="min-w-[200px] p-3 bg-white shadow rounded">
          {n.imagenUrl ? (
            <img src={n.imagenUrl} alt={n.titulo} className="w-full h-32 object-cover rounded" />
          ) : (
            <div className="w-full h-32 bg-gray-300 flex items-center justify-center rounded">
              Sin imagen
            </div>
          )}
          <h4 className="mt-2 font-bold">{n.titulo}</h4>
          <p className="text-xs text-gray-500">{n.fecha}</p>
        </div>
      ))}
    </div>
  );
};

export default CarrouselNoticias;
