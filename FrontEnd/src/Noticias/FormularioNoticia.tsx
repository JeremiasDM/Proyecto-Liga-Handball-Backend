import React, { useEffect, useState } from "react";

export type Noticia = {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagenUrl: string;
  fecha: string;
};

type Props = {
  noticia?: Noticia;
  onGuardar: (n: Noticia) => void;
  onCancelar?: () => void;
};

const MAX_IMAGEN_MB = 2;
const MAX_IMAGEN_BYTES = MAX_IMAGEN_MB * 1024 * 1024;

const FormularioNoticia: React.FC<Props> = ({ noticia, onGuardar, onCancelar }) => {
  // campos
  const [titulo, setTitulo] = useState(noticia?.titulo || "");
  const [resumen, setResumen] = useState(noticia?.resumen || "");
  const [contenido, setContenido] = useState(noticia?.contenido || "");
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string>(noticia?.imagenUrl || "");

  const [errors, setErrors] = useState<Partial<Record<keyof Noticia | "imagen", string>>>({});
  const [submitting, setSubmitting] = useState(false);

  // si viene noticia en edición, poblar
  useEffect(() => {
    if (noticia) {
      setTitulo(noticia.titulo);
      setResumen(noticia.resumen);
      setContenido(noticia.contenido);
      setImagenPreview(noticia.imagenUrl || "");
      setImagenFile(null);
      setErrors({});
    }
  }, [noticia]);

  const readFileAsDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });

  const validar = (): boolean => {
    const e: typeof errors = {};
    if (titulo.trim().length < 5) e.titulo = "El título debe tener al menos 5 caracteres.";
    if (resumen.trim().length === 0) e.resumen = "El resumen es obligatorio.";
    if (contenido.trim().length < 20) e.contenido = "El contenido debe tener al menos 20 caracteres.";
    if (!noticia && !imagenFile && !imagenPreview) e.imagen = "La imagen es obligatoria.";
    if (imagenFile && imagenFile.size > MAX_IMAGEN_BYTES) e.imagen = `Máx ${MAX_IMAGEN_MB}MB.`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onFileChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0] || null;
    setImagenFile(file);
    if (file) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        setImagenPreview(dataUrl);
      } catch {
        setErrors((prev) => ({ ...prev, imagen: "No se pudo leer la imagen." }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;

    setSubmitting(true);
    try {
      const nueva: Noticia = {
        id: noticia?.id ?? Date.now(),
        titulo: titulo.trim(),
        resumen: resumen.trim(),
        contenido: contenido.trim(),
        imagenUrl: imagenPreview || "",
        fecha: noticia?.fecha ?? new Date().toISOString(),
      };
      await new Promise((res) => setTimeout(res, 200));
      onGuardar(nueva);

      if (!noticia) {
        setTitulo("");
        setResumen("");
        setContenido("");
        setImagenFile(null);
        setImagenPreview("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">
        {noticia ? "Editar Noticia" : "Nueva Noticia"}
      </h3>

      <div>
        <label className="font-medium">Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1"
        />
        {errors.titulo && <p className="text-red-600 text-sm">{errors.titulo}</p>}
      </div>

      <div>
        <label className="font-medium">Resumen</label>
        <textarea
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1"
          maxLength={250}
        />
        <p className="text-xs text-gray-500">{resumen.length}/250</p>
        {errors.resumen && <p className="text-red-600 text-sm">{errors.resumen}</p>}
      </div>

      <div>
        <label className="font-medium">Contenido</label>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1 min-h-[120px]"
        />
        {errors.contenido && <p className="text-red-600 text-sm">{errors.contenido}</p>}
      </div>

      <div>
        <label className="font-medium">Imagen (máx {MAX_IMAGEN_MB}MB)</label>
        <input type="file" accept="image/*" onChange={onFileChange} className="mt-1" />
        {errors.imagen && <p className="text-red-600 text-sm">{errors.imagen}</p>}
        {imagenPreview && <img src={imagenPreview} alt="preview" className="mt-2 rounded-lg shadow max-h-48" />}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
        >
          {submitting ? "Guardando..." : noticia ? "Guardar cambios" : "Publicar"}
        </button>
        {onCancelar && (
          <button
            type="button"
            onClick={onCancelar}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioNoticia;
