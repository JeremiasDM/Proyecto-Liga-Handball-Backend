import React, { useState, useEffect } from "react";
import type { Encuentro, Fixture } from "../types/types";
import FormularioPartido from "./FormularioPartido";

const clubesValidos = [
  "Club A1", "Club A2", "Club A3", "Club A4",
  "Club B1", "Club B2", "Club B3", "Club B4"
];
const gruposValidos = ["A", "B"];

type Props = {
  fixture: Fixture;
  onGuardar: (f: Fixture) => void;
  onCancelar: () => void;
};

const EditarFixture: React.FC<Props> = ({ fixture, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState<Fixture>(fixture);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(fixture);
  }, [fixture]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePartidoChange = (index: number, campo: keyof Encuentro, valor: string) => {
    const partidosActualizados = [...formData.partidos];
    const partido = { ...partidosActualizados[index] };
    (partido as any)[campo] = campo === "jornada" ? Number(valor) : valor;
    partidosActualizados[index] = partido;
    setFormData({ ...formData, partidos: partidosActualizados });
  };

  const eliminarPartido = (index: number) => {
    const nuevos = [...formData.partidos];
    nuevos.splice(index, 1);
    setFormData({ ...formData, partidos: nuevos });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fecha || !formData.lugar || formData.partidos.length === 0) {
      setError("Completa todos los campos obligatorios.");
      return;
    }
    if (formData.partidos.length < 1) {
      setError("El fixture debe tener al menos un partido.");
      return;
    }
    if (formData.fecha) {
      const fechaFixture = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaFixture < hoy) {
        setError("La fecha del fixture no puede ser anterior a hoy.");
        return;
      }
    }
    setError(null);
    onGuardar(formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "#1F3C88" }}>Editar Fixture</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fecha"
          type="date"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="lugar"
          value={formData.lugar}
          onChange={handleChange}
          placeholder="Lugar"
          className="w-full p-2 border rounded"
        />

        <h4 className="font-semibold mb-2" style={{ color: "#1F3C88" }}>Editar Partidos</h4>
        {formData.partidos.map((partido, i) => (
          <div key={i} className="flex items-center gap-2">
            <FormularioPartido
              partido={partido}
              onChange={(campo, valor) => handlePartidoChange(i, campo, valor)}
              clubesValidos={clubesValidos}
              gruposValidos={gruposValidos}
            />
            <button
              className="ml-2 text-red-600"
              aria-label="Eliminar partido"
              role="button"
              type="button"
              onClick={() => eliminarPartido(i)}
            >
              Eliminar
            </button>
          </div>
        ))}

        {error && <div className="text-red-600 mt-2">{error}</div>}

        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Guardar Cambios</button>
          <button type="button" onClick={onCancelar} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarFixture;
