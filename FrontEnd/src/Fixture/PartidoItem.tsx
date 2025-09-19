import React from "react";
import type { Encuentro } from "../types/types";

type Props = { partido: Encuentro };

const PartidoItem: React.FC<Props> = ({ partido }) => (
  <li className="mb-2">
    <strong>J{partido.jornada}</strong> | Grupo {partido.grupo} | {partido.club1} vs {partido.club2} <span className="text-blue-900">({partido.resultado})</span>
  </li>
);

export default PartidoItem;
