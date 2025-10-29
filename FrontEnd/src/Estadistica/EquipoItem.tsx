import React, { useState } from "react";
// (Importa el tipo Equipo si no está global)
// Asumiendo que Equipo está definido y disponible (como en tu componente padre)
// Si no lo está, se necesitaría importar:
// import { Equipo } from './EstadisticasPage'; // Ejemplo de importación si viniera de otro archivo

// --- Definición del tipo Equipo (Repetido aquí por si acaso, pero idealmente se importa) ---
export type Equipo = {
  id: number;
  nombre: string;
  pg: number;
  pe: number;
  pp: number;
  goles: number;
  puntos: number;
  activo?: boolean;
};
// -----------------------------------------------------------------------------------------


type Props = {
  equipo: Equipo;
  onActualizar: (id: number, actualizado: Partial<Equipo>) => void; // Recibe handler
  onEliminar: (id: number) => void; // Recibe handler
  rowStyle?: React.CSSProperties;
};

const EquipoItem: React.FC<Props> = ({
  equipo,
  onActualizar,
  onEliminar,
  rowStyle = {},
}) => {
  const [editando, setEditando] = useState(false);
  // Estado temporal solo para la edición
  const [tempStats, setTempStats] = useState({
    nombre: equipo.nombre, // Permitir editar nombre si es necesario
    pg: equipo.pg,
    pe: equipo.pe,
    pp: equipo.pp,
    goles: equipo.goles,
  });
  // Los puntos se calculan al guardar o se muestran los del prop

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempStats(prev => ({
      ...prev,
      [name]: name === "nombre" ? value : Number(value), // Convertir a número excepto nombre
    }));
  };

  const guardarCambios = () => {
    // Validaciones básicas
    if (!tempStats.nombre.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    if (tempStats.pg < 0 || tempStats.pe < 0 || tempStats.pp < 0) {
      alert("PG, PE, PP deben ser mayores o iguales a 0.");
      return;
    }

    // Llama a la función onActualizar del padre, pasando solo los datos modificables
    onActualizar(equipo.id, {
        nombre: tempStats.nombre, // ¡Ahora se puede editar!
        pg: tempStats.pg,
        pe: tempStats.pe,
        pp: tempStats.pp,
        goles: tempStats.goles,
        // Los puntos se recalcularán en el padre/backend al llamar onActualizar
    });
    setEditando(false);
  };

  const cancelarEdicion = () => {
      setTempStats({ // Resetear al valor original
          nombre: equipo.nombre,
          pg: equipo.pg,
          pe: equipo.pe,
          pp: equipo.pp,
          goles: equipo.goles,
      });
      setEditando(false);
  }

  // Estilo base de la fila
  const combinedRowStyle: React.CSSProperties = {
      ...rowStyle,
      transition: 'background-color 0.3s',
      ...(editando ? { backgroundColor: '#fff3cd' } : {}), // Amarillo claro al editar
  };


  // Estilos compartidos para celdas
  const cellStyle: React.CSSProperties = {
    padding: '10px 15px', // Ajustado
    textAlign: "center",
    borderBottom: "1px solid #e9ecef", // Gris más claro
    fontSize: '0.9rem', // Ligeramente más pequeño
    verticalAlign: 'middle', // Alinear verticalmente
  };
  const inputStyle: React.CSSProperties = {
    padding: '4px 6px',
    border: "1px solid #ced4da",
    borderRadius: 4,
    width: "100%",
    boxSizing: "border-box",
    textAlign: 'center', // Centrar texto en input
  };

  // Puntos calculados para mostrar en modo edición
  const puntosCalculados = tempStats.pg * 3 + tempStats.pe;

  return (
    <tr
      style={combinedRowStyle}
      // Hover effect usando onMouseEnter/onMouseLeave
      onMouseEnter={(e) => {
        if (!editando) e.currentTarget.style.backgroundColor = "#e9ecef";
      }}
      onMouseLeave={(e) => {
        // Restaurar el color original. Si rowStyle.backgroundColor no existe, se usa el color alternado.
        if (!editando) {
            const defaultBg = ( (parseInt(e.currentTarget.rowIndex.toString())-1) % 2 === 1 ? '#f8f9fa' : 'white');
            e.currentTarget.style.backgroundColor = rowStyle.backgroundColor || defaultBg;
        }
      }}
    >
      {editando ? (
        <>
          {/* Nombre: ¡Ahora editable! */}
          <td style={{ ...cellStyle, textAlign: "left" }}>
            <input
              name="nombre"
              value={tempStats.nombre}
              onChange={handleChange}
              style={{ ...inputStyle, width: "120px" }}
            />
          </td>
          {/* PG */}
          <td style={cellStyle}>
            <input
              name="pg"
              type="number"
              min="0"
              value={tempStats.pg}
              onChange={handleChange}
              style={{ ...inputStyle, width: "60px" }}
            />
          </td>
          {/* PE */}
          <td style={cellStyle}>
            <input
              name="pe"
              type="number"
              min="0"
              value={tempStats.pe}
              onChange={handleChange}
              style={{ ...inputStyle, width: "60px" }}
            />
          </td>
          {/* PP */}
          <td style={cellStyle}>
            <input
              name="pp"
              type="number"
              min="0"
              value={tempStats.pp}
              onChange={handleChange}
              style={{ ...inputStyle, width: "60px" }}
            />
          </td>
          {/* Goles */}
          <td style={cellStyle}>
            <input
              name="goles"
              type="number"
              value={tempStats.goles}
              onChange={handleChange}
              style={{ ...inputStyle, width: "60px" }}
            />
          </td>
          {/* Puntos Calculados */}
          <td style={{ ...cellStyle, fontWeight: "bold" }}>
            {puntosCalculados}
          </td>
          {/* Acciones (Guardar/Cancelar) */}
          <td style={cellStyle}>
            <button
              onClick={guardarCambios}
              style={{
                padding: "5px 10px",
                margin: "0 2px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.85em",
                backgroundColor: "#28a745", // Verde para guardar
                color: "white",
              }}
            >
              Guardar
            </button>
            <button
              onClick={cancelarEdicion}
              style={{ // Usamos cancelarEdicion en lugar de solo setEditando(false) para resetear el estado
                padding: "5px 10px",
                margin: "0 2px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.85em",
                backgroundColor: "#dc3545", // Rojo para cancelar
                color: "white",
              }}
            >
              Cancelar
            </button>
          </td>
        </>
      ) : (
        <>
          {/* Modo Visualización */}
          <td style={{ ...cellStyle, textAlign: "left", fontWeight: 500 }}>{equipo.nombre}</td>
          <td style={cellStyle}>{equipo.pg}</td>
          <td style={cellStyle}>{equipo.pe}</td>
          <td style={cellStyle}>{equipo.pp}</td>
          <td style={cellStyle}>{equipo.goles}</td>
          <td
            style={{
              ...cellStyle,
              fontWeight: "bold",
              color: "#007bff", // Color destacado para los puntos
              fontSize: "1.1em",
            }}
          >
            {equipo.puntos}
          </td>
          {/* Acciones (Editar/Eliminar) */}
          <td style={cellStyle}>
            <button
              onClick={() => setEditando(true)}
              style={{
                padding: "5px 10px",
                margin: "0 2px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.85em",
                backgroundColor: "#007bff", // Azul para editar
                color: "white",
              }}
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(equipo.id)}
              style={{
                padding: "5px 10px",
                margin: "0 2px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: "0.85em",
                backgroundColor: "#dc3545", // Rojo para eliminar
                color: "white",
              }}
            >
              Eliminar
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default EquipoItem;