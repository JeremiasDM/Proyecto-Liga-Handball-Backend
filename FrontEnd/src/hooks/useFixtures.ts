import { useState, useEffect } from "react";
import type { Fixture } from "../types/types";

export function useFixtures() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("fixtures");
    if (data) setFixtures(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("fixtures", JSON.stringify(fixtures));
  }, [fixtures]);

  const agregar = (nuevo: Fixture) => setFixtures([...fixtures, nuevo]);
  const actualizar = (actualizado: Fixture, index: number) => {
    const nuevas = [...fixtures];
    nuevas[index] = actualizado;
    setFixtures(nuevas);
  };
  const eliminar = (index: number) => {
    const nuevas = [...fixtures];
    nuevas.splice(index, 1);
    setFixtures(nuevas);
  };

  return { fixtures, agregar, actualizar, eliminar };
}
