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
    <div
      style={{
        margin: "0 auto",
        maxWidth: "1000px",
      }}
    >
      <EquipoForm onAgregar={agregarEquipo} />

      <table
        style={{
          width: "100%",
          borderCollapse: "separate", // Cambiado a separate para bordes redondeados
          borderSpacing: 0,
          marginTop: "20px",
          backgroundColor: "#fff",
          borderRadius: "12px", // Bordes más grandes
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra elegante
        }}
      >
        <thead
          style={{
            backgroundColor: "#007bff", // Azul Primario
            color: "white",
            fontSize: "0.95em",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          <tr>
            <th style={{ padding: 12, textAlign: "left" }}>Equipo</th>
            <th style={{ padding: 12 }}>PG</th>
            <th style={{ padding: 12 }}>PE</th>
            <th style={{ padding: 12 }}>PP</th>
            <th style={{ padding: 12 }}>Goles</th>
            <th style={{ padding: 12 }}>Puntos</th>
            <th style={{ padding: 12 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos
            .sort((a, b) => b.puntos - a.puntos)
            .map((equipo, index) => (
              <EquipoItem
                key={equipo.id}
                equipo={equipo}
                onActualizar={actualizarEquipo}
                onEliminar={eliminarEquipo}
                // Añadimos estilo para filas impares/pares (estilo cebra)
                rowStyle={index % 2 === 1 ? { backgroundColor: "#f8f9fa" } : {}}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEquipos;
