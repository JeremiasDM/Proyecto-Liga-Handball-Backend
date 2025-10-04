import React, { useState } from "react";
import type { Equipo } from "./TablaEquipos";

type Props = {
  equipo: Equipo;
  onActualizar: (id: number, actualizado: Equipo) => void;
  onEliminar: (id: number) => void;
  rowStyle?: React.CSSProperties; // Agregado para estilo de fila
};

const EquipoItem: React.FC<Props> = ({
  equipo,
  onActualizar,
  onEliminar,
  rowStyle = {},
}) => {
  const [editando, setEditando] = useState(false);
  const [temp, setTemp] = useState<Equipo>(equipo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Manejar el cálculo de puntos al cambiar PG/PE
    const updatedTemp = {
      ...temp,
      [name]: name === "nombre" ? value : Number(value),
    };
    
    // Recalcular puntos inmediatamente si cambiamos PG o PE
    if (name === 'pg' || name === 'pe') {
        updatedTemp.puntos = updatedTemp.pg * 3 + updatedTemp.pe;
    }

    setTemp(updatedTemp);
  };

  const guardarCambios = () => {
    if (!temp.nombre.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    if (temp.pg < 0 || temp.pe < 0 || temp.pp < 0 || temp.goles < 0) {
      alert("Los valores numéricos deben ser mayores o iguales a 0.");
      return;
    }
    
    // El cálculo ya se realiza en handleChange, pero lo aseguramos
    const newPuntos = temp.pg * 3 + temp.pe;
    onActualizar(equipo.id, { ...temp, puntos: newPuntos });
    setEditando(false);
  };
  
  // Estilo base de la fila
  const combinedRowStyle: React.CSSProperties = {
      ...rowStyle,
      transition: 'background-color 0.3s',
      ...(editando ? { backgroundColor: '#fff3cd' } : {}), // Fondo de edición
  };


  // Estilos compartidos para celdas
  const cellStyle: React.CSSProperties = {
    padding: 12,
    textAlign: "center",
    borderBottom: "1px solid #e0e0e0",
  };
  const inputStyle: React.CSSProperties = {
    padding: 5,
    border: "1px solid #ced4da",
    borderRadius: 4,
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <tr
      style={combinedRowStyle}
      // Hover effect usando onMouseEnter/onMouseLeave (opcional, mejor con CSS)
      onMouseEnter={(e) => {
        if (!editando) e.currentTarget.style.backgroundColor = "#e9ecef";
      }}
      onMouseLeave={(e) => {
        if (!editando) e.currentTarget.style.backgroundColor = rowStyle.backgroundColor || 'white';
      }}
    >
      {editando ? (
        <>
          <td style={{ ...cellStyle, textAlign: "left" }}>
            <input
              name="nombre"
              value={temp.nombre}
              onChange={handleChange}
              style={{ ...inputStyle, width: "120px" }}
            />
          </td>
          <td style={cellStyle}>
            <input
              name="pg"
              type="number"
              value={temp.pg}
              onChange={handleChange}
              style={{ ...inputStyle, width: "60px" }}
            />
          </td>
          <td style={cellStyle}>
            <input
              name="pe"
              type="number"
              value={temp.pe}
              onChange={handleChange}
              style={{ ...inputStyle, width: "60px" }}
            />
          </td>
          <td style={cellStyle}>
            <input
              name="pp"
              type="number"
              value={temp.pp}
              onChange={handleChange}
              style={{ ...inputStyle, width: "60px" }}
            />
          </td>
          <td style={cellStyle}>
            <input
              name="goles"
              type="number"
              value={temp.goles}
              onChange={handleChange}
              style={{ ...inputStyle, width: "60px" }}
            />
          </td>
          <td style={{ ...cellStyle, fontWeight: "bold" }}>
            {temp.pg * 3 + temp.pe}
          </td>
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
              onClick={() => setEditando(false)}
              style={{
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
          <td style={{ ...cellStyle, textAlign: "left" }}>{equipo.nombre}</td>
          <td style={cellStyle}>{equipo.pg}</td>
          <td style={cellStyle}>{equipo.pe}</td>
          <td style={cellStyle}>{equipo.pp}</td>
          <td style={cellStyle}>{equipo.goles}</td>
          <td
            style={{
              ...cellStyle,
              fontWeight: "bold",
              color: "#007bff",
              fontSize: "1.1em",
            }}
          >
            {equipo.puntos}
          </td>
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
                backgroundColor: "#28a745", // Verde para editar
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
