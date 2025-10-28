import React, { useState } from "react";
// (Pega la función 'validarJugador' aquí)
// ...

// --- Tipos ---
interface Club {
  id: number;
  nombre: string;
}
interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  clubId: number;
  club: Club;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  estado?: string;
  // ...
}

type Props = {
  jugador: Jugador;
  onActualizar: (id: number, dto: Partial<Jugador>) => void;
  onCancelar: () => void;
  jugadores: Jugador[]; // Lista completa para validación
  clubes: Club[]; // Lista de clubes para el dropdown
};

const EditarJugador: React.FC<Props> = ({
  jugador,
  onActualizar,
  onCancelar,
  jugadores,
  clubes,
}) => {
  // Inicializamos el formulario con los datos del jugador
  const [form, setForm] = useState({
    nombre: jugador.nombre,
    apellido: jugador.apellido,
    dni: jugador.dni,
    clubId: jugador.clubId, // <-- CAMBIO
    categoria: jugador.categoria,
    telefono: jugador.telefono || "",
    vencimiento: jugador.vencimiento || "",
    estado: jugador.estado || "activo",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setError(null);
    setForm({
      ...form,
      [name]: name === "clubId" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Inline validations
    const trim = (s?: string) => (typeof s === 'string' ? s.trim() : '');
    const nombre = trim(form.nombre as string);
    const apellido = trim(form.apellido as string);
    const dni = trim(form.dni as string);
    const telefono = trim(form.telefono as string);
    const categoria = trim(form.categoria as string);
    const estado = trim(form.estado as string);

    if (!nombre || !apellido || !dni || !form.clubId || !categoria) {
      setError("Todos los campos marcados con * son obligatorios.");
      return;
    }

    // Name rules
    const MAX_NAME = 100;
    const nameRe = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,100}$/;
    if (!nameRe.test(nombre) || !nameRe.test(apellido)) {
      setError('Nombre y apellido inválidos.');
      return;
    }
    if (nombre.length > MAX_NAME || apellido.length > MAX_NAME) {
      setError(`Nombre y apellido deben tener como máximo ${MAX_NAME} caracteres.`);
      return;
    }

    // DNI
    if (!/^\d{7,8}$/.test(dni)) {
      setError('El DNI debe tener 7 u 8 dígitos numéricos.');
      return;
    }

    // DNI duplicado
    if (jugadores.some(j => j.dni === dni && j.id !== jugador.id)) {
      setError('El DNI ingresado ya pertenece a otro jugador.');
      return;
    }

    // Telefono
    if (telefono && !/^\d{7,15}$/.test(telefono)) {
      setError('El teléfono debe contener entre 7 y 15 dígitos numéricos.');
      return;
    }

    // clubId exists
    if (!Number.isInteger(form.clubId) || form.clubId <= 0 || !clubes.some(c => c.id === form.clubId)) {
      setError('Seleccioná un club válido.');
      return;
    }

    // categoria/estado whitelist
    if (!(categoria === 'Femenino' || categoria === 'Masculino')) {
      setError('Seleccioná una categoría válida.');
      return;
    }
    if (!(estado === 'activo' || estado === 'lesionado' || estado === 'sancionado' || estado === 'inactivo')) {
      setError('Seleccioná un estado válido.');
      return;
    }

    // vencimiento
    if (form.vencimiento) {
      const d = new Date(form.vencimiento);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (isNaN(d.getTime()) || d <= today) {
        setError('La fecha de vencimiento debe ser válida y posterior a hoy.');
        return;
      }
    }

    onActualizar(jugador.id, {
      nombre,
      apellido,
      dni,
      clubId: form.clubId,
      categoria,
      telefono: telefono || undefined,
      vencimiento: form.vencimiento || undefined,
      estado: estado || 'activo',
    });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Editar Jugador</h2>
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
        <label className="block font-semibold">Estado del jugador</label>
        <select
          name="estado"
          value={form.estado || "activo"}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="activo">Activo</option>
          <option value="lesionado">Lesionado</option>
          <option value="sancionado">Sancionado</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarJugador;