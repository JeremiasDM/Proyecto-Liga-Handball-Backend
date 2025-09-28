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
=======
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

  // Cargar jugadores desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("jugadores");
    if (data) {
      setJugadores(JSON.parse(data));
    }
  }, []);

  // Guardar jugadores en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
  }, [jugadores]);

  // Paso 1 → Registrar jugador
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

  // Paso 2 → Guardar documentación
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

  // Actualizar jugador ya existente
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

  // Eliminar jugador
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

      {/* Registro o documentación */}
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

      {/* Lista de jugadores */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lista de Jugadores
        </h2>
        <ListaJugadores
          jugadores={jugadores}
          onEditar={actualizarJugador}
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
>>>>>>> 1f2b5fe4eb0fa93dacc56de828679a66a02a3fa1
