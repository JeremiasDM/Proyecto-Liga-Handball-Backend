import React, { useState, useEffect } from "react";
import RegistrarFixture from "./RegistrarFixture";
import EditarFixture from "./EditarFixture";
import ListaFixture from "./ListaFixture";
import type { CSSProperties } from "react"; // <-- Asegúrate que esté importado

// --- Tipos de la API ---
interface Club {
  id: number;
  nombre: string;
}

interface EncuentroAPI {
  id: number;
  jornada: number;
  grupo?: string;
  fecha?: string;
  resultado: string;
  club1Id: number;
  club2Id: number;
  club1: Club; // Objeto anidado
  club2: Club; // Objeto anidado
}

interface FixtureAPI {
  id: number;
  fecha: string;
  lugar: string;
  partidos: EncuentroAPI[];
}

// --- DTOs para enviar ---
interface CreateEncuentroDto {
  jornada: number;
  grupo?: string;
  fecha?: string;
  resultado: string;
  club1Id: number;
  club2Id: number;
}

interface CreateFixtureDto {
  fecha: string;
  lugar: string;
  partidos: CreateEncuentroDto[];
}

const API_URL = "http://localhost:3001"; // URL del Backend Nest.js

// --- 👇 OBJETO DE ESTILOS DEFINIDO AQUÍ (ACTUALIZADO) 👇 ---
interface Styles {
  [key: string]: CSSProperties;
}
const styles: Styles = {
  pageContainer: {
    padding: '30px 20px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#eef2f6',
    minHeight: '100vh', // Para que el fondo ocupe toda la altura
  },
  fixtureCard: {
    width: '100%',
    maxWidth: '1100px', // Ancho máximo
    margin: '0 auto', // Centrado
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '12px', // Bordes redondeados
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', // Sombra
    padding: '40px', // Padding interno
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    color: '#1f3c88', // Azul oscuro
    borderBottom: '3px solid #1f3c88', // Línea azul debajo
    paddingBottom: '15px',
    marginBottom: '30px',
    fontSize: '2.2rem', // Tamaño grande
    fontWeight: 700,
    letterSpacing: '0.5px',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #e0e0e0', // Línea gris clara
    margin: '30px 0' // Espaciado
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start', // Alineado a la izquierda
    // Quitamos el 'gap' de aquí, ya que 'buttonBase' ahora tiene 'marginRight'
    marginTop: '20px',
    marginBottom: '10px',
  },
  // Puedes añadir más estilos base aquí (botones, inputs) si los usas a menudo
  buttonBase: { // **ESTILO BASE ACTUALIZADO**
    padding: "0.5rem 1rem", // Relleno
    border: "none", // Sin borde
    borderRadius: "5px", // Bordes redondeados
    cursor: "pointer", // Cursor
    marginRight: "0.5rem", // Margen derecho
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.1s",
    whiteSpace: "nowrap" as const, // Evita que el texto del botón se divida
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "#1f3c88", // Fondo Azul Fuerte (por defecto, para primary)
    color: "white", // Color del texto blanco (por defecto)
  },
  buttonPrimary: {
    backgroundColor: "#1f3c88", // Azul oscuro
    color: "#fff",
  },
  buttonSecondary: {
    backgroundColor: "#6c757d", // Gris
    color: "#fff",
  },
  buttonSuccess: {
      backgroundColor: "#1f3c88", // Azul oscuro
      color: "#fff",
  },
  buttonWarning: {
      backgroundColor: "#ffc107", // Amarillo
      color: "#000",
  },
  buttonDanger: {
      backgroundColor: "#dc3545", // Rojo
      color: "#fff",
  },
  errorMessage: { // Estilo para mensajes de error
      color: "#dc3545", // Rojo
      backgroundColor: "#f8d7da", // Fondo rojo claro
      padding: "10px",
      borderRadius: "4px",
      textAlign: "center" as const,
      marginBottom: "1rem",
      border: "1px solid #f5c6cb", // Borde rojo más oscuro
  },
  loadingMessage: { // Estilo para mensaje de carga
      textAlign: "center" as const,
      color: "#6c757d", // Gris
      fontSize: "1.1em",
      margin: "20px 0",
  }
};
// --- 👆 FIN DEL OBJETO DE ESTILOS ---

