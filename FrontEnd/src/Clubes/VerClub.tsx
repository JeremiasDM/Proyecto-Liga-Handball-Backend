import { useState } from "react";

export default function VerClubes() {
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("nombre-asc");
  const [darkMode, setDarkMode] = useState(false);

  const clubes = [
    { id: 1, nombre: "Club Capilla del Monte", localidad: "Capilla del Monte", escudo: "./Escudos Clubes/Club_Capilla_Del_Monte.jpeg", genero: "masculino" },
    { id: 1, nombre: "Club Capilla del Monte", localidad: "Capilla del Monte", escudo: "./Escudos Clubes/Club_Capilla_Del_Monte.jpeg", genero: "femenino" },
    { id: 2, nombre: "Club Huesta Grande", localidad: "Huerta Grande", escudo: "./Escudos Clubes/Club_Huerta_Grande.jpeg", genero: "masculino" },
    { id: 2, nombre: "Club Huesta Grande", localidad: "Huerta Grande", escudo: "./Escudos Clubes/Club_Huerta_Grande.jpeg", genero: "femenino" },
    { id: 3, nombre: "Unión del Oeste", localidad: "San Pedro", escudo: "/escudos/union-oeste.png", genero: "masculino" },
    { id: 4, nombre: "Estrella Roja", localidad: "Santa Clara", escudo: "/escudos/estrella-roja.png", genero: "femenino" },
    { id: 5, nombre: "Racing del Norte", localidad: "Villa María", escudo: "/escudos/racing-norte.png", genero: "masculino" },
    { id: 6, nombre: "Las Águilas", localidad: "Paso de los Libres", escudo: "/escudos/las-aguilas.png", genero: "femenino" },
    { id: 7, nombre: "Fuerza Andina", localidad: "Tilcara", escudo: "/escudos/fuerza-andina.png", genero: "masculino" },
    { id: 8, nombre: "Horizonte Azul", localidad: "Puerto Madryn", escudo: "/escudos/horizonte-azul.png", genero: "femenino" },
    { id: 9, nombre: "Juventud del Sur", localidad: "Esquel", escudo: "/escudos/juventud-sur.png", genero: "masculino" },
    { id: 10, nombre: "Club Libertad", localidad: "Tandil", escudo: "/escudos/libertad.png", genero: "femenino" },
  ];

  const ordenarClubes = (arr) => {
    return [...arr].sort((a, b) => {
      if (orden === "nombre-asc") {
        return a.nombre.localeCompare(b.nombre);
      }
      if (orden === "nombre-desc") {
        return b.nombre.localeCompare(a.nombre);
      }
      if (orden === "localidad-asc") {
        return a.localidad.localeCompare(b.localidad);
      }
      if (orden === "localidad-desc") {
        return b.localidad.localeCompare(a.localidad);
      }
      return 0;
    });
  };

  const clubesFiltrados = ordenarClubes(clubes).filter(club =>
    club.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderClubes = (genero) => (
    <>
      <h3>
        {genero === "masculino" ? "Clubes Masculinos" : "Clubes Femeninos"}
      </h3>
      {clubesFiltrados
        .filter(c => c.genero === genero)
        .slice(0, 4)
        .map((club) => (
          <div key={club.id} className="club-card">
            <img src={club.escudo} alt={`Escudo de ${club.nombre}`} className="club-escudo" />
            <div>
              <h4>{club.nombre}</h4>
              <p>{club.localidad}</p>
            </div>
          </div>
        ))}
        {clubesFiltrados.filter(c => c.genero === genero).length === 0 && (
          <p className="no-results">No se encontraron clubes.</p>
        )}
    </>
  );

  return (
    <>
      <style>{`
        /* --- Definición de Variables CSS y Mejora de Paleta --- */
        :root {
          --color-primario: #007bff;
          --color-texto-principal: #1a202c;
          --color-texto-secundario: #7f8c8d;
          --color-fondo: #f0f2f5;
          --color-card-fondo: #ffffff;
          --sombra-suave: 0 4px 12px rgba(0, 0, 0, 0.08);
          --sombra-elevada: 0 8px 20px rgba(0, 0, 0, 0.15);
          --transicion-rapida: 0.2s ease-in-out;
        }

        /* --- Estilos para Modo Oscuro --- */
        body.dark-mode {
          --color-primario: #60a5fa;
          --color-texto-principal: #e0e0e0;
          --color-texto-secundario: #b3b3b3;
          --color-fondo: #1a202c;
          --color-card-fondo: #2d3748;
          --sombra-suave: 0 4px 12px rgba(0, 0, 0, 0.2);
          --sombra-elevada: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        /* --- Importación de Fuente (Mejora de Tipografía) --- */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        /* --- Estilos Generales y del Contenedor Principal --- */
        body {
          background-color: var(--color-fondo);
          margin: 0;
          padding: 0;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          transition: background-color var(--transicion-rapida);
        }

        .ver-container {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 2rem;
          width: 100%;
          max-width: 1200px;
          margin: 2rem auto;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1),
                      inset 0 0 10px rgba(255, 255, 255, 0.2);
          transition: box-shadow var(--transicion-rapida), background-color var(--transicion-rapida);
        }
        body.dark-mode .ver-container {
          background: rgba(45, 55, 72, 0.7);
          border-color: rgba(45, 55, 72, 0.3);
          backdrop-filter: blur(15px);
        }
        .ver-container:hover {
          box-shadow: 0 12px 48px 0 rgba(0, 0, 0, 0.15),
                      0 20px 60px 0 rgba(0, 0, 0, 0.1);
        }

        /* --- Estilos del Encabezado y Títulos --- */
        .ver-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .ver-header h2 {
          font-size: 2.5rem;
          color: var(--color-texto-principal);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 700;
          transition: letter-spacing var(--transicion-rapida);
          border-bottom: none;
          background-image: linear-gradient(to right, var(--color-primario), #7f8c8d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding-bottom: 0.5rem;
        }
        .ver-header h2:hover {
          letter-spacing: 3px;
        }
        
        h3 {
          color: var(--color-texto-principal);
          font-size: 1.6rem;
          text-transform: capitalize;
          border-left: 5px solid var(--color-primario);
          padding-left: 10px;
          margin-top: 2rem;
          margin-bottom: 1rem;
          transition: border-color var(--transicion-rapida);
        }

        /* --- Estilos del Contenido y Disposición Grid --- */
        .contenido {
          display: grid;
          grid-template-columns: 1fr 350px 1fr;
          gap: 2rem;
        }
        
        .cuadro-clubes-contenedor {
          display: contents;
        }

        .cuadro-clubes {
          background: transparent;
          padding: 0;
        }

        .no-results {
          color: var(--color-texto-secundario);
          text-align: center;
          grid-column: span 3;
          margin-top: 2rem;
        }

        /* --- Estilos de las Tarjetas de Clubes (Card) --- */
        .club-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: var(--color-card-fondo);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          margin-bottom: 1.25rem;
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.05),
            0 10px 15px rgba(0, 0, 0, 0.08);
          transition: transform var(--transicion-rapida), box-shadow var(--transicion-rapida);
          cursor: pointer;
          border: none;
          position: relative;
          overflow: hidden;
        }
        
        .club-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid var(--color-primario);
          border-radius: 12px;
          transform: scale(1.05);
          opacity: 0;
          transition: transform var(--transicion-rapida), opacity var(--transicion-rapida);
          z-index: -1;
        }

        .club-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 8px 12px rgba(0, 0, 0, 0.1),
            0 20px 25px rgba(0, 0, 0, 0.15);
        }
        
        .club-card:hover::before {
          transform: scale(1);
          opacity: 1;
        }
        
        .club-card h4 {
          color: var(--color-texto-principal);
          margin: 0;
          font-weight: 600;
        }
        .club-card p {
          color: var(--color-texto-secundario);
          font-size: 0.9rem;
          margin: 0;
        }
        .club-escudo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border-radius: 50%;
          background: #eee;
          padding: 5px;
          border: 2px solid var(--color-primario);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        
        .club-card:hover .club-escudo {
          transform: rotate(360deg);
          box-shadow: 0 0 15px 5px var(--color-primario);
        }
        
        /* --- Estilos del Buscador y Controles --- */
        .controles-superiores {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          gap: 1rem;
        }
        .buscador-central {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 2rem;
          background: var(--color-card-fondo);
          border-radius: 12px;
          box-shadow: var(--sombra-suave);
        }
        .search-input-container {
          position: relative;
          width: 100%;
        }
        .buscador, .selector, .dark-mode-toggle {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: 25px;
          border: 1px solid #ccc;
          font-size: 1rem;
          transition: all var(--transicion-rapida);
          background-color: var(--color-card-fondo);
          color: var(--color-texto-principal);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        .buscador {
          padding: 0.8rem 2.5rem 0.8rem 1.25rem;
        }
        .buscador:focus, .selector:focus, .dark-mode-toggle:focus {
          outline: none;
          border-color: var(--color-primario);
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
        }
        body.dark-mode .buscador, 
        body.dark-mode .selector, 
        body.dark-mode .dark-mode-toggle {
          border-color: #4a5568;
        }
        body.dark-mode .buscador:focus, 
        body.dark-mode .selector:focus, 
        body.dark-mode .dark-mode-toggle:focus {
          border-color: var(--color-primario);
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
        }

        .search-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-texto-secundario);
          pointer-events: none;
        }
        .clear-search-btn {
          position: absolute;
          right: 3rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--color-texto-secundario);
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1;
        }
        
        /* --- Estilos Responsivos --- */
        @media (max-width: 1024px) {
          .contenido {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
          .buscador-central {
            grid-column: span 2;
            order: -1;
            padding: 1.5rem;
          }
          .ver-header h2 {
            font-size: 2rem;
            letter-spacing: 1.5px;
          }
          .controles-superiores {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 768px) {
          .ver-container {
            padding: 1rem;
            margin: 1rem;
          }
          .ver-header h2 {
            font-size: 1.8rem;
          }
          .contenido {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .buscador-central {
            grid-column: span 1;
          }
          .club-card {
            flex-direction: column;
            text-align: center;
            padding: 1rem;
            gap: 0.75rem;
          }
          .club-card img {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>

      <div className={`ver-container ${darkMode ? 'dark-mode' : ''}`}>
        <div className="ver-header">
          <h2>Clubes</h2>
          <div className="controles-superiores">
            <select className="selector" value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="nombre-asc">Nombre (A-Z)</option>
              <option value="nombre-desc">Nombre (Z-A)</option>
              <option value="localidad-asc">Localidad (A-Z)</option>
              <option value="localidad-desc">Localidad (Z-A)</option>
            </select>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="dark-mode-toggle"
            >
              {darkMode ? 'Modo Día' : 'Modo Noche'}
            </button>
          </div>
        </div>
        <div className="contenido">
          <div className="cuadro-clubes">
            {renderClubes("masculino")}
          </div>
          <div className="buscador-central">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar..."
                className="buscador"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                aria-label="Buscar club por nombre"
              />
              {busqueda && (
                <button
                  className="clear-search-btn"
                  onClick={() => setBusqueda("")}
                  aria-label="Limpiar búsqueda"
                >
                  &times;
                </button>
              )}
              <span className="search-icon">🔍</span>
            </div>
          </div>
          <div className="cuadro-clubes">
            {renderClubes("femenino")}
          </div>
        </div>
      </div>
    </>
  );
}
