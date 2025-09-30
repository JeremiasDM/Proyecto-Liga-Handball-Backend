import React, { useState } from "react";
import type { Equipo } from "./TablaEquipos";

type Props = {
  onAgregar: (equipo: Equipo) => void;
};

const EquipoForm: React.FC<Props> = ({ onAgregar }) => {
  const [nombre, setNombre] = useState("");
  const [pg, setPg] = useState(0);
  const [pe, setPe] = useState(0);
  const [pp, setPp] = useState(0);
  const [goles, setGoles] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre del equipo es obligatorio.");
      return;
    }
    if (pg < 0 || pe < 0 || pp < 0 || goles < 0) {
      alert("Los valores deben ser mayores o iguales a 0.");
      return;
    }

    const nuevo: Equipo = {
      id: Date.now(),
      nombre,
      pg,
      pe,
      pp,
      goles,
      puntos: pg * 3 + pe,
    };

    onAgregar(nuevo);

    setNombre("");
    setPg(0);
    setPe(0);
    setPp(0);
    setGoles(0);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        placeholder="Nombre del equipo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="PG"
        value={pg}
        onChange={(e) => setPg(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="PE"
        value={pe}
        onChange={(e) => setPe(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="PP"
        value={pp}
        onChange={(e) => setPp(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Goles"
        value={goles}
        onChange={(e) => setGoles(Number(e.target.value))}
      />
      <button type="submit">Agregar Equipo</button>
    </form>
  );
};

export default EquipoForm;
