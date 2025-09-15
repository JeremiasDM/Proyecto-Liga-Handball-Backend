import React, { useState } from "react";
import RegistrarFixture from "./RegistrarFixture";
import EditarFixture from "./EditarFixture";
import ListaFixture from "./ListaFixture";
import type { Encuentro, Fixture } from "../types/types";

// 1. Mejora estética: Estilos definidos como objetos constantes para un código más limpio.
const styles = {
  pageContainer: {
    padding: '20px',
    width: '100%',
    boxSizing: 'border-box'
  },
  fixtureCard: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    boxSizing: 'border-box'
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px'
  },
  divider: {
    borderTop: '1px solid #ccc',
    margin: '20px 0'
  }
};

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

  // 2. Mejora estética: Función refactorizada para evitar duplicación de código.
  const generarFixtureAutomatico = () => {
    const clubesA = ["Club A1", "Club A2", "Club A3", "Club A4"];
    const clubesB = ["Club B1", "Club B2", "Club B3", "Club B4"];
    const jornada = 1;

    // Función auxiliar para crear los partidos
    const crearPartidosDeGrupo = (clubes: string[], grupo: string) => {
      const partidos: Encuentro[] = [];
      clubes.forEach((club, i) => {
        if (i + 1 < clubes.length) {
          partidos.push({
            jornada,
            grupo,
            club1: club,
            club2: clubes[i + 1],
            resultado: "-"
          });
        }
      });
      return partidos;
    };

    const todosLosPartidos = [
      ...crearPartidosDeGrupo(clubesA, "A"),
      ...crearPartidosDeGrupo(clubesB, "B")
    ];

    const fixtureGenerado: Fixture = {
      fecha: new Date().toISOString().split("T")[0],
      lugar: "Automático",
      partidos: todosLosPartidos
    };

    setFixtures([...fixtures, fixtureGenerado]);
    alert("Fixture automático generado ");
  };

  return (
    // 3. Mejora estética: El JSX es más limpio y fácil de leer con los objetos de estilo.
    <div style={styles.pageContainer}>
      <div style={styles.fixtureCard}>
        <h2 style={styles.title}>Gestión de Fixture</h2>
        {fixtureEditando ? (
          <EditarFixture
            fixture={fixtureEditando}
            onGuardar={guardarEdicion}
            onCancelar={cancelarEdicion}
          />
        ) : (
          <RegistrarFixture
            onAgregarFixture={agregarFixture}
            onGenerarAutomatico={generarFixtureAutomatico}
          />
        )}
        <hr style={styles.divider} />
        <ListaFixture fixtures={fixtures} onEdit={editarFixture} />
      </div>
    </div>
  );
};

export default FixturePage;