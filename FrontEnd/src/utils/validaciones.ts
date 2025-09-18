import type { Fixture, Jugador } from "../types/types";

export function validarJugador(nuevo: Jugador, jugadores: Jugador[]): string | null {

  if (jugadores.some(j => j.dni === nuevo.dni && j.id !== nuevo.id)) {
    return "El DNI ingresado ya pertenece a otro jugador.";
  }

  if (nuevo.telefono && jugadores.some(j => j.telefono === nuevo.telefono && j.id !== nuevo.id)) {
    return "El teléfono ingresado ya pertenece a otro jugador.";
  }

  if (
    !nuevo.nombre.trim() ||
    !nuevo.apellido.trim() ||
    !nuevo.dni.trim() ||
    !nuevo.club.trim() ||
    !nuevo.categoria
  ) {
    return "Todos los campos son obligatorios.";
  }

  if (nuevo.nombre.trim().length < 2 || nuevo.apellido.trim().length < 2) {
    return "El nombre y apellido deben tener al menos 2 caracteres.";
  }

  if (!/^\d{7,8}$/.test(nuevo.dni)) {
    return "El DNI debe tener 7 u 8 dígitos numéricos.";
  }

  if (nuevo.telefono && !/^\d{7,15}$/.test(nuevo.telefono)) {
    return "El teléfono debe tener entre 7 y 15 dígitos numéricos.";
  }

  if (nuevo.vencimiento) {
    const fecha = new Date(nuevo.vencimiento);
    if (isNaN(fecha.getTime()) || fecha <= new Date()) {
      return "La fecha de vencimiento debe ser válida y posterior a hoy.";
    }
  }
  return null;
}

import type { Referente } from "../types/types";

export function validarReferente(nuevo: Referente, referentes: Referente[]): string | null {
  if (
    !nuevo.nombre.trim() ||
    !nuevo.apellido.trim() ||
    !nuevo.categoria ||
    !nuevo.dni.trim() ||
    !nuevo.correo.trim() ||
    !nuevo.equipo.trim()
  ) {
    return "Todos los campos son obligatorios.";
  }
  if (!/^[a-zA-Z\s]{2,}$/.test(nuevo.nombre)) {
    return "El nombre debe tener solo letras y al menos 2 caracteres.";
  }
  if (!/^[a-zA-Z\s]{2,}$/.test(nuevo.apellido)) {
    return "El apellido debe tener solo letras y al menos 2 caracteres.";
  }
  if (!/^\d{7,10}$/.test(nuevo.dni)) {
    return "El DNI debe tener entre 7 y 10 números.";
  }
  if (referentes.some(r => r.dni === nuevo.dni && r.id !== nuevo.id)) {
    return "El DNI ya está registrado.";
  }
  if (!/^[^\s@]+@[^\s@]+\.(com|com\.ar|net|org|edu)$/.test(nuevo.correo)) {
    return "Correo inválido.";
  }
  if (!/^[a-zA-Z0-9\s]{2,}$/.test(nuevo.equipo)) {
    return "El equipo debe contener solo letras, números y espacios.";
  }
  return null;
}

import type { Encuentro } from "../types/types";

export function validarFixture(
  fixture: Fixture,
  fixtures: Fixture[]
): string | null {
  // Validar que todos los campos estén completos
  if (!fixture.fecha || !fixture.lugar) {
    return "Completa la fecha y el lugar del fixture.";
  }
  if (!fixture.partidos || fixture.partidos.length < 1) {
    return "El fixture debe tener al menos un partido.";
  }
  const fechaFixture = new Date(fixture.fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  if (fechaFixture < hoy) {
    return "La fecha del fixture no puede ser anterior a hoy.";
  }
  // Validar fechas duplicadas
  if (fixtures.some(f => f.fecha === fixture.fecha)) {
    return "Ya existe un fixture para esa fecha.";
  }
  return null;
}
export function validarPartido(partido: Encuentro, partidos: Encuentro[]): string | null {
  if (!partido.club1 || !partido.club2 || !partido.resultado) {
    return "Completa todos los campos del partido.";
  }
  if (partido.club1 === partido.club2) {
    return "No puedes seleccionar el mismo club para ambos equipos.";
  }
  if (!["A", "B"].includes(partido.grupo)) {
    return "Selecciona un grupo válido.";
  }
  if (
    partido.resultado &&
    !/^\d{1,2}-\d{1,2}$/.test(partido.resultado) &&
    partido.resultado !== "-"
  ) {
    return "El resultado debe tener el formato NN-NN o ser '-' si no se jugó.";
  }
  const partidoDuplicado = partidos.some(
    (p) =>
      p.jornada === partido.jornada &&
      p.grupo === partido.grupo &&
      ((p.club1 === partido.club1 && p.club2 === partido.club2) ||
        (p.club1 === partido.club2 && p.club2 === partido.club1))
  );
  if (partidoDuplicado) {
    return "Este partido ya está registrado para esa jornada y grupo.";
  }
  return null;
}