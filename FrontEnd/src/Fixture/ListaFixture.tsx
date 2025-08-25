import React from "react";
import type { Fixture } from "./types";

type Props = {
  fixtures: Fixture[];
  onEdit?: (fixture: Fixture, index: number) => void;
};

const ListaFixture: React.FC<Props> = ({ fixtures, onEdit }) => {
  if (fixtures.length === 0) {
    return <p>No hay fixtures registrados.</p>;
  }

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f2f5", borderRadius: "8px" }}>
      <h3 style={{ color: "#1F3C88" }}>Listado de Fixtures</h3>

      {fixtures.map((fixture, i) => (
        <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>{fixture.fecha} - {fixture.lugar}</h4>
          <ul style={{ paddingLeft: "1.2rem" }}>
            {fixture.partidos.map((p, j) => (
              <li key={j}>Jornada {p.jornada} | Grupo {p.grupo} | {p.club1} vs {p.club2} ({p.resultado})</li>
            ))}
          </ul>
          {onEdit && (
            <button onClick={() => onEdit(fixture, i)} style={{ marginTop: "0.5rem", backgroundColor: "#FFD700", color: "#000", padding: "0.5rem 1rem", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Editar
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListaFixture;
