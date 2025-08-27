import React, { useState } from "react";
import RegistrarFixture from "./RegistrarFixture";
import EditarFixture from "./EditarFixture";
import ListaFixture from "./ListaFixture";
import type { Fixture, Encuentro } from "./types";

const FixturePage: React.FC = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [fixtureEditando, setFixtureEditando] = useState<Fixture | null>(null);
  const [indiceEditando, setIndiceEditando] = useState<number | null>(null);

  const agregarFixture = (nuevo: Fixture) => {
    setFixtures([...fixtures, nuevo]);
  };

  const editarFixture = (fixture: Fixture, index: number) => {
    setFixtureEditando(fixture);
    setIndiceEditando(index);
  };

  const guardarEdicion = (actualizado: Fixture) => {
    if (indiceEditando === null) return;
    const nuevas = [...fixtures];
    nuevas[indiceEditando] = actualizado;
    setFixtures(nuevas);
    cancelarEdicion();
  };

  const cancelarEdicion = () => {
    setFixtureEditando(null);
    setIndiceEditando(null);
  };

  const generarFixtureAutomatico = () => {
    const clubesA = ["Club A1", "Club A2", "Club A3", "Club A4"];
    const clubesB = ["Club B1", "Club B2", "Club B3", "Club B4"];

    const partidos: Encuentro[] = [];
    let jornada = 1;

    clubesA.forEach((club, i) => {
      if (i + 1 < clubesA.length) {
        partidos.push({
          jornada,
          grupo: "A",
          club1: club,
          club2: clubesA[i + 1],
          resultado: "-"
        });
      }
    });

    clubesB.forEach((club, i) => {
      if (i + 1 < clubesB.length) {
        partidos.push({
          jornada,
          grupo: "B",
          club1: club,
          club2: clubesB[i + 1],
          resultado: "-"
        });
      }
    });

    const fixtureGenerado: Fixture = {
      fecha: new Date().toISOString().split("T")[0],
      lugar: "Automático",
      partidos
    };

    setFixtures([...fixtures, fixtureGenerado]);
    alert("Fixture automático generado ");
  };

  return (
    <div>
      <h2>Gestión de Fixture</h2>
      {fixtureEditando ? (
        <EditarFixture
          fixture={fixtureEditando}
          onGuardar={guardarEdicion}
          onCancelar={cancelarEdicion}
        />
      ) : (
        <RegistrarFixture onAgregarFixture={agregarFixture} />
      )}

      <button onClick={generarFixtureAutomatico}>
        Generar Fixture Automático
      </button>

      <hr />
      <ListaFixture fixtures={fixtures} onEdit={editarFixture} />
    </div>
  );
};

export default FixturePage;
