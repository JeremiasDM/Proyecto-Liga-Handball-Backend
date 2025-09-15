import React from "react";
import type { Referente } from "./ReferentesPage";

interface Props {
  referente: Referente;
  onVolver: () => void;
}

const VistaReferente: React.FC<Props> = ({ referente, onVolver }) => {
  return (
    <div className="p-6 bg-white rounded shadow space-y-2">
      <h3 className="text-2xl font-bold mb-4">
        {referente.nombre} {referente.apellido}
      </h3>
      <p><strong>Categoría:</strong> {referente.categoria}</p>
      <p><strong>DNI:</strong> {referente.dni}</p>
      <p><strong>Correo:</strong> {referente.correo}</p>
      <p><strong>Equipo:</strong> {referente.equipo}</p>
      <button
        onClick={onVolver}
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        Volver
      </button>
    </div>
  );
};

export default VistaReferente;
