import { useEffect, useState } from "react";
import Autoridades from "./Autoridades/Autoridades";
import VerClubes from "./Clubes/VerClub";
import VerJugadores from "./Jugadores/VerJugadores";
import VerReferentes from "./Referentes/ver-referentes";
import FixturePage from "./Fixture/FixturePage";
import Historia from "./Historia/Historia";
import Estadistica from "./Estadistica/Estadistica";
import NoticiasPage from "./Noticias/Noticiaspage";
import Reglamento from "./Reglamento/Reglamento";

export default function App() {
  const [vista, setVista] = useState<
    | "inicio"
    | "autoridades"
    | "clubes"
    | "jugadores"
    | "estadisticas"
    | "fixture"
    | "historia"
    | "login"
    | "noticias"
    | "reglamento"
    | "referentes" // Se añade la nueva vista
  >(() => {
    return (localStorage.getItem("vista") as any) || "inicio";
  });

  // Estados para desplegables
  const [openHandball, setOpenHandball] = useState(false);
  const [openInstitucional, setOpenInstitucional] = useState(false);

  useEffect(() => {
    localStorage.setItem("vista", vista);
  }, [vista]);

  // Cierra desplegables al hacer clic fuera
  useEffect(() => {
    const close = () => {
      setOpenHandball(false);
      setOpenInstitucional(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // Evita cierre al hacer clic en los botones
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          color: #333;
          height: 100%;
        }
        .app { display: flex; flex-direction: column; min-height: 100vh; }
        header {
          background-color: #1f3c88;
          color: white;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
        }
        .logo img { width: 40px; height: 40px; }
        nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          padding: 0.5rem 1rem;
        }
        .nav-btn:hover, .nav-btn:focus {
          text-decoration: underline;
        }
        .dropdown {
          position: absolute;
          top: 2.5rem;
          left: 0;
          background: white;
          color: #1f3c88;
          min-width: 180px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
          z-index: 100;
          display: flex;
          flex-direction: column;
          font-size: 1rem;
        }
        .dropdown-btn {
          background: none;
          border: none;
          color: #1f3c88;
          text-align: left;
          padding: 0.75rem 1rem;
          cursor: pointer;
          font-weight: 500;
        }
        .dropdown-btn:hover {
          background: #f0f2f5;
        }
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
          max-width: 1200px;
        }
        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }
        .card:hover { transform: translateY(-4px); }
        .card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        .card-content { padding: 1rem; }
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
      `}</style>

      <div className="app">
        <header>
          <div className="logo" onClick={() => setVista("inicio")}>
            <img src="/Logo.png" alt="Logo" />
            Liga Recreativa Handball Punilla
          </div>
          <nav>
            {/* Handball Dropdown */}
            <div style={{ position: "relative" }} onClick={stop}>
              <button
                className="nav-btn"
                onClick={e => {
                  stop(e);
                  setOpenHandball(v => !v);
                  setOpenInstitucional(false);
                }}
                aria-haspopup="true"
                aria-expanded={openHandball}
              >
                Handball ▼
              </button>
              {openHandball && (
                <div className="dropdown" onClick={stop}>
                  <button className="dropdown-btn" onClick={() => { setVista("clubes"); setOpenHandball(false); }}>Clubes</button>
                  <button className="dropdown-btn" onClick={() => { setVista("jugadores"); setOpenHandball(false); }}>Jugadores</button>
                  <button className="dropdown-btn" onClick={() => { setVista("estadisticas"); setOpenHandball(false); }}>Tablas de puntuación</button>
                  <button className="dropdown-btn" onClick={() => { setVista("fixture"); setOpenHandball(false); }}>Fixture</button>
                  <button className="dropdown-btn" onClick={() => { setVista("reglamento"); setOpenHandball(false); }}>Reglamento</button>
                </div>
              )}
            </div>
            {/* Institucional Dropdown */}
            <div style={{ position: "relative" }} onClick={stop}>
              <button
                className="nav-btn"
                onClick={e => {
                  stop(e);
                  setOpenInstitucional(v => !v);
                  setOpenHandball(false);
                }}
                aria-haspopup="true"
                aria-expanded={openInstitucional}
              >
                Institucional ▼
              </button>
              {openInstitucional && (
                <div className="dropdown" onClick={stop}>
                  <button className="dropdown-btn" onClick={() => { setVista("autoridades"); setOpenInstitucional(false); }}>Autoridades</button>
                  {/* Se añade el botón para "Referentes" */}
                  <button className="dropdown-btn" onClick={() => { setVista("referentes"); setOpenInstitucional(false); }}>Referentes</button>
                  <button className="dropdown-btn" onClick={() => { setOpenInstitucional(false); }}>Pago de árbitros</button>
                  <button className="dropdown-btn" onClick={() => { setVista("historia"); setOpenInstitucional(false); }}>Historia</button>
                </div>
              )}
            </div>
            {/* Noticias */}
            <button className="nav-btn" onClick={() => setVista("noticias")}>Noticias</button>
            {/* Iniciar Sesión */}
            <button className="nav-btn" onClick={() => setVista("login")}>Iniciar Sesión</button>
          </nav>
        </header>

        <main>
          {vista === "inicio" && (
            <div className="grid">
              {/* ...existing cards... */}
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
          {vista === "referentes" && <VerReferentes />} 
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