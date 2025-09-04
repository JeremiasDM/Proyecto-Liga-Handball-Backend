import React, { useState } from "react";
import type { Referente } from "./ReferentesPage";

interface Props {
  onGuardar: (nuevo: Referente) => void;
  existentes?: Referente[];
}

const RegistrarReferente: React.FC<Props> = ({ onGuardar, existentes = [] }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    categoria: "",
    dni: "",
    correo: "",
    equipo: "",
    foto: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);

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
    if (existentes.some((r) => r.dni === formData.dni)) {
      setError("El DNI ya pertenece a otro referente.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.(com|com\.ar|net|org|edu)$/.test(formData.correo)) {
      setError("Correo inválido.");
      return false;
    }
    if (existentes.some((r) => r.correo === formData.correo)) {
      setError("El correo ya pertenece a otro referente.");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarCampos()) return;

    const nuevo: Referente = {
      id: Date.now(),
      nombre: formData.nombre,
      apellido: formData.apellido,
      categoria: formData.categoria as "Masculino" | "Femenino",
      dni: formData.dni,
      correo: formData.correo,
      equipo: formData.equipo,
      fotoUrl: formData.foto ? URL.createObjectURL(formData.foto) : undefined,
    };

    onGuardar(nuevo);

    setFormData({
      nombre: "",
      apellido: "",
      categoria: "",
      dni: "",
      correo: "",
      equipo: "",
      foto: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Registrar Referente</h2>
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <select
        value={formData.categoria}
        onChange={(e) =>
          setFormData({ ...formData, categoria: e.target.value })
        }
        className="w-full p-2 border rounded"
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
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Correo"
        value={formData.correo}
        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Equipo"
        value={formData.equipo}
        onChange={(e) => setFormData({ ...formData, equipo: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) =>
          setFormData({ ...formData, foto: e.target.files?.[0] || null })
        }
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Registrar
      </button>
    </form>
  );
};

export default RegistrarReferente
