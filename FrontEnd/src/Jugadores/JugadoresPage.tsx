import React, { useState, useEffect } from "react";
import RegistroJugador, { Jugador } from "./RegistroJugador";
import ListaJugadores from "./ListaJugadores";
import VerJugadores from "./VerJugadores";
import FormularioDocumentacion from "./FormularioDocumentacion";
import BarraProgreso from "./BarraProgreso";

const JugadoresPage: React.FC = () => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [fase, setFase] = useState<1 | 2>(1);
  const [jugadorEnProceso, setJugadorEnProceso] = useState<Jugador | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("jugadores");
    if (data) {
      setJugadores(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
  }, [jugadores]);

  const registrarJugador = (nuevo: Jugador) => {
    const existeDni = jugadores.some((j) => j.dni === nuevo.dni);
    if (existeDni) {
      alert("El DNI ingresado ya pertenece a otro jugador.");
      return;
    }

    if (nuevo.telefono) {
      const existeTel = jugadores.some((j) => j.telefono === nuevo.telefono);
      if (existeTel) {
        alert("El teléfono ingresado ya pertenece a otro jugador.");
        return;
      }
    }

    setJugadorEnProceso(nuevo);
    setFase(2);
  };

  const guardarDocumentacion = (jugadorConDocs: Jugador) => {
    const existeDni = jugadores.some((j) => j.dni === jugadorConDocs.dni);
    if (existeDni) {
      alert("El DNI ingresado ya pertenece a otro jugador.");
      return;
    }

    if (jugadorConDocs.telefono) {
      const existeTel = jugadores.some(
        (j) => j.telefono === jugadorConDocs.telefono
      );
      if (existeTel) {
        alert("El teléfono ingresado ya pertenece a otro jugador.");
        return;
      }
    }

    setJugadores([jugadorConDocs, ...jugadores]);
    setJugadorEnProceso(null);
    setFase(1);
  };

  const actualizarJugador = (jugadorActualizado: Jugador) => {
    const existeDni = jugadores.some(
      (j) => j.dni === jugadorActualizado.dni && j.id !== jugadorActualizado.id
    );
    if (existeDni) {
      alert("El DNI ingresado ya pertenece a otro jugador.");
      return;
    }

    if (jugadorActualizado.telefono) {
      const existeTel = jugadores.some(
        (j) =>
          j.telefono === jugadorActualizado.telefono &&
          j.id !== jugadorActualizado.id
      );
      if (existeTel) {
        alert("El teléfono ingresado ya pertenece a otro jugador.");
        return;
      }
    }

    setJugadores(
      jugadores.map((j) =>
        j.id === jugadorActualizado.id ? jugadorActualizado : j
      )
    );
  };

  const eliminarJugador = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este jugador?")) {
      setJugadores(jugadores.filter((j) => j.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-900">
        Gestión de Jugadores
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <BarraProgreso fase={fase} />
        {fase === 1 && <RegistroJugador onRegistrar={registrarJugador} />}
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
          onEditar={(j) => actualizarJugador(j)}
          onEliminar={eliminarJugador}
        />
        {jugadores.map((j) => (
          <VerJugadores
            key={j.id}
            jugador={j}
            onActualizar={actualizarJugador}
            onEliminar={eliminarJugador}
          />
        ))}
      </div>
    </div>
  );
};

export default JugadoresPage;
