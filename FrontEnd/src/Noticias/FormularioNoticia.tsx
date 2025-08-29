import React, { useState } from "react";
import type { Noticia } from "../types/types";

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

      // FUTURO: Subir imagen a backend (Mongo)
      /*
      const formData = new FormData();
      formData.append("file", file);
      fetch("/api/upload", { method: "POST", body: formData })
        .then(res => res.json())
        .then(data => setImagenUrl(data.url));
      */
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !resumen || !contenido) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    const nueva: Noticia = {
      id: noticia?.id || Date.now(),
      titulo,
      resumen,
      contenido,
      imagenUrl,
      fecha: noticia?.fecha || new Date().toISOString(),
    };

    onGuardar(nueva);

    // Reset
    setTitulo("");
    setResumen("");
    setContenido("");
    setImagenUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 space-y-3"
    >
      <h3 className="text-lg font-semibold text-gray-700">
        {noticia ? "Editar Noticia" : "Nueva Noticia"}
      </h3>

      <input
        className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <textarea
        className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        placeholder="Resumen"
        value={resumen}
        onChange={(e) => setResumen(e.target.value)}
        required
      />

      <textarea
        className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        placeholder="Contenido completo"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImagen}
        className="block w-full text-sm text-gray-600"
      />

      {imagenUrl && (
        <img
          src={imagenUrl}
          alt="preview"
          className="w-full max-h-60 object-cover rounded-md mt-2"
        />
      )}

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar
        </button>
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioNoticia;
