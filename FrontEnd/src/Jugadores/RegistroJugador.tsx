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

    // Validación simple de campos (la validación de DNI se hará en el backend)
    if (
      !form.nombre || !form.apellido || !form.dni ||
      !form.clubId || !form.categoria
    ) {
      setError("Todos los campos marcados con * son obligatorios.");
      return;
    }
    
    // (Puedes añadir validación de formato de DNI/Teléfono aquí si lo deseas)

    onRegistrar(form); // Pasa el DTO de Fase 1 al padre
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