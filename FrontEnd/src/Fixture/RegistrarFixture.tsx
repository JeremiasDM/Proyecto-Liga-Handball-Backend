import React, { useState } from "react";
import type { Encuentro, Fixture } from "../types/types";

type Props = {
  onAgregarFixture: (fixture: Fixture) => void;
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

const RegistrarFixture: React.FC<Props> = ({ onAgregarFixture }) => {
  const [fixture, setFixture] = useState<Fixture>({
    fecha: "",
    lugar: "",
    partidos: [],
  });
  const [partidoTemp, setPartidoTemp] = useState<Encuentro>({
    fecha: undefined,
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

    if (!partidoTemp.club1 || !partidoTemp.club2) {
      setError("Completa la selección de ambos clubes.");
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
    // La validación de resultado ahora es más flexible, ya que el resultado es opcional al agregar.
    // Solo validamos el formato si NO está vacío o es '-'
    if (
      partidoTemp.resultado && 
      partidoTemp.resultado !== "-" &&
      !/^\d{1,2}-\d{1,2}$/.test(partidoTemp.resultado)
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
      fecha: undefined,
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
      { fecha: undefined, jornada: 1, grupo: "A", club1: "Club A1", club2: "Club A2", resultado: "-" },
      { fecha: undefined, jornada: 1, grupo: "A", club1: "Club A3", club2: "Club A4", resultado: "-" },
      { fecha: undefined, jornada: 1, grupo: "B", club1: "Club B1", club2: "Club B2", resultado: "-" },
      { fecha: undefined, jornada: 1, grupo: "B", club1: "Club B3", club2: "Club B4", resultado: "-" },
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
  
  // --- Estilos Reutilizables y Mejorados ---
  const colorPrimary = "#1a5276"; // Azul Marino
  const colorSecondary = "#4a90e2"; // Azul Brillante (Botón Agregar)
  const colorSuccess = "#28a745"; // Verde (Guardar)
  const colorWarning = "#FFD700"; // Amarillo/Oro (Generar Automático)
  const colorDanger = "#dc3545"; // Rojo
  const colorBorder = "#ced4da"; // Gris claro para bordes (más oscuro que dee2e6)
  const elementHeight = 42; // Altura estándar para campos y botón

  // Estilo base para Inputs y Selects
  const inputBaseStyle: React.CSSProperties = {
    // Aumentamos padding para mayor altura y mejor estética
    padding: "8px 12px", 
    border: `1px solid ${colorBorder}`,
    borderRadius: 6, // Ligeramente más redondeado
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
    marginTop: 4,
    height: elementHeight, // Altura fija para coherencia
    fontSize: "1em",
  };

  // Función para simular :focus en inputs y selects
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = colorSecondary;
    e.currentTarget.style.boxShadow = `0 0 0 0.2rem rgba(74, 144, 226, 0.25)`;
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = colorBorder;
    e.currentTarget.style.boxShadow = "none";
  };


  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.95em", // Ligeramente más grande
    color: "#343a40", // Gris oscuro
    fontWeight: 600, // Más negrita
    marginBottom: 4,
  };
  
  const formGroupStyle: React.CSSProperties = {
    // Eliminamos el marginRight si usamos flexbox gap
    marginBottom: 16, 
  };

  const buttonBaseStyle: React.CSSProperties = {
    padding: "10px 20px", // Aumentado para mejor tacto
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s, transform 0.1s",
    whiteSpace: "nowrap",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    height: elementHeight, // Altura fija para coherencia
  };

  return (
    <div
      style={{
        maxWidth: 700, // Aumentamos ligeramente el ancho total
        margin: "30px auto",
        background: "#fff",
        borderRadius: 12,
        padding: 30, // Aumentamos el padding
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)", // Sombra más suave
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Título */}
      <h2
        style={{
          color: colorPrimary,
          textAlign: "center",
          marginBottom: 25,
          borderBottom: `3px solid ${colorSecondary}`, // Borde más grueso
          paddingBottom: 10,
          fontSize: "1.8em",
        }}
      >
        Registro de Fixture
      </h2>

      {/* --- Información General del Fixture (Fecha/Lugar) --- */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 30, // Más espacio debajo
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
            onFocus={handleFocus}
            onBlur={handleBlur}
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputBaseStyle, width: "100%" }}
          />
        </div>
      </div>

      {/* --- Formulario de Agregación de Partido --- */}
      <h3 style={{ color: colorPrimary, marginBottom: 20 }}>Agregar Partido</h3>
      <div
        style={{
          display: "flex",
          gap: 15, // Reducimos ligeramente el gap y usamos flex-wrap
          flexWrap: "wrap",
          alignItems: "flex-end",
          marginBottom: 16,
          padding: 20, // Más padding interno
          border: `1px solid ${colorBorder}`,
          borderRadius: 10,
          backgroundColor: "#fff", // Fondo blanco para destacarse
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputBaseStyle, width: 70, textAlign: "center" }}
          />
        </div>

        {/* Grupo */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Grupo</label>
          <select
            name="grupo"
            value={partidoTemp.grupo}
            onChange={handleChangePartido}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputBaseStyle, minWidth: 100 }}
          >
            {gruposValidos.map((g) => (
              <option key={g} value={g}>
                Grupo {g}
              </option>
            ))}
          </select>
        </div>

        {/* Club 1 */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Club Local</label>
          <select
            name="club1"
            value={partidoTemp.club1}
            onChange={handleChangePartido}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputBaseStyle, minWidth: 140, flexGrow: 1 }}
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputBaseStyle, minWidth: 140, flexGrow: 1 }}
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ ...inputBaseStyle, width: 90, textAlign: "center" }}
          />
        </div>

        {/* Botón Agregar Partido */}
        {/* El botón ahora tiene la misma altura que los campos */}
        <button
          style={{
            ...buttonBaseStyle,
            backgroundColor: colorSecondary,
            color: "#fff",
            // Ajustamos el margin-bottom para alinearlo con los campos
            marginBottom: 4, 
          }}
          // Simulación de hover
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a7fcf'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colorSecondary}
          onClick={agregarPartido}
          type="button"
        >
          Agregar
        </button>
      </div>
      
      {/* Mensajes de Alerta */}
      {error && <div style={{ color: colorDanger, background: "#f8d7da", padding: 10, borderRadius: 6, marginTop: 15, fontWeight: "bold" }}>{error}</div>}
      {mensaje && <div style={{ color: colorSuccess, background: "#d4edda", padding: 10, borderRadius: 6, marginTop: 15, fontWeight: "bold" }}>{mensaje}</div>}

      {/* --- Lista de Partidos Agregados --- */}
      {fixture.partidos.length > 0 && (
        <>
        <h4 style={{ color: colorPrimary, marginTop: 25, borderBottom: `1px solid ${colorBorder}`, paddingBottom: 5 }}>Partidos para guardar ({fixture.partidos.length})</h4>
        <ul style={{ marginTop: 10, listStyleType: "none", padding: 0 }}>
          {fixture.partidos.map((p, i) => (
            <li
              key={i}
              style={{
                background: i % 2 === 0 ? "#f0f0f5" : "#fff", // Colores de fila alternos más claros
                padding: "10px 15px",
                borderBottom: `1px solid ${colorBorder}`,
                borderRadius: 4,
                fontSize: "0.95em",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <span>
                <strong style={{ color: colorSecondary }}>J. {p.jornada}</strong> | G.{p.grupo}: {p.club1} vs {p.club2} 
              </span>
              <span style={{ fontWeight: "bold", color: p.resultado === "-" ? "#6c757d" : colorPrimary }}>
                Resultado: {p.resultado}
              </span>
            </li>
          ))}
        </ul>
        </>
      )}

      {/* --- Botones de Acción Final --- */}
      <div style={{ marginTop: 30, borderTop: `1px solid ${colorBorder}`, paddingTop: 20, textAlign: "center" }}>
        <button
          onClick={guardarFixture}
          style={{
            ...buttonBaseStyle,
            backgroundColor: colorSuccess,
            color: "#fff",
            marginRight: 15,
          }}
          // Simulación de hover
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e7e34'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colorSuccess}
          disabled={!fixture.fecha || !fixture.lugar || fixture.partidos.length === 0}
        >
          Guardar Fixture Completo
        </button>
        <button
          type="button"
          onClick={generarFixtureAutomatico}
          style={{
            ...buttonBaseStyle,
            backgroundColor: colorWarning,
            color: "#000",
          }}
          // Simulación de hover
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ccaa00'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colorWarning}
        >
          Generar Automático
        </button>
      </div>
    </div>
  );
};

export default RegistrarFixture;
