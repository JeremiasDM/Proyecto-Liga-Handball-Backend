import type { Encuentro } from "../types/types";

type Props = { partido: Encuentro };

const PartidoItem: React.FC<Props> = ({ partido }) => (
  <li style={{ marginBottom: 4 }}>
    <strong>J{partido.jornada}</strong> | Grupo {partido.grupo} | {partido.club1} vs {partido.club2} <span style={{ color: "#1F3C88" }}>({partido.resultado})</span>
  </li>
);

export default PartidoItem;