import React from "react";

// --- Tipos ---
interface Club {
  id: number;
  nombre: string;
}
interface Jugador {
  id: number;
  apellido: string;
  dni: string;
  clubId: number;
  club: Club;
  categoria: string;
  estado?: string;
  nombre: string;
  // ...
}

type Props = {
  jugadores: Jugador[];
  onIniciarEdicion: (jugador: Jugador) => void;
  onEliminar: (id: number) => void;
};

// --- Iconos SVG ---
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-1.414 7.07l-2.828 2.828-5.657-5.657 2.828-2.828 5.657 5.657zM8.414 17H5a2 2 0 01-2-2v-3.414l5.657-5.657 2.828 2.828-5.657 5.657z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z"
      clipRule="evenodd"
    />
  </svg>
);

const ListaJugadores: React.FC<Props> = ({
  jugadores,
  onIniciarEdicion,
  onEliminar,
}) => {
  // Función auxiliar para determinar la clase de estado
  const getStatusClass = (estado?: string) => {
    switch (estado?.toLowerCase()) {
      case "lesionado":
        return "status-lesionado";
      case "sancionado":
        return "status-sancionado";
      case "inactivo":
        return "status-inactivo";
      default:
        return "status-activo";
    }
  };

  if (!jugadores || jugadores.length === 0) {
    return (
      <p className="empty-list-message">No hay jugadores cargados.</p>
    );
  }

  return (
    <>
      <style>{`
        /* Definiciones de color y variables */
        :root {
          --primary-blue: #1f3c88;
          --header-blue: #1a326b;
          --shadow-color: rgba(0, 0, 0, 0.2);
          --edit-color: #3b82f6; /* blue-500 */
          --edit-color-hover: #2563eb; /* blue-700 */
          --delete-color: #ef4444; /* red-500 */
          --delete-color-hover: #dc2626; /* red-700 */
        }

        /* Mensaje de lista vacía */
        .empty-list-message {
          color: #6b7280;
          text-align: center;
          padding: 1rem;
          margin-top: 1.5rem;
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
          overflow: hidden;
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
          border-bottom: 1px solid #e5e7eb;
          transition: background-color 0.2s;
        }

        .table-row:hover {
          background-color: #f9fafb;
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
        
        .status-activo { color: #10b981; }
        .status-lesionado { color: #f97316; }
        .status-sancionado { color: #f59e0b; }
        .status-inactivo { color: #6b7280; }


        /* Contenedor de Acciones */
        .action-cell {
          padding: 0.75rem;
          display: flex;
          gap: 0.75rem; /* Un poco más de espacio entre los botones */
          justify-content: center;
          align-items: center;
        }

        /* Botones de Acción base - ¡FORMA Y TAMAÑO AJUSTADOS! */
        .action-button {
          /* Padding más generoso para un aspecto más 'lleno' */
          padding: 0.8rem 1.4rem; 
          border-radius: 0.75rem; /* Bordes más redondeados (como en la imagen) */
          color: white;
          font-weight: 700; /* Fuente más audaz */
          font-size: 1rem; /* Tamaño de fuente más grande */
          transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
          /* Sombra más profunda para imitar el botón de la imagen */
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25); 
          border: none;
          cursor: pointer;
          
          /* Flexbox para centrar y alinear icono y texto */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem; /* Espacio entre el icono y el texto */
        }
        
        /* Estilo para los iconos dentro de los botones */
        .action-button .icon {
          width: 1.15rem; /* Iconos ligeramente más grandes */
          height: 1.15rem;
        }

        /* Botón Editar - manteniendo el color azul */
        .action-button-edit {
          background-color: var(--edit-color); /* blue-500 */
        }

        .action-button-edit:hover {
          background-color: var(--edit-color-hover); /* blue-700 */
          /* Ajuste de sombra para hover */
          box-shadow: 0 6px 15px rgba(59, 130, 246, 0.5); 
        }

        /* Botón Eliminar - manteniendo el color rojo */
        .action-button-delete {
          background-color: var(--delete-color); /* red-500 */
        }

        .action-button-delete:hover {
          background-color: var(--delete-color-hover); /* red-700 */
          /* Ajuste de sombra para hover */
          box-shadow: 0 6px 15px rgba(239, 68, 68, 0.5);
        }
        
        /* Efecto de clic */
        .action-button:active {
            transform: scale(0.98);
            opacity: 0.95;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Sombra más sutil al hacer clic */
        }
      `}</style>
      <div className="table-container">
        <table className="player-table">
          <thead className="table-header">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Club</th>
              <th>DNI</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((j) => (
              <tr key={j.id} className="table-row">
                <td>{j.nombre}</td>
                <td>{j.apellido}</td>
                <td>{j.club ? j.club.nombre : "Sin club"}</td>
                <td>{j.dni}</td>
                <td className={`status-cell ${getStatusClass(j.estado)}`}>
                  {j.estado || "Activo"}
                </td>
                <td className="action-cell">
                  <button
                    onClick={() => onIniciarEdicion(j)}
                    className="action-button action-button-edit"
                  >
                    <EditIcon />
                    Editar
                  </button>
                  <button
                    onClick={() => onEliminar(j.id)}
                    className="action-button action-button-delete"
                  >
                    <DeleteIcon />
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
