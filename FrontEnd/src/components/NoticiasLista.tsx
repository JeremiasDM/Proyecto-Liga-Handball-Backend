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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1rem" }}>
      {noticias.map((n) => (
        <div key={n.id} style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden" }}>
          {n.imagenUrl && <img src={n.imagenUrl} alt={n.titulo} style={{ width: "100%", height: 150, objectFit: "cover" }} />}
          <div style={{ padding: 10 }}>
            <h4>{n.titulo}</h4>
            <small>{new Date(n.fecha).toLocaleDateString()}</small>
            <p>{n.resumen}</p>
            <button onClick={() => onVer(n)}>Ver más</button>
            <button onClick={() => onEditar(n)}>Editar</button>
            <button onClick={() => onEliminar(n.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticiasLista;
