export type Noticia = {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagenUrl: string;
  fecha: string;
};

export type Encuentro = {
  fecha: Encuentro | undefined;
  jornada: number;
  grupo: string;
  club1: string;
  club2: string;
  resultado: string;
};

export type Fixture = {
  fecha: string;
  lugar: string;
  partidos: Encuentro[];
};


export type Rol = "Presidenta" | "Referente" | "Otro";

export type Jugador = {
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

export type Pago = {
  id: number;
  club: string;
  partidoId: number;
  monto: number;
  comprobante: string;
  comprobanteArchivo?: string;
  fecha: string;
  estado: "pendiente" | "validado" | "rechazado";
};

export type Referente = {
  id: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  equipo: string;
};
