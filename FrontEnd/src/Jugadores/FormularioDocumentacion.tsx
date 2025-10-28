import React, { useState } from "react";

// Props simplificadas
type Props = {
  jugadorInfo: { nombre: string; apellido: string };
  onGuardar: (docs: { carnetUrl?: string; fichaMedicaUrl?: string }) => void;
  onCancelar: () => void;
};

const FormularioDocumentacion: React.FC<Props> = ({
  jugadorInfo,
  onGuardar,
  onCancelar,
}) => {
  const [carnet, setCarnet] = useState<string | undefined>(undefined);
  const [fichaMedica, setFichaMedica] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    tipo: "carnet" | "ficha",
  ) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;

    if (tipo === "carnet" && !file.type.startsWith("image/")) {
      setError("El carnet debe ser una imagen (jpg, png).");
      return;
    }
    if (tipo === "ficha" && file.type !== "application/pdf") {
      setError("La ficha médica debe ser un archivo PDF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("El archivo no puede superar los 5MB.");
      return;
    }

    // Validación extra: extensión por nombre
    const filename = file.name || '';
    const isImageExt = /\.(jpe?g|png|gif|webp|bmp)$/i.test(filename);
    const isPdfExt = /\.pdf$/i.test(filename);
    if (tipo === 'carnet' && !isImageExt) {
      setError('Extensión inválida para carnet. Use JPG/PNG.');
      return;
    }
    if (tipo === 'ficha' && !isPdfExt) {
      setError('La ficha médica debe tener extensión .pdf');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        // Estimar bytes del Base64
        const comma = reader.result.indexOf(',');
        const data = comma >= 0 ? reader.result.slice(comma + 1) : reader.result;
        const len = data.length;
        const padding = (data.endsWith('==') ? 2 : data.endsWith('=') ? 1 : 0);
        const bytes = Math.ceil((len * 3) / 4) - padding;
        if (bytes > 5 * 1024 * 1024) {
          setError('El contenido codificado supera el límite de 5MB después de la conversión.');
          return;
        }
        if (tipo === "carnet") setCarnet(reader.result);
        if (tipo === "ficha") setFichaMedica(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Opcional: Requerir al menos un documento
    // if (!carnet && !fichaMedica) {
    //   setError("Debe cargar al menos un documento.");
    //   return;
    // }
    
    onGuardar({ carnetUrl: carnet, fichaMedicaUrl: fichaMedica });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Paso 2: Documentación de {jugadorInfo.nombre} {jugadorInfo.apellido}
      </h2>
      {error && <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Carnet (Imagen, max 5MB):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "carnet")}
            className="w-full p-2 border rounded"
          />
          {carnet && (
            <img
              src={carnet}
              alt="Carnet"
              style={{ maxWidth: 200, marginTop: 10, borderRadius: '8px' }}
            />
          )}
        </div>

        <div>
          <label className="block font-semibold">Ficha Médica (PDF, max 5MB):</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileUpload(e, "ficha")}
            className="w-full p-2 border rounded"
          />
          {fichaMedica && (
            <a
              href={fichaMedica}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Ver ficha médica cargada
            </a>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-1/2"
          >
            Finalizar Registro
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-1/2"
          >
            Atrás
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioDocumentacion;