import React, { useState } from "react";
import FormularioDatos from "./FormularioDatos";
import FormularioDocumentacion from "./FormularioDocumentacion";
import type { Jugador } from "../types/types";

type Props = {
  jugador: Jugador;
  onActualizar: (jugador: Jugador) => void;
  onEliminar: (id: number) => void;
};

const VerJugadores: React.FC<Props> = ({ jugador, onActualizar, onEliminar }) => {
  const [editandoDatos, setEditandoDatos] = useState(false);
  const [editandoDocs, setEditandoDocs] = useState(false);

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <h3 className="text-lg font-semibold">
        {jugador.nombre} {jugador.apellido}
      </h3>
      <p><strong>Club:</strong> {jugador.club}</p>
      <p><strong>DNI:</strong> {jugador.dni}</p>

      {jugador.carnetUrl && <img src={jugador.carnetUrl} alt="Carnet" className="mt-2 max-w-[200px] rounded shadow" />}
      {jugador.fichaMedicaUrl && (
        <a href={jugador.fichaMedicaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block mt-2">
          Ver ficha médica
        </a>
      )}

      <div className="flex gap-2 mt-3">
        <button onClick={() => setEditandoDatos(!editandoDatos)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          {editandoDatos ? "Cancelar" : "Editar Datos"}
        </button>
        <button onClick={() => setEditandoDocs(!editandoDocs)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
          {editandoDocs ? "Cancelar" : "Editar Documentación"}
        </button>
        <button onClick={() => onEliminar(jugador.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
          Eliminar
        </button>
      </div>

      {editandoDatos && (
        <FormularioDatos jugador={jugador} onGuardar={onActualizar} onCancelar={() => setEditandoDatos(false)} />
      )}
      {editandoDocs && (
        <FormularioDocumentacion jugador={jugador} onGuardar={onActualizar} onCancelar={() => setEditandoDocs(false)} />
      )}
    </div>
  );
};

export default VerJugadores;
