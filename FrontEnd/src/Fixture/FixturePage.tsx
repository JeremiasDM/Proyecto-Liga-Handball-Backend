import { useState } from "react";
import RegistrarFixture from "./RegistrarFixture";
import EditarFixture from "./EditarFixture";
import ListaFixture from "./ListaFixture";

// Inlined Encuentro and Fixture types
type Encuentro = {
	fecha?: string;
	jornada: number;
	grupo: string;
	club1: string;
	club2: string;
	resultado: string;
};

type Fixture = {
	fecha: string;
	lugar: string;
	partidos: Encuentro[];
};

// 1. Mejora estética: Estilos definidos como objetos constantes.
const styles = {
  pageContainer: {
    padding: '30px 20px',
    width: '100%',
    boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
    backgroundColor: '#eef2f6',
  } as React.CSSProperties,
  fixtureCard: {
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    padding: '40px',
    boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
  } as React.CSSProperties,
  title: {
    textAlign: 'center' as React.CSSProperties['textAlign'],
    color: '#1f3c88',
    borderBottom: '3px solid #3498db',
    paddingBottom: '15px',
    marginBottom: '30px',
    fontSize: '2.2rem',
    fontWeight: 700,
    letterSpacing: '0.5px',
  } as React.CSSProperties,
  divider: {
    border: 'none',
    borderTop: '1px solid #e0e0e0',
    margin: '30px 0'
  } as React.CSSProperties,
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start' as React.CSSProperties['justifyContent'],
    gap: '10px',
    marginTop: '20px',
    marginBottom: '10px',
  } as React.CSSProperties
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

  const generarFixtureAutomatico = () => {
		const clubes = ["Filosofía", "Club Unión HG", "Capilla del Monte", "Malagueño"];
		const jornada = 1;
		const fechaHoy = new Date().toISOString().split("T")[0];

		const partidos: Encuentro[] = [];
		for (let i = 0; i < clubes.length; i++) {
			for (let j = i + 1; j < clubes.length; j++) {
				partidos.push({
					fecha: fechaHoy,
					jornada,
					grupo: "Único",
					club1: clubes[i],
					club2: clubes[j],
					resultado: "-"
				});
			}
		}

		const fixtureGenerado: Fixture = {
			fecha: fechaHoy,
			lugar: "Generado Automáticamente",
			partidos: partidos
		};

		setFixtures([...fixtures, fixtureGenerado]);
		alert("Fixture automático generado con " + partidos.length + " encuentros.");
	};

  return (
    <div style={styles.pageContainer}>
      <div style={styles.fixtureCard}>
        <h2 style={styles.title}>Gestión y Registro de Fixture</h2>
        {fixtureEditando ? (
          <EditarFixture
            fixture={fixtureEditando}
            onGuardar={guardarEdicion}
            onCancelar={cancelarEdicion}
            // Sugerencia: pasar estilos de botones a este componente
          />
        ) : (
          <RegistrarFixture
            onAgregarFixture={agregarFixture}
            onGenerarAutomatico={generarFixtureAutomatico}
            // Sugerencia: pasar estilos de botones a este componente
            buttonContainerStyle={styles.buttonContainer} 
          />
        )}
        <hr style={styles.divider} />
        
        {/* Título de la sección de lista */}
        <h3 style={{color: '#2c3e50', fontSize: '1.5rem', marginBottom: '20px'}}>Fixtures Existentes</h3>
        
        <ListaFixture 
          fixtures={fixtures} 
          onEdit={editarFixture} 
          // Sugerencia: pasar estilos de tarjetas a este componente
        />
      </div>
    </div>
  );
};

export default FixturePage;