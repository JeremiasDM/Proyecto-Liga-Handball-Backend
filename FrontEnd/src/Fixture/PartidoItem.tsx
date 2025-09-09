import React from "react";
import type { Partido } from "./FormularioPartido";

interface Props {
  partido: Partido;
}

const PartidoItem: React.FC<Props> = ({ partido }) => {
  return (
    <div className="p-3 border rounded bg-gray-50">
      <p>
        <strong>Jornada:</strong> {partido.jornada || "-"} |{" "}
        <strong>Grupo:</strong> {partido.grupo || "-"} |{" "}
        <strong>Categoría:</strong> {partido.categoria || "-"}
      </p>
      <p>
        <strong>{partido.club1 || "Club 1"}</strong> vs{" "}
        <strong>{partido.club2 || "Club 2"}</strong>
      </p>
      <p>
        <strong>Hora:</strong> {partido.hora || "-"} |{" "}
        <strong>Estado:</strong> {partido.estado || "Pendiente"}
      </p>
      <p>
        <strong>Resultado:</strong>{" "}
        {partido.resultado && partido.resultado !== "" ? partido.resultado : "-"}
      </p>
    </div>
  );
};

export default PartidoItem;
