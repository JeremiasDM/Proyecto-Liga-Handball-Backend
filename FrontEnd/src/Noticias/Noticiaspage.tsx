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
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ color: "#1f3c88", marginBottom: "1.5rem" }}>Noticias</h2>

      {viendo ? (
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          <button onClick={() => setViendo(null)} style={{ marginBottom: "1rem" }}>
            ← Volver
          </button>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{viendo.titulo}</h3>
          <small style={{ color: "#777" }}>{new Date(viendo.fecha).toLocaleDateString()}</small>
          <img
            src={viendo.imagenUrl}
            alt={viendo.titulo}
            style={{ width: "100%", maxHeight: 400, objectFit: "cover", margin: "1rem 0", borderRadius: 8 }}
          />
          <p style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>{viendo.contenido}</p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button onClick={() => setEditando(viendo)}>Editar</button>
            <button onClick={() => eliminarNoticia(viendo.id)}>Eliminar</button>
          </div>
        </div>
      ) : editando ? (
        <FormularioNoticia noticia={editando} onGuardar={actualizarNoticia} onCancelar={() => setEditando(null)} />
      ) : (
        <>
          <FormularioNoticia onGuardar={agregarNoticia} />
          <hr style={{ margin: "2rem 0" }} />
          <NoticiasLista noticias={noticias} onVer={(n) => setViendo(n)} onEditar={(n) => setEditando(n)} onEliminar={(id) => eliminarNoticia(id)} />
        </>
      )}
    </div>
  );
};

export default NoticiasPage;
