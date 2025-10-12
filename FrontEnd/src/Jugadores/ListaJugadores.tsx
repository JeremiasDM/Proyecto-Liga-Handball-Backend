import React from "react";
import type { Jugador } from "../types/types";

type Props = {
  jugadores: Jugador[];
  onEditar?: (jugador: Jugador) => void;
  onEliminar: (id: number) => void;
  onVerDetalles: (jugador: Jugador) => void; 
};

const ListaJugadores: React.FC<Props> = ({ jugadores, onEditar, onEliminar, onVerDetalles }) => {
  if (!jugadores || jugadores.length === 0) {
    return <p className="empty-list-message">No hay jugadores cargados.</p>;
  }

  return (
    <>
      <style>{`
        /* Definiciones de color y variables */
        :root {
          --primary-blue: #1f3c88;
          --header-blue: #1a326b; /* Un poco más oscuro que el principal */
          --shadow-color: rgba(0, 0, 0, 0.2);
          --view-color: #059669; /* emerald-600 */
          --edit-color: #3b82f6; /* blue-500 */
          --delete-color: #ef4444; /* red-500 */
        }

        /* Mensaje de lista vacía */
        .empty-list-message {
          color: #6b7280; /* gray-500 */
          text-align: center;
          padding: 1rem;
          margin-top: 1rem;
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        /* Contenedor principal de la tabla */
        .table-container {
          overflow-x-auto;
          margin-top: 1.5rem;
        }

        /* Estilo de la tabla */
        .player-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
          background-color: white;
          border-radius: 1rem;
          overflow: hidden; /* Importante para que los bordes redondeados funcionen con el thead */
        }

        /* Encabezado de la tabla (Header) */
        .table-header {
          background-color: var(--primary-blue);
          color: white;
        }

        .table-header th {
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.95rem;
        }
        
        .table-header th:last-child {
            text-align: center;
        }


        /* Filas del cuerpo de la tabla */
        .table-row {
          border-bottom: 1px solid #e5e7eb; /* border-b */
          transition: background-color 0.2s;
        }

        .table-row:hover {
          background-color: #f9fafb; /* hover:bg-gray-50 */
        }

        .table-row td {
          padding: 0.75rem;
          color: #374151;
        }
        
        /* Estilos específicos para el estado del jugador */
        .status-cell {
            text-transform: capitalize;
            font-weight: 600;
        }
        
        .status-activo { color: #10b981; } /* green-500 */
        .status-lesionado { color: #f97316; } /* orange-600 */
        .status-sancionado { color: #f59e0b; } /* amber-500 */
        .status-inactivo { color: #6b7280; } /* gray-500 */


        /* Contenedor de Acciones */
        .action-cell {
          padding: 0.75rem;
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          align-items: center;
        }

        /* Botones de Acción base */
        .action-button {
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
          transition: background-color 0.2s, transform 0.1s;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          border: none;
          cursor: pointer;
        }
        
        /* Botón Vista */
        .action-button-view {
            background-color: var(--view-color);
        }
        
        .action-button-view:hover {
            background-color: #047857; /* emerald-700 */
        }

        /* Botón Editar */
        .action-button-edit {
          background-color: var(--edit-color);
        }

        .action-button-edit:hover {
          background-color: #2563eb; /* blue-700 */
        }

        /* Botón Eliminar */
        .action-button-delete {
          background-color: var(--delete-color);
        }

        .action-button-delete:hover {
          background-color: #dc2626; /* red-700 */
        }
        
        .action-button:active {
            transform: scale(0.95);
        }
      `}</style>
      
      <div className="table-container">
        <table className="player-table">
          <thead className="table-header">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Club</th>
              <th className="p-2">DNI</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((j) => (
              <tr key={j.id} className="table-row">
                <td>{j.nombre}</td>
                <td>{j.apellido}</td>
                <td>{j.club}</td>
                <td>{j.dni}</td>
                <td className={`status-cell status-${j.estado || "activo"}`}>
                  {j.estado || "activo"}
                </td>
                <td className="action-cell">
                  {/* Botón Vista (Sin icono) */}
                  <button 
                    onClick={() => onVerDetalles(j)} 
                    className="action-button action-button-view"
                  >
                    Vista
                  </button>
                  {/* Botón Editar (Sin icono) */}
                  {onEditar && (
                    <button 
                      onClick={() => onEditar(j)} 
                      className="action-button action-button-edit"
                    >
                      Editar
                    </button>
                  )}
                  {/* Botón Eliminar (Sin icono) */}
                  <button 
                    onClick={() => onEliminar(j.id)} 
                    className="action-button action-button-delete"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaJugadores;
