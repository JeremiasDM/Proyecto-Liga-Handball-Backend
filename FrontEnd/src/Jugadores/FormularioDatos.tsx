import React, { useState } from "react";

// Inlined Jugador type
type Jugador = {
  estado?: string;
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  club: string;
  categoria: string;
  telefono?: string;
  vencimiento?: string;
  carnetUrl?: string;
  fichaMedicaUrl?: string;
};

// Inlined validarJugador
function validarJugador(nuevo: Jugador, jugadores: Jugador[]): string | null {
  const trim = (s?: string) => (typeof s === 'string' ? s.trim() : '');
  const nombre = trim(nuevo.nombre);
  const apellido = trim(nuevo.apellido);
  const dni = trim(nuevo.dni);
  const telefono = trim(nuevo.telefono);
  const club = trim(nuevo.club);
  const categoria = trim(nuevo.categoria);

  // Duplicados
  if (jugadores.some(j => j.dni === dni && j.id !== nuevo.id)) {
    return "El DNI ingresado ya pertenece a otro jugador.";
  }
  if (telefono && jugadores.some(j => j.telefono === telefono && j.id !== nuevo.id)) {
    return "El teléfono ingresado ya pertenece a otro jugador.";
  }

  // Requeridos
  if (!nombre || !apellido || !dni || !club || !categoria) {
    return "Todos los campos son obligatorios.";
  }

  // Nombre/apellido: permitir letras latinas + acentos
  const nameRe = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,100}$/;
  if (!nameRe.test(nombre) || !nameRe.test(apellido)) {
    return "El nombre y apellido deben tener al menos 2 letras y usar caracteres válidos.";
  }

  // DNI
  if (!/^\d{7,8}$/.test(dni)) {
    return "El DNI debe tener 7 u 8 dígitos numéricos.";
  }

  // Teléfono
  if (telefono && !/^\d{7,15}$/.test(telefono)) {
    return "El teléfono debe tener entre 7 y 15 dígitos numéricos.";
  }

  // Vencimiento
  if (nuevo.vencimiento) {
    const fecha = new Date(nuevo.vencimiento);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (isNaN(fecha.getTime()) || fecha <= today) {
      return "La fecha de vencimiento debe ser válida y posterior a hoy.";
    }
  }

  // Categoria validación básica (si se usa select en otros componentes esto se normaliza)
  if (!(categoria === 'Femenino' || categoria === 'Masculino')) {
    return "La categoría seleccionada no es válida.";
  }

  return null;
}

type Props = {
  jugador: Jugador;
  onGuardar: (jugador: Jugador) => void;
  onCancelar: () => void;
  jugadores?: Jugador[];
};

const FormularioDatos: React.FC<Props> = ({ jugador, onGuardar, onCancelar, jugadores = [] }) => {
  const [form, setForm] = useState<Jugador>({ ...jugador });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === "nombre" || name === "apellido") && !/^[A-Za-z\s]*$/.test(value)) return;
    if (name === "dni" && !/^\d{0,8}$/.test(value)) return;
    if (name === "telefono" && !/^\d{0,15}$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validarJugador(form, jugadores);
    if (error) {
      alert(error);
      return;
    }
    onGuardar(form);
    onCancelar();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
      <h4>Editar Datos del Jugador</h4>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
      <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
      <input name="club" placeholder="Club" value={form.club} onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" value={form.telefono || ""} onChange={handleChange} />
      <input type="date" name="vencimiento" value={form.vencimiento || ""} onChange={handleChange} />
      <div style={{ marginTop: 10 }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
};

export default FormularioDatos;
