import React, { useState } from "react";
import type { Referente } from "./ReferentesPage";

interface Props {
  referente: Referente;
  onActualizar: (editado: Referente) => void;
  onCancelar: () => void;
  existentes?: Referente[];
}

const EditarReferente: React.FC<Props> = ({
  referente,
  onActualizar,
  onCancelar,
  existentes = [],
}) => {
  const [formData, setFormData] = useState({
    nombre: referente.nombre,
    apellido: referente.apellido,
    categoria: referente.categoria,
    dni: referente.dni,
    correo: referente.correo,
    equipo: referente.equipo,
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
    if (
      existentes.some(
        (r) => r.dni === formData.dni && r.id !== referente.id
      )
    ) {
      setError("El DNI ya pertenece a otro referente.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.(com|com\.ar|net|org|edu)$/.test(formData.correo)) {
      setError("Correo inválido.");
      return false;
    }
    if (
      existentes.some(
        (r) => r.correo === formData.correo && r.id !== referente.id
      )
    ) {
      setError("El correo ya pertenece a otro referente.");
      return false;
    }
    if (!/^[a-zA-Z0-9\s]{2,}$/.test(formData.equipo)) {
      setError("El equipo debe contener solo letras, números y espacios.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarCampos()) return;

    const actualizado: Referente = {
      ...referente,
      nombre: formData.nombre,
      apellido: formData.apellido,
      categoria: formData.categoria as "Masculino" | "Femenino",
      dni: formData.dni,
      correo: formData.correo,
      equipo: formData.equipo,
    };

    onActualizar(actualizado);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">Editar Referente</h2>
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

      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditarReferente;
