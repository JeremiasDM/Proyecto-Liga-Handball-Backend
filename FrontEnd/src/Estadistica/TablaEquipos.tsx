import React, { useState } from "react";
import EquipoItem from "./EquipoItem";
// (Importa el tipo Equipo si no está global)

// --- Definición del tipo Equipo (Asumiendo que es la misma que en el componente padre) ---
export type Equipo = {
  id: number;
  nombre: string;
  pj?: number;
  pg?: number;
  pe?: number;
  pp?: number;
  cp?: number;
  gf?: number;
  gc?: number;
  df?: number;
  goles?: number; // compatibilidad antigua
  puntos?: number;
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
    if ((b.puntos ?? 0) !== (a.puntos ?? 0)) {
      return (b.puntos ?? 0) - (a.puntos ?? 0);
    }
    // Criterio secundario: Diferencia de goles (DF) calculada como GF-GC
    const dfB = (b.df ?? ((b.gf ?? 0) - (b.gc ?? 0))) ?? 0;
    const dfA = (a.df ?? ((a.gf ?? 0) - (a.gc ?? 0))) ?? 0;
    if (dfB !== dfA) return dfB - dfA;
      // Criterio terciario: Nombre (alfabético ascendente)
      return a.nombre.localeCompare(b.nombre);
  });


  // Estado para mostrar/ocultar el popover de referencias
  const [showRefs, setShowRefs] = useState(false);

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "1000px",
        position: 'relative', // necesario para posicionar el popover
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
                backgroundColor: "#1f3c88",
                color: "white",
                fontSize: "0.95em",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              <tr>
                <th style={{ padding: 12, textAlign: "left" }}>#</th>
                <th style={{ padding: 12, textAlign: "left" }}>Equipo</th>
                {/* Columna PTS con botón para ver referencias */}
                <th style={{ padding: 12, position: 'relative' }}>
                  PTS
                  <button
                    onClick={() => setShowRefs(!showRefs)}
                    aria-label="Ver referencias"
                    style={{
                      marginLeft: 8,
                      background: 'transparent',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Ver referencias
                  </button>
                  {/* Popover simple que muestra las referencias al hacer click */}
                  {showRefs && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '110%',
                        right: 0,
                        background: '#fff',
                        color: '#111',
                        padding: '12px',
                        borderRadius: 6,
                        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                        zIndex: 60,
                        minWidth: 260,
                        textAlign: 'left'
                      }}
                    >
                      {/* Lista de referencias solicitada */}
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>Referencias:</div>
                      <div>PTS: Puntos totales</div>
                      <div>PJ: Partidos jugados</div>
                      <div>PG: Partidos ganados</div>
                      <div>PE: Partidos empatados</div>
                      <div>PP: Partidos perdidos</div>
                      <div>CP: Partidos cedidos</div>
                      <div>GF: Goles a favor</div>
                      <div>GC: Goles en contra</div>
                      <div>DF: Diferencia de goles</div>
                    </div>
                  )}
                </th>
                <th style={{ padding: 12 }}>PJ</th>
                <th style={{ padding: 12 }}>PG</th>
                <th style={{ padding: 12 }}>PE</th>
                <th style={{ padding: 12 }}>PP</th>
                <th style={{ padding: 12 }}>CP</th>
                <th style={{ padding: 12 }}>GF</th>
                <th style={{ padding: 12 }}>GC</th>
                <th style={{ padding: 12 }}>DF</th>
                <th style={{ padding: 12 }}>Acciones</th>
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
