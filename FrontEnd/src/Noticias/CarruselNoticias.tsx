import React, { useState, useEffect, useRef } from "react";
import type { Noticia } from "./types/Noticia";

const placeholderImg = "https://via.placeholder.com/800x400?text=Sin+imagen";

const CarruselNoticias: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const carruselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const guardadas = localStorage.getItem("noticias");
    if (guardadas) {
      try {
        const noticiasParseadas = JSON.parse(guardadas)
          .filter(
            (n: any) =>
              n &&
              typeof n.titulo === "string" &&
              typeof n.resumen === "string"
          )
          .slice(0, 5);
        setNoticias(noticiasParseadas);
      } catch {
        setNoticias([]);
      }
    }
  }, []);

  useEffect(() => {
    if (noticias.length > 1 && !pausado) {
      const timer = setInterval(() => {
        setIndice((prev) => (prev + 1) % noticias.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [noticias, pausado]);

  if (noticias.length === 0) {
    return <p>No hay noticias para mostrar.</p>;
  }

  const noticiaActual = noticias[indice];

  return (
    <div
      ref={carruselRef}
      style={{ position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" }}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      aria-label="Carrusel de noticias"
    >
      <div style={{ position: "relative" }}>
        <img
          src={noticiaActual.imagenUrl || placeholderImg}
          alt={noticiaActual.titulo || "Imagen de noticia"}
          style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }}
        />
        <div style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          padding: "1rem",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px"
        }}>
          <h3>{noticiaActual.titulo || "Sin título"}</h3>
          <p>{noticiaActual.resumen || "Sin resumen disponible."}</p>
        </div>
      </div>

      <button
        onClick={() => setIndice((prev) => (prev - 1 + noticias.length) % noticias.length)}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer"
        }}
        aria-label="Anterior noticia"
      >
        ◀
      </button>
      <button
        onClick={() => setIndice((prev) => (prev + 1) % noticias.length)}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer"
        }}
        aria-label="Siguiente noticia"
      >
        ▶
      </button>
      <div style={{
        position: "absolute",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "6px"
      }}>
        {noticias.map((_, i) => (
          <span
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: i === indice ? "#fff" : "#888",
              display: "inline-block",
              border: "1px solid #333"
            }}
            aria-label={`Ir a la noticia ${i + 1}`}
            tabIndex={0}
            onClick={() => setIndice(i)}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") setIndice(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarruselNoticias;
