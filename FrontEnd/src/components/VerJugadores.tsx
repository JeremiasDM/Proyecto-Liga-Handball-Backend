import { useState } from "react";

export default function VerJugadores() {
  const [busqueda, setBusqueda] = useState("");

  const jugadores = [
    { id: 1, nombre: "Lucas", apellido: "Pérez", club: "Club Atlético Norte", ciudad: "Villa Unión", genero: "masculino" },
    { id: 2, nombre: "Martín", apellido: "Gómez", club: "Unión del Oeste", ciudad: "San Pedro", genero: "masculino" },
    { id: 3, nombre: "Federico", apellido: "Lopez", club: "Racing del Norte", ciudad: "Villa María", genero: "masculino" },
    { id: 4, nombre: "Agustín", apellido: "Sosa", club: "Fuerza Andina", ciudad: "Tilcara", genero: "masculino" },
    { id: 5, nombre: "Juan", apellido: "Rodríguez", club: "Juventud del Sur", ciudad: "Esquel", genero: "masculino" },
    { id: 6, nombre: "Nahuel", apellido: "Díaz", club: "Estrella Roja", ciudad: "Santa Clara", genero: "masculino" },
    { id: 7, nombre: "Emiliano", apellido: "Fernández", club: "Deportivo Sur", ciudad: "La Esperanza", genero: "masculino" },
    { id: 8, nombre: "Joaquín", apellido: "Ramos", club: "Las Águilas", ciudad: "Paso de los Libres", genero: "masculino" },
    { id: 9, nombre: "Tomás", apellido: "Cabrera", club: "Horizonte Azul", ciudad: "Puerto Madryn", genero: "masculino" },
    { id: 10, nombre: "Pedro", apellido: "Luna", club: "Club Libertad", ciudad: "Tandil", genero: "masculino" },

    { id: 11, nombre: "María", apellido: "Fernández", club: "Deportivo Sur", ciudad: "La Esperanza", genero: "femenino" },
    { id: 12, nombre: "Camila", apellido: "Gutiérrez", club: "Estrella Roja", ciudad: "Santa Clara", genero: "femenino" },
    { id: 13, nombre: "Julieta", apellido: "López", club: "Las Águilas", ciudad: "Paso de los Libres", genero: "femenino" },
    { id: 14, nombre: "Sofía", apellido: "Ramírez", club: "Horizonte Azul", ciudad: "Puerto Madryn", genero: "femenino" },
    { id: 15, nombre: "Luciana", apellido: "Moreno", club: "Club Libertad", ciudad: "Tandil", genero: "femenino" },
    { id: 16, nombre: "Rocío", apellido: "Castro", club: "Fuerza Andina", ciudad: "Tilcara", genero: "femenino" },
    { id: 17, nombre: "Valentina", apellido: "Arias", club: "Club Atlético Norte", ciudad: "Villa Unión", genero: "femenino" },
    { id: 18, nombre: "Brenda", apellido: "Mendoza", club: "Unión del Oeste", ciudad: "San Pedro", genero: "femenino" },
    { id: 19, nombre: "Paula", apellido: "Silva", club: "Racing del Norte", ciudad: "Villa María", genero: "femenino" },
    { id: 20, nombre: "Agostina", apellido: "Vega", club: "Juventud del Sur", ciudad: "Esquel", genero: "femenino" }
  ];

  const jugadoresFiltrados = jugadores.filter(j =>
    `${j.nombre} ${j.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderJugadores = (genero: string) => (
    <>
      <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
        {genero === "masculino" ? "Jugadores Masculinos" : "Jugadoras Femeninas"}
      </h3>
      {jugadoresFiltrados.filter(j => j.genero === genero).map(j => (
        <div key={j.id} className="jugador-card">
          <div>
            <h4>{j.nombre} {j.apellido}</h4>
            <p><strong>Club:</strong> {j.club}</p>
            <p><strong>Ciudad:</strong> {j.ciudad}</p>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="ver-container">
      <style>{`
        .ver-container {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 1200px;
          width: 100%;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .ver-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .ver-header img { height: 60px; }
        .contenido {
          display: flex;
          gap: 2rem;
        }
        .cuadro-jugadores {
          flex: 1;
          background: #f0f2f5;
          border-radius: 8px;
          padding: 1rem;
        }
        .jugador-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .lado-derecho {
          width: 300px;
        }
        .buscador {
          width: 100%;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
      `}</style>

      <div className="ver-header">
        <h2>Jugadores</h2>
      </div>

      <div className="contenido">
        <div className="cuadro-jugadores">
          {renderJugadores("masculino")}
          {renderJugadores("femenino")}
        </div>
        <div className="lado-derecho">
          <input
            type="text"
            placeholder="Buscar jugador..."
            className="buscador"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
