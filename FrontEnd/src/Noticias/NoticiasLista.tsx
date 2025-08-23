import React from "react";
import type { Noticia } from "./types";

type Props = {
  noticias: Noticia[];
  onVer: (n: Noticia) => void;
  onEditar: (n: Noticia) => void;
  onEliminar: (id: number) => void;
};

const NoticiasLista: React.FC<Props> = ({ noticias, onVer, onEditar, onEliminar }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
      {noticias.map((n) => (
        <div
          key={n.id}
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {n.imagenUrl && (
            <img
              src={n.imagenUrl}
              alt={n.titulo}
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
          )}
          <div style={{ padding: "1rem", flex: 1 }}>
            <h4 style={{ marginBottom: "0.5rem", color: "#1f3c88" }}>{n.titulo}</h4>
            <small style={{ color: "#777" }}>{new Date(n.fecha).toLocaleDateString()}</small>
            <p style={{ margin: "0.75rem 0", fontSize: "0.95rem", color: "#555" }}>{n.resumen}</p>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto" }}>
              <button onClick={() => onVer(n)}>Ver más</button>
              <button onClick={() => onEditar(n)}>Editar</button>
              <button onClick={() => onEliminar(n.id)}>Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticiasLista;
