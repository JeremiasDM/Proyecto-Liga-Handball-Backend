import React from "react";
import type { Equipo } from "./EstadisticasPage";
import EquipoItem from "./EquipoItem";
// (Importa el tipo Equipo si no está global)

type Props = {
  equipos: Equipo[]; // Recibe equipos como prop
  onActualizar: (id: number, actualizado: Partial<Equipo>) => void; // Recibe handler
  onEliminar: (id: number) => void; // Recibe handler
};

const TablaEquipos: React.FC<Props> = ({ equipos, onActualizar, onEliminar }) => {
  // --- NO MÁS useState local para equipos ---
  // --- NO MÁS funciones agregar/actualizar/eliminar locales ---
  // --- NO MÁS EquipoForm ---

  // Ordenamiento se mantiene
  const equiposOrdenados = [...equipos].sort((a, b) => {
      // Criterio principal: Puntos (descendente)
      if (b.puntos !== a.puntos) {
          return b.puntos - a.puntos;
      }
      // Criterio secundario: Goles (diferencia o a favor, descendente)
      // Asumiendo que 'goles' es diferencia de gol
      if (b.goles !== a.goles) {
          return b.goles - a.goles;
      }
      // Criterio terciario: Nombre (alfabético ascendente)
      return a.nombre.localeCompare(b.nombre);
  });


  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "1000px",
      }}
    >
      {/* --- Se eliminó EquipoForm --- */}

      {equiposOrdenados.length === 0 ? (
          <p style={{textAlign: 'center', color: '#6c757d', marginTop: '20px'}}>No hay equipos registrados para mostrar estadísticas.</p>
      ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              marginTop: "20px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead
              style={{
                backgroundColor: "#1f3c88", // Azul más oscuro
                color: "white",
                fontSize: "0.9em", // Ligeramente más pequeño
                fontWeight: 600, // Menos bold
                textTransform: "uppercase",
                letterSpacing: '0.5px' // Espaciado letras
              }}
            >
              <tr>
                <th style={{ padding: '10px 15px', textAlign: "left" }}>#</th>
                <th style={{ padding: '10px 15px', textAlign: "left" }}>Equipo</th>
                <th style={{ padding: '10px 15px' }}>PJ</th>
                <th style={{ padding: '10px 15px' }}>PG</th>
                <th style={{ padding: '10px 15px' }}>PE</th>
                <th style={{ padding: '10px 15px' }}>PP</th>
                <th style={{ padding: '10px 15px' }}>CP</th>
                <th style={{ padding: '10px 15px' }}>GF</th>
                <th style={{ padding: '10px 15px' }}>GC</th>
                <th style={{ padding: '10px 15px' }}>DF</th>
                <th style={{ padding: '10px 15px', position: 'relative' }}>
                  PTS
                  <span
                    style={{
                      marginLeft: 6,
                      cursor: 'help',
                      color: '#ffd700',
                      fontWeight: 700,
                      fontSize: '1em',
                      verticalAlign: 'middle',
                      userSelect: 'none',
                    }}
                    title={
                      'Referencias:\n' +
                      'PTS: PG x 3 + PE\n' +
                      'PJ: PG + PE + PP\n' +
                      'DF: GF - GC\n' +
                      'CP: Caminos Perdidos (si aplica)\n' +
                      'GF: Goles a Favor\n' +
                      'GC: Goles en Contra\n' +
                      'PG: Partidos Ganados, PE: Empatados, PP: Perdidos.'
                    }
                  >
                    &#9432;
                  </span>
                </th>
                <th style={{ padding: '10px 15px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {equiposOrdenados.map((equipo, index) => (
                <EquipoItem
                  key={equipo.id}
                  equipo={equipo}
                  onActualizar={onActualizar}
                  onEliminar={onEliminar}
                  rowStyle={index % 2 === 1 ? { backgroundColor: "#f8f9fa" } : {}}
                  posicion={index + 1}
                />
              ))}
            </tbody>
          </table>
      )}
    </div>
  );
};

export default TablaEquipos;