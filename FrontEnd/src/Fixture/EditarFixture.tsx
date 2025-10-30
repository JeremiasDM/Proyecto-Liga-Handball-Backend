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
  const [formData, setFormData] = useState<any>({
      fecha: fixture.fecha,
      lugar: fixture.lugar,
      partidos: fixture.partidos ? fixture.partidos.map((p: any) => ({
        id: p.id,
        jornada: p.jornada,
        grupo: p.grupo,
        club1Id: p.club1?.id || p.club1Id || 0,
        club2Id: p.club2?.id || p.club2Id || 0,
        resultado: p.resultado,
        fecha: p.fecha,
      })) : [],
  });
  const [partidoTemp, setPartidoTemp] = useState<any>({
    jornada: 1,
    club1Id: 0,
    club2Id: 0,
    resultado: '-',
    fecha: fixture.fecha || new Date().toISOString().split('T')[0],
  });
  // Nota: No manejamos la edición de partidos individuales aquí por simplicidad.
  // Una implementación completa requeriría manejar cambios en el array de partidos.

  // Sincronizar si cambia el fixture de las props
  useEffect(() => {
    setFormData({
      fecha: fixture.fecha,
      lugar: fixture.lugar,
      partidos: fixture.partidos ? fixture.partidos.map((p: any) => ({
        id: p.id,
        jornada: p.jornada,
        grupo: p.grupo,
        club1Id: p.club1?.id || p.club1Id || 0,
        club2Id: p.club2?.id || p.club2Id || 0,
        resultado: p.resultado,
        fecha: p.fecha,
      })) : [],
    });
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
    // Validaciones básicas: fecha y lugar obligatorios
    if (!formData.fecha || !formData.lugar) {
      alert('Fecha y Lugar son campos obligatorios.');
      return;
    }

    // Validar que si existen partidos con fecha, coincidan con la fecha del fixture (asunción)
    if (formData.partidos && formData.partidos.some((p: any) => p.fecha && p.fecha !== formData.fecha)) {
      alert('Todas las fechas de partidos deben coincidir con la fecha del fixture.');
      return;
    }

    // Enviar DTO parcial incluyendo partidos (frontend only)
    onGuardar(fixture.id, { fecha: formData.fecha, lugar: formData.lugar, partidos: formData.partidos });
  };

  const handleChangePartido = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartidoTemp({
      ...partidoTemp,
      [name]: name === 'jornada' || name === 'club1Id' || name === 'club2Id' ? Number(value) : value,
    });
  };

  const agregarPartido = () => {
    // Validaciones similares al registrar
    if (!partidoTemp.club1Id || !partidoTemp.club2Id) { alert('Debes seleccionar ambos clubes.'); return; }
    if (partidoTemp.club1Id === partidoTemp.club2Id) { alert('No puedes seleccionar el mismo club para ambos equipos.'); return; }
    if (!partidoTemp.resultado) { alert("El campo resultado es obligatorio (usa '-')"); return; }
    if (partidoTemp.resultado !== '-' && !/^\d{1,2}-\d{1,2}$/.test(partidoTemp.resultado)) { alert('Formato de resultado inválido (Ej: 25-21 o -).'); return; }
    // Duplicado
    const dup = (formData.partidos || []).some((p: any) =>
      p.jornada === partidoTemp.jornada && ((p.club1Id === partidoTemp.club1Id && p.club2Id === partidoTemp.club2Id) || (p.club1Id === partidoTemp.club2Id && p.club2Id === partidoTemp.club1Id))
    );
    if (dup) { alert('Este enfrentamiento ya está agregado.'); return; }
    if (formData.fecha && partidoTemp.fecha && partidoTemp.fecha !== formData.fecha) { alert('La fecha del partido debe coincidir con la fecha del fixture.'); return; }

    setFormData({ ...formData, partidos: [...(formData.partidos || []), { ...partidoTemp }] });
    setPartidoTemp({ jornada: partidoTemp.jornada, club1Id: 0, club2Id: 0, resultado: '-', fecha: formData.fecha });
  };

  const eliminarPartido = (index: number) => {
    const nuevos = [...(formData.partidos || [])];
    nuevos.splice(index, 1);
    setFormData({ ...formData, partidos: nuevos });
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

        <h4>Partidos (Editar)</h4>

        {/* Formulario inline para agregar nuevos partidos */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
          <label>
            Jornada:
            <input name="jornada" type="number" min={1} value={partidoTemp.jornada} onChange={handleChangePartido} style={{ width: 60 }} />
          </label>
          <label>
            Club Local:
            <select name="club1Id" value={partidoTemp.club1Id} onChange={handleChangePartido}>
              <option value={0} disabled>Selecciona Club</option>
              {clubes.map((club: any) => <option key={club.id} value={club.id}>{club.nombre}</option>)}
            </select>
          </label>
          <label>
            Club Visitante:
            <select name="club2Id" value={partidoTemp.club2Id} onChange={handleChangePartido}>
              <option value={0} disabled>Selecciona Club</option>
              {clubes.map((club: any) => <option key={club.id} value={club.id}>{club.nombre}</option>)}
            </select>
          </label>
          <label>
            Resultado:
            <input name="resultado" placeholder="Ej: 25-21 o -" value={partidoTemp.resultado} onChange={handleChangePartido} style={{ width: 100 }} />
          </label>
          <label>
            Fecha (opcional):
            <input name="fecha" type="date" value={partidoTemp.fecha} onChange={handleChangePartido} />
          </label>
          <button type="button" onClick={agregarPartido}>Agregar Partido</button>
        </div>

        {/* Lista editable de partidos */}
        {formData.partidos && formData.partidos.length > 0 ? (
          <div style={{ marginTop: 8 }}>
            {formData.partidos.map((p: any, idx: number) => (
              <div key={p.id || idx} style={{ border: '1px solid #ccc', padding: '6px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>J{p.jornada}</strong> {p.grupo ? `| G.${p.grupo}` : ''}: {clubes.find(c => c.id === p.club1Id)?.nombre || p.club1Id} vs {clubes.find(c => c.id === p.club2Id)?.nombre || p.club2Id} ({p.resultado}) {p.fecha ? `[${p.fecha}]` : ''}
                </div>
                <div>
                  <button type="button" onClick={() => eliminarPartido(idx)} style={{ marginLeft: 8 }}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#666' }}>No hay partidos en este fixture.</p>
        )}

        <button type="submit">Guardar Cambios (Fecha/Lugar)</button>
        <button type="button" onClick={onCancelar}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarFixture;