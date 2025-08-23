import React, { useState, useEffect } from "react";
import type { Noticia } from "./types";
import FormularioNoticia from "./FormularioNoticia";
import NoticiasLista from "./NoticiasLista";

const NoticiasPage: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [editando, setEditando] = useState<Noticia | null>(null);
  const [viendo, setViendo] = useState<Noticia | null>(null);

  useEffect(() => {
    const guardadas = localStorage.getItem("noticias");
    if (guardadas) setNoticias(JSON.parse(guardadas));
  }, []);

  useEffect(() => {
    localStorage.setItem("noticias", JSON.stringify(noticias));
  }, [noticias]);

  const agregarNoticia = (noticia: Noticia) => {
    if (noticias.length >= 5) {
      alert("Solo se permiten 5 noticias. Elimina una antes de agregar otra.");
      return;
    }
    setNoticias([...noticias, noticia]);
  };

  const actualizarNoticia = (noticia: Noticia) => {
    setNoticias(noticias.map((n) => (n.id === noticia.id ? noticia : n)));
    setEditando(null);
  };

  const eliminarNoticia = (id: number) => {
    if (window.confirm("¿Seguro que querés eliminar esta noticia?")) {
      setNoticias(noticias.filter((n) => n.id !== id));
      setViendo(null);
    }
  };

  return (
    <div>
      <h2>Noticias</h2>

      {viendo ? (
        <div>
          <button onClick={() => setViendo(null)}>← Volver</button>
          <h3>{viendo.titulo}</h3>
          <small>{new Date(viendo.fecha).toLocaleDateString()}</small>
          <img src={viendo.imagenUrl} alt={viendo.titulo} style={{ width: "100%", maxHeight: 300, objectFit: "cover" }} />
          <p>{viendo.contenido}</p>
          <button onClick={() => setEditando(viendo)}>Editar</button>
          <button onClick={() => eliminarNoticia(viendo.id)}>Eliminar</button>
        </div>
      ) : editando ? (
        <FormularioNoticia noticia={editando} onGuardar={actualizarNoticia} onCancelar={() => setEditando(null)} />
      ) : (
        <>
          <FormularioNoticia onGuardar={agregarNoticia} />
          <hr />
          <NoticiasLista noticias={noticias} onVer={(n) => setViendo(n)} onEditar={(n) => setEditando(n)} onEliminar={(id) => eliminarNoticia(id)} />
        </>
      )}
    </div>
  );
};

export default NoticiasPage;