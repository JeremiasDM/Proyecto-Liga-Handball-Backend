import React, { useState } from "react";
import RegistroJugador from "./RegistroJugador";
import ListaJugadores from "./ListaJugadores";
import FormularioDocumentacion from "./FormularioDocumentacion";
import BarraProgreso from "./BarraProgreso";
import { useJugadores } from "../hooks/useJugadores";

// Inlined Jugador type
type Jugador = {
  estado?: string;
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  club: string;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
};

// Inlined validarJugador (subset used by this page)
function validarJugador(nuevo: Jugador, jugadores: Jugador[]): string | null {
  if (jugadores.some(j => j.dni === nuevo.dni && j.id !== nuevo.id)) {
    return "El DNI ingresado ya pertenece a otro jugador.";
  }

  if (nuevo.telefono && jugadores.some(j => j.telefono === nuevo.telefono && j.id !== nuevo.id)) {
    return "El teléfono ingresado ya pertenece a otro jugador.";
  }

  if (
    !nuevo.nombre.trim() ||
    !nuevo.apellido.trim() ||
    !nuevo.dni.trim() ||
    !nuevo.club.trim() ||
    !nuevo.categoria
  ) {
    return "Todos los campos son obligatorios.";
  }

  if (nuevo.nombre.trim().length < 2 || nuevo.apellido.trim().length < 2) {
    return "El nombre y apellido deben tener al menos 2 caracteres.";
  }

  if (!/^\d{7,8}$/.test(nuevo.dni)) {
    return "El DNI debe tener 7 u 8 dígitos numéricos.";
  }

  if (nuevo.telefono && !/^\d{7,15}$/.test(nuevo.telefono)) {
    return "El teléfono debe tener entre 7 y 15 dígitos numéricos.";
  }

  if (nuevo.vencimiento) {
    const fecha = new Date(nuevo.vencimiento);
    if (isNaN(fecha.getTime()) || fecha <= new Date()) {
      return "La fecha de vencimiento debe ser válida y posterior a hoy.";
    }
  }
  return null;
}

// Definimos los posibles estados de vista
type Vista = 'registro' | 'lista';

const JugadoresPage: React.FC = () => {
  const { jugadores, agregar, actualizar, eliminar } = useJugadores();
  const [vista, setVista] = useState<Vista>('registro'); 
  const [fase, setFase] = useState<1 | 2>(1);
  const [jugadorEnProceso, setJugadorEnProceso] = useState<Jugador | null>(null);

  // --- LÓGICA DE GESTIÓN DE JUGADORES (Sin cambios) ---

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
    // Opcional: Podrías cambiar a setVista('lista') después de guardar
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

  // --- Renderizado de Vistas (Sin cambios) ---

  const renderContenidoPrincipal = () => {
    if (vista === 'registro') {
      return (
        <>
          {/* Formulario de Registro / Documentación */}
          <div className="form-card card">
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

            {/* BOTÓN PARA IR A LA LISTA */}
            <button 
              onClick={() => setVista('lista')} 
              className="action-button-switch"
            >
              Ver Lista de Jugadores ({jugadores.length}) ➡️
            </button>
          </div>
        </>
      );
    } else { // vista === 'lista'
      return (
        <div className="list-card card">
          <h2 className="list-title">
            Listado de Jugadores Registrados
          </h2>
          <ListaJugadores
            jugadores={jugadores}
            onEditar={actualizarJugador} 
            onEliminar={eliminarJugador}
          />
          
          {/* BOTÓN PARA VOLVER AL REGISTRO */}
          <button 
            onClick={() => setVista('registro')} 
            className="action-button-switch back-button"
          >
            ⬅️ Volver al Registro
          </button>
        </div>
      );
    }
  };

  // --- Estilos ---

  return (
    <>
      <style>{`
        /* Definiciones de color y variables */
        :root {
          --primary-blue: #1f3c88;
          --bg-light-gray: #f3f4f6;
          --text-dark-gray: #1f2937;
          --shadow-color: rgba(0, 0, 0, 0.1);
          --secondary-gray: #6b7280;
        }

        /* Contenedor principal de la página */
        .page-container {
          /* Padding para los costados */
          padding: 2.5rem 4rem; 
          background-color: var(--bg-light-gray);
          
          /* CLAVE: Eliminamos min-height: 100vh; para que no estire hacia abajo */
          /* Su altura será determinada únicamente por el contenido. */
        }

        /* Título principal */
        .page-title {
          font-size: 2.25rem;
          font-weight: 800;
          text-align: center;
          color: var(--primary-blue);
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
        }

        /* Estilos de las tarjetas (Registro/Lista) */
        .card {
          /* Aumentamos el ancho máximo de las tarjetas internas */
          max-width: 9000px; 
          width: 100%; 
          margin-left: auto;
          margin-right: auto;
          background-color: white;
          box-shadow: 0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px var(--shadow-color);
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid #e5e7eb;
        }
        
        /* Subtítulo de la lista */
        .list-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-dark-gray);
          margin-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }
        
        /* --- ESTILO DEL BOTÓN DE NAVEGACIÓN --- */
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
            background-color: #2daeffff; /* Gris más oscuro */
        }

        .action-button-switch.back-button {
            background-color: rgba(59, 130, 246, 1); /* Usar un azul más amigable para volver */
        }
        
        .action-button-switch.back-button:hover {
            background-color: #2563eb; 
        }

        .action-button-switch:active {
            transform: scale(0.99);
        }
      `}</style>

      <div className="page-container">
        <h1 className="page-title">
            Gestión de Jugadores 
        </h1>
        
        {renderContenidoPrincipal()}

      </div>
    </>
  );
};

export default JugadoresPage;
