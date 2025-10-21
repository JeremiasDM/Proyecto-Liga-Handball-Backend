import type { Fixture } from "../types/types";
import PartidoItem from "./PartidoItem";

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
      <h3 style={{ color: "#b0b3bbff" }}>Listado de Fixtures</h3>

  {fixtures.map((fixture: Fixture, i: number) => (
        <div
          key={i}
          style={{ marginBottom: 16, background: "#fff", borderRadius: 8, padding: 12 }}
        >
          <div>
            <strong>Fecha:</strong> {fixture.fecha} | <strong>Lugar:</strong> {fixture.lugar}
            {onEdit && (
              <button style={{ marginLeft: 12 }} onClick={() => onEdit(fixture, i)}>
                Editar
              </button>
            )}
          </div>
          <ul style={{ paddingLeft: 18, marginTop: 8 }}>
            {fixture.partidos.map((p: any, j: number) => (
              <PartidoItem key={j} partido={p} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ListaFixture;
