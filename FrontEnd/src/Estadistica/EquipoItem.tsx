import React, { useState } from "react";
import type { Equipo } from "./TablaEquipos";

type Props = {
  equipo: Equipo;
  onActualizar: (id: number, actualizado: Equipo) => void;
  onEliminar: (id: number) => void;
};

const EquipoItem: React.FC<Props> = ({ equipo, onActualizar, onEliminar }) => {
  const [editando, setEditando] = useState(false);
  const [temp, setTemp] = useState<Equipo>(equipo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemp({ ...temp, [name]: name === "nombre" ? value : Number(value) });
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
    temp.puntos = temp.pg * 3 + temp.pe;
    onActualizar(equipo.id, temp);
    setEditando(false);
  };

  return (
    <tr>
      {editando ? (
        <>
          <td>
            <input
              name="nombre"
              value={temp.nombre}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="pg"
              type="number"
              value={temp.pg}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="pe"
              type="number"
              value={temp.pe}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="pp"
              type="number"
              value={temp.pp}
              onChange={handleChange}
            />
          </td>
          <td>
            <input
              name="goles"
              type="number"
              value={temp.goles}
              onChange={handleChange}
            />
          </td>
          <td>{temp.pg * 3 + temp.pe}</td>
          <td>
            <button onClick={guardarCambios}>Guardar</button>
            <button onClick={() => setEditando(false)}>Cancelar</button>
          </td>
        </>
      ) : (
        <>
          <td>{equipo.nombre}</td>
          <td>{equipo.pg}</td>
          <td>{equipo.pe}</td>
          <td>{equipo.pp}</td>
          <td>{equipo.goles}</td>
          <td>{equipo.puntos}</td>
          <td>
            <button onClick={() => setEditando(true)}>Editar</button>
            <button onClick={() => onEliminar(equipo.id)}>Eliminar</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default EquipoItem;
