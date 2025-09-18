import React from "react";
import type { Referente } from "../types/types";

interface Props {
  referente: Referente;
  onVolver: () => void;
}

const VistaReferente: React.FC<Props> = ({ referente, onVolver }) => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-2 text-center">
        {referente.nombre} {referente.apellido}
      </h3>
      <p><strong>Categoría:</strong> {referente.categoria}</p>
      <p><strong>DNI:</strong> {referente.dni}</p>
      <p><strong>Correo:</strong> {referente.correo}</p>
      <p><strong>Equipo:</strong> {referente.equipo}</p>
      <button
        onClick={onVolver}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded w-full"
      >
        Volver
      </button>
    </div>
  );
};

export default VistaReferente;
