import React, { useState } from "react";
import RegistrarFixture from "./RegistrarFixture";
import EditarFixture from "./EditarFixture";
import ListaFixture from "./ListaFixture";
import type { Encuentro, Fixture } from "../types/types";

// 1. Mejora estética: Estilos definidos como objetos constantes.
const styles = {
  pageContainer: {
    padding: '30px 20px', // Más espacio alrededor
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#eef2f6', // Fondo de página gris muy suave
  },
  fixtureCard: {
    width: '100%',
    maxWidth: '1100px', // Aumento del ancho máximo
    margin: '0 auto',
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif', // Fuente moderna y limpia
    backgroundColor: '#ffffff', // Fondo blanco nítido
    borderRadius: '12px', // Bordes suaves
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', // Sombra profesional
    padding: '40px', // Más espacio interno
    boxSizing: 'border-box'
  },
  title: {
    textAlign: 'center',
    color: '#1f3c88', // Azul corporativo
    borderBottom: '3px solid #3498db', // Línea de división gruesa y vibrante
    paddingBottom: '15px',
    marginBottom: '30px',
    fontSize: '2.2rem', // Título grande y dominante
    fontWeight: 700,
    letterSpacing: '0.5px', // Pequeño espacio entre letras
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e0e0e0', // Divisor sutil
    margin: '30px 0'
  },
  // NUEVO: Estilo para botones contenedores (requiere implementación en Registrar/Editar)
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start', // Alinear a la izquierda para el registro
    gap: '10px',
    marginTop: '20px',
    marginBottom: '10px', // Espacio antes del divisor
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

  const generarFixtureAutomatico = () => {
    // Usaremos 4 equipos para simplificar el ejemplo de la estructura
    const clubes = ["Filosofía", "Club Unión HG", "Capilla del Monte", "Malagueño"];
    const jornada = 1;

    // Algoritmo simple round-robin para generar encuentros
    const partidos: Encuentro[] = [];
    for (let i = 0; i < clubes.length; i++) {
      for (let j = i + 1; j < clubes.length; j++) {
        partidos.push({
          jornada,
          grupo: "Único",
          club1: clubes[i],
          club2: clubes[j],
          resultado: "-"
        });
      }
    }

    const fixtureGenerado: Fixture = {
      fecha: new Date().toISOString().split("T")[0],
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