const FixturePage: React.FC = () => {
  // --- Estado con datos de la API ---
  const [fixtures, setFixtures] = useState<FixtureAPI[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [fixtureEditando, setFixtureEditando] = useState<FixtureAPI | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Cargar datos al montar ---
  useEffect(() => {
    cargarFixtures();
    cargarClubes();
  }, []);

  const cargarFixtures = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/fixtures`);
      if (!res.ok) throw new Error("Error al cargar fixtures");
      const data: FixtureAPI[] = await res.json();
      setFixtures(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const cargarClubes = async () => {
    try {
      const res = await fetch(`${API_URL}/clubes`);
      if (!res.ok) throw new Error("Error al cargar clubes");
      const data: Club[] = await res.json();
      setClubes(data);
    } catch (err) {
      console.error("Error cargando clubes:", err);
      // Opcional: setError("No se pudieron cargar los clubes. Funcionalidad limitada.");
    }
  };

  // --- Funciones CRUD ---
  const agregarFixture = async (dto: CreateFixtureDto) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/fixtures`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al crear fixture");
      }
      await cargarFixtures(); // Recargar la lista
      alert("Fixture guardado exitosamente!"); // Mensaje de éxito
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (fixture: FixtureAPI) => {
    setFixtureEditando(fixture);
    setError(null);
  };

  const guardarEdicion = async (id: number, dto: Partial<CreateFixtureDto>) => {
    setLoading(true);
    setError(null);
    try {
      // Por ahora, solo actualizamos fecha y lugar
      const payload = { fecha: dto.fecha, lugar: dto.lugar };
      // Aquí también deberías actualizar los partidos si implementaste esa lógica en EditarFixture y el backend

      const res = await fetch(`${API_URL}/fixtures/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al actualizar fixture");
      }
      await cargarFixtures();
      cancelarEdicion(); // Salir del modo edición
      alert("Fixture actualizado exitosamente!"); // Mensaje de éxito
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const cancelarEdicion = () => {
    setFixtureEditando(null);
    setError(null);
  };

  // Función de generación automática
  const generarFixtureAutomatico = async () => {
    if (clubes.length < 2) { // Mínimo 2 para un partido
      setError("Se necesitan al menos 2 clubes registrados para generar un fixture.");
      return;
    }
    const jornada = fixtures.length + 1;
    const fechaHoy = new Date().toISOString().split("T")[0];
    const partidosDto: CreateEncuentroDto[] = [];

    // Lógica Round Robin simple (todos contra todos una vez)
    const clubesParaGenerar = [...clubes]; // Copia para no modificar el original
    if (clubesParaGenerar.length % 2 !== 0) {
        // Añadir un "fantasma" si el número es impar para que funcione el algoritmo
        clubesParaGenerar.push({ id: -1, nombre: "BYE" });
    }
    const numRondas = clubesParaGenerar.length - 1;
    const mitad = clubesParaGenerar.length / 2;

    for (let r = 0; r < numRondas; r++) {
      for (let i = 0; i < mitad; i++) {
        const club1 = clubesParaGenerar[i];
        const club2 = clubesParaGenerar[clubesParaGenerar.length - 1 - i];

        // Omitir partidos contra el "BYE"
        if (club1.id !== -1 && club2.id !== -1) {
            // Alternar localía (simplificado, podría ser más complejo)
            const esLocalClub1 = r % 2 === 0 || i === 0; // El primero a la izq rota menos
             partidosDto.push({
                jornada: jornada + r, // Asigna jornadas consecutivas
                club1Id: esLocalClub1 ? club1.id : club2.id,
                club2Id: esLocalClub1 ? club2.id : club1.id,
                resultado: "-",
                fecha: fechaHoy // Usar fecha general o calcular fechas específicas
            });
        }
      }
       // Rotar equipos (manteniendo el primero fijo)
      const ultimo = clubesParaGenerar.pop();
      if(ultimo) clubesParaGenerar.splice(1, 0, ultimo);
    }


    if (partidosDto.length === 0) {
        setError("No se pudieron generar partidos (verifica la lógica y el número de clubes).");
        return;
    }

    const fixtureGeneradoDto: CreateFixtureDto = {
      fecha: fechaHoy, // Fecha de la primera jornada
      lugar: `Generado Autom. ${numRondas} Jornadas`,
      partidos: partidosDto,
    };

    await agregarFixture(fixtureGeneradoDto);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.fixtureCard}>
        <h2 style={styles.title}>Gestión y Registro de Fixture</h2>

        {/* Muestra mensaje de error global */}
        {error && <div style={styles.errorMessage}>{error}</div>}
        {/* Muestra mensaje de carga */}
        {loading && <p style={styles.loadingMessage}>Cargando...</p>}

        {fixtureEditando ? (
          <EditarFixture
            fixture={fixtureEditando}
            clubes={clubes}
            onGuardar={(actualizado) => guardarEdicion(fixtureEditando.id, actualizado)}
            onCancelar={cancelarEdicion}
            // Puedes pasar estilos si EditarFixture los necesita
          />
        ) : (
          <RegistrarFixture
            onAgregarFixture={agregarFixture}
            onGenerarAutomatico={generarFixtureAutomatico}
            clubes={clubes}
            buttonContainerStyle={styles.buttonContainer} // Pasa el estilo del contenedor de botones
            // Pasa otros estilos base si es necesario (ej: estilos de botón)
            styles={{...styles}} // Pasa todos los estilos
          />
        )}
        <hr style={styles.divider} />

        <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', marginBottom: '20px' }}>
          Fixtures Existentes
        </h3>

        <ListaFixture
          fixtures={fixtures}
          onEdit={iniciarEdicion}
          // Puedes pasar estilos para los items de la lista si es necesario
        />
      </div>
    </div>
  );
};

export default FixturePage;
