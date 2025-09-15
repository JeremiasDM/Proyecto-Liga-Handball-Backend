import React, { useEffect, useState } from "react";
import FormularioNoticia from "./FormularioNoticia";
import NoticiasLista from "./NoticiasLista";
import CarrouselNoticias from "./CarruselNoticias";

type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
};

const NoticiasPage: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    const guardadas = localStorage.getItem("noticias");
    if (guardadas) setNoticias(JSON.parse(guardadas));
  }, []);

  useEffect(() => {
    localStorage.setItem("noticias", JSON.stringify(noticias));
  }, [noticias]);

  const handleGuardar = (nueva: Noticia) => {
    setNoticias([...noticias, nueva]);
  };

  const handleEliminar = (id: number) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta noticia?")) return;
    setNoticias(noticias.filter((n) => n.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Noticias</h2>

      <FormularioNoticia onGuardar={handleGuardar} />

      <NoticiasLista noticias={noticias} onEliminar={handleEliminar} />

      <h3 className="mt-6 mb-2 font-bold">Últimas Noticias</h3>
      <CarrouselNoticias noticias={noticias} />
    </div>
  );
};

export default NoticiasPage;
