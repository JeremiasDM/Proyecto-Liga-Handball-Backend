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

// --- Props ---
type Props = {
  onGuardar: (dto: CreateReferenteDto) => void;
  clubes: Club[]; // Recibe los clubes como prop
};

const categorias = ["Masculino", "Femenino"];

const RegistrarReferente: React.FC<Props> = ({ onGuardar, clubes }) => {
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
    // NO MÁS validación aquí, el padre la hace
    // NO MÁS fetch aquí, el padre lo hace
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