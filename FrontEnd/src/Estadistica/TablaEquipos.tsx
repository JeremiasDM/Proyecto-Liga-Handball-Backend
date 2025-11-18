import React, { useState, useEffect, useRef } from "react";
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
  const popoverRef = useRef<HTMLDivElement>(null);

  // Auto-cerrar popover al hacer click fuera o scroll
  useEffect(() => {
    if (!showRefs) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowRefs(false);
      }
    };

    const handleScroll = () => {
      setShowRefs(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showRefs]);

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "1200px",
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start'
      }}
    >
      <div style={{ flex: 1 }}>
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
                <th style={{ padding: 12 }}>PTS</th>
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

      {/* Botón Ver referencias al lado derecho de la tabla */}
      <div style={{ marginTop: 20, position: 'relative' }}>
        <button
          onClick={() => setShowRefs(!showRefs)}
          style={{
            padding: '8px 16px',
            background: '#1f3c88',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.9rem',
            whiteSpace: 'nowrap'
          }}
        >
          {showRefs ? 'Ocultar referencias' : 'Ver referencias'}
        </button>
        
        {/* Popover de referencias posicionado debajo del botón */}
        {showRefs && (
          <div
            ref={popoverRef}
            style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              background: '#fff',
              color: '#111',
              padding: '16px',
              borderRadius: 8,
              boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
              zIndex: 100,
              minWidth: 280,
              textAlign: 'left',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: '1rem', color: '#1f3c88' }}>REFERENCIAS:</div>
            <div style={{ lineHeight: 1.8 }}>
              <div><strong>PTS:</strong> Puntos totales</div>
              <div><strong>PJ:</strong> Partidos jugados</div>
              <div><strong>PG:</strong> Partidos ganados</div>
              <div><strong>PE:</strong> Partidos empatados</div>
              <div><strong>PP:</strong> Partidos perdidos</div>
              <div><strong>CP:</strong> Partidos cedidos</div>
              <div><strong>GF:</strong> Goles a favor</div>
              <div><strong>GC:</strong> Goles en contra</div>
              <div><strong>DF:</strong> Diferencia de goles</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablaEquipos;
