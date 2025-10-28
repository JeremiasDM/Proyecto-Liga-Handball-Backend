import React, { useState } from "react";

// (Pega aquí la función 'validarJugador' de tu archivo)
// ...

// --- Tipos ---
interface Club {
  id: number;
  nombre: string;
}

// DTO para Fase 1
interface CreateJugadorFase1Dto {
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  estado: string;
}

// Props que recibe
type Props = {
  onRegistrar: (dto: CreateJugadorFase1Dto) => void;
  clubes: Club[];
};

const RegistroJugador: React.FC<Props> = ({ onRegistrar, clubes }) => {
  const [form, setForm] = useState<CreateJugadorFase1Dto>({
    nombre: "",
    apellido: "",
    dni: "",
    clubId: 0, // <-- CAMBIO
    categoria: "",
    telefono: "",
    vencimiento: "",
    estado: "activo",
  });
  const [error, setError] = useState<string | null>(null);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setError(null);
    setForm({
      ...form,
      [name]: name === "clubId" ? Number(value) : value, // <-- CAMBIO
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // --- Validaciones inline (sin helpers externos) ---
    const trim = (s?: string) => (typeof s === 'string' ? s.trim() : '');
    const nombre = trim(form.nombre);
    const apellido = trim(form.apellido);
    const dni = trim(form.dni);
    const telefono = trim(form.telefono);
    const categoria = trim(form.categoria);

    // Requeridos
    if (!nombre || !apellido || !dni || !form.clubId || !categoria) {
      setError("Todos los campos marcados con * son obligatorios.");
      return;
    }

    // Longitudes máximas
    const MAX_NAME = 100;
    if (nombre.length > MAX_NAME || apellido.length > MAX_NAME) {
      setError(`Nombre y apellido deben tener como máximo ${MAX_NAME} caracteres.`);
      return;
    }

    // Nombre/Apellido: permitir letras latinas y espacios, apóstrofe y guión
    const nameRe = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,100}$/;
    if (!nameRe.test(nombre) || !nameRe.test(apellido)) {
      setError('Nombre y apellido deben tener al menos 2 letras y sólo caracteres válidos.');
      return;
    }

    // DNI: 7 u 8 dígitos
    if (!/^\d{7,8}$/.test(dni)) {
      setError('El DNI debe tener 7 u 8 dígitos numéricos.');
      return;
    }

    // Teléfono opcional: 7-15 dígitos
    if (telefono && !/^\d{7,15}$/.test(telefono)) {
      setError('El teléfono debe contener entre 7 y 15 dígitos numéricos.');
      return;
    }

    // clubId válido (existencia en lista)
    if (!Number.isInteger(form.clubId) || form.clubId <= 0 || !clubes.some(c => c.id === form.clubId)) {
      setError('Seleccioná un club válido.');
      return;
    }

    // Categoría whitelist
    if (!(categoria === 'Femenino' || categoria === 'Masculino')) {
      setError('Seleccioná una categoría válida.');
      return;
    }

    // Vencimiento, si existe, debe ser fecha válida y posterior a hoy
    if (form.vencimiento) {
      const d = new Date(form.vencimiento);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (isNaN(d.getTime()) || d <= today) {
        setError('La fecha de vencimiento debe ser válida y posterior a hoy.');
        return;
      }
    }

    // Preparar DTO saneado
    const dto: CreateJugadorFase1Dto = {
      nombre,
      apellido,
      dni,
      clubId: form.clubId,
      categoria,
      telefono: telefono || undefined,
      vencimiento: form.vencimiento || undefined,
      estado: form.estado || 'activo',
    };

    onRegistrar(dto);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        Paso 1: Datos del Jugador
      </h2>
      {error && <div style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nombre"
          placeholder="Nombre *"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="apellido"
          placeholder="Apellido *"
          value={form.apellido}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="dni"
          placeholder="DNI *"
          value={form.dni}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* --- CAMBIO: Input a Select --- */}
        <select
          name="clubId"
          value={form.clubId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value={0} disabled>
            Seleccione Club *
          </option>
          {clubes.map((club) => (
            <option key={club.id} value={club.id}>
              {club.nombre}
            </option>
          ))}
        </select>
        {/* --- FIN DEL CAMBIO --- */}

        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Seleccione Categoría *</option>
          <option value="Femenino">Femenino</option>
          <option value="Masculino">Masculino</option>
        </select>
        <input
          name="telefono"
          placeholder="Teléfono (Opcional)"
          value={form.telefono}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="vencimiento"
          value={form.vencimiento}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Siguiente (Documentación)
        </button>
      </form>
    </div>
  );
};

export default RegistroJugador;