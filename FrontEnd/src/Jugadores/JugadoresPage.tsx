import React, { useState } from "react";
import RegistroJugador from "./RegistroJugador";
import ListaJugadores from "./ListaJugadores";
import FormularioDocumentacion from "./FormularioDocumentacion";
import BarraProgreso from "./BarraProgreso";
import { useJugadores } from "../hooks/useJugadores";
import { validarJugador } from "../utils/validaciones";
import type { Jugador } from "../types/types";

type Vista = "registro" | "lista";

const JugadoresPage: React.FC = () => {
  const { jugadores, agregar, actualizar, eliminar } = useJugadores();
  const [vista, setVista] = useState<Vista>("registro");
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

  const renderContenidoPrincipal = () => {
    if (vista === "registro") {
      return (
        <>
          <div className="form-card card">
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

            <button
              onClick={() => setVista("lista")}
              className="action-button-switch"
            >
              Ver Lista de Jugadores ({jugadores.length}) ➡️
            </button>
          </div>
        </>
      );
    } else {
      return (
        <div className="list-card card">
          <h2 className="list-title">Listado de Jugadores Registrados</h2>
          <ListaJugadores
            jugadores={jugadores}
            onEditar={actualizarJugador}
            onEliminar={eliminarJugador}
            onVerDetalles={() => {}}
          />

          <button
            onClick={() => setVista("registro")}
            className="action-button-switch back-button"
          >
            ⬅️ Volver al Registro
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <style>{`
        :root {
          --primary-blue: #1f3c88;
          --bg-light-gray: #f3f4f6;
          --text-dark-gray: #1f2937;
          --shadow-color: rgba(0, 0, 0, 0.1);
          --secondary-gray: #6b7280;
        }

        /* --- CONTENEDOR PRINCIPAL --- */
        .page-container {
          max-width: 1000px;
          min-height: 800px;
          background-color: var(--bg-light-gray);
        }

        .page-title {
          font-size: 2.25rem;
          font-weight: 800;
          text-align: center;
          color: var(--primary-blue);
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
        }

        /* --- TARJETAS (Registro / Lista) --- */
        .card {
          width: 100%; /* ocupa todo el ancho */
          margin: 0;
          background-color: white;
          box-shadow: 0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px var(--shadow-color);
          border-radius: 0; /* sin bordes redondeados */
          padding: 2rem;
          border: 1px solid #e5e7eb;
        }

        .list-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-dark-gray);
          margin-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }

        /* --- BOTONES --- */
        .action-button-switch {
          width: 100%;
          padding: 0.75rem;
          margin-top: 1.5rem;
          background-color: var(--secondary-gray);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.1s;
        }
        
        .action-button-switch:hover {
          background-color: #2daeffff;
        }

        .action-button-switch.back-button {
          background-color: rgba(59, 130, 246, 1);
        }
        
        .action-button-switch.back-button:hover {
          background-color: #2563eb;
        }

        .action-button-switch:active {
          transform: scale(0.99);
        }
      `}</style>

      <div className="page-container">
        <h1 className="page-title">Gestión de Jugadores</h1>
        {renderContenidoPrincipal()}
      </div>
    </>
  );
};

export default JugadoresPage;
