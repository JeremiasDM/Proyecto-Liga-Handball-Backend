import React, { useState } from "react";

// NOTA: La función 'validarJugador' se omite aquí por brevedad,
// pero debe estar implementada o llamada con la lógica de validación completa.

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
  onActualizar: (id: number, dto: Partial<any>) => void; // Usamos 'any' o un DTO específico para mayor flexibilidad
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
    vencimiento: jugador.vencimiento ? jugador.vencimiento.split('T')[0] : "", // Formatear fecha para input type="date"
    estado: jugador.estado || "activo",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setError(null);

    // Validación de entrada en tiempo real (opcional, pero útil)
    if ((name === "nombre" || name === "apellido") && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "dni" && !/^\d{0,8}$/.test(value)) return;
    if (name === "telefono" && !/^\d{0,15}$/.test(value)) return;
    
    setForm({
      ...form,
      [name]: name === "clubId" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Validación de campos obligatorios
    if (
      !form.nombre.trim() || !form.apellido.trim() || !form.dni.trim() ||
      !form.clubId || !form.categoria
    ) {
      setError("⚠️ Todos los campos marcados con * son obligatorios.");
      return;
    }

    // 2. Validar DNI duplicado (excluyendo el actual)
    if (jugadores.some(j => j.dni === form.dni && j.id !== jugador.id)) {
      setError("El DNI ingresado ya pertenece a otro jugador.");
      return;
    }
    
    // 3. Validar teléfono duplicado (excluyendo el actual, si es que la API lo requiere)
    // if (form.telefono && jugadores.some(j => j.telefono === form.telefono && j.id !== jugador.id)) {
    //   setError("El teléfono ingresado ya pertenece a otro jugador.");
    //   return;
    // }

    // DTO para la API
    const updateDto = {
        ...form,
        // Aseguramos que el vencimiento sea null o string para la API
        vencimiento: form.vencimiento === "" ? null : form.vencimiento
    };

    onActualizar(jugador.id, updateDto);
  };

  return (
    <>
      <style>{`
        /* Definiciones de color y variables */
        :root {
          --primary-blue: #1f3c88;
          --secondary-blue: #007bff;
          --accent-teal: #00bcd4;
          --bg-light-gray: #f9fafb;
          --text-dark-gray: #1f2937;
          --border-color: #e5e7eb;
          --radius: 12px;
          --transition: all 0.3s ease;
          --success-green: #10b981;
          --error-red: #b91c1c;
        }

        /* --- TÍTULO --- */
        .edit-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 2rem; 
          text-align: center;
          color: var(--primary-blue);
          padding-bottom: 0.75rem;
          border-bottom: 3px solid var(--accent-teal);
          grid-column: 1 / -1; 
        }

        /* --- Formulario y GRID --- */
        .edit-form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem 2.5rem;
        }
        
        .form-group-edit {
          display: flex;
          flex-direction: column;
        }

        .form-label-edit {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark-gray);
          margin-bottom: 0.5rem;
        }

        /* --- Estilo de Inputs y Selects --- */
        .form-input-edit, .form-select-edit {
          width: 100%;
          padding: 0.9rem;
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          transition: var(--transition);
          box-sizing: border-box;
          font-size: 1rem;
          background-color: white;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.06);
        }

        .form-input-edit:focus, .form-select-edit:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 4px rgba(31, 60, 136, 0.2);
          background-color: var(--bg-light-gray);
        }
        
        /* Estilo de error */
        .error-message-edit {
          background-color: #fef2f2; 
          border: 1px solid #fca5a5; 
          color: var(--error-red); 
          padding: 1rem;
          border-radius: var(--radius);
          text-align: center; 
          margin-bottom: 1rem;
          grid-column: 1 / -1;
          font-weight: 600;
        }

        /* --- GRUPO DE BOTONES --- */
        .button-group-edit {
          display: flex;
          gap: 15px;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          grid-column: 1 / -1; 
        }

        .btn-action {
          padding: 1rem 1.5rem;
          border: none;
          border-radius: var(--radius);
          cursor: pointer;
          font-weight: 700;
          font-size: 1.05rem;
          transition: var(--transition);
          flex-grow: 1; /* Permite que los botones se estiren */
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .btn-update {
          background-color: var(--success-green);
          color: white;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
        }

        .btn-update:hover {
          background-color: #0c9e6c;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(16, 185, 129, 0.5);
        }

        .btn-cancel {
          background-color: #e5e7eb;
          color: var(--text-dark-gray);
          flex-grow: 0.5; /* El cancelar puede ser más pequeño */
        }

        .btn-cancel:hover {
          background-color: #d1d5db;
        }

        @media (max-width: 768px) {
            .edit-form-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>

      <form onSubmit={handleSubmit} className="p-0">
        <h2 className="edit-title">
          ✏️ Editando a {jugador.nombre} {jugador.apellido}
        </h2>
        {/* Usamos el error-message del padre, o definimos el nuestro */}
        {error && <div className="error-message-edit">{error}</div>} 

        <div className="edit-form-grid">
            
            {/* Nombre */}
            <div className="form-group-edit">
                <label htmlFor="nombre" className="form-label-edit">Nombre *</label>
                <input
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre *"
                    value={form.nombre}
                    onChange={handleChange}
                    className="form-input-edit"
                    required
                />
            </div>
            {/* Apellido */}
            <div className="form-group-edit">
                <label htmlFor="apellido" className="form-label-edit">Apellido *</label>
                <input
                    id="apellido"
                    name="apellido"
                    placeholder="Apellido *"
                    value={form.apellido}
                    onChange={handleChange}
                    className="form-input-edit"
                    required
                />
            </div>
            
            {/* DNI */}
            <div className="form-group-edit">
                <label htmlFor="dni" className="form-label-edit">DNI *</label>
                <input
                    id="dni"
                    name="dni"
                    placeholder="DNI *"
                    value={form.dni}
                    onChange={handleChange}
                    className="form-input-edit"
                    required
                    type="number"
                    maxLength={8}
                />
            </div>

            {/* Club Select */}
            <div className="form-group-edit">
                <label htmlFor="clubId" className="form-label-edit">Club *</label>
                <select
                    id="clubId"
                    name="clubId"
                    value={form.clubId}
                    onChange={handleChange}
                    className="form-select-edit"
                    required
                >
                    <option value={0} disabled>Seleccione Club *</option>
                    {clubes.map((club) => (
                        <option key={club.id} value={club.id}>
                            {club.nombre}
                        </option>
                    ))}
                </select>
            </div>
            
            {/* Categoría Select */}
            <div className="form-group-edit">
                <label htmlFor="categoria" className="form-label-edit">Categoría *</label>
                <select
                    id="categoria"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    className="form-select-edit"
                    required
                >
                    <option value="">Seleccione Categoría *</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                </select>
            </div>

            {/* Teléfono */}
            <div className="form-group-edit">
                <label htmlFor="telefono" className="form-label-edit">Teléfono (Opcional)</label>
                <input
                    id="telefono"
                    name="telefono"
                    placeholder="Teléfono (Opcional)"
                    value={form.telefono}
                    onChange={handleChange}
                    className="form-input-edit"
                    type="number"
                    maxLength={15}
                />
            </div>
            
            {/* Vencimiento */}
            <div className="form-group-edit">
                <label htmlFor="vencimiento" className="form-label-edit">Vencimiento Ficha (Opcional)</label>
                <input
                    id="vencimiento"
                    type="date"
                    name="vencimiento"
                    value={form.vencimiento}
                    onChange={handleChange}
                    className="form-input-edit"
                />
            </div>

            {/* Estado */}
            <div className="form-group-edit">
                <label htmlFor="estado" className="form-label-edit">Estado del Jugador *</label>
                <select
                    id="estado"
                    name="estado"
                    value={form.estado || "activo"}
                    onChange={handleChange}
                    className="form-select-edit"
                    required
                >
                    <option value="activo">Activo (✅)</option>
                    <option value="lesionado">Lesionado (🩹)</option>
                    <option value="sancionado">Sancionado (🚫)</option>
                    <option value="inactivo">Inactivo (💤)</option>
                </select>
            </div>
        </div>

        {/* --- GRUPO DE BOTONES --- */}
        <div className="button-group-edit">
          <button
            type="submit"
            className="btn-action btn-update"
          >
            ✅ Actualizar Datos
          </button>
          <button
            type="button"
            onClick={onCancelar}
            className="btn-action btn-cancel"
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

export default EditarJugador;