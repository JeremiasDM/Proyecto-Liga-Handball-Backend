import React, { useState } from "react";
import type { CSSProperties } from "react";
import { styles } from "./ReferentesPage"; // Importar estilos

// --- Definiciones de tipo (ajustadas) ---
interface Club {
  id: number;
  nombre: string;
}

interface Referente {
  id: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  clubId: number;
  club: Club;
}

type UpdateReferenteDto = Partial<{
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  clubId: number;
}>;

// --- Props ---
type Props = {
  referente: Referente;
  clubes: Club[]; // <-- Recibe clubes
  onActualizar: (id: number, dto: UpdateReferenteDto) => void;
  onCancelar: () => void;
  error: string | null; // <-- Recibe error del padre
};

const categorias = ["Masculino", "Femenino"];

// =========================================================
// 🎨 NUEVOS ESTILOS PARA BOTONES DE ACCIÓN 🎨
// =========================================================

// Base común para los botones de acción
const estiloBotonBase: CSSProperties = {
  padding: "0.5rem 1rem", // Relleno interno vertical y horizontal
  borderRadius: "5px", // Bordes ligeramente redondeados
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "16px",
  transition: 'background-color 0.3s ease, transform 0.1s ease',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

// Estilo para el botón de Actualizar (Acción Primaria - Azul Fuerte)
const estiloBotonActualizar: CSSProperties = {
  ...estiloBotonBase,
  backgroundColor: "#1f3c88", // Fondo Azul Fuerte
};

// Estilo para el botón de Cancelar (Acción Secundaria - ROJO)
const estiloBotonCancelar: CSSProperties = {
  ...estiloBotonBase,
  backgroundColor: "#ef4444", // ⬅️ CAMBIO: Rojo para Cancelar
};

// =========================================================

const EditarReferente: React.FC<Props> = ({
  referente,
  clubes,
  onActualizar,
  onCancelar,
  error,
}) => {
  // --- CAMBIO: El estado se inicializa con los datos del referente, incluyendo clubId
  const [form, setForm] = useState<UpdateReferenteDto>({
    nombre: referente.nombre,
    apellido: referente.apellido,
    categoria: referente.categoria,
    dni: referente.dni,
    correo: referente.correo,
    clubId: referente.clubId, // <-- Usamos clubId
  });

  // NO MÁS mensajes locales, el padre los maneja

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "clubId" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // NO MÁS validación aquí, el padre la hace
    onActualizar(referente.id, form);
  };

  return (
    <div style={styles.cardFormulario}>
      <h2 style={styles.formTitulo}>Editar Referente</h2>

      {/* Mensaje de Error (del padre) */}
      {error && (
        <div
          style={{
            ...styles.mensajeAlerta,
            ...styles.mensajeError,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Agrupación Nombre y Apellido */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{ ...styles.inputOscuro, flex: 1, marginBottom: 0 }}
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            style={{ ...styles.inputOscuro, flex: 1, marginBottom: 0 }}
            required
          />
        </div>

        {/* Categoria */}
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          style={styles.inputOscuro}
          required
        >
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* DNI */}
        <input
          name="dni"
          type="text"
          placeholder="DNI (sin puntos)"
          value={form.dni}
          onChange={handleChange}
          style={styles.inputOscuro}
          required
        />

        {/* Correo */}
        <input
          name="correo"
          type="email"
          placeholder="Correo Electrónico"
          value={form.correo}
          onChange={handleChange}
          style={styles.inputOscuro}
          required
        />

        {/* Selección de Club */}
        <select
          name="clubId"
          value={form.clubId}
          onChange={handleChange}
          style={styles.inputOscuro}
          required
        >
          <option value={0} disabled>
            — Seleccione Equipo —
          </option>
          {clubes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        {/* Botones de Acción */}
        <div style={{ display: "flex", gap: "16px", marginTop: "30px" }}>
          <button
            type="submit"
            style={{
              ...estiloBotonActualizar, // Botón Principal (Azul Fuerte)
              width: "50%",
              marginTop: 0,
            }}
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={onCancelar}
            style={{
              ...estiloBotonCancelar, // Botón Secundario (Rojo)
              width: "50%",
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarReferente;
