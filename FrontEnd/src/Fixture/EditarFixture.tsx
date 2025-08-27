import React, { useState, useEffect } from "react";
import type { Fixture, Encuentro } from "./types";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePartidoChange = (index: number, campo: keyof Encuentro, valor: string) => {
    const partidosActualizados = [...formData.partidos];
    const partido = { ...partidosActualizados[index] };
    partido[campo] = campo === "jornada" ? Number(valor) : valor;
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
        {formData.partidos.map((partido, i) => (
          <div key={i}>
            <input type="number" value={partido.jornada} onChange={(e) => handlePartidoChange(i, "jornada", e.target.value)} />
            <select value={partido.grupo} onChange={(e) => handlePartidoChange(i, "grupo", e.target.value)}>
              <option value="A">Grupo A</option>
              <option value="B">Grupo B</option>
            </select>
            <input type="text" value={partido.club1} onChange={(e) => handlePartidoChange(i, "club1", e.target.value)} />
            <input type="text" value={partido.club2} onChange={(e) => handlePartidoChange(i, "club2", e.target.value)} />
            <input type="text" value={partido.resultado} onChange={(e) => handlePartidoChange(i, "resultado", e.target.value)} />
          </div>
        ))}

        <button type="submit">Guardar Cambios</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarFixture;
