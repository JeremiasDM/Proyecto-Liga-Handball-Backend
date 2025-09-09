import React from "react";
import FormularioPartido, { Partido } from "./FormularioPartido";

interface Props {
  partido: Partido;
  onActualizar: (partido: Partido) => void;
}

const EditarFixture: React.FC<Props> = ({ partido, onActualizar }) => {
  return (
    <div className="p-4 bg-yellow-100 rounded mt-4">
      <h3 className="text-lg font-bold mb-2">Editar Partido</h3>
      <FormularioPartido partidoInicial={partido} onSubmit={onActualizar} />
    </div>
  );
};

export default EditarFixture;
