import React, { useState } from "react";
import type { Noticia } from "./types";

type Props = {
  noticia?: Noticia;
  onGuardar: (n: Noticia) => void;
  onCancelar?: () => void;
};

const FormularioNoticia: React.FC<Props> = ({ noticia, onGuardar, onCancelar }) => {
  const [titulo, setTitulo] = useState(noticia?.titulo || "");
  const [resumen, setResumen] = useState(noticia?.resumen || "");
  const [contenido, setContenido] = useState(noticia?.contenido || "");
  const [imagenUrl, setImagenUrl] = useState(noticia?.imagenUrl || "");

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagenUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !resumen || !contenido) return alert("Completa todos los campos obligatorios");
    const nueva: Noticia = {
      id: noticia?.id || Date.now(),
      titulo,
      resumen,
      contenido,
      imagenUrl,
      fecha: noticia?.fecha || new Date().toISOString(),
    };
    onGuardar(nueva);
    setTitulo("");
    setResumen("");
    setContenido("");
    setImagenUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "1.5rem",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "2rem",
      }}
    >
      <h3 style={{ marginBottom: "1rem", color: "#1f3c88" }}>{noticia ? "Editar Noticia" : "Nueva Noticia"}</h3>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: 8, border: "1px solid #ccc" }}
      />

      <textarea
        placeholder="Resumen"
        value={resumen}
        onChange={(e) => setResumen(e.target.value)}
        required
        rows={2}
        style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: 8, border: "1px solid #ccc" }}
      />

      <textarea
        placeholder="Contenido completo"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        required
        rows={5}
        style={{ width: "100%", padding: "0.75rem", marginBottom: "1rem", borderRadius: 8, border: "1px solid #ccc" }}
      />

      <input type="file" accept="image/*" onChange={handleImagen} style={{ marginBottom: "1rem" }} />

      {imagenUrl && (
        <img
          src={imagenUrl}
          alt="preview"
          style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8, marginBottom: "1rem" }}
        />
      )}

      <div style={{ display: "flex", gap: "1rem" }}>
        <button type="submit" style={{ background: "#1f3c88", color: "white", padding: "0.75rem 1.5rem", border: "none", borderRadius: 8 }}>
          Guardar
        </button>
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            style={{ background: "#ccc", color: "#333", padding: "0.75rem 1.5rem", border: "none", borderRadius: 8 }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioNoticia;
