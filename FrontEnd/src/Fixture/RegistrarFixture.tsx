import React, { useState } from "react";
import type { Encuentro, Fixture } from "../types/types";
import { validarPartido } from "../utils/validaciones";

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
    fecha: undefined,
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
    const errorMsg = validarPartido(partidoTemp, fixture.partidos);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setFixture({ ...fixture, partidos: [...fixture.partidos, partidoTemp] });
    setPartidoTemp({ fecha: undefined, jornada: 1, grupo: "A", club1: "", club2: "", resultado: "" });
    setMensaje("Partido agregado correctamente.");
    setTimeout(() => setMensaje(null), 2000);
  };

  const eliminarPartido = (index: number) => {
    const nuevos = [...fixture.partidos];
    nuevos.splice(index, 1);
    setFixture({ ...fixture, partidos: nuevos });
  };

  const guardarFixture = () => {
    setError(null);
    if (!fixture.fecha || !fixture.lugar || fixture.partidos.length === 0) {
      setError("Completa todos los campos obligatorios.");
      return;
    }
    if (fixture.partidos.length < 1) {
      setError("El fixture debe tener al menos un partido.");
      return;
    }
    if (fixture.fecha) {
      const fechaFixture = new Date(fixture.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaFixture < hoy) {
        setError("La fecha del fixture no puede ser anterior a hoy.");
        return;
      }
    }
    onAgregarFixture(fixture);
    setFixture({ fecha: "", lugar: "", partidos: [] });
    setMensaje("Fixture guardado correctamente.");
    setTimeout(() => setMensaje(null), 2000);
  };

  const generarFixtureAutomatico = () => {
    const partidosAuto: Encuentro[] = [
      {
        jornada: 1, grupo: "A", club1: "Club A1", club2: "Club A2", resultado: "-",
        fecha: undefined
      },
      {
        jornada: 1, grupo: "A", club1: "Club A3", club2: "Club A4", resultado: "-",
        fecha: undefined
      },
      {
        jornada: 1, grupo: "B", club1: "Club B1", club2: "Club B2", resultado: "-",
        fecha: undefined
      },
      {
        jornada: 1, grupo: "B", club1: "Club B3", club2: "Club B4", resultado: "-",
        fecha: undefined
      }
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
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "#1F3C88" }}>Registrar Fixture</h3>
      <div className="mb-4 flex gap-4">
        <label className="flex-1">
          Fecha:
          <input name="fecha" type="date" value={fixture.fecha} onChange={handleChangeFixture} className="w-full p-2 border rounded" />
        </label>
        <label className="flex-1">
          Lugar:
          <input name="lugar" placeholder="Lugar" value={fixture.lugar} onChange={handleChangeFixture} className="w-full p-2 border rounded" />
        </label>
      </div>

      <h4 className="font-semibold mb-2" style={{ color: "#1F3C88" }}>Agregar Partido</h4>
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <input
          name="jornada"
          type="number"
          min={1}
          placeholder="Jornada"
          value={partidoTemp.jornada}
          onChange={handleChangePartido}
          className="w-20 p-2 border rounded"
        />
        <select name="grupo" value={partidoTemp.grupo} onChange={handleChangePartido} className="w-24 p-2 border rounded">
          {gruposValidos.map((g) => (
            <option key={g} value={g}>Grupo {g}</option>
          ))}
        </select>
        <select name="club1" value={partidoTemp.club1} onChange={handleChangePartido} className="w-32 p-2 border rounded">
          <option value="">Club 1</option>
          {clubesValidos.map((club) => (
            <option key={club} value={club}>{club}</option>
          ))}
        </select>
        <select name="club2" value={partidoTemp.club2} onChange={handleChangePartido} className="w-32 p-2 border rounded">
          <option value="">Club 2</option>
          {clubesValidos.map((club) => (
            <option key={club} value={club}>{club}</option>
          ))}
        </select>
        <input
          name="resultado"
          placeholder="Ej: 25-21 o -"
          value={partidoTemp.resultado}
          onChange={handleChangePartido}
          className="w-24 p-2 border rounded"
        />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={agregarPartido}
          type="button"
        >
          Agregar Partido
        </button>
      </div>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {mensaje && <div className="text-green-600 mt-2">{mensaje}</div>}

      <ul className="mt-4">
        {fixture.partidos.map((p, i) => (
          <li key={i}>
            Jornada {p.jornada} | Grupo {p.grupo}: {p.club1} vs {p.club2} ({p.resultado})
            <button
              className="ml-2 text-red-600"
              aria-label="Eliminar partido"
              role="button"
              onClick={() => eliminarPartido(i)}
              type="button"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-6">
        <button
          onClick={guardarFixture}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar Fixture
        </button>
        <button
          type="button"
          onClick={generarFixtureAutomatico}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Generar Automático
        </button>
      </div>
    </div>
  );
};

export default RegistrarFixture;
