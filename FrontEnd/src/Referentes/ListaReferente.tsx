import React from "react";
import type { CSSProperties } from "react"; // Necesario para definir el tipo de estilos

// --- Definiciones de tipo (ajustadas) ---
interface Club {
  id: number;
  nombre: string;
}

interface Referente {
  id: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  clubId: number;
  club: Club; // <-- La API devuelve un objeto 'club'
}

interface Props {
  referentes: Referente[];
  onVer: (referente: Referente) => void;
  onEditar?: (referente: Referente) => void;
  onEliminar?: (id: number) => void;
}

// =========================================================
// 🎨 SECCIÓN DE ESTILOS DE LA TABLA (ACTUALIZADA) 🎨
// =========================================================
const tablaStyles: { [key: string]: CSSProperties } = {
  // 1. Cabecera (Thead)
  tableHeader: {
    backgroundColor: '#1f3c88', // ⬅️ CAMBIO: Azul Fuerte
    color: '#ffffff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '14px',
  },
  // 2. Celdas de Cabecera
  headerCell: {
    padding: '12px 16px',
    textAlign: 'left',
  },
  // 3. Filas (Tr)
  bodyRow: {
    borderBottom: '1px solid #e5e7eb', // Gris muy claro
    transition: 'background-color 0.3s ease',
    cursor: 'default',
  },
  // 4. Celdas de Datos (Td)
  bodyCell: {
    padding: '12px 16px',
    color: '#374151', // Gris oscuro
    fontSize: '15px',
  },
  // 5. Contenedor de Acciones (Para alinear botones)
  actionsContainer: {
    display: 'flex',
    gap: '8px',
    padding: '12px 16px',
  },
  // 6. Botones (Adaptando los estilos Primario/Secundario para la tabla)
  buttonBase: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease, transform 0.1s ease',
    whiteSpace: 'nowrap',
  },
  buttonVer: {
    backgroundColor: '#1f3c88', // ⬅️ CAMBIO: Azul Fuerte
    color: '#ffffff',
  },
  buttonEditar: {
    backgroundColor: '#1f3c88', // ⬅️ CAMBIO: Azul Fuerte
    color: '#ffffff',
  },
  buttonEliminar: {
    backgroundColor: '#ef4444', // Se mantiene el rojo para eliminar
    color: '#ffffff',
  },
};

const ListaReferente: React.FC<Props> = ({
  referentes,
  onVer,
  onEditar,
  onEliminar,
}) => {
  if (!referentes || referentes.length === 0) {
    return (
      <p style={{ color: "#6b7280", textAlign: "center", padding: "20px" }}>
        No hay referentes registrados.
      </p>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={tablaStyles.tableHeader}>
          <tr>
            <th style={{ ...tablaStyles.headerCell, borderTopLeftRadius: "10px" }}>
              Nombre
            </th>
            <th style={tablaStyles.headerCell}>Apellido</th>
            <th style={tablaStyles.headerCell}>Equipo</th> {/* <-- CAMBIO DE TEXTO */}
            <th style={tablaStyles.headerCell}>Correo</th>
            <th
              style={{ ...tablaStyles.headerCell, borderTopRightRadius: "10px" }}
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {referentes.map((ref, index) => (
            <tr
              key={ref.id}
              style={{
                ...tablaStyles.bodyRow,
                backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                borderTop: index === 0 ? "none" : undefined,
              }}
            >
              <td style={tablaStyles.bodyCell}>{ref.nombre}</td>
              <td style={tablaStyles.bodyCell}>{ref.apellido}</td>
              {/* --- CAMBIO: Mostrar nombre del club --- */}
              <td style={tablaStyles.bodyCell}>
                {ref.club ? ref.club.nombre : "Sin club"}
              </td>
              <td style={tablaStyles.bodyCell}>{ref.correo}</td>
              <td style={tablaStyles.actionsContainer}>
                <button
                  onClick={() => onVer(ref)}
                  style={{ ...tablaStyles.buttonBase, ...tablaStyles.buttonVer }}
                >
                  Ver
                </button>
                {onEditar && (
                  <button
                    onClick={() => onEditar(ref)}
                    style={{
                      ...tablaStyles.buttonBase,
                      ...tablaStyles.buttonEditar,
                    }}
                  >
                    Editar
                  </button>
                )}
                {onEliminar && (
                  <button
                    onClick={() => onEliminar(ref.id)}
                    style={{
                      ...tablaStyles.buttonBase,
                      ...tablaStyles.buttonEliminar,
                    }}
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaReferente;
