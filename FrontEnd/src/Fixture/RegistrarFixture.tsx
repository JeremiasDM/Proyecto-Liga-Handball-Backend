import { useState } from "react";

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

type Props = {
  onAgregarFixture: (fixture: Fixture) => void;
  onGenerarAutomatico?: () => void;
  buttonContainerStyle?: React.CSSProperties;
};

const clubesValidos = [
  "Club A1",
  "Club A2",
  "Club A3",
  "Club A4",
  "Club B1",
  "Club B2",
  "Club B3",
  "Club B4",
];

const gruposValidos = ["A", "B"];

const RegistrarFixture: React.FC<Props> = ({ onAgregarFixture, onGenerarAutomatico, buttonContainerStyle }) => {
  const [fixture, setFixture] = useState<Fixture>({
    fecha: "",
    lugar: "",
    partidos: [],
  });
  const [partidoTemp, setPartidoTemp] = useState<Encuentro>({
    jornada: 1,
    grupo: "A",
    club1: "",
    club2: "",
    resultado: "",
  });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChangeFixture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixture({ ...fixture, [e.target.name]: e.target.value });
  };

  const handleChangePartido = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPartidoTemp({
      ...partidoTemp,
      [name]: name === "jornada" ? Number(value) : value,
    });
  };

  const agregarPartido = () => {
    setError(null);

    if (!partidoTemp.club1 || !partidoTemp.club2 || !partidoTemp.resultado) {
      setError("Completa todos los campos del partido.");
      return;
    }
    if (partidoTemp.club1 === partidoTemp.club2) {
      setError("No puedes seleccionar el mismo club para ambos equipos.");
      return;
    }
    if (
      !clubesValidos.includes(partidoTemp.club1) ||
      !clubesValidos.includes(partidoTemp.club2)
    ) {
      setError("Selecciona clubes válidos.");
      return;
    }
    if (!gruposValidos.includes(partidoTemp.grupo)) {
      setError("Selecciona un grupo válido.");
      return;
    }
    if (
      partidoTemp.resultado &&
      !/^\d{1,2}-\d{1,2}$/.test(partidoTemp.resultado) &&
      partidoTemp.resultado !== "-"
    ) {
      setError(
        "El resultado debe tener el formato NN-NN (ej: 3-2) o ser '-' si no se jugó."
      );
      return;
    }

    const partidoDuplicado = fixture.partidos.some(
      (p) =>
        p.jornada === partidoTemp.jornada &&
        p.grupo === partidoTemp.grupo &&
        ((p.club1 === partidoTemp.club1 && p.club2 === partidoTemp.club2) ||
          (p.club1 === partidoTemp.club2 && p.club2 === partidoTemp.club1))
    );
    if (partidoDuplicado) {
      setError("Este partido ya está registrado para esa jornada y grupo.");
      return;
    }

    setFixture({ ...fixture, partidos: [...fixture.partidos, partidoTemp] });
    setPartidoTemp({
      jornada: 1,
      grupo: "A",
      club1: "",
      club2: "",
      resultado: "",
    });
    setMensaje("Partido agregado correctamente.");
    setTimeout(() => setMensaje(null), 2000);
  };

  const guardarFixture = () => {
    setError(null);
    if (!fixture.fecha || !fixture.lugar || fixture.partidos.length === 0) {
      setError("Completa la Fecha, el Lugar y agrega al menos un Partido.");
      return;
    }
    onAgregarFixture(fixture);
    setFixture({ fecha: "", lugar: "", partidos: [] });
    setMensaje("Fixture guardado correctamente.");
    setTimeout(() => setMensaje(null), 2000);
  };

  const generarFixtureAutomatico = () => {
    const partidosAuto: Encuentro[] = [
      { jornada: 1, grupo: "A", club1: "Club A1", club2: "Club A2", resultado: "-" },
      { jornada: 1, grupo: "A", club1: "Club A3", club2: "Club A4", resultado: "-" },
      { jornada: 1, grupo: "B", club1: "Club B1", club2: "Club B2", resultado: "-" },
      { jornada: 1, grupo: "B", club1: "Club B3", club2: "Club B4", resultado: "-" },
    ];

    const fixtureAuto: Fixture = {
      fecha: new Date().toISOString().split("T")[0],
      lugar: "Generación Automática",
      partidos: partidosAuto,
    };

    onAgregarFixture(fixtureAuto);
    setMensaje("Fixture automático agregado y guardado.");
    setTimeout(() => setMensaje(null), 2000);
  };
  
  // --- Estilos Reutilizables ---
  const colorPrimary = "#1a5276"; // Azul Marino
  const colorSecondary = "#4a90e2"; // Azul Brillante
  const colorSuccess = "#28a745"; // Verde
  const colorWarning = "#FFD700"; // Amarillo/Oro
  const colorDanger = "#dc3545"; // Rojo
  const colorBorder = "#dee2e6"; // Gris claro

  // Estilo base para Inputs y Selects
  const inputBaseStyle: React.CSSProperties = {
    padding: "8px 10px",
    border: `1px solid ${colorBorder}`,
    borderRadius: 4,
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
    marginTop: 4,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.9em",
    color: "#495057",
    fontWeight: 500,
    marginBottom: 4,
  };
  
  const formGroupStyle: React.CSSProperties = {
      marginBottom: 16, 
      marginRight: 10
  };

  const buttonBaseStyle: React.CSSProperties = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.1s",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <div
      style={{
        maxWidth: 600, 
        margin: "24px auto",
        background: "#fff",
        borderRadius: 12,
        padding: 24, 
        boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Título */}
      <h2
        style={{
          color: colorPrimary,
          textAlign: "center",
          marginBottom: 20,
          borderBottom: `2px solid ${colorSecondary}`,
          paddingBottom: 8,
        }}
      >
        Registro de Fixture
      </h2>

      {/* --- Información General del Fixture --- */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 24,
          padding: 16,
          border: `1px solid ${colorBorder}`,
          borderRadius: 8,
          backgroundColor: "#f8f9fa",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <label style={labelStyle}>Fecha de Encuentros:</label>
          <input
            name="fecha"
            type="date"
            value={fixture.fecha}
            onChange={handleChangeFixture}
            style={{ ...inputBaseStyle, width: "100%" }}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <label style={labelStyle}>Lugar / Sede:</label>
          <input
            name="lugar"
            placeholder="Ej: Polideportivo Central"
            value={fixture.lugar}
            onChange={handleChangeFixture}
            style={{ ...inputBaseStyle, width: "100%" }}
          />
        </div>
      </div>

      {/* --- Formulario de Agregación de Partido --- */}
      <h3 style={{ color: colorPrimary, marginBottom: 16 }}>Agregar Partido</h3>
      <div
        style={{
          display: "flex",
          gap: 10,
          // Se mantiene flexWrap para evitar desbordamiento en anchos menores
          flexWrap: "wrap", 
          alignItems: "flex-end",
          marginBottom: 16,
          padding: 16,
          border: `1px dashed ${colorSecondary}`,
          borderRadius: 8,
        }}
      >
        {/* Jornada */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Jornada</label>
          <input
            name="jornada"
            type="number"
            min={1}
            placeholder="Nº"
            value={partidoTemp.jornada}
            onChange={handleChangePartido}
            style={{ ...inputBaseStyle, width: 70 }}
          />
        </div>

        {/* Grupo */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Grupo</label>
          <select
            name="grupo"
            value={partidoTemp.grupo}
            onChange={handleChangePartido}
            style={{ ...inputBaseStyle, height: 42 }} 
          >
            {gruposValidos.map((g) => (
              <option key={g} value={g}>
                Grupo {g}
              </option>
            ))}
          </select>
        </div>

        {/* Club 1 */}
        {/* Para un ancho de 600px, mantendremos los anchos mínimos para legibilidad */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Club Local</label>
          <select
            name="club1"
            value={partidoTemp.club1}
            onChange={handleChangePartido}
            style={{ ...inputBaseStyle, minWidth: 140, height: 42 }}
          >
            <option value="">Selecciona Club</option>
            {clubesValidos.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>
        </div>

        {/* Club 2 */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Club Visitante</label>
          <select
            name="club2"
            value={partidoTemp.club2}
            onChange={handleChangePartido}
            style={{ ...inputBaseStyle, minWidth: 140, height: 42 }}
          >
            <option value="">Selecciona Club</option>
            {clubesValidos.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>
        </div>

        {/* Resultado */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Resultado</label>
          <input
            name="resultado"
            placeholder="Ej: 25-21 o -"
            value={partidoTemp.resultado}
            onChange={handleChangePartido}
            style={{ ...inputBaseStyle, width: 120 }}
          />
        </div>

        {/* Botón Agregar Partido */}
        <button
          style={{
            ...buttonBaseStyle,
            backgroundColor: colorSecondary,
            color: "#fff",
            height: 42, 
            marginBottom: 0
          }}
          onClick={agregarPartido}
          type="button"
        >
          Agregar
        </button>
      </div>
      
      {/* Mensajes de Alerta */}
      {error && <div style={{ color: colorDanger, background: "#f8d7da", padding: 8, borderRadius: 4, marginTop: 8 }}>{error}</div>}
      {mensaje && <div style={{ color: colorSuccess, background: "#d4edda", padding: 8, borderRadius: 4, marginTop: 8 }}>{mensaje}</div>}

      {/* --- Lista de Partidos Agregados --- */}
      {fixture.partidos.length > 0 && (
        <>
        <h4 style={{ color: colorPrimary, marginTop: 20 }}>Partidos para guardar ({fixture.partidos.length})</h4>
        <ul style={{ marginTop: 10, listStyleType: "none", padding: 0 }}>
          {fixture.partidos.map((p, i) => (
            <li
              key={i}
              style={{
                background: i % 2 === 0 ? "#f8f9fa" : "#fff",
                padding: "8px 12px",
                borderBottom: `1px solid ${colorBorder}`,
                borderRadius: 4,
                fontSize: "0.95em",
              }}
            >
              <strong style={{ color: colorSecondary }}>Jornada {p.jornada}</strong> | G.{p.grupo}: {p.club1} vs {p.club2} ({p.resultado})
            </li>
          ))}
        </ul>
        </>
      )}

      {/* --- Botones de Acción Final --- */}
      <div style={buttonContainerStyle ? buttonContainerStyle : { marginTop: 24, borderTop: `1px solid ${colorBorder}`, paddingTop: 16, textAlign: "right" }}>
        <button
          onClick={guardarFixture}
          style={{
            ...buttonBaseStyle,
            backgroundColor: colorSuccess,
            color: "#fff",
            marginRight: 8,
          }}
        >
          Guardar Fixture Completo
        </button>
        <button
          type="button"
          onClick={onGenerarAutomatico ? onGenerarAutomatico : generarFixtureAutomatico}
          style={{
            ...buttonBaseStyle,
            backgroundColor: colorWarning,
            color: "#000",
          }}
        >
          Generar Automático
        </button>
      </div>
    </div>
  );
};

export default RegistrarFixture;
