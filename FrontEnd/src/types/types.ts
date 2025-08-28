export type Noticia = {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagenUrl: string;
  fecha: string;
};

export type Encuentro = {
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
  nombre: string;
  apellido: string;
  dni: string;
  club: string;
  categoria: string;
};