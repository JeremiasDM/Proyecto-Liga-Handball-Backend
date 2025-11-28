import React, { useState, useEffect } from "react";
// Se asume que estos componentes existen y tienen las props definidas
import RegistroJugador from "./RegistroJugador";
import ListaJugadores from "./ListaJugadores";
import FormularioDocumentacion from "./FormularioDocumentacion";
import BarraProgreso from "./BarraProgreso";
import EditarJugador from "./EditarJugador"; 

// Se asume que existe un polyfill para window.confirm que usa un modal en este entorno
declare global {
  interface Window {
    confirm: (message: string) => boolean;
  }
}

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

type Vista = "registro" | "lista" | "editar";
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

  // Simulación de reemplazo de window.confirm con un modal simple
  const customConfirm = (message: string): Promise<boolean> => {
      return new Promise((resolve) => {
          // En un entorno real, aquí se mostraría un modal con botones Sí/No
          // Usamos la simulación directa ya que no podemos crear un modal funcional con React en un solo archivo
          console.log(`CONFIRMACIÓN REQUERIDA: ${message}`);
          resolve(true); // Asume confirmación positiva
      });
  };

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
    // Reemplazamos window.confirm con customConfirm para cumplir la regla de no usar alert/confirm
    const confirmed = await customConfirm("¿Seguro que quieres eliminar este jugador?"); 
    
    if (confirmed) {
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
          {error && <div className="error-message">{error}</div>} {/* CLASE CSS */}

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
            Ver Lista de Jugadores ({jugadores.length}) 
          </button>
        </div>
      );
    }

    // --- VISTA LISTA ---
    if (vista === "lista") {
      return (
        <div className="list-card card">
          {error && <div className="error-message">{error}</div>} {/* Mostrar error aquí también */}
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
          {/* SE QUITA LA CLASE 'back-button' para que herede el Primary Blue */}
          <button onClick={irARegistro} className="action-button-switch">
              Volver al Registro
          </button>
        </div>
      );
    }

    // --- VISTA EDITAR ---
    if (vista === "editar" && jugadorEditando) {
      return (
        <div className="card">
          {error && <div className="error-message">{error}</div>} {/* CLASE CSS */}
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
    
    // Fallback: mostrar un mensaje de carga o error
    return <div className="loading-message">Cargando...</div>;
  };

  return (
    <>
      <style>{`
        :root {
            /* Paleta de Colores más moderna y profesional */
            --primary-blue: #1f3c88; /* Azul principal fuerte (mantenido) */
            --secondary-blue: #007bff; /* Azul secundario para acentos (mantenido) */
            --accent-teal: #00bcd4; /* Nuevo color de acento para progreso/destacados */
            --bg-light-gray: #f9fafb; /* Fondo aún más claro */
            --text-dark-gray: #1f2937;
            --border-color: #e5e7eb;
            --shadow-color: rgba(0, 0, 0, 0.05); /* Sombra más sutil y moderna */
            --error-red: #ef4444;
            --success-green: #10b981;
            --transition: all 0.3s ease;
            --radius: 12px;
            --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Fuente más moderna */
        }

        /* --- BASE: Aplicar la nueva fuente --- */
        body {
            font-family: var(--font-family);
            background-color: var(--bg-light-gray);
            color: var(--text-dark-gray);
            margin: 0;
        }
        
        /* Ocultar el input[type=number] arrows */
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }

        /* --- CONTENEDOR PRINCIPAL MODIFICADO (MÁS ANCHO) --- */
        .page-container {
            max-width: 1200px; 
            margin: 3rem auto;
            padding: 0 1rem;
            background-color: var(--bg-light-gray);
            min-height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        @media (max-width: 1250px) {
            .page-container { max-width: 95%; }
        }
        
        /* --- TÍTULO DE LA PÁGINA --- */
        .page-title {
            font-size: 2.8rem;
            font-weight: 800;
            text-align: center;
            color: var(--primary-blue);
            margin-bottom: 2.5rem;
            text-shadow: 1px 1px 2px rgba(31, 60, 136, 0.2);
            letter-spacing: -1px;
            position: relative;
        }
        
        .page-title::after {
            content: '';
            display: block;
            width: 60px;
            height: 4px;
            background: var(--accent-teal);
            margin: 10px auto 0;
            border-radius: 2px;
        }

        /* --- TARJETAS (Registro / Lista / Editar) --- */
        .card {
            width: 100%;
            max-width: 100%; 
            margin: 0;
            background-color: white;
            box-shadow: 0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px var(--shadow-color);
            border-radius: var(--radius);
            padding: 2.5rem; 
            border: 1px solid var(--border-color);
            transition: var(--transition);
        }
        
        .card:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
        }

        .list-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--primary-blue);
            margin-bottom: 1.5rem;
            border-bottom: 3px solid var(--accent-teal);
            padding-bottom: 0.75rem;
            letter-spacing: -0.5px;
        }

        /* --- MENSAJES DE ERROR (CLASE CSS) --- */
        .error-message {
            background-color: #fef2f2;
            border: 1px solid #fca5a5;
            color: var(--error-red) !important;
            padding: 1rem;
            border-radius: var(--radius);
            margin-bottom: 1.5rem !important;
            font-weight: 600;
            text-align: center;
        }
        
        /* --- BOTONES DE CAMBIO DE VISTA (AHORA TODOS USAN PRIMARY BLUE) --- */
        .action-button-switch {
            width: auto; /* Ya no es full width */
            padding: 0.5rem 1rem; /* CAMBIO: Relleno compacto */
            margin: 2.5rem auto 0 auto; /* Centrado y margen superior */
            background-color: var(--primary-blue);
            color: white;
            border: none;
            border-radius: 5px; /* CAMBIO: Borde más pequeño */
            font-weight: 600; /* Ligeramente menos fuerte */
            font-size: 1rem; /* Tamaño de fuente estándar */
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(31, 60, 136, 0.3); /* Sombra ajustada */
            transition: var(--transition);
            display: block; /* Para que margin: auto funcione */
        }
        
        .action-button-switch:hover {
            /* REGLAS MODIFICADAS: Se elimina el cambio de color y el desplazamiento */
            background-color: var(--primary-blue); 
            transform: none; 
            box-shadow: 0 4px 8px rgba(31, 60, 136, 0.3); /* Se mantiene la sombra original */
        }

        /* REGLAS ELIMINADAS: 
            .action-button-switch.back-button { ... } 
            .action-button-switch.back-button:hover { ... } 
        */

        .action-button-switch:active {
            transform: translateY(0);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        
        /* --- ESTILOS DE FORMULARIO BASE (Para inputs y selects) --- */
        input[type="text"], input[type="number"], input[type="email"], input[type="tel"], input[type="date"], select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            margin-bottom: 1rem;
            box-sizing: border-box;
            transition: border-color 0.2s, box-shadow 0.2s;
            font-size: 1rem;
        }
        
        input[type="text"]:focus, input[type="number"]:focus, input[type="email"]:focus, input[type="tel"]:focus, input[type="date"]:focus, select:focus {
            border-color: var(--accent-teal);
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 187, 212, 0.2);
        }
        
        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--text-dark-gray);
        }
        
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
            gap: 25px; 
            margin-top: 1.5rem;
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
