import { useState, useEffect, type ChangeEvent } from "react";
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

  useEffect(() => {
    setFormData(fixture);
  }, [fixture]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePartidoChange = (index: number, campo: keyof Encuentro, valor: string) => {
    const partidosActualizados = [...formData.partidos];
    const partido = { ...partidosActualizados[index] };
    (partido as any)[campo] = campo === "jornada" ? Number(valor) : valor;
    partidosActualizados[index] = partido;
    setFormData({ ...formData, partidos: partidosActualizados });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div>
      <h3>Editar Fixture</h3>
      <form onSubmit={handleSubmit}>
        <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} />
        <input name="lugar" value={formData.lugar} onChange={handleChange} />

        <h4>Editar Partidos</h4>
        {formData.partidos.map((partido: Encuentro, i: number) => (
          <FormularioPartido
            key={i}
            partido={partido}
            onChange={(campo, valor) => handlePartidoChange(i, campo, valor)}
            clubesValidos={clubesValidos}
            gruposValidos={gruposValidos}
          />
        ))}

        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarFixture;
