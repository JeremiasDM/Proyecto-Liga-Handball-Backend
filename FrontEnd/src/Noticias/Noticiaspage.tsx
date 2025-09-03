import React, { useEffect, useState } from "react";
import CarruselNoticias from "./CarruselNoticias";
import FormularioNoticia, { Noticia } from "./FormularioNoticia";
import NoticiasLista from "./NoticiasLista";

const NoticiasPage: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    setNoticias([
      {
        id: 1,
        titulo: "Inicio del Torneo Clausura",
        resumen: "La Liga de Handball de Punilla da inicio a su Torneo Clausura 2025.",
        contenido: "Con gran entusiasmo, la liga da comienzo al torneo Clausura...",
        imagenUrl: "/noticias/torneo.jpg",
        fecha: "2025-09-01",
      },
      {
        id: 2,
        titulo: "Capacitación de Árbitros",
        resumen: "Se realizó una capacitación intensiva para árbitros de la liga.",
        contenido: "El curso incluyó teoría y práctica sobre reglamentos actualizados...",
        imagenUrl: "/noticias/arbitros.jpg",
        fecha: "2025-08-25",
      },
    ]);
  }, []);

  const agregarNoticia = (nueva: Noticia) => {
    setNoticias([nueva, ...noticias]);
  };

  const eliminarNoticia = (id: number) => {
    setNoticias(noticias.filter((n) => n.id !== id));
  };

  const editarNoticia = (id: number, datos: Partial<Noticia>) => {
    setNoticias(noticias.map((n) => (n.id === id ? { ...n, ...datos } : n)));
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-900">
        Noticias de la Liga de Handball de Punilla
      </h1>

      <CarruselNoticias noticias={noticias} onEditar={(n) => editarNoticia(n.id, n)} onEliminar={eliminarNoticia} />

      <FormularioNoticia onGuardar={agregarNoticia} />

      <NoticiasLista noticias={noticias} onEliminar={eliminarNoticia} onEditar={(n) => editarNoticia(n.id, n)} />
    </div>
  );
};

export default NoticiasPage;
