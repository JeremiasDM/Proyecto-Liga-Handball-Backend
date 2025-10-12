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
  estado: string;
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


export type Referente = {
  id: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  equipo: string;
};

export type TipoPago = "cuota" | "arbitraje" | "multa" | "otro";

export type Pago = {
  id: number;
  tipo: TipoPago;
  club: string;
  monto: number;
  comprobante: string;
  comprobanteArchivo?: string;
  fecha: string;
  estado: "pendiente" | "pagado" | "validado" | "invalido";
  categoria?: "Masculino" | "Femenino" | "Ambos";
  partidoId?: number;
  cantidadJugadores?: number;
  motivo?: string; 
  sancion?: string;
};
