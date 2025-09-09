import React from "react";
import FormularioPartido, { Partido } from "./FormularioPartido";

interface Props {
  onRegistrar: (partido: Partido) => void;
}

const RegistrarFixture: React.FC<Props> = ({ onRegistrar }) => {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-2">Registrar Partido</h3>
      <FormularioPartido onSubmit={onRegistrar} />
    </div>
  );
};

export default RegistrarFixture;
