import React, { useState } from "react";
import { styles } from "./ReferentesPage"; // Importar estilos
import type { CSSProperties } from "react"; // Necesario para el nuevo estilo local

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

// --- Props ---
type Props = {
  onGuardar: (dto: CreateReferenteDto) => void;
  clubes: Club[]; // Recibe los clubes como prop
};

const categorias = ["Masculino", "Femenino"];

// --- NUEVO ESTILO DE BOTÓN PRIMARIO MÁS FUERTE ---
const estiloBotonGuardar: CSSProperties = {
    padding: "0.5rem 1rem", // 8px 16px
    borderRadius: "5px",
    backgroundColor: "#1f3c88", // Fondo Azul Fuerte
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: "100%",
    marginTop: "20px",
    transition: 'background-color 0.3s ease',
};


const RegistrarReferente: React.FC<Props> = ({ onGuardar, clubes }) => {
  const [form, setForm] = useState<CreateReferenteDto>({
    nombre: "",
    apellido: "",
    categoria: "Masculino",
    dni: "",
    correo: "",
    clubId: 0, // <-- Cambiado de equipoId a clubId
  });

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
    onGuardar(form);
    
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
          style={estiloBotonGuardar} // ⬅️ APLICANDO EL NUEVO ESTILO LOCAL
        >
          Guardar Referente
        </button>
      </form>
    </div>
  );
};

export default RegistrarReferente;
