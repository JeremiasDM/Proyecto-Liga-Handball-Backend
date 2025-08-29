import React, { useEffect, useState } from "react";
import FormularioDatos from "./FormularioDatos";
import FormularioDocumentacion from "./FormularioDocumentacion";

const rolActual = localStorage.getItem("rol") || "Referente";

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
  onActualizar: (jugador: Jugador) => void;
  onEliminar: (id: number) => void;
};

const VerJugadores: React.FC<Props> = ({ jugador, onActualizar, onEliminar }) => {
  const [editandoDatos, setEditandoDatos] = useState(false);
  const [editandoDocs, setEditandoDocs] = useState(false);

  useEffect(() => {
  }, [jugador]);

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 20, marginBottom: 20 }}>
      <h3>
        {jugador.nombre} {jugador.apellido}
      </h3>
      <p><strong>Club:</strong> {jugador.club}</p>
      <p><strong>DNI:</strong> {jugador.dni}</p>

      {/* Mostrar carnet si existe */}
      {jugador.carnetUrl && (
        <div>
          <p><strong>Carnet:</strong></p>
          <img src={jugador.carnetUrl} alt="Carnet" style={{ maxWidth: 200 }} />
        </div>
      )}

      {/* Mostrar ficha médica si existe */}
      {jugador.fichaMedicaUrl && (
        <div>
          <p><strong>Ficha Médica:</strong></p>
          <a href={jugador.fichaMedicaUrl} target="_blank" rel="noopener noreferrer">
            Ver ficha médica
          </a>
        </div>
      )}

      {/* Botones con permisos */}
      <div style={{ marginTop: 10 }}>
        {rolActual === "Presidenta" && (
          <>
            <button onClick={() => setEditandoDatos(!editandoDatos)}>
              {editandoDatos ? "Cancelar Edición" : "Editar Datos"}
            </button>
            <button onClick={() => setEditandoDocs(!editandoDocs)}>
              {editandoDocs ? "Cancelar Documentación" : "Editar Documentación"}
            </button>
            <button onClick={() => onEliminar(jugador.id)} style={{ color: "red" }}>
              Eliminar
            </button>
          </>
        )}
      </div>

      {/* Formularios condicionales */}
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
