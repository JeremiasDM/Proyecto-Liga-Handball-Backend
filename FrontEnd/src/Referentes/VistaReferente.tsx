import React from "react";
import { styles } from "./ReferentesPage";
import type { CSSProperties } from "react";

// --- Definiciones de tipo (ajustadas) ---
interface Club {
  id: number;
  nombre: string;
}

interface Referente {
  id: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  clubId: number;
  club: Club; // <-- La API devuelve un objeto 'club'
}

interface Props {
  referente: Referente;
  onVolver: () => void;
}

// (Pega tus 'vistaStyles' aquí)
const vistaStyles: { [key: string]: CSSProperties } = { /* ... */ };


const VistaReferente: React.FC<Props> = ({ referente, onVolver }) => {
  const cardEstiloDetalle: CSSProperties = {
    ...styles.cardFormulario,
    maxWidth: "30rem",
    padding: "30px",
    marginBottom: "0",
  };

  // --- CAMBIO: Usar 'club.nombre' ---
  const fields = [
    { label: "Categoría", value: referente.categoria },
    { label: "DNI", value: referente.dni },
    { label: "Correo", value: referente.correo },
    { label: "Equipo", value: referente.club ? referente.club.nombre : "N/A" },
  ];

  return (
    <div style={cardEstiloDetalle}>
      <h3
        style={{
          ...styles.formTitulo,
          marginBottom: "20px",
          fontSize: "28px",
        }}
      >
        {referente.nombre} {referente.apellido}
      </h3>
      <div style={{ marginBottom: "20px" }}>
        {fields.map((field, index) => (
          <div
            key={field.label}
            style={
              index === fields.length - 1
                ? vistaStyles.ultimaFila
                : vistaStyles.fila
            }
          >
            <span style={vistaStyles.etiqueta}>{field.label}:</span>
            <span style={vistaStyles.valor}>{field.value}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onVolver}
        style={{
          ...styles.botonSecundario,
          width: "100%",
          padding: "12px 24px",
          backgroundColor: "#6b7280",
        }}
      >
        Volver a la Lista
      </button>
    </div>
  );
};

export default VistaReferente;