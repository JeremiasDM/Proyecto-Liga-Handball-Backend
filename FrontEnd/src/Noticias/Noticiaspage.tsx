import React, { useState, useEffect } from "react";
import type { Noticia } from "../types/types";
import FormularioNoticia from "./FormularioNoticia";
import NoticiasLista from "./NoticiasLista";
import CarruselNoticias from "./CarruselNoticias";

const NoticiasPage: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [editando, setEditando] = useState<Noticia | null>(null);
  const [viendo, setViendo] = useState<Noticia | null>(null);

  useEffect(() => {
    const guardadas = localStorage.getItem("noticias");
    if (guardadas) {
      setNoticias(JSON.parse(guardadas));
    }

    // FUTURO: reemplazar por fetch a backend
    /*
    fetch("/api/noticias")
      .then(res => res.json())
      .then(data => setNoticias(data))
      .catch(err => console.error(err));
    */
  }, []);

  // -------------------------
  // Guardar en localStorage (solo mock)
  // -------------------------
  useEffect(() => {
    localStorage.setItem("noticias", JSON.stringify(noticias));
  }, [noticias]);
// CRUD preparado

  const agregarNoticia = (noticia: Noticia) => {
    if (noticias.length >= 5) {
      alert("Solo se permiten 5 noticias. Elimina una antes de agregar otra.");
      return;
    }
    setNoticias([...noticias, noticia]);

    // FUTURO: POST al backend
    // fetch("/api/noticias", { method: "POST", body: JSON.stringify(noticia) })
  };

  const actualizarNoticia = (noticia: Noticia) => {
    setNoticias(noticias.map((n) => (n.id === noticia.id ? noticia : n)));
    setEditando(null);

    // FUTURO: PUT al backend
    // fetch(`/api/noticias/${noticia.id}`, { method: "PUT", body: JSON.stringify(noticia) })
  };

  const eliminarNoticia = (id: number) => {
    if (window.confirm("¿Seguro que querés eliminar esta noticia?")) {
      setNoticias(noticias.filter((n) => n.id !== id));
      setViendo(null);

      // FUTURO: DELETE al backend
      // fetch(`/api/noticias/${id}`, { method: "DELETE" })
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center">Noticias</h2>

      {/* Carrusel solo si hay noticias */}
      {noticias.length > 0 && <CarruselNoticias noticias={noticias} />}

      {viendo ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <button
            onClick={() => setViendo(null)}
            className="mb-2 text-blue-600 hover:underline"
          >
            ← Volver
          </button>
          <h3 className="text-xl font-semibold">{viendo.titulo}</h3>
          <small className="text-gray-500">
            {new Date(viendo.fecha).toLocaleDateString()}
          </small>
          {viendo.imagenUrl && (
            <img
              src={viendo.imagenUrl}
              alt={viendo.titulo}
              className="w-full max-h-80 object-cover my-4 rounded-lg"
            />
          )}
          <p className="text-gray-700">{viendo.contenido}</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setEditando(viendo)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={() => eliminarNoticia(viendo.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : editando ? (
        <FormularioNoticia
          noticia={editando}
          onGuardar={actualizarNoticia}
          onCancelar={() => setEditando(null)}
        />
      ) : (
        <>
          <FormularioNoticia onGuardar={agregarNoticia} />
          <hr className="my-4" />
          <NoticiasLista
            noticias={noticias}
            onVer={(n) => setViendo(n)}
            onEditar={(n) => setEditando(n)}
            onEliminar={(id) => eliminarNoticia(id)}
          />
        </>
      )}
    </div>
  );
};

export default NoticiasPage;
