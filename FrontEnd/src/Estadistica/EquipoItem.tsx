import React, { useState } from "react";
// (Importa el tipo Equipo si no está global)
// Asumiendo que Equipo está definido y disponible (como en tu componente padre)

// --- Definición del tipo Equipo (Repetido aquí por si acaso, pero idealmente se importa) ---
export type Equipo = {
  id: number;
  nombre: string;
  pj?: number;
  pg?: number;
  pe?: number;
  pp?: number;
  cp?: number;
  gf?: number;
  gc?: number;
  df?: number;
  goles?: number;
  puntos?: number;
  activo?: boolean;
};
// -----------------------------------------------------------------------------------------


type Props = {
  equipo: Equipo;
  onActualizar: (id: number, actualizado: Partial<Equipo>) => void;
  onEliminar: (id: number) => void;
  rowStyle?: React.CSSProperties;
  posicion?: number;
};

const EquipoItem: React.FC<Props> = ({
  equipo,
  onActualizar,
  onEliminar,
  rowStyle = {},
  posicion,
}) => {
  const [editando, setEditando] = useState(false);
  // Estado temporal solo para la edición
  const [tempStats, setTempStats] = useState({
    nombre: equipo.nombre,
    pj: equipo.pj ?? (equipo.pg ?? 0) + (equipo.pe ?? 0) + (equipo.pp ?? 0),
    pg: equipo.pg ?? 0,
    pe: equipo.pe ?? 0,
    pp: equipo.pp ?? 0,
    cp: equipo.cp ?? 0,
    gf: equipo.gf ?? 0,
    gc: equipo.gc ?? 0,
    df: equipo.df ?? ((equipo.gf ?? 0) - (equipo.gc ?? 0)),
    puntos: equipo.puntos ?? ((equipo.pg ?? 0) * 3 + (equipo.pe ?? 0)),
  });
  // Los puntos se calculan al guardar o se muestran los del prop

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempStats(prev => ({
      ...prev,
      [name]: name === "nombre" ? value : Number(value),
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
    // Calcular puntos automáticamente (PG * 3 + PE)
    const puntosCalculados = (tempStats.pg ?? 0) * 3 + (tempStats.pe ?? 0);

    // Llama a la función onActualizar del padre con los valores y puntos calculados
    onActualizar(equipo.id, {
      nombre: tempStats.nombre,
      pj: tempStats.pj,
      pg: tempStats.pg,
      pe: tempStats.pe,
      pp: tempStats.pp,
      cp: tempStats.cp,
      gf: tempStats.gf,
      gc: tempStats.gc,
      df: tempStats.df,
      puntos: puntosCalculados,
    });
    setEditando(false);
  };

  const cancelarEdicion = () => {
      // Resetear valores temporales al estado del equipo
      setTempStats({
        nombre: equipo.nombre,
        pj: equipo.pj ?? (equipo.pg ?? 0) + (equipo.pe ?? 0) + (equipo.pp ?? 0),
        pg: equipo.pg ?? 0,
        pe: equipo.pe ?? 0,
        pp: equipo.pp ?? 0,
        cp: equipo.cp ?? 0,
        gf: equipo.gf ?? 0,
        gc: equipo.gc ?? 0,
        df: equipo.df ?? ((equipo.gf ?? 0) - (equipo.gc ?? 0)),
        puntos: equipo.puntos ?? ((equipo.pg ?? 0) * 3 + (equipo.pe ?? 0)),
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

  // Nota: los puntos se pueden editar directamente en la fila; el backend validará la coherencia

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

  // Calcular puntos en tiempo real para mostrar en edición (PG * 3 + PE)
  const puntosCalculados = (tempStats.pg ?? 0) * 3 + (tempStats.pe ?? 0);


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
          {/* Modo Edición - mostrar posición, nombre, puntos y campos editables */}
          <td style={{ ...cellStyle, textAlign: 'left', fontWeight: 600 }}>{posicion}</td>
          <td style={{ ...cellStyle, textAlign: 'left' }}>
            <input name="nombre" value={tempStats.nombre} onChange={handleChange} style={{ ...inputStyle, width: '140px' }} />
          </td>
          <td style={{ ...cellStyle, fontWeight: 700 }}>{puntosCalculados}</td>
          <td style={cellStyle}>
            <input name="pj" type="number" min={0} value={tempStats.pj} onChange={handleChange} style={{ ...inputStyle, width: '60px' }} />
          </td>
          <td style={cellStyle}>
            <input name="pg" type="number" min={0} value={tempStats.pg} onChange={handleChange} style={{ ...inputStyle, width: '60px' }} />
          </td>
          <td style={cellStyle}>
            <input name="pe" type="number" min={0} value={tempStats.pe} onChange={handleChange} style={{ ...inputStyle, width: '60px' }} />
          </td>
          <td style={cellStyle}>
            <input name="pp" type="number" min={0} value={tempStats.pp} onChange={handleChange} style={{ ...inputStyle, width: '60px' }} />
          </td>
          <td style={cellStyle}>
            <input name="cp" type="number" min={0} value={tempStats.cp} onChange={handleChange} style={{ ...inputStyle, width: '60px' }} />
          </td>
          <td style={cellStyle}>
            <input name="gf" type="number" min={0} value={tempStats.gf} onChange={handleChange} style={{ ...inputStyle, width: '60px' }} />
          </td>
          <td style={cellStyle}>
            <input name="gc" type="number" min={0} value={tempStats.gc} onChange={handleChange} style={{ ...inputStyle, width: '60px' }} />
          </td>
          <td style={cellStyle}>
            <input name="df" type="number" value={tempStats.df} onChange={handleChange} style={{ ...inputStyle, width: '60px' }} />
          </td>
          {/* Acciones (Guardar/Cancelar) */}
          <td style={cellStyle}>
            <button onClick={guardarCambios} style={{ ...baseButtonStyle, backgroundColor: '#1f3c88', color: 'white' }}>Guardar</button>
            <button onClick={cancelarEdicion} style={{ ...baseButtonStyle, backgroundColor: '#6c757d', color: 'white' }}>Cancelar</button>
          </td>
        </>
      ) : (
        <>
          {/* Modo Visualización - mostrar posicion, nombre, puntos y demás columnas */}
          <td style={{ ...cellStyle, textAlign: 'left', fontWeight: 700 }}>{posicion}</td>
          <td style={{ ...cellStyle, textAlign: 'left', fontWeight: 600 }}>{equipo.nombre}</td>
          <td style={cellStyle}><strong>{equipo.puntos ?? ((equipo.pg ?? 0) * 3 + (equipo.pe ?? 0))}</strong></td>
          <td style={cellStyle}>{equipo.pj ?? ((equipo.pg ?? 0) + (equipo.pe ?? 0) + (equipo.pp ?? 0))}</td>
          <td style={cellStyle}>{equipo.pg ?? 0}</td>
          <td style={cellStyle}>{equipo.pe ?? 0}</td>
          <td style={cellStyle}>{equipo.pp ?? 0}</td>
          <td style={cellStyle}>{equipo.cp ?? 0}</td>
          <td style={cellStyle}>{equipo.gf ?? 0}</td>
          <td style={cellStyle}>{equipo.gc ?? 0}</td>
          <td style={cellStyle}>{equipo.df ?? ((equipo.gf ?? 0) - (equipo.gc ?? 0))}</td>
          <td style={cellStyle}>
            <button onClick={() => setEditando(true)} style={{ ...baseButtonStyle, backgroundColor: '#1f3c88', color: 'white' }}>Editar</button>
            <button onClick={() => onEliminar(equipo.id)} style={{ ...baseButtonStyle, backgroundColor: '#dc3545', color: 'white' }}>Eliminar</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default EquipoItem;
