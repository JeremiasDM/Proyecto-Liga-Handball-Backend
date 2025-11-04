import React from "react";
import EquipoItem from "./EquipoItem";
// (Importa el tipo Equipo si no está global)

// --- Definición del tipo Equipo (Asumiendo que es la misma que en el componente padre) ---
export type Equipo = {
  id: number;
  nombre: string;
  pg: number;
  pe: number;
  pp: number;
  goles: number; // Asumiendo que es la diferencia de gol
  puntos: number;
  activo?: boolean;
};
// -----------------------------------------------------------------------------------------


type Props = {
  equipos: Equipo[]; // Recibe equipos como prop
  onActualizar: (id: number, actualizado: Partial<Equipo>) => void; // Recibe handler
  onEliminar: (id: number) => void; // Recibe handler
};

const TablaEquipos: React.FC<Props> = ({ equipos, onActualizar, onEliminar }) => {
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

      {equiposOrdenados.length === 0 ? (
          <p style={{textAlign: 'center', color: '#6c757d', marginTop: '20px'}}>No hay equipos registrados para mostrar estadísticas.</p>
      ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "separate", // Necesario para bordes redondeados
              borderSpacing: 0,
              marginTop: "20px",
              backgroundColor: "#fff",
              borderRadius: "12px", // Bordes más grandes
              overflow: "hidden", // Importante para que los bordes redondeados se apliquen a thead
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra elegante
            }}
          >
            <thead
              style={{
                backgroundColor: "#1f3c88", // ¡AZUL ACTUALIZADO! 🟦
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
                <th style={{ padding: 12 }}>Goles</th> {/* Manteniendo 'Goles' según tu solicitud de encabezado */}
                <th style={{ padding: 12 }}>Puntos</th>
                <th style={{ padding: 12 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {equiposOrdenados.map((equipo, index) => (
                <EquipoItem
                  key={equipo.id}
                  equipo={equipo}
                  onActualizar={onActualizar} // Pasa el handler del padre
                  onEliminar={onEliminar}     // Pasa el handler del padre
                  // Añadimos estilo para filas impares/pares (estilo cebra)
                  rowStyle={index % 2 === 1 ? { backgroundColor: "#f8f9fa" } : {}}
                />
              ))}
            </tbody>
          </table>
      )}
    </div>
  );
};

export default TablaEquipos;
