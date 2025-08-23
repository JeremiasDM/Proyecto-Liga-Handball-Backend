import { useState } from "react";

export default function VerClubes() {
  const [busqueda, setBusqueda] = useState("");

  const clubes = [
    { id: 1, nombre: "Club Atlético Norte", localidad: "Villa Unión", escudo: "/escudos/atletico-norte.png", genero: "masculino", referente: "Luis Perez" },
    { id: 2, nombre: "Deportivo Sur", localidad: "La Esperanza", escudo: "/escudos/deportivo-sur.png", genero: "femenino" },
    { id: 3, nombre: "Unión del Oeste", localidad: "San Pedro", escudo: "/escudos/union-oeste.png", genero: "masculino" },
    { id: 4, nombre: "Estrella Roja", localidad: "Santa Clara", escudo: "/escudos/estrella-roja.png", genero: "femenino" },
    { id: 5, nombre: "Racing del Norte", localidad: "Villa María", escudo: "/escudos/racing-norte.png", genero: "masculino" },
    { id: 6, nombre: "Las Águilas", localidad: "Paso de los Libres", escudo: "/escudos/las-aguilas.png", genero: "femenino" },
    { id: 7, nombre: "Fuerza Andina", localidad: "Tilcara", escudo: "/escudos/fuerza-andina.png", genero: "masculino" },
    { id: 8, nombre: "Horizonte Azul", localidad: "Puerto Madryn", escudo: "/escudos/horizonte-azul.png", genero: "femenino" },
    { id: 9, nombre: "Juventud del Sur", localidad: "Esquel", escudo: "/escudos/juventud-sur.png", genero: "masculino" },
    { id: 10, nombre: "Club Libertad", localidad: "Tandil", escudo: "/escudos/libertad.png", genero: "femenino" },
  ];

  const clubesFiltrados = clubes.filter(club =>
    club.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderClubes = (genero: string) => (
    <>
      <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
        {genero === "masculino" ? "Clubes Masculinos" : "Clubes Femeninos"}
      </h3>
      {clubesFiltrados.filter(c => c.genero === genero).map((club) => (
        <div key={club.id} className="club-card">
          <img src={club.escudo} alt={`Escudo de ${club.nombre}`} className="club-escudo" />
          <div>
            <h4>{club.nombre}</h4>
            <p>{club.localidad}</p>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <>
      <style>{`
        .ver-container {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          max-width: 1200px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .ver-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .ver-header img {
          height: 60px;
        }
        .contenido {
          display: flex;
          gap: 2rem;
        }
        .cuadro-clubes {
          flex: 1;
          background: #f0f2f5;
          border-radius: 8px;
          padding: 1rem;
        }
        .club-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: white;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .club-escudo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border-radius: 4px;
          background: #eee;
        }
        .lado-derecho {
          width: 300px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .search-input-container {
          position: relative;
        }
        .buscador {
          width: 100%;
          padding: 0.75rem 2rem 0.75rem 0.75rem;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .search-icon {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>

      <div className="ver-container">
        <div className="ver-header">
          <h2>Clubes</h2>
        </div>
        <div className="contenido">
          <div className="cuadro-clubes">
            {renderClubes("masculino")}
            {renderClubes("femenino")}
          </div>
          <div className="lado-derecho">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar..."
                className="buscador"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
