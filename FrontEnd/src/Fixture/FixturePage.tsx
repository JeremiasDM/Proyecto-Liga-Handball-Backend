import { useState } from "react";

export default function FixturePage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const partidos = [
    { id: 1, fecha: "2025-09-10", equipoLocal: "Club Norte", equipoVisitante: "Deportivo Sur", sede: "Villa Unión", categoria: "Masculino" },
    { id: 2, fecha: "2025-09-12", equipoLocal: "Unión del Oeste", equipoVisitante: "Estrella Roja", sede: "San Pedro", categoria: "Femenino" },
    { id: 3, fecha: "2025-09-15", equipoLocal: "Racing Norte", equipoVisitante: "Las Águilas", sede: "Villa María", categoria: "Masculino" },
    { id: 4, fecha: "2025-09-18", equipoLocal: "Fuerza Andina", equipoVisitante: "Horizonte Azul", sede: "Tilcara", categoria: "Femenino" },
    { id: 5, fecha: "2025-09-20", equipoLocal: "Juventud Sur", equipoVisitante: "Club Libertad", sede: "Esquel", categoria: "Masculino" },
  ];

  const filtrados = partidos.filter(p => {
    const texto = `${p.equipoLocal} ${p.equipoVisitante} ${p.sede}`.toLowerCase();
    const coincideBusqueda = texto.includes(busqueda.toLowerCase());
    const coincideFecha = filtroFecha ? p.fecha === filtroFecha : true;
    const coincideCategoria = filtroCategoria ? p.categoria === filtroCategoria : true;
    return coincideBusqueda && coincideFecha && coincideCategoria;
  });

  const agrupados = filtrados.reduce((acc, partido) => {
    const key = `${partido.fecha} - ${partido.categoria}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(partido);
    return acc;
  }, {} as Record<string, typeof partidos>);

  return (
    <div className="ver-container">
      <style>{`
        .ver-container {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 1000px;
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
        .filtros {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .buscador, .fecha-input, .categoria-select {
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .fixture-group {
          margin-bottom: 2rem;
        }
        .fixture-group h3 {
          margin-bottom: 0.75rem;
          color: #1f3c88;
        }
        .fixture-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .fixture-card {
          background: #f0f2f5;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .fixture-card h4 {
          margin: 0 0 0.5rem;
          color: #1f3c88;
        }
        .fixture-card p {
          margin: 0;
          color: #555;
        }
      `}</style>

      <div className="ver-header">
        <h2>Fixture</h2>
      </div>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar equipo o sede..."
          className="buscador"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <input
          type="date"
          className="fecha-input"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
        <select
          className="categoria-select"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      {Object.entries(agrupados).map(([grupo, juegos]) => (
        <div key={grupo} className="fixture-group">
          <h3>{grupo}</h3>
          <div className="fixture-list">
            {juegos.map(p => (
              <div key={p.id} className="fixture-card">
                <h4>{p.equipoLocal} vs {p.equipoVisitante}</h4>
                <p><strong>Fecha:</strong> {p.fecha}</p>
                <p><strong>Sede:</strong> {p.sede}</p>
                <p><strong>Categoría:</strong> {p.categoria}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
