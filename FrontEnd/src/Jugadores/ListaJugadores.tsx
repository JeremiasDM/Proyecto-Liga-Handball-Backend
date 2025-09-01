import React, { useEffect, useState } from "react";
import type { Jugador } from "../types/types";

type Props = {
  onEditar?: (jugador: Jugador) => void;
};

const ListaJugadores: React.FC<Props> = ({ onEditar }) => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [rol, setRol] = useState<string | null>(null);

  // Cargar rol desde el token almacenado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // decodificar JWT
        setRol(payload.rol);
      } catch {
        setRol(null);
      }
    }
  }, []);

  // Cargar jugadores desde la API
  useEffect(() => {
    fetch("http://localhost:4000/api/jugadores")
      .then((res) => res.json())
      .then((data) => setJugadores(data))
      .catch((err) => console.error("Error al cargar jugadores:", err));
  }, []);

  // Eliminar jugador
  const eliminarJugador = async (id: number) => {
    if (!window.confirm("¿Seguro que querés eliminar este jugador?")) return;
    try {
      await fetch(`http://localhost:4000/api/jugadores/${id}`, { method: "DELETE" });
      setJugadores(jugadores.filter((j) => j.id !== id));
    } catch (err) {
      console.error("Error eliminando jugador:", err);
    }
  };

  return (
    <div>
      <h3>Lista de Jugadores</h3>
      {jugadores.length === 0 ? (
        <p>No hay jugadores cargados.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr style={{ background: "#1F3C88", color: "#fff" }}>
              <th style={{ padding: "8px" }}>Nombre</th>
              <th style={{ padding: "8px" }}>Apellido</th>
              <th style={{ padding: "8px" }}>Club</th>
              <th style={{ padding: "8px" }}>Categoría</th>
              <th style={{ padding: "8px" }}>Documentos</th>
              {rol === "Presidenta" && <th style={{ padding: "8px" }}>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {jugadores.map((j) => (
              <tr key={j.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "8px" }}>{j.nombre}</td>
                <td style={{ padding: "8px" }}>{j.apellido}</td>
                <td style={{ padding: "8px" }}>{j.club}</td>
                <td style={{ padding: "8px" }}>{j.categoria}</td>
                <td style={{ padding: "8px" }}>
                 
                  <button>Ver Documentos</button>
                </td>
                {rol === "Presidenta" && (
                  <td style={{ padding: "8px" }}>
                    {onEditar && <button onClick={() => onEditar(j)}>Editar</button>}
                    <button onClick={() => eliminarJugador(j.id)}>Eliminar</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaJugadores;
