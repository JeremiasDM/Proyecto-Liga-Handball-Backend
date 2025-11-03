import React, { useState } from "react";
// (Importa el tipo Equipo si no está global)
// Asumiendo que Equipo está definido y disponible (como en tu componente padre)

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

  // 1. Definiendo el estilo base para los botones de Acción
  const baseButtonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    margin: "0 4px", // Espacio entre botones
    fontSize: "0.85em",
    transition: 'background-color 0.2s',
  };


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
            // Utilizamos el índice de la fila para determinar el color de fondo alterno si no se pasa rowStyle
            const defaultBg = ( (parseInt(e.currentTarget.rowIndex.toString())-1) % 2 === 1 ? '#f8f9fa' : 'white');
            e.currentTarget.style.backgroundColor = rowStyle.backgroundColor || defaultBg;
        }
      }}
    >
      {editando ? (
        <>
          {/* Modo Edición - Celdas de Input */}
          <td style={{ ...cellStyle, textAlign: "left" }}>
            <input
              name="nombre"
              value={tempStats.nombre}
              onChange={handleChange}
              style={{ ...inputStyle, width: "120px" }}
            />
          </td>
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
                ...baseButtonStyle, // Aplicar estilos base
                backgroundColor: "#1f3c88", // ¡AZUL PARA GUARDAR! 💾
                color: "white",
              }}
            >
              Guardar
            </button>
            <button
              onClick={cancelarEdicion}
              style={{ 
                ...baseButtonStyle, // Aplicar estilos base
                backgroundColor: "#dc3545", // ¡ROJO PARA CANCELAR! ❌
                color: "white",
              }}
            >
              Cancelar
            </button>
          </td>
        </>
      ) : (
        <>
          {/* Modo Visualización - Celdas de Texto */}
          <td style={{ ...cellStyle, textAlign: "left", fontWeight: 500 }}>{equipo.nombre}</td>
          <td style={cellStyle}>{equipo.pg}</td>
          <td style={cellStyle}>{equipo.pe}</td>
          <td style={cellStyle}>{equipo.pp}</td>
          <td style={cellStyle}>{equipo.goles}</td>
          <td
            style={{
              ...cellStyle,
              fontWeight: "bold",
              color: "#1f3c88", 
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
                ...baseButtonStyle, // Aplicar estilos base
                backgroundColor: "#1f3c88", // Azul para Editar
                color: "white",
              }}
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(equipo.id)}
              style={{
                ...baseButtonStyle, // Aplicar estilos base
                backgroundColor: "#dc3545", // Rojo para Eliminar
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
