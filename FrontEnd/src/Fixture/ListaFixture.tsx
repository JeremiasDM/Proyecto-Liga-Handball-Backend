import React from "react";
// (Pega las interfaces FixtureAPI, EncuentroAPI, Club aquí)
// ...
import PartidoItem from "./PartidoItem";

type Props = {
  fixtures: FixtureAPI[];
  onEdit: (fixture: FixtureAPI) => void; // Recibe el fixture completo
  // onEliminar podría añadirse aquí
};

const ListaFixture: React.FC<Props> = ({ fixtures, onEdit }) => {
  if (!fixtures || fixtures.length === 0) {
    return <p>No hay fixtures registrados.</p>;
  }

  return (
    <div style={{ padding: "1rem", backgroundColor: "#f0f2f5", borderRadius: "8px" }}>
      {/* <h3>Listado de Fixtures</h3> */} {/* Título ya está en el padre */}

      {fixtures.map((fixture) => (
        <div
          key={fixture.id} // <-- Usar ID de la API
          style={{
            marginBottom: 16,
            background: "#fff",
            borderRadius: 8,
            padding: 12,
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span>
              <strong>Fecha:</strong> {fixture.fecha} | <strong>Lugar:</strong> {fixture.lugar}
            </span>
            <button
              style={{ /* tus estilos para botón editar */ }}
              onClick={() => onEdit(fixture)} // Pasar el fixture completo
            >
              Editar
            </button>
          </div>
          {fixture.partidos && fixture.partidos.length > 0 ? (
             <ul style={{ paddingLeft: 18, marginTop: 8, listStyle: 'none' }}>
                {fixture.partidos.map((p) => (
                <PartidoItem key={p.id} partido={p} /> // <-- Pasar encuentro de la API
                ))}
             </ul>
          ) : (
            <p style={{fontStyle: 'italic', color: '#888', paddingLeft: '18px'}}>Sin partidos registrados.</p>
          )}

        </div>
      ))}
    </div>
  );
};

export default ListaFixture;