import React, { useState } from "react";
import type { Fixture, Encuentro } from "./types";

type Props = {
  onAgregarFixture: (fixture: Fixture) => void;
};

const RegistrarFixture: React.FC<Props> = ({ onAgregarFixture }) => {
  const [fixture, setFixture] = useState<Fixture>({ fecha: "", lugar: "", partidos: [] });
  const [partidoTemp, setPartidoTemp] = useState<Encuentro>({
    jornada: 1,
    grupo: "A",
    club1: "",
    club2: "",
    resultado: ""
  });

  const handleChangeFixture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFixture({ ...fixture, [e.target.name]: e.target.value });
  };

  const handleChangePartido = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartidoTemp({ ...partidoTemp, [name]: name === "jornada" ? Number(value) : value });
  };

  const agregarPartido = () => {
    if (!partidoTemp.club1 || !partidoTemp.club2 || !partidoTemp.resultado) {
      alert("Completa todos los campos del partido.");
      return;
    }
    setFixture({ ...fixture, partidos: [...fixture.partidos, partidoTemp] });
    setPartidoTemp({ jornada: 1, grupo: "A", club1: "", club2: "", resultado: "" });
  };

  const guardarFixture = () => {
    if (!fixture.fecha || !fixture.lugar || fixture.partidos.length === 0) {
      alert("Completa todos los campos obligatorios.");
      return;
    }
    onAgregarFixture(fixture);
    setFixture({ fecha: "", lugar: "", partidos: [] });
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
    alert("Fixture automático agregado ");
  };

  return (
    <div>
      <h3>Registrar Fixture</h3>
      <input name="fecha" type="date" value={fixture.fecha} onChange={handleChangeFixture} />
      <input name="lugar" placeholder="Lugar" value={fixture.lugar} onChange={handleChangeFixture} />

      <h4>Agregar Partido</h4>
      <input
        name="jornada"
        type="number"
        placeholder="Jornada"
        value={partidoTemp.jornada}
        onChange={handleChangePartido}
      />
      <select name="grupo" value={partidoTemp.grupo} onChange={handleChangePartido}>
        <option value="A">Grupo A</option>
        <option value="B">Grupo B</option>
      </select>
      <input name="club1" placeholder="Club 1" value={partidoTemp.club1} onChange={handleChangePartido} />
      <input name="club2" placeholder="Club 2" value={partidoTemp.club2} onChange={handleChangePartido} />
      <input
        name="resultado"
        placeholder="Resultado (ej: 25-21)"
        value={partidoTemp.resultado}
        onChange={handleChangePartido}
      />

      <button onClick={agregarPartido}>Agregar Partido</button>
      <ul>
        {fixture.partidos.map((p, i) => (
          <li key={i}>
            Jornada {p.jornada} | Grupo {p.grupo}: {p.club1} vs {p.club2} ({p.resultado})
          </li>
        ))}
      </ul>
      <button onClick={guardarFixture}>Guardar Fixture</button>

      <button type="button" onClick={generarFixtureAutomatico}>
        Generar Automático
      </button>
    </div>
  );
};

export default RegistrarFixture;
