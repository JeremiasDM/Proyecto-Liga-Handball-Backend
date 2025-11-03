import React, { useState } from "react";
// (Importa el tipo Equipo si no está global)

type Props = {
  equipo: any;
  onActualizar: (id: number, actualizado: any) => void;
  onEliminar: (id: number) => void;
  rowStyle?: React.CSSProperties;
  posicion: number; // Desestructuración de props
};

const EquipoItem: React.FC<Props> = ({
  equipo,
  onActualizar,
  onEliminar,
  rowStyle = {},
  posicion, // Desestructuración de props
}) => {
  const [editando, setEditando] = useState(false);
  // Estado temporal solo para la edición
  const [tempStats, setTempStats] = useState({
    nombre: equipo.nombre,
    pj: equipo.pj,
    pg: equipo.pg,
    pe: equipo.pe,
    pp: equipo.pp,
    cp: equipo.cp,
    gf: equipo.gf,
    gc: equipo.gc,
    df: equipo.df,
    goles: equipo.goles,
    puntos: equipo.puntos,
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
        // nombre: tempStats.nombre, // Descomentar si quieres poder editar el nombre aquí
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
    pj: equipo.pj,
    pg: equipo.pg,
    pe: equipo.pe,
    pp: equipo.pp,
    cp: equipo.cp,
    gf: equipo.gf,
    gc: equipo.gc,
    df: equipo.df,
    goles: equipo.goles,
    puntos: equipo.puntos,
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
  // Cálculo de campos derivados
  const puntosCalculados = tempStats.pg * 3 + tempStats.pe;
  const pjCalculado = tempStats.pj ?? (tempStats.pg + tempStats.pe + tempStats.pp);
  const dfCalculado = tempStats.df ?? (tempStats.gf - tempStats.gc);

  return (
    <tr
      style={combinedRowStyle}
      onMouseEnter={(e) => {
        if (!editando) e.currentTarget.style.backgroundColor = "#e9ecef";
      }}
      onMouseLeave={(e) => {
        if (!editando) e.currentTarget.style.backgroundColor = rowStyle.backgroundColor || ( (parseInt(e.currentTarget.rowIndex.toString())-1) % 2 === 1 ? '#f8f9fa' : 'white');
      }}
    >
      {editando ? (
        <>
          <td style={{ ...cellStyle, textAlign: "left", fontWeight: 500 }}>{posicion}</td>
          <td style={{ ...cellStyle, textAlign: "left", fontWeight: 500 }}>{tempStats.nombre}</td>
          <td style={cellStyle}>
            <input name="pj" type="number" min="0" value={pjCalculado} onChange={handleChange} style={{ ...inputStyle, width: "50px" }}/>
          </td>
          <td style={cellStyle}>
            <input name="pg" type="number" min="0" value={tempStats.pg} onChange={handleChange} style={{ ...inputStyle, width: "50px" }}/>
          </td>
          <td style={cellStyle}>
            <input name="pe" type="number" min="0" value={tempStats.pe} onChange={handleChange} style={{ ...inputStyle, width: "50px" }}/>
          </td>
          <td style={cellStyle}>
            <input name="pp" type="number" min="0" value={tempStats.pp} onChange={handleChange} style={{ ...inputStyle, width: "50px" }}/>
          </td>
          <td style={cellStyle}>
            <input name="cp" type="number" min="0" value={tempStats.cp} onChange={handleChange} style={{ ...inputStyle, width: "50px" }}/>
          </td>
          <td style={cellStyle}>
            <input name="gf" type="number" min="0" value={tempStats.gf} onChange={handleChange} style={{ ...inputStyle, width: "50px" }}/>
          </td>
          <td style={cellStyle}>
            <input name="gc" type="number" min="0" value={tempStats.gc} onChange={handleChange} style={{ ...inputStyle, width: "50px" }}/>
          </td>
          <td style={cellStyle}>
            <input name="df" type="number" value={dfCalculado} onChange={handleChange} style={{ ...inputStyle, width: "50px" }}/>
          </td>
          <td style={{ ...cellStyle, fontWeight: "bold" }}>{puntosCalculados}</td>
          <td style={{...cellStyle, whiteSpace: 'nowrap'}}>
            <button onClick={guardarCambios} style={{ backgroundColor: '#28a745', color: 'white', padding: '4px 8px', border:'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>Guardar</button>
            <button onClick={cancelarEdicion} style={{ backgroundColor: '#6c757d', color: 'white', padding: '4px 8px', border:'none', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
          </td>
        </>
      ) : (
        <>
          <td style={{ ...cellStyle, textAlign: "left", fontWeight: 500 }}>{posicion}</td>
          <td style={{ ...cellStyle, textAlign: "left", fontWeight: 500 }}>{equipo.nombre}</td>
          <td style={cellStyle}>{equipo.pj ?? (equipo.pg + equipo.pe + equipo.pp)}</td>
          <td style={cellStyle}>{equipo.pg}</td>
          <td style={cellStyle}>{equipo.pe}</td>
          <td style={cellStyle}>{equipo.pp}</td>
          <td style={cellStyle}>{equipo.cp}</td>
          <td style={cellStyle}>{equipo.gf}</td>
          <td style={cellStyle}>{equipo.gc}</td>
          <td style={cellStyle}>{equipo.df ?? (equipo.gf - equipo.gc)}</td>
          <td style={{ ...cellStyle, fontWeight: "bold", color: "#0056b3", fontSize: "1em" }}>{equipo.puntos}</td>
          <td style={{...cellStyle, whiteSpace: 'nowrap'}}>
             <button onClick={() => setEditando(true)} style={{ backgroundColor: '#007bff', color: 'white', padding: '4px 8px', border:'none', borderRadius: '4px', cursor: 'pointer', marginRight: '4px' }}>Editar</button>
             <button onClick={() => onEliminar(equipo.id)} style={{ backgroundColor: '#dc3545', color: 'white', padding: '4px 8px', border:'none', borderRadius: '4px', cursor: 'pointer' }}>Eliminar</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default EquipoItem;