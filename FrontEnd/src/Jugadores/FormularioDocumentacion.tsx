import React, { useState } from "react";

type Jugador = {
  id: number;
  nombre: string;
  apellido: string;
  club: string;
  dni: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
};

type Props = {
  jugador: Jugador;
  onGuardar: (jugador: Jugador) => void;
  onCancelar: () => void;
};

// Simulación de rol
const rolActual = localStorage.getItem("rol") || "Referente";

const FormularioDocumentacion: React.FC<Props> = ({ jugador, onGuardar, onCancelar }) => {
  const [carnet, setCarnet] = useState<string | undefined>(jugador.carnetUrl);
  const [fichaMedica, setFichaMedica] = useState<string | undefined>(jugador.fichaMedicaUrl);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, tipo: "carnet" | "ficha") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        if (tipo === "carnet") setCarnet(reader.result);
        if (tipo === "ficha") setFichaMedica(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rolActual !== "Presidenta") {
      alert("No tienes permisos para actualizar documentación.");
      return;
    }
    onGuardar({ ...jugador, carnetUrl: carnet, fichaMedicaUrl: fichaMedica });
    onCancelar();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
      <h4>Documentación del Jugador</h4>

      <label>Carnet:</label>
      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "carnet")} />
      {carnet && <img src={carnet} alt="Carnet" style={{ maxWidth: 200, marginTop: 10 }} />}

      <label style={{ marginTop: 10, display: "block" }}>Ficha Médica:</label>
      <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, "ficha")} />
      {fichaMedica && (
        <a href={fichaMedica} target="_blank" rel="noopener noreferrer">
          Ver ficha médica cargada
        </a>
      )}

      <div style={{ marginTop: 10 }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioDocumentacion;
