import React, { useState, useEffect, type ChangeEvent } from "react";
// (Pega las interfaces FixtureAPI, EncuentroAPI, Club, CreateFixtureDto, CreateEncuentroDto aquí)
// ...
import FormularioPartido from "./FormularioPartido"; // Asumiendo que existe y se adapta

type Props = {
  fixture: FixtureAPI; // Recibe el fixture de la API
  clubes: Club[]; // Recibe la lista de clubes
  onGuardar: (id: number, dto: Partial<CreateFixtureDto>) => void; // Envía DTO parcial
  onCancelar: () => void;
};

const EditarFixture: React.FC<Props> = ({ fixture, clubes, onGuardar, onCancelar }) => {
  // Estado inicial con los datos del fixture a editar
  const [formData, setFormData] = useState({
      fecha: fixture.fecha,
      lugar: fixture.lugar
  });
  // Nota: No manejamos la edición de partidos individuales aquí por simplicidad.
  // Una implementación completa requeriría manejar cambios en el array de partidos.

  // Sincronizar si cambia el fixture de las props
  useEffect(() => {
    setFormData({ fecha: fixture.fecha, lugar: fixture.lugar });
  }, [fixture]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Lógica para editar partidos (PENDIENTE / SIMPLIFICADA) ---
  // const handlePartidoChange = (index: number, campo: keyof CreateEncuentroDto, valor: string | number) => {
  //   console.warn("Edición de partidos individuales no implementada en este ejemplo.");
  //   // Aquí iría la lógica para actualizar el estado 'formData.partidos'
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Solo envía los campos principales (fecha, lugar)
    onGuardar(fixture.id, { fecha: formData.fecha, lugar: formData.lugar });
  };

  return (
    <div>
      <h3>Editar Fixture (ID: {fixture.id})</h3>
      <form onSubmit={handleSubmit}>
        <label>Fecha:</label>
        <input
          name="fecha"
          type="date"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <label>Lugar:</label>
        <input
          name="lugar"
          value={formData.lugar}
          onChange={handleChange}
          required
        />

        <h4>Partidos (Solo Lectura en este ejemplo)</h4>
        {fixture.partidos.map((partido: EncuentroAPI, i: number) => (
          <div key={partido.id || i} style={{ border: '1px solid #ccc', padding: '5px', marginBottom: '5px' }}>
            J{partido.jornada} {partido.grupo ? `| G.${partido.grupo}` : ''}:
            {partido.club1?.nombre || 'N/A'} vs {partido.club2?.nombre || 'N/A'}
            ({partido.resultado}) {partido.fecha ? `[${partido.fecha}]` : ''}
            {/* Aquí podrías poner un FormularioPartido si implementas la edición */}
          </div>
        ))}

        <button type="submit">Guardar Cambios (Fecha/Lugar)</button>
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarFixture;