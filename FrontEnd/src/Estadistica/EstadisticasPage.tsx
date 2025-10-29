import React, { useState, useEffect } from "react";
import TablaEquipos from "./TablaEquipos";

// --- 👇 DEFINICIÓN DE API_URL 👇 ---
const API_URL = "http://localhost:3001"; // O la URL de tu backend en Railway

// --- Definición del tipo Equipo ---
// Asegúrate que coincida con lo que devuelve tu API /clubes
export type Equipo = {
  id: number;
  nombre: string;
  pg: number;
  pe: number;
  pp: number;
  goles: number;
  puntos: number;
  activo?: boolean; // Importante si usas soft delete
  // Otros campos como 'categoria', 'localidad', etc., si los necesitas
};


const EstadisticasPage: React.FC = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Carga inicial de datos ---
  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usamos la constante API_URL definida arriba
      const response = await fetch(`${API_URL}/clubes`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron cargar los equipos.`);
      }
      const data: Equipo[] = await response.json();
      // Asegurar valores por defecto si vienen null
      const equiposConDefaults = data.map(eq => ({
          ...eq,
          pg: eq.pg ?? 0,
          pe: eq.pe ?? 0,
          pp: eq.pp ?? 0,
          goles: eq.goles ?? 0,
          puntos: eq.puntos ?? 0,
      }));
      setEquipos(equiposConDefaults.filter(eq => eq.activo !== false)); // Filtrar inactivos
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // --- Funciones para interactuar con la API ---
  const actualizarEquipoAPI = async (id: number, datosActualizados: Partial<Equipo>) => {
    setError(null);
    try {
        // El backend ya recalcula puntos, no es estrictamente necesario aquí
        // if (datosActualizados.pg !== undefined || datosActualizados.pe !== undefined) { ... }

      // Usamos la constante API_URL
      const response = await fetch(`${API_URL}/clubes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados),
      });
      if (!response.ok) {
          const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo actualizar el equipo.'}`);
      }
        await cargarEquipos(); // Recargar lista
        alert("Estadísticas actualizadas.");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const eliminarEquipoAPI = async (id: number) => {
    if (window.confirm("¿Estás seguro de quitar este equipo de la tabla (marcar como inactivo)?")) {
      setError(null);
      try {
        // Usamos la constante API_URL
        const response = await fetch(`${API_URL}/clubes/${id}`, {
            method: 'DELETE', // Asume que DELETE hace soft delete en tu backend
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo quitar el equipo.'}`);
        }
        await cargarEquipos(); // Recargar lista
        alert("Equipo marcado como inactivo.");
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };


  // --- Renderizado ---
  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "#f4f7f6", // Fondo suave
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#007bff", // Azul primario 🟦
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "2.5em",
          fontWeight: 600,
          borderBottom: "3px solid #007bff",
          display: "inline-block",
          paddingBottom: "5px",
          margin: "0 auto 30px auto", // Centrar el título
          display: "block",
          width: "fit-content"
        }}
      >
        Tabla de Posiciones
      </h2>

      {loading && <p style={{ textAlign: 'center', fontSize: '1.1em', color: '#555' }}>Cargando tabla...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold', background: '#ffebee', padding: '10px', borderRadius: '5px', border: '1px solid red' }}>Error: {error}</p>}

      {!loading && !error && (
        <TablaEquipos
          equipos={equipos}
          onActualizar={actualizarEquipoAPI}
          onEliminar={eliminarEquipoAPI}
        />
      )}
    </div>
  );
};

export default EstadisticasPage;