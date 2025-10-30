import React, { useState } from "react";
import { styles } from "./ReferentesPage"; // Importar estilos

// --- Definiciones de tipo (ajustadas) ---
interface Club {
  id: number;
  nombre: string;
}

interface CreateReferenteDto {
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  clubId: number;
}

interface Referente {
  id: number;
  dni: string;
}

// --- Props ---
type Props = {
  onGuardar: (dto: CreateReferenteDto) => void;
  clubes: Club[]; // Recibe los clubes como prop
  referentes: Referente[]; // Lista para comprobaciones (p.ej. dni duplicado)
};

const categorias = ["Masculino", "Femenino"];

const RegistrarReferente: React.FC<Props> = ({ onGuardar, clubes, referentes }) => {
  const [form, setForm] = useState<CreateReferenteDto>({
    nombre: "",
    apellido: "",
    categoria: "Masculino",
    dni: "",
    correo: "",
    clubId: 0, // <-- Cambiado de equipoId a clubId
  });

  // NO MÁS useEffect, los clubes vienen por props
  // NO MÁS estado de loading o mensaje, el padre lo maneja

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "clubId" ? Number(value) : value, // <-- Asegurar que clubId es número
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación inline (no helpers) — trim y chequeos básicos
    const nombre = (form.nombre || "").toString().trim();
    const apellido = (form.apellido || "").toString().trim();
    const dni = (form.dni || "").toString().trim();
    const correo = (form.correo || "").toString().trim();
    const clubId = Number(form.clubId);

    // Nombre / Apellido: solo letras, espacios y algunos símbolos comunes, 2..60
    const nameRe = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'\-]{2,60}$/;
    if (!nameRe.test(nombre)) {
      alert("Nombre inválido. Use solo letras y espacios (2-60 caracteres).");
      return;
    }
    if (!nameRe.test(apellido)) {
      alert("Apellido inválido. Use solo letras y espacios (2-60 caracteres).");
      return;
    }

    // DNI: 7 a 10 dígitos
    if (!/^\d{7,10}$/.test(dni)) {
      alert("El DNI debe contener entre 7 y 10 números (sin puntos).");
      return;
    }

    // Correo: comprobación simple
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(correo)) {
      alert("Correo inválido.");
      return;
    }

    // Club seleccionado
    if (!clubId || clubId === 0) {
      alert("Debe seleccionar un equipo/claro.");
      return;
    }

    // DNI duplicado (cliente) — prevenir envío si ya existe
    if (referentes && referentes.some((r: Referente) => r.dni === dni)) {
      alert("El DNI ya está registrado.");
      return;
    }

    // Enviar dto con valores saneados
    onGuardar({
      nombre,
      apellido,
      categoria: form.categoria,
      dni,
      correo,
      clubId,
    });
    
    // Opcional: limpiar formulario (aunque el padre cambiará de vista)
    setForm({
      nombre: "",
      apellido: "",
      categoria: "Masculino",
      dni: "",
      correo: "",
      clubId: 0,
    });
  };

  return (
    <div>
      <h2 style={styles.formTitulo}>Registro de Referente</h2>
      {/* El padre (ReferentesPage) muestra los mensajes de error/éxito */}

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
          {/* <option value="" disabled>— Seleccione Categoría —</option> */}
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

        {/* Equipo (Ahora Club) */}
        <select
          name="clubId" // <-- CAMBIO: de 'equipoId' a 'clubId'
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

        {/* Botón de Enviar */}
        <button
          type="submit"
          style={styles.botonPrimario}
          // disabled={loading} // El padre deshabilita si es necesario
        >
          Guardar Referente
        </button>
      </form>
    </div>
  );
};

export default RegistrarReferente;