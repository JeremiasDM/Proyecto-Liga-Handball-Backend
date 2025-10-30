import React, { useState } from "react";
// (Pega las interfaces Club, CreateEncuentroDto, CreateFixtureDto aquí)
// ...

type Props = {
  onAgregarFixture: (dto: any) => void;
  onGenerarAutomatico?: () => void;
  clubes: any[]; // <-- Recibe clubes
  buttonContainerStyle?: React.CSSProperties;
};

// NO MÁS clubesValidos y gruposValidos hardcodeados

const RegistrarFixture: React.FC<Props> = ({
  onAgregarFixture,
  onGenerarAutomatico,
  clubes, // <-- Usa clubes de props
  buttonContainerStyle,
}) => {
  const [fixtureDto, setFixtureDto] = useState<any>({
    fecha: "",
    lugar: "",
    partidos: [],
  });
  const [partidoTemp, setPartidoTemp] = useState<any>({
    jornada: 1,
    // grupo: "A", // Puedes quitarlo si no usas grupos
    club1Id: 0, // <-- Cambiado a ID
    club2Id: 0, // <-- Cambiado a ID
    resultado: "-",
    fecha: new Date().toISOString().split('T')[0] // Fecha por defecto
  });
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChangeFixture = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFixtureDto({ ...fixtureDto, [e.target.name]: e.target.value });
  };

  const handleChangePartido = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setError(null);
    setPartidoTemp({
      ...partidoTemp,
      // Convertir IDs a número
      [name]:
        name === "jornada" || name === "club1Id" || name === "club2Id"
          ? Number(value)
          : value,
    });
  };

  const agregarPartido = () => {
    setError(null);
    setMensaje(null);

    // Validaciones
    if (!partidoTemp.club1Id || !partidoTemp.club2Id) {
      setError("Debes seleccionar ambos clubes.");
      return;
    }
    if (partidoTemp.club1Id === partidoTemp.club2Id) {
      setError("No puedes seleccionar el mismo club para ambos equipos.");
      return;
    }
    if (!partidoTemp.resultado) {
        setError("El campo resultado es obligatorio (usa '-' si no se jugó).");
        return;
    }
    if (
      partidoTemp.resultado !== "-" &&
      !/^\d{1,2}-\d{1,2}$/.test(partidoTemp.resultado)
    ) {
      setError("Formato de resultado inválido (Ej: 25-21 o -).");
      return;
    }

    // Comprobar duplicados
    const partidoDuplicado = fixtureDto.partidos.some((p: any) =>
      p.jornada === partidoTemp.jornada &&
      p.grupo === partidoTemp.grupo && // Si usas grupos
      ((p.club1Id === partidoTemp.club1Id && p.club2Id === partidoTemp.club2Id) ||
        (p.club1Id === partidoTemp.club2Id && p.club2Id === partidoTemp.club1Id)),
    );
    if (partidoDuplicado) {
      setError("Este enfrentamiento ya está agregado para esta jornada y grupo.");
      return;
    }

    // Si existe fecha general del fixture, validar que la fecha del partido (si fue seteada)
    // coincida con la fecha del fixture. Asunción: los partidos deben realizarse en la misma fecha del fixture.
    if (fixtureDto.fecha && partidoTemp.fecha && partidoTemp.fecha !== fixtureDto.fecha) {
      setError("La fecha del partido debe coincidir con la fecha del fixture.");
      return;
    }

    // Agregar partido al DTO del fixture
    setFixtureDto({
      ...fixtureDto,
      partidos: [...fixtureDto.partidos, partidoTemp],
    });

    // Resetear formulario de partido
    setPartidoTemp({
      jornada: partidoTemp.jornada, // Mantener jornada actual por defecto
      // grupo: partidoTemp.grupo, // Mantener grupo
      club1Id: 0,
      club2Id: 0,
      resultado: "-",
      fecha: partidoTemp.fecha, // Mantener fecha
    });

    setMensaje("Partido agregado temporalmente.");
    setTimeout(() => setMensaje(null), 2000);
  };

  const guardarFixture = () => {
    setError(null);
    if (!fixtureDto.fecha || !fixtureDto.lugar) {
      setError("Completa la Fecha y el Lugar del fixture.");
      return;
    }
    if (fixtureDto.partidos.length === 0) {
      setError("Agrega al menos un partido al fixture.");
      return;
    }
    onAgregarFixture(fixtureDto); // Llama a la función del padre con el DTO
    // Resetear fixture DTO
    setFixtureDto({ fecha: "", lugar: "", partidos: [] });
    // Mensaje de éxito lo manejará el padre
  };

  // --- Estilos Reutilizables ---
  // (Pega tus estilos aquí: colorPrimary, inputBaseStyle, etc.)
  // ...

  return (
    <div /* style={contenedorPrincipalStyle} */ >
      <h2 /* style={tituloStyle} */>Registro de Fixture</h2>

      {/* --- Información General del Fixture --- */}
      <div /* style={infoGeneralStyle} */>
        <div>
          <label /* style={labelStyle} */>Fecha de Encuentros:</label>
          <input
            name="fecha"
            type="date"
            value={fixtureDto.fecha}
            onChange={handleChangeFixture}
            // style={inputStyle}
            required
          />
        </div>
        <div>
          <label /* style={labelStyle} */>Lugar / Sede:</label>
          <input
            name="lugar"
            placeholder="Ej: Polideportivo Central"
            value={fixtureDto.lugar}
            onChange={handleChangeFixture}
            // style={inputStyle}
            required
          />
        </div>
      </div>

      {/* --- Formulario de Agregación de Partido --- */}
      <h3>Agregar Partido</h3>
      <div /* style={formPartidoStyle} */>
        {/* Jornada */}
        <div>
          <label /* style={labelStyle} */>Jornada</label>
          <input
            name="jornada"
            type="number"
            min={1}
            value={partidoTemp.jornada}
            onChange={handleChangePartido}
            // style={inputStyleSmall}
            required
          />
        </div>

        {/* Grupo (Opcional) */}
        {/*
        <div>
          <label>Grupo</label>
          <select name="grupo" value={partidoTemp.grupo} onChange={handleChangePartido}>
             <option value="A">Grupo A</option>
             <option value="B">Grupo B</option>
          </select>
        </div>
        */}

         {/* Fecha Partido (Opcional) */}
        <div>
          <label>Fecha Partido (Opcional)</label>
          <input
            name="fecha"
            type="date"
            value={partidoTemp.fecha}
            onChange={handleChangePartido}
            // style={...}
          />
        </div>


        {/* --- CAMBIO: Selects con Clubes de la API --- */}
        <div>
          <label /* style={labelStyle} */>Club Local *</label>
          <select
            name="club1Id"
            value={partidoTemp.club1Id}
            onChange={handleChangePartido}
            // style={selectStyle}
            required
          >
            <option value={0} disabled>
              Selecciona Club
            </option>
            {clubes.map((club) => (
              <option key={club.id} value={club.id}>
                {club.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label /* style={labelStyle} */>Club Visitante *</label>
          <select
            name="club2Id"
            value={partidoTemp.club2Id}
            onChange={handleChangePartido}
            // style={selectStyle}
            required
          >
            <option value={0} disabled>
              Selecciona Club
            </option>
            {clubes.map((club) => (
              <option key={club.id} value={club.id}>
                {club.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* --- FIN DEL CAMBIO --- */}

        {/* Resultado */}
        <div>
          <label /* style={labelStyle} */>Resultado *</label>
          <input
            name="resultado"
            placeholder="Ej: 25-21 o -"
            value={partidoTemp.resultado}
            onChange={handleChangePartido}
            // style={inputStyleMedium}
            required
          />
        </div>

        <button
          /* style={botonAgregarStyle} */
          onClick={agregarPartido}
          type="button"
        >
          Agregar Partido
        </button>
      </div>

      {/* Mensajes de Alerta */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {mensaje && <div style={{ color: "green" }}>{mensaje}</div>}

      {/* --- Lista de Partidos Agregados --- */}
      {fixtureDto.partidos.length > 0 && (
        <>
          <h4>Partidos para guardar ({fixtureDto.partidos.length})</h4>
          <ul>
              {fixtureDto.partidos.map((p: any, i: number) => {
              // Buscar nombres de clubes para mostrar
              const club1Name = clubes.find(c => c.id === p.club1Id)?.nombre || `ID: ${p.club1Id}`;
              const club2Name = clubes.find(c => c.id === p.club2Id)?.nombre || `ID: ${p.club2Id}`;
              return (
                <li key={i} /* style={listItemStyle} */>
                  <strong>J{p.jornada}</strong> {p.grupo ? `| G.${p.grupo}` : ''}: {club1Name} vs {club2Name} ({p.resultado}) {p.fecha ? `[${p.fecha}]` : ''}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* --- Botones de Acción Final --- */}
      <div style={buttonContainerStyle || { marginTop: 24 }}>
        <button
          onClick={guardarFixture}
          disabled={fixtureDto.partidos.length === 0} // Deshabilitar si no hay partidos
          /* style={botonGuardarStyle} */
        >
          Guardar Fixture Completo
        </button>
        {onGenerarAutomatico && (
          <button
            type="button"
            onClick={onGenerarAutomatico}
            /* style={botonGenerarStyle} */
          >
            Generar Automático (Demo)
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrarFixture;