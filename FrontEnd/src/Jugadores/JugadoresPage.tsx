import React, { useState } from "react";
import RegistroJugador from "./RegistroJugador";
import ListaJugadores from "./ListaJugadores";
import FormularioDocumentacion from "./FormularioDocumentacion";
import BarraProgreso from "./BarraProgreso";
import { useJugadores } from "../hooks/useJugadores";
import { validarJugador } from "../utils/validaciones";
import type { Jugador } from "../types/types";

const JugadoresPage: React.FC = () => {
  const { jugadores, agregar, actualizar, eliminar } = useJugadores();
  const [fase, setFase] = useState<1 | 2>(1);
  const [jugadorEnProceso, setJugadorEnProceso] = useState<Jugador | null>(null);

  const registrarJugador = (nuevo: Jugador) => {
    const error = validarJugador(nuevo, jugadores);
    if (error) {
      alert(error);
      return;
    }
    setJugadorEnProceso(nuevo);
    setFase(2);
  };

  const guardarDocumentacion = (jugadorConDocs: Jugador) => {
    const error = validarJugador(jugadorConDocs, jugadores);
    if (error) {
      alert(error);
      return;
    }
    agregar(jugadorConDocs);
    setJugadorEnProceso(null);
    setFase(1);
  };

  const actualizarJugador = (jugadorActualizado: Jugador) => {
    const error = validarJugador(jugadorActualizado, jugadores);
    if (error) {
      alert(error);
      return;
    }
    actualizar(jugadorActualizado);
  };

  const eliminarJugador = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este jugador?")) {
      eliminar(id);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-900">
        Gestión de Jugadores
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <BarraProgreso fase={fase} />
        {fase === 1 && (
          <RegistroJugador onRegistrar={registrarJugador} />
        )}
        {fase === 2 && jugadorEnProceso && (
          <FormularioDocumentacion
            jugador={jugadorEnProceso}
            onGuardar={guardarDocumentacion}
            onCancelar={() => {
              setJugadorEnProceso(null);
              setFase(1);
            }}
          />
        )}
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lista de Jugadores
        </h2>
        <ListaJugadores
          jugadores={jugadores}
          onEditar={actualizarJugador}
          onEliminar={eliminarJugador}
        />
      </div>
    </div>
  );
};

export default JugadoresPage;
