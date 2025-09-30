import React, { useState } from "react";
import EquipoItem from "./EquipoItem";
import EquipoForm from "./EquipoForm";

export type Equipo = {
  id: number;
  nombre: string;
  pg: number;
  pe: number;
  pp: number;
  goles: number;
  puntos: number;
};

const TablaEquipos: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([
    { id: 1, nombre: "Club A", pg: 3, pe: 1, pp: 0, goles: 12, puntos: 10 },
    { id: 2, nombre: "Club B", pg: 2, pe: 2, pp: 0, goles: 9, puntos: 8 },
    { id: 3, nombre: "Club C", pg: 1, pe: 1, pp: 2, goles: 7, puntos: 4 },
  ]);

  const agregarEquipo = (nuevo: Equipo) => {
    setEquipos([...equipos, nuevo]);
  };

  const actualizarEquipo = (id: number, actualizado: Equipo) => {
    setEquipos(
      equipos.map((eq) => (eq.id === id ? { ...actualizado, id } : eq))
    );
  };

  const eliminarEquipo = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este equipo?")) {
      setEquipos(equipos.filter((eq) => eq.id !== id));
    }
  };

  return (
    <div>
      <EquipoForm onAgregar={agregarEquipo} />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#1F3C88", color: "white" }}>
          <tr>
            <th style={{ padding: 8 }}>Equipo</th>
            <th style={{ padding: 8 }}>PG</th>
            <th style={{ padding: 8 }}>PE</th>
            <th style={{ padding: 8 }}>PP</th>
            <th style={{ padding: 8 }}>Goles</th>
            <th style={{ padding: 8 }}>Puntos</th>
            <th style={{ padding: 8 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos
            .sort((a, b) => b.puntos - a.puntos)
            .map((equipo) => (
              <EquipoItem
                key={equipo.id}
                equipo={equipo}
                onActualizar={actualizarEquipo}
                onEliminar={eliminarEquipo}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEquipos;
