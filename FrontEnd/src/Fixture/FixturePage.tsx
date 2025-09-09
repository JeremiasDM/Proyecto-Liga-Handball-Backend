import React, { useState } from "react";
import RegistrarFixture from "./RegistrarFixture";
import ListaFixture from "./ListaFixture";
import EditarFixture from "./EditarFixture";
import type { Partido } from "./FormularioPartido";

const FixturePage: React.FC = () => {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<Partido | null>(null);

  const handleRegistrar = (nuevo: Partido) => {
    setPartidos([...partidos, { ...nuevo, id: Date.now() }]);
  };

  const handleActualizar = (editado: Partido) => {
    setPartidos(partidos.map(p => (p.id === editado.id ? editado : p)));
    setPartidoSeleccionado(null);
  };

  const handleEliminar = (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este partido?")) return;
    setPartidos(partidos.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Fixture</h2>

      <RegistrarFixture onRegistrar={handleRegistrar} />

      <ListaFixture
        partidos={partidos}
        onEditar={setPartidoSeleccionado}
        onEliminar={handleEliminar}
      />

      {partidoSeleccionado && (
        <EditarFixture partido={partidoSeleccionado} onActualizar={handleActualizar} />
      )}
    </div>
  );
};

export default FixturePage;
