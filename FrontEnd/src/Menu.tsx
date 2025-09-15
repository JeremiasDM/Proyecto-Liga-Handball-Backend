import { useEffect, useState } from "react";
import Autoridades from "./Autoridades/Autoridades";
import VerClubes from "./Clubes/VerClub";
import VerJugadores from "./Jugadores/VerJugadores";
import ReferentesPage from "./Referentes/ReferentesPage";
import FixturePage from "./Fixture/FixturePage";
import Historia from "./Historia/Historia";
import Estadistica from "./Estadistica/Estadistica";
import NoticiasPage from "./Noticias/NoticiasPage";
import Reglamento from "./Reglamento/Reglamento";
// Importa los íconos de forma adecuada. Por ejemplo, si usas React-Icons:
// import { FaHandball, FaBuilding } from 'react-icons/fa'; // Asegúrate de instalar react-icons

export default function App() {
  const [vista, setVista] = useState(
    () => (localStorage.getItem("vista") as any) || "inicio"
  );

  const [openHandball, setOpenHandball] = useState(false);
  const [openInstitucional, setOpenInstitucional] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("vista", vista);
  }, [vista]);

  useEffect(() => {
    const close = () => {
      setOpenHandball(false);
      setOpenInstitucional(false);
      // setIsMobileMenuOpen(false); // Podrías querer cerrar el menú móvil al hacer clic fuera
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const stop = (e) => e.stopPropagation();

  const handleLinkClick = (newVista) => {
    setVista(newVista);
    setOpenHandball(false);
    setOpenInstitucional(false);
    setIsMobileMenuOpen(false); // Cierra el menú móvil al seleccionar una opción
  };

  const isNavItemActive = (item) => {
    if (item === "handball" && (vista === "clubes" || vista === "jugadores" || vista === "estadisticas" || vista === "fixture" || vista === "reglamento")) {
      return true;
    }
    if (item === "institucional" && (vista === "autoridades" || vista === "referentes" || vista === "historia")) {
      return true;
    }
    return vista === item;
  };

  return (
    <>
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root {
    font-family: 'Inter', sans-serif;
    background-color: #f0f2f5;
    color: #333;
    height: 100%;
    width: 100%;
  }
  .app { display: flex; flex-direction: column; min-height: 100vh; }
  
  /* ===== HEADER Y NAVEGACIÓN ===== */
  header {
    background-color: #1f3c88;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: bold;
    font-size: 1.25rem;
    cursor: pointer;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.02);
  }

  .logo img { 
    width: 40px; 
    height: 40px; 
    border-radius: 50%;
  }
  
  nav {
    display: flex;
    gap: 2rem;
    align-items: center;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .nav-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .nav-btn:hover {
    color: #a0c4ff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  .nav-btn:active {
    transform: scale(0.95);
  }

  .nav-btn.active-nav-btn {
    color: white;
  }

  /* Subrayado con color de acento y animación */
  .nav-btn.active-nav-btn::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100%;
    height: 4px;
    background-color: #ffffffff;
    transform: translateX(-50%);
    transition: width 0.3s ease, transform 0.3s ease;
  }
  
  .nav-btn:not(.active-nav-btn)::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease, transform 0.3s ease;
    transform: translateX(-50%);
  }

  .nav-btn:hover:not(.active-nav-btn)::after {
    width: 100%;
  }

  /* Rotar el ícono del menú desplegable */
  .nav-btn span[role="img"] {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .nav-btn[aria-expanded="true"] span[role="img"] {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    top: 3.5rem;
    left: 0;
    background: white;
    color: #1f3c88;
    min-width: 200px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 100;
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    overflow: hidden;

    animation: dropdownIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    transform-origin: top center;
  }

  @keyframes dropdownIn {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .dropdown-btn {
    background: none;
    border: none;
    color: #1f3c88;
    text-align: left;
    padding: 1rem 1.25rem;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s ease, transform 0.1s ease;
  }

  .dropdown-btn:hover {
    background: #e9ecef;
  }

  .dropdown-btn:active {
    transform: scale(0.98);
  }
  
  /* ===== LAYOUT GENERAL Y COMPONENTES DE VISTA ===== */
  main {
    flex: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
  }
  
  footer {
    background: #1f3c88;
    color: white;
    text-align: center;
    padding: 1rem;
    font-size: 0.9rem;
  }
  
  .footer-contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.5rem;
    font-size: 0.85rem;
  }
  
  .footer-contact img {
    height: 20px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
  
  .footer-contact a {
    color: white;
    text-decoration: underline;
  }
  
  .grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    width: 100%;
    max-width: 1500px;
  }
  
  .card {
    background: white;
    border-radius: 12px;
    border: 2px solid transparent;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    border-color: #1f3c88;
  }
  
  .card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  
  .card:hover img {
    transform: scale(1.05);
  }
  
  .card-content { padding: 1.5rem; }
  
  .card-content h2 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #1f3c88;
  }
  
  .card-content p { font-size: 0.95rem; color: #555; }
  
  .sponsors {
    grid-column: 1 / -1;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  }
  
  .sponsors h2 { margin-bottom: 1rem; color: #1f3c88; }
  
  .sponsor-logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }
  
  .sponsor-logos img {
    height: 40px;
    object-fit: contain;
    opacity: 0.8;
    transition: opacity 0.3s;
  }
  
  .sponsor-logos img:hover { opacity: 1; }

  .hamburger-menu {
    display: none;
    font-size: 1.5rem;
    cursor: pointer;
    border: none;
    background: none;
    color: white;
  }
  
  /* Responsive para móviles */
  @media (max-width: 768px) {
    header {
      padding: 1rem;
    }
    nav {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 70px;
      right: 0;
      background: #1f3c88;
      width: 100%;
      padding: 1rem 0;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      animation: slideDown 0.3s ease-in-out forwards;
    }

    @keyframes slideDown {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  
    .nav-btn {
      width: 100%;
      text-align: center;
      padding: 1rem;
    }
    .nav-btn::after {
      display: none;
    }
    .nav-btn.active-nav-btn {
      background-color: #1a326b;
    }
    .nav-btn.active-nav-btn::after {
      display: none;
    }
    .dropdown {
      position: static;
      border-radius: 0;
      box-shadow: none;
      background: #2a4993;
      min-width: auto;
    }
    .dropdown-btn {
      padding-left: 2rem;
      color: white;
    }

    .hamburger-menu {
      display: block;
    }
    
    nav.is-open {
      display: flex;
    }
  }
`}</style>

      <div className="app">
        <header>
          <div className="logo" onClick={() => handleLinkClick("inicio")}>
            <img src="/Logo.png" alt="Logo" />
            Liga Recreativa Handball Punilla
          </div>
          <button className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            ☰
          </button>
          <nav className={isMobileMenuOpen ? "is-open" : ""}>
            <div style={{ position: "relative" }} onClick={stop}>
              <button
                className={`nav-btn ${openHandball || isNavItemActive("handball") ? "active-nav-btn" : ""}`}
                onClick={e => {
                  stop(e);
                  setOpenHandball(v => !v);
                  setOpenInstitucional(false);
                }}
                aria-haspopup="true"
                aria-expanded={openHandball}
              >
                {/* Puedes usar un ícono real aquí, si tienes la librería */}
                <span role="img" aria-label="handball">🤾‍♂️</span> Handball ▼
              </button>
              {openHandball && (
                <div className="dropdown" onClick={stop}>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("clubes")}>Clubes</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("jugadores")}>Jugadores</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("estadisticas")}>Tablas de puntuación</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("fixture")}>Fixture</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("reglamento")}>Reglamento</button>
                </div>
              )}
            </div>
            <div style={{ position: "relative" }} onClick={stop}>
              <button
                className={`nav-btn ${openInstitucional || isNavItemActive("institucional") ? "active-nav-btn" : ""}`}
                onClick={e => {
                  stop(e);
                  setOpenInstitucional(v => !v);
                  setOpenHandball(false);
                }}
                aria-haspopup="true"
                aria-expanded={openInstitucional}
              >
                <span role="img" aria-label="institucional">🏛️</span> Institucional ▼
              </button>
              {openInstitucional && (
                <div className="dropdown" onClick={stop}>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("autoridades")}>Autoridades</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("referentes")}>Referentes</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("pago-arbitros")}>Pago de árbitros</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("historia")}>Historia</button>
                </div>
              )}
            </div>
            <button className={`nav-btn ${isNavItemActive("noticias") ? "active-nav-btn" : ""}`} onClick={() => handleLinkClick("noticias")}>Noticias</button>
            <button className={`nav-btn ${isNavItemActive("login") ? "active-nav-btn" : ""}`} onClick={() => handleLinkClick("login")}>Iniciar Sesión</button>
          </nav>
        </header>

        <main>
          {vista === "inicio" && (
            <div className="grid">
              <div className="card">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Noticia" />
                <div className="card-content">
                  <h2>Últimas Noticias</h2>
                  <p>El equipo suma una nueva victoria clave de cara a los playoffs.</p>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <h2>Tabla de Puntuaciones</h2>
                  <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Equipo</th>
                        <th>PJ</th>
                        <th>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>01.</td><td>Estudiantes</td><td>3</td><td>6</td></tr>
                      <tr><td>02.</td><td>Barracas Central</td><td>3</td><td>6</td></tr>
                      <tr><td>03.</td><td>Central Córdoba</td><td>3</td><td>5</td></tr>
                      <tr><td>04.</td><td>Racing Club</td><td>3</td><td>3</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card">
                <div className="card-content">
                  <h2>Calendario</h2>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <strong>Copa Asociación</strong><br />
                      <small>Hace 3 días</small><br />
                      Racing Club <br /><strong>3 - 0</strong><br /> Dep. Punilla
                    </div>
                    <div>
                      <strong>Torneo Apertura</strong><br />
                      <small>En 2 días</small><br />
                      La Cumbre <br />vs<br /> Racing Club
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <img src="https://images.unsplash.com/photo-1601645193272-d6f1dc7c07ae?auto=format&fit=crop&w=1200&q=80" alt="Jugador" />
                <div className="card-content">
                  <h2>Jugador Destacado</h2>
                  <p>Juan Pérez lidera con 5 goles y 2 asistencias en los últimos 3 partidos.</p>
                </div>
              </div>
              <div className="sponsors">
                <h2>Nuestros Sponsors</h2>
                <div className="sponsor-logos">
                  <a href="https://www.instagram.com/cristiandiaznailsandmakeup/" target="_blank" rel="noopener noreferrer">
                    <img src="./Cris.jpg" alt="Velez" />
                  </a>
                  <a href="https://www.go7.com.ar/" target="_blank" rel="noopener noreferrer">
                    <img src="/go7-2.png" alt="Go7" />
                  </a>
                  <a href="https://danal.ddfabrica.com/productos/" target="_blank" rel="noopener noreferrer">
                    <img src="./Danal.png" alt="Danal" />
                  </a>
                  <a href="https://www.kempaoficial.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/Kempa.jpg" alt="Kempa" />
                  </a>
                </div>
              </div>
            </div>
          )}
          {vista === "autoridades" && <Autoridades />}
          {vista === "clubes" && <VerClubes />}
          {vista === "jugadores" && <VerJugadores />}
          {vista === "fixture" && <FixturePage />}
          {vista === "historia" && <Historia />}
          {vista === "estadisticas" && <Estadistica />}
          {vista === "noticias" && <NoticiasPage />}
          {vista === "reglamento" && <Reglamento />}
          {vista === "referentes" && <ReferentesPage />}
        </main>

        <footer>
          <div className="footer-contact">
            <div>
              <img src="/whatsapp.webp" alt="WhatsApp" /> +54 9 351 273 6990 (Atención Lun a Vie de 09:30 a 12:30 y 16:30 a 21:30, salvo días de partido)
            </div>
            <div>
              <img src="/instagram.webp" alt="Instagram" /> Visitanos tambien en nuestro Instagram <a href="https://www.instagram.com/ligapunillahandball/?igsh=MWdreWJwdmN0NjFtMg%3D%3D#" target="_blank" rel="noopener noreferrer">@ligapunillahandball</a>
            </div>
            <div>&copy; 2025 Liga Recreativa Handball Punilla - Todos los derechos reservados.</div>
          </div>
        </footer>
      </div>
    </>
  );
}