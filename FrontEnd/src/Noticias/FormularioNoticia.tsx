import React, { useState } from "react";

type Noticia = {
  id?: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
};

type Props = {
  onGuardar: (noticia: Noticia) => void;
};

const FormularioNoticia: React.FC<Props> = ({ onGuardar }) => {
  const [form, setForm] = useState<Noticia>({
    titulo: "",
    contenido: "",
    fecha: "",
    imagenUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("La imagen debe ser un archivo válido (jpg, png, etc).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no debe superar los 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setForm({ ...form, imagenUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.titulo || form.titulo.length < 5) {
      alert("El título debe tener al menos 5 caracteres.");
      return;
    }
    if (!form.contenido) {
      alert("El contenido es obligatorio.");
      return;
    }
    if (!form.fecha) {
      alert("Debe seleccionar una fecha.");
      return;
    }

    onGuardar({ ...form, id: Date.now() });
    setForm({ titulo: "", contenido: "", fecha: "", imagenUrl: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="contenido"
        placeholder="Contenido"
        value={form.contenido}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="fecha"
        value={form.fecha}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input type="file" accept="image/*" onChange={handleFileUpload} />

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Guardar Noticia
      </button>
    </form>
  );
};

export default FormularioNoticia;
