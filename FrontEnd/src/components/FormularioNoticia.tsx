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
    <form onSubmit={handleSubmit}>
      <h3>{noticia ? "Editar Noticia" : "Nueva Noticia"}</h3>
      <input placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      <textarea placeholder="Resumen" value={resumen} onChange={(e) => setResumen(e.target.value)} required />
      <textarea placeholder="Contenido completo" value={contenido} onChange={(e) => setContenido(e.target.value)} required />
      <input type="file" accept="image/*" onChange={handleImagen} />
      {imagenUrl && <img src={imagenUrl} alt="preview" style={{ width: "100%", maxHeight: 200, objectFit: "cover", marginTop: 10 }} />}
      <br />
      <button type="submit">Guardar</button>
      {onCancelar && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
};

export default FormularioNoticia;