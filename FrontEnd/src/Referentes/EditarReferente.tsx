import React, { useState } from "react";
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
  referentes: { id: number; dni: string }[]; // lista para comprobacion de duplicados
};

const categorias = ["Masculino", "Femenino"];

const EditarReferente: React.FC<Props> = ({
  referente,
  clubes,
  onActualizar,
  onCancelar,
  error,
  referentes,
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
    // Validación inline (no helpers)
    const nombre = (form.nombre || "").toString().trim();
    const apellido = (form.apellido || "").toString().trim();
    const dni = (form.dni || "").toString().trim();
    const correo = (form.correo || "").toString().trim();
    const clubId = Number(form.clubId);

    const nameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'\-]{2,60}$/;
    if (!nameRe.test(nombre)) {
      alert("Nombre inválido. Use solo letras y espacios (2-60 caracteres).");
      return;
    }
    if (!nameRe.test(apellido)) {
      alert("Apellido inválido. Use solo letras y espacios (2-60 caracteres).");
      return;
    }

    if (!/^\d{7,10}$/.test(dni)) {
      alert("El DNI debe contener entre 7 y 10 números (sin puntos).");
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(correo)) {
      alert("Correo inválido.");
      return;
    }

    if (!clubId || clubId === 0) {
      alert("Debe seleccionar un equipo/claro.");
      return;
    }

    // DNI duplicado (excluyendo el propio referente)
    if (
      referentes &&
      referentes.some((r: { id: number; dni: string }) => r.dni === dni && r.id !== referente.id)
    ) {
      alert("El DNI ya está registrado por otro referente.");
      return;
    }

    // Construir DTO parcial saneado
    const dto: UpdateReferenteDto = {
      nombre,
      apellido,
      categoria: form.categoria,
      dni,
      correo,
      clubId,
    };

    onActualizar(referente.id, dto);
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

        {/* --- CAMBIO CRÍTICO: De Input a Select --- */}
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
              ...styles.botonPrimario,
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
              ...styles.botonSecundario,
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