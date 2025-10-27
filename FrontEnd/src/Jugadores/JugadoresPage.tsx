import React, { useState, useEffect } from "react";
import RegistroJugador from "./RegistroJugador";
import ListaJugadores from "./ListaJugadores";
import FormularioDocumentacion from "./FormularioDocumentacion";
import BarraProgreso from "./BarraProgreso";
import EditarJugador from "./EditarJugador"; // <-- AÑADIR
// import { useJugadores } from "../hooks/useJugadores"; // <-- ELIMINAR

// --- NUEVOS TIPOS (DE LA API) ---
interface Club {
  id: number;
  nombre: string;
}

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  club: Club; // <-- Objeto anidado
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
  estado?: string;
}

// DTO para Fase 1 (sin ID)
interface CreateJugadorFase1Dto {
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  estado: string;
}

// DTO para crear (incluye docs)
interface CreateJugadorDto extends CreateJugadorFase1Dto {
  carnetUrl?: string;
  fichaMedicaUrl?: string;
}

type Vista = "registro" | "lista" | "editar"; // <-- AÑADIR VISTA EDITAR
const API_URL = "http://localhost:3001"; // URL del Backend Nest.js

const JugadoresPage: React.FC = () => {
  // --- NUEVO ESTADO CON API ---
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [vista, setVista] = useState<Vista>("registro");
  const [fase, setFase] = useState<1 | 2>(1);
  const [jugadorEnProceso, setJugadorEnProceso] =
    useState<CreateJugadorFase1Dto | null>(null); // DTO de Fase 1
  const [jugadorEditando, setJugadorEditando] = useState<Jugador | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- Cargar datos al montar ---
  useEffect(() => {
    cargarJugadores();
    cargarClubes();
  }, []);

  const cargarJugadores = async () => {
    try {
      const res = await fetch(`${API_URL}/jugadores`);
      if (!res.ok) throw new Error("Error al cargar jugadores");
      const data: Jugador[] = await res.json();
      setJugadores(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const cargarClubes = async () => {
    try {
      const res = await fetch(`${API_URL}/clubes`);
      if (!res.ok) throw new Error("Error al cargar clubes");
      const data: Club[] = await res.json();
      setClubes(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // --- LÓGICA DE NAVEGACIÓN Y CRUD ---

  const irARegistro = () => {
    setJugadorEditando(null);
    setJugadorEnProceso(null);
    setFase(1);
    setVista("registro");
    setError(null);
  };

  const irALista = () => {
    setJugadorEditando(null);
    setJugadorEnProceso(null);
    setFase(1);
    setVista("lista");
    setError(null);
  };

  // Fase 1: Recibe datos básicos, pasa a Fase 2
  const registrarJugador = (fase1Dto: CreateJugadorFase1Dto) => {
    // (Validación ya hecha en el componente hijo)
    setJugadorEnProceso(fase1Dto);
    setFase(2);
  };

  // Fase 2: Recibe docs y guarda todo en la API
  const guardarDocumentacion = async (docs: {
    carnetUrl?: string;
    fichaMedicaUrl?: string;
  }) => {
    if (!jugadorEnProceso) return;
    setError(null);

    const dtoCompleto: CreateJugadorDto = {
      ...jugadorEnProceso,
      ...docs,
    };

    try {
      const res = await fetch(`${API_URL}/jugadores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoCompleto),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData.message || "Error al crear el jugador (revise DNI duplicado)",
        );
      }

      await cargarJugadores(); // Recargar lista
      irARegistro(); // Volver a Fase 1
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const actualizarJugador = async (id: number, dto: Partial<Jugador>) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/jugadores/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData.message || "Error al actualizar (revise DNI duplicado)",
        );
      }
      await cargarJugadores();
      irALista(); // Volver a la lista
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const eliminarJugador = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este jugador?")) {
      setError(null);
      try {
        const res = await fetch(`${API_URL}/jugadores/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Error al eliminar");
        await cargarJugadores(); // Recargar
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const renderContenidoPrincipal = () => {
    // --- VISTA REGISTRO (Fase 1 y 2) ---
    if (vista === "registro") {
      return (
        <div className="form-card card">
          <BarraProgreso fase={fase} />
          {error && <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}

          {fase === 1 && (
            <RegistroJugador
              onRegistrar={registrarJugador}
              clubes={clubes} // <-- Pasar clubes
            />
          )}

          {fase === 2 && jugadorEnProceso && (
            <FormularioDocumentacion
              // Pasamos solo los datos necesarios
              jugadorInfo={{
                nombre: jugadorEnProceso.nombre,
                apellido: jugadorEnProceso.apellido,
              }}
              onGuardar={guardarDocumentacion}
              onCancelar={() => {
                setJugadorEnProceso(null);
                setFase(1);
              }}
            />
          )}

          <button onClick={irALista} className="action-button-switch">
            Ver Lista de Jugadores ({jugadores.length}) ➡️
          </button>
        </div>
      );
    }

    // --- VISTA LISTA ---
    if (vista === "lista") {
      return (
        <div className="list-card card">
          <h2 className="list-title">Listado de Jugadores Registrados</h2>
          <ListaJugadores
            jugadores={jugadores}
            onIniciarEdicion={(j) => {
              setJugadorEditando(j);
              setVista("editar"); // Cambiar a la vista de edición
              setError(null);
            }}
            onEliminar={eliminarJugador}
          />
          <button onClick={irARegistro} className="action-button-switch back-button">
            ⬅️ Volver al Registro
          </button>
        </div>
      );
    }

    // --- VISTA EDITAR ---
    if (vista === "editar" && jugadorEditando) {
      return (
        <div className="card">
          {error && <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}
          <EditarJugador
            jugador={jugadorEditando}
            clubes={clubes} // <-- Pasar clubes
            onActualizar={actualizarJugador}
            onCancelar={irALista} // Volver a la lista
            jugadores={jugadores} // Para validación de DNI
          />
        </div>
      );
    }
  };

  // (Pegar el <style>{`...`}</style> de JugadoresPage.tsx aquí)
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
        .page-container {
          padding: 2.5rem 4rem; 
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
        .card {
          max-width: 900px; /* Reducido para mejor legibilidad */
          width: 100%; 
          margin-left: auto;
          margin-right: auto;
          background-color: white;
          box-shadow: 0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px var(--shadow-color);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid #e5e7eb;
          margin-bottom: 2rem; /* Añadido para separar tarjetas */
        }
        .list-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-dark-gray);
          margin-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
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
            background-color: #4b5563; /* Gris más oscuro */
        }
        .action-button-switch.back-button {
            background-color: #3b82f6; /* Azul */
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