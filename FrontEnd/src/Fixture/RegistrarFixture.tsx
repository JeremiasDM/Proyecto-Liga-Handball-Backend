import React, { useState } from "react";
import type { Encuentro, Fixture } from "../types/types";

type Props = {
  onAgregarFixture: (fixture: Fixture) => void;
};

const clubesValidos = [
  "Club A1", "Club A2", "Club A3", "Club A4",
  "Club B1", "Club B2", "Club B3", "Club B4"
];

const gruposValidos = ["A", "B"];

const RegistrarFixture: React.FC<Props> = ({ onAgregarFixture }) => {
  const [fixture, setFixture] = useState<Fixture>({ fecha: "", lugar: "", partidos: [] });
  const [partidoTemp, setPartidoTemp] = useState<Encuentro>({
    jornada: 1,
    grupo: "A",
    club1: "",
    club2: "",
    resultado: ""
  });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChangeFixture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixture({ ...fixture, [e.target.name]: e.target.value });
  };

  const handleChangePartido = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartidoTemp({ ...partidoTemp, [name]: name === "jornada" ? Number(value) : value });
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
      setError("El resultado debe tener el formato NN-NN o ser '-' si no se jugó.");
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
    setPartidoTemp({ jornada: 1, grupo: "A", club1: "", club2: "", resultado: "" });
    setMensaje("Partido agregado correctamente.");
    setTimeout(() => setMensaje(null), 2000);
  };

  const guardarFixture = () => {
    setError(null);
    if (!fixture.fecha || !fixture.lugar || fixture.partidos.length === 0) {
      setError("Completa todos los campos obligatorios.");
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
      { jornada: 1, grupo: "B", club1: "Club B3", club2: "Club B4", resultado: "-" }
    ];

    const fixtureAuto: Fixture = {
      fecha: new Date().toISOString().split("T")[0],
      lugar: "Automático",
      partidos: partidosAuto
    };

    onAgregarFixture(fixtureAuto);
    setMensaje("Fixture automático agregado.");
    setTimeout(() => setMensaje(null), 2000);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px #eee" }}>
      <h3 style={{ color: "#1F3C88", textAlign: "center" }}>Registrar Fixture</h3>
      <div style={{ marginBottom: 12 }}>
        <label>
          Fecha:{" "}
          <input name="fecha" type="date" value={fixture.fecha} onChange={handleChangeFixture} />
        </label>
        <label style={{ marginLeft: 16 }}>
          Lugar:{" "}
          <input name="lugar" placeholder="Lugar" value={fixture.lugar} onChange={handleChangeFixture} />
        </label>
      </div>

      <h4 style={{ color: "#1F3C88" }}>Agregar Partido</h4>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <label>
          Jornada:{" "}
          <input
            name="jornada"
            type="number"
            min={1}
            placeholder="Jornada"
            value={partidoTemp.jornada}
            onChange={handleChangePartido}
            style={{ width: 60 }}
          />
        </label>
        <label>
          Grupo:{" "}
          <select name="grupo" value={partidoTemp.grupo} onChange={handleChangePartido}>
            {gruposValidos.map((g) => (
              <option key={g} value={g}>Grupo {g}</option>
            ))}
          </select>
        </label>
        <label>
          Club 1:{" "}
          <select name="club1" value={partidoTemp.club1} onChange={handleChangePartido}>
            <option value="">Selecciona Club 1</option>
            {clubesValidos.map((club) => (
              <option key={club} value={club}>{club}</option>
            ))}
          </select>
        </label>
        <label>
          Club 2:{" "}
          <select name="club2" value={partidoTemp.club2} onChange={handleChangePartido}>
            <option value="">Selecciona Club 2</option>
            {clubesValidos.map((club) => (
              <option key={club} value={club}>{club}</option>
            ))}
          </select>
        </label>
        <label>
          Resultado:{" "}
          <input
            name="resultado"
            placeholder="Ej: 25-21 o -"
            value={partidoTemp.resultado}
            onChange={handleChangePartido}
            style={{ width: 80 }}
          />
        </label>
        <button
          style={{
            backgroundColor: "#1F3C88",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={agregarPartido}
          type="button"
        >
          Agregar Partido
        </button>
      </div>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      {mensaje && <div style={{ color: "green", marginTop: 8 }}>{mensaje}</div>}

      <ul style={{ marginTop: 16 }}>
        {fixture.partidos.map((p, i) => (
          <li key={i}>
            Jornada {p.jornada} | Grupo {p.grupo}: {p.club1} vs {p.club2} ({p.resultado})
          </li>
        ))}
      </ul>
      <button
        onClick={guardarFixture}
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: 16,
          marginRight: 8
        }}
      >
        Guardar Fixture
      </button>
      <button
        type="button"
        onClick={generarFixtureAutomatico}
        style={{
          backgroundColor: "#FFD700",
          color: "#000",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: 16
        }}
      >
        Generar Automático
      </button>
    </div>
  );
};

export default RegistrarFixture;
