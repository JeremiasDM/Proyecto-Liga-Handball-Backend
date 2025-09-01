import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth"; // Hook que nos da el rol y userId

interface ReferenteData {
  id?: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino" | "";
  dni: string;
  correo: string;
  equipo: string;
  foto?: File | null;
}

const EditarReferente: React.FC<{ referenteId: number }> = ({ referenteId }) => {
  const { user } = useAuth(); // { rol: "Presidenta" | "Referente" | "Usuario", id: string }
  const [formData, setFormData] = useState<ReferenteData>({
    nombre: "",
    apellido: "",
    categoria: "",
    dni: "",
    correo: "",
    equipo: "",
    foto: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // --- Validaciones ---
  const validarCampos = (): boolean => {
    if (!/^[a-zA-Z\s]{2,}$/.test(formData.nombre)) {
      setError("El nombre debe tener solo letras y al menos 2 caracteres.");
      return false;
    }
    if (!/^[a-zA-Z\s]{2,}$/.test(formData.apellido)) {
      setError("El apellido debe tener solo letras y al menos 2 caracteres.");
      return false;
    }
    if (!formData.categoria) {
      setError("Debe seleccionar una categoría.");
      return false;
    }
    if (!/^\d{7,10}$/.test(formData.dni)) {
      setError("El DNI debe tener entre 7 y 10 números.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.(com|com\.ar|net|org|edu)$/.test(formData.correo)) {
      setError("Correo inválido.");
      return false;
    }
    if (!/^[a-zA-Z0-9\s]{2,}$/.test(formData.equipo)) {
      setError("El equipo debe contener solo letras, números y espacios.");
      return false;
    }
    if (formData.foto && formData.foto.size > 5 * 1024 * 1024) {
      setError("La foto no debe superar los 5MB.");
      return false;
    }
    setError(null);
    return true;
  };

  // --- Cargar datos existentes ---
  useEffect(() => {
    const fetchReferente = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/referentes/${referenteId}`);
        setFormData({
          nombre: data.nombre,
          apellido: data.apellido,
          categoria: data.categoria,
          dni: data.dni,
          correo: data.correo,
          equipo: data.equipo,
          foto: null, // la foto se carga aparte (Mongo)
        });
      } catch (err) {
        setError("Error al cargar el referente.");
      }
    };
    fetchReferente();
  }, [referenteId]);

  // --- Handle Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔒 Roles
    if (user.rol !== "Presidenta" && user.rol !== "Referente") {
      setError("No tienes permisos para editar referentes.");
      return;
    }

    // Si es Referente, solo puede editar su propia ficha
    if (user.rol === "Referente" && user.id !== referenteId.toString()) {
      setError("Solo puedes editar tu propia ficha.");
      return;
    }

    if (!validarCampos()) return;

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value as string | Blob);
      });

      await axios.put(`http://localhost:4000/api/referentes/${referenteId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Referente actualizado con éxito.");
    } catch (err) {
      setError("Error al actualizar el referente.");
    }
  };

  return (
    <div style={{ padding: "1rem", background: "#eef2f5", borderRadius: 8 }}>
      <h2>Editar Referente</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
        />
        <select
          value={formData.categoria}
          onChange={(e) =>
            setFormData({ ...formData, categoria: e.target.value as "Masculino" | "Femenino" })
          }
        >
          <option value="">Seleccione categoría</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
        <input
          type="text"
          placeholder="DNI"
          value={formData.dni}
          onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={formData.correo}
          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Equipo"
          value={formData.equipo}
          onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setFormData({ ...formData, foto: e.target.files?.[0] || null })}
        />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarReferente;
