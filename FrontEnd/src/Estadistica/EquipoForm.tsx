import React, { useState } from "react";
import type { Equipo } from "./TablaEquipos";

type Props = {
  onAgregar: (equipo: Equipo) => void;
  equipos: Equipo[];
};

const categorias = ["Masculino", "Femenino"] as const;

const EquipoForm: React.FC<Props> = ({ onAgregar, equipos }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState<"Masculino" | "Femenino">("Masculino");
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
    // Validación de unicidad por nombre y categoría
    if (
      equipos.some(
        eq =>
          eq.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() &&
          eq.categoria === categoria
      )
    ) {
      alert("Ya existe un equipo con ese nombre en la misma categoría.");
      return;
    }

    const nuevo: Equipo = {
      id: Date.now(),
      nombre,
      categoria,
      pg,
      pe,
      pp,
      goles,
      puntos: pg * 3 + pe,
    };

    onAgregar(nuevo);

    setNombre("");
    setCategoria("Masculino");
    setPg(0);
    setPe(0);
    setPp(0);
    setGoles(0);
  };

  // --- Estilos Actualizados ---
  const formStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #dee2e6",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: 20,
  };

  const inputStyle: React.CSSProperties = {
    padding: "8px 10px",
    border: "1px solid #ced4da",
    borderRadius: 4,
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s",
    marginTop: 4,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.8em",
    color: "#6c757d",
    fontWeight: 600,
    display: "block",
    marginBottom: 2,
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    flexShrink: 0,
    minWidth: "150px",
    alignSelf: "center",
  };

  // --- Renderizado con Etiquetas ---
  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* Campo: Nombre */}
      <div style={{ flexGrow: 3, minWidth: "180px" }}>
        <label htmlFor="nombre-equipo" style={labelStyle}>
          Nombre del Equipo
        </label>
        <input
          id="nombre-equipo"
          style={inputStyle}
          placeholder="Ej: Rayos FC"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      {/* Campo: Categoría */}
      <div style={{ flexGrow: 1, minWidth: "120px" }}>
        <label htmlFor="categoria-equipo" style={labelStyle}>
          Categoría
        </label>
        <select
          id="categoria-equipo"
          style={inputStyle}
          value={categoria}
          onChange={e => setCategoria(e.target.value as "Masculino" | "Femenino")}
          required
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Campo: PG (Partidos Ganados) */}
      <div style={{ flexGrow: 1, minWidth: "70px" }}>
        <label htmlFor="pg-equipo" style={labelStyle}>PG (Ganados)</label>
        <input
          id="pg-equipo"
          style={inputStyle}
          type="number"
          placeholder="0"
          value={pg}
          onChange={(e) => setPg(Number(e.target.value))}
        />
      </div>

      {/* Campo: PE (Partidos Empatados) */}
      <div style={{ flexGrow: 1, minWidth: "70px" }}>
        <label htmlFor="pe-equipo" style={labelStyle}>PE (Empatados)</label>
        <input
          id="pe-equipo"
          style={inputStyle}
          type="number"
          placeholder="0"
          value={pe}
          onChange={(e) => setPe(Number(e.target.value))}
        />
      </div>

      {/* Campo: PP (Partidos Perdidos) */}
      <div style={{ flexGrow: 1, minWidth: "70px" }}>
        <label htmlFor="pp-equipo" style={labelStyle}>PP (Perdidos)</label>
        <input
          id="pp-equipo"
          style={inputStyle}
          type="number"
          placeholder="0"
          value={pp}
          onChange={(e) => setPp(Number(e.target.value))}
        />
      </div>

      {/* Campo: Goles Anotados */}
      <div style={{ flexGrow: 1, minWidth: "70px" }}>
        <label htmlFor="goles-equipo" style={labelStyle}>Goles Anotados</label>
        <input
          id="goles-equipo"
          style={inputStyle}
          type="number"
          placeholder="0"
          value={goles}
          onChange={(e) => setGoles(Number(e.target.value))}
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        style={buttonStyle}
      >
        ➕ Agregar Equipo
      </button>
    </form>
  );
};

export default EquipoForm;
