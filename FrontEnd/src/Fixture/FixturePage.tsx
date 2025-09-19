import React, { useState } from "react";
import RegistrarFixture from "./RegistrarFixture";
import EditarFixture from "./EditarFixture";
import ListaFixture from "./ListaFixture";
import type { Encuentro, Fixture } from "../types/types";

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
          resultado: "-",
          fecha: undefined
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
          resultado: "-",
          fecha: undefined
        });
      }
    });

    const fixtureGenerado: Fixture = {
      fecha: new Date().toISOString().split("T")[0],
      lugar: "Automático",
      partidos
    };

    setFixtures([...fixtures, fixtureGenerado]);
    alert("Fixture automático generado");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Gestión de Fixture
      </h2>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 mb-6">
        {fixtureEditando ? (
          <EditarFixture
            fixture={fixtureEditando}
            onGuardar={guardarEdicion}
            onCancelar={cancelarEdicion}
          />
        ) : (
          <RegistrarFixture onAgregarFixture={agregarFixture} />
        )}
        <button
          onClick={generarFixtureAutomatico}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Generar Fixture Automático
        </button>
      </div>
      <div className="bg-white shadow-md rounded-xl p-6">
        <ListaFixture fixtures={fixtures} onEdit={editarFixture} />
      </div>
    </div>
  );
};

export default FixturePage;
