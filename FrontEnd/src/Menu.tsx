import { useEffect, useState } from "react";
import Autoridades from "./Autoridades/Autoridades";
import VerClubes from "./Clubes/VerClub";
import JugadoresPage from "./Jugadores/JugadoresPage";
import ReferentesPage from "./Referentes/ReferentesPage";
import FixturePage from "./Fixture/FixturePage";
import Historia from "./Historia/Historia";
import EstadisticasPage from "./Estadistica/EstadisticasPage";
import NoticiasPage from "./Noticias/Noticiaspage";
import Reglamento from "./Reglamento/Reglamento";
import PagosPage from "./RegistroPagos/PagosPage";
// --- 1. IMPORTAR EL MODAL ---
import LoginModal from "./LoginModal"; 


export default function App() {
  const [vista, setVista] = useState(
    () => (localStorage.getItem("vista") as any) || "inicio"
  );

  const [openHandball, setOpenHandball] = useState(false);
  const [openInstitucional, setOpenInstitucional] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 2. AÑADIR ESTADOS PARA LOGIN Y MODAL ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("vista", vista);
  }, [vista]);

  useEffect(() => {
    const close = () => {
      setOpenHandball(false);
      setOpenInstitucional(false);
      // setIsMobileMenuOpen(false);
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const stop = (e) => e.stopPropagation();

  const handleLinkClick = (newVista) => {
    setVista(newVista);
    setOpenHandball(false);
    setOpenInstitucional(false);
    setIsMobileMenuOpen(false); 
  };
  
  // --- Función para el éxito del login ---
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    alert("¡Inicio de sesión exitoso!");
    // Opcional: redirigir a una vista de admin
    // setVista("admin_dashboard"); 
  };
  
  // --- Función de Logout ---
  const handleLogout = () => {
    setIsLoggedIn(false);
    setVista("inicio"); // Vuelve al inicio
    setIsMobileMenuOpen(false);
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
  /* ... (Tus estilos existentes de header, nav, etc. van aquí) ... */
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
  
  /* ===== HEADER Y NAVEGACIÓN (Tus estilos) ===== */
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
  .logo { display: flex; align-items: center; gap: 0.75rem; font-weight: bold; font-size: 1.25rem; cursor: pointer; text-shadow: 1px 1px 2px rgba(0,0,0,0.2); transition: transform 0.3s ease; }
  .logo:hover { transform: scale(1.02); }
  .logo img { width: 40px; height: 40px; border-radius: 50%; }
  nav { display: flex; gap: 2rem; align-items: center; transition: transform 0.3s ease, opacity 0.3s ease; }
  .nav-btn { background: none; border: none; color: white; font-size: 1rem; font-weight: 600; cursor: pointer; position: relative; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.5rem; transition: color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease; }
  .nav-btn:hover { color: #a0c4ff; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
  .nav-btn:active { transform: scale(0.95); }
  .nav-btn.active-nav-btn { color: white; }
  .nav-btn.active-nav-btn::after { content: ""; position: absolute; left: 50%; bottom: 0; width: 100%; height: 4px; background-color: #ffffffff; transform: translateX(-50%); transition: width 0.3s ease, transform 0.3s ease; }
  .nav-btn:not(.active-nav-btn)::after { content: ""; position: absolute; left: 50%; bottom: 0; width: 0; height: 2px; background-color: white; transition: width 0.3s ease, transform 0.3s ease; transform: translateX(-50%); }
  .nav-btn:hover:not(.active-nav-btn)::after { width: 100%; }
  .nav-btn span[role="img"] { display: inline-block; transition: transform 0.3s ease; }
  .nav-btn[aria-expanded="true"] span[role="img"] { transform: rotate(180deg); }
  .dropdown { position: absolute; top: 3.5rem; left: 0; background: white; color: #1f3c88; min-width: 200px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); z-index: 100; display: flex; flex-direction: column; font-size: 1rem; overflow: hidden; animation: dropdownIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; transform-origin: top center; }
  @keyframes dropdownIn { from { opacity: 0; transform: translateY(-10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .dropdown-btn { background: none; border: none; color: #1f3c88; text-align: left; padding: 1rem 1.25rem; cursor: pointer; font-weight: 500; transition: background-color 0.2s ease, transform 0.1s ease; }
  .dropdown-btn:hover { background: #e9ecef; }
  .dropdown-btn:active { transform: scale(0.98); }
  main { flex: 1; padding: 2rem; display: flex; justify-content: center; }
  footer { background: #1f3c88; color: white; text-align: center; padding: 1rem; font-size: 0.9rem; }
  .footer-contact { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; margin-top: 0.5rem; font-size: 0.85rem; }
  .footer-contact img { height: 20px; margin-right: 0.5rem; vertical-align: middle; }
  .footer-contact a { color: white; text-decoration: underline; }
  .sponsors { background: white; border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
  .sponsors h2 { margin-bottom: 1rem; color: #1f3c88; }
  .sponsor-logos { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; }
  .sponsor-logos img { height: 40px; object-fit: contain; opacity: 0.8; transition: opacity 0.3s; }
  .sponsor-logos img:hover { opacity: 1; }
  .hamburger-menu { display: none; font-size: 1.5rem; cursor: pointer; border: none; background: none; color: white; }
  
  /* --- 7. NUEVOS ESTILOS PARA VISTA "INICIO" --- */
  .inicio-container {
    width: 100%;
    max-width: 1500px;
    display: flex;
    flex-direction: column;
    gap: 2.5rem; /* Espacio entre secciones */
  }
  
  .inicio-section-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f3c88;
    margin-bottom: 1rem;
    border-bottom: 3px solid #1f3c88;
    padding-bottom: 0.5rem;
  }
  
  .inicio-noticias-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .inicio-data-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 2fr 1fr; /* 2/3 para tabla, 1/3 para calendario */
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
  
  .card img { width: 100%; height: 180px; object-fit: cover; transition: transform 0.4s ease; }
  .card:hover img { transform: scale(1.05); }
  .card-content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
  .card-content h2 { font-size: 1.25rem; margin-bottom: 0.5rem; color: #1f3c88; }
  .card-content p { font-size: 0.95rem; color: #555; margin-bottom: 1rem; }
  .card-content .read-more {
    margin-top: auto;
    font-weight: 600;
    color: #1f3c88;
    text-decoration: none;
  }
  .card-content .read-more:hover { text-decoration: underline; }

  .tabla-posiciones {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }
  .tabla-posiciones th, .tabla-posiciones td {
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid #eee;
  }
  .tabla-posiciones th {
    font-size: 0.85rem;
    color: #555;
    text-transform: uppercase;
  }
  .tabla-posiciones td {
    font-weight: 500;
  }
  .tabla-posiciones tr:hover {
    background-color: #f9f9f9;
  }
  .tabla-posiciones .team-name {
    font-weight: 600;
    color: #1f3c88;
  }

  .calendario-item {
    padding: 1rem 0;
    border-bottom: 1px dashed #ccc;
  }
  .calendario-item:last-child {
    border-bottom: none;
  }
  .calendario-item strong {
    font-size: 0.9rem;
    color: #333;
    display: block;
    margin-bottom: 0.25rem;
  }
  .calendario-item small {
    color: #666;
    margin-bottom: 0.5rem;
    display: block;
  }
  .calendario-partido {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
  }
  .calendario-partido .vs {
    font-size: 0.8rem;
    color: #1f3c88;
  }
  
  /* --- Fin nuevos estilos --- */
  
  /* Responsive para móviles (Tus estilos) */
  @media (max-width: 900px) {
    .inicio-data-grid {
      grid-template-columns: 1fr; /* Apila tabla y calendario */
    }
  }
  
  @media (max-width: 768px) {
    header { padding: 1rem; }
    nav { display: none; flex-direction: column; position: absolute; top: 70px; right: 0; background: #1f3c88; width: 100%; padding: 1rem 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1); animation: slideDown 0.3s ease-in-out forwards; }
    @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .nav-btn { width: 100%; text-align: center; padding: 1rem; }
    .nav-btn::after { display: none; }
    .nav-btn.active-nav-btn { background-color: #1a326b; }
    .nav-btn.active-nav-btn::after { display: none; }
    .dropdown { position: static; border-radius: 0; box-shadow: none; background: #2a4993; min-width: auto; }
    .dropdown-btn { padding-left: 2rem; color: white; }
    .hamburger-menu { display: block; }
    nav.is-open { display: flex; }
    main { padding: 1rem; }
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
            {/* ... (Menús desplegables de Handball e Institucional - sin cambios) ... */}
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
                  <button className="dropdown-btn" onClick={() => handleLinkClick("Pago de Arbitros")}>Pago de árbitros</button>
                  <button className="dropdown-btn" onClick={() => handleLinkClick("historia")}>Historia</button>
                </div>
              )}
            </div>
            
            <button className={`nav-btn ${isNavItemActive("noticias") ? "active-nav-btn" : ""}`} onClick={() => handleLinkClick("noticias")}>Noticias</button>
            
            {/* --- 3. BOTONES DE LOGIN/LOGOUT CONDICIONALES --- */}
            {!isLoggedIn ? (
              <button 
                className="nav-btn" 
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false); // Cierra menú móvil al abrir modal
                }}
              >
                Iniciar Sesión
              </button>
            ) : (
              <button 
                className="nav-btn" 
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            )}
          </nav>
        </header>

        <main>
          {/* --- 6. VISTA DE "INICIO" REDISEÑADA --- */}
          {vista === "inicio" && (
            <div className="inicio-container">
              {/* Sección de Noticias (3 columnas) */}
              <section>
                <h2 className="inicio-section-title">Últimas Noticias</h2>
                <div className="inicio-noticias-grid">
                  {/* Noticia 1 (Placeholder) */}
                  <div className="card">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Noticia 1" />
                    <div className="card-content">
                      <h2>Nueva victoria clave</h2>
                      <p>El equipo suma una nueva victoria clave de cara a los playoffs. Gran actuación del conjunto local.</p>
                      <a href="#" className="read-more">Leer más...</a>
                    </div>
                  </div>
                  {/* Noticia 2 (Placeholder) */}
                  <div className="card">
                    <img src="unnamed.jpg" alt="Noticia 2" />
                    <div className="card-content">
                      <h2>Jugador Destacado</h2>
                      <p>Juan Pérez lidera con 5 goles y 2 asistencias en los últimos 3 partidos.</p>
                      <a href="#" className="read-more">Leer más...</a>
                    </div>
                  </div>
                  {/* Noticia 3 (Placeholder) */}
                  <div className="card">
                    <img src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181566a?auto=format&fit=crop&w=1200&q=80" alt="Noticia 3" />
                    <div className="card-content">
                      <h2>Próxima Fecha: Definiciones</h2>
                      <p>La liga entra en su etapa definitoria. No te pierdas los encuentros de este fin de semana.</p>
                      <a href="#" className="read-more">Leer más...</a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección de Datos (Tabla y Calendario) */}
              <section className="inicio-data-grid">
                {/* Columna Izquierda: Tabla */}
                <div className="card">
                  <div className="card-content">
                    <h2>Tabla de Puntuaciones (Resumen)</h2>
                    <table className="tabla-posiciones">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Equipo</th>
                          <th>PJ</th>
                          <th>DG</th>
                          <th>Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td className="team-name">Estudiantes</td>
                          <td>3</td>
                          <td>+7</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td className="team-name">Barracas Central</td>
                          <td>3</td>
                          <td>+5</td>
                          <td>6</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td className="team-name">Central Córdoba</td>
                          <td>3</td>
                          <td>+2</td>
                          <td>5</td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td className="team-name">Racing Club</td>
                          <td>3</td>
                          <td>-1</td>
                          <td>3</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td className="team-name">Dep. Punilla</td>
                          <td>3</td>
                          <td>-4</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Columna Derecha: Calendario */}
                <div className="card">
                  <div className="card-content">
                    <h2>Calendario</h2>
                    <div className="calendario-item">
                      <strong>Copa Asociación (Finalizado)</strong>
                      <small>Hace 3 días</small>
                      <div className="calendario-partido">
                        <span>Racing Club</span> <strong>3 - 0</strong> <span>Dep. Punilla</span>
                      </div>
                    </div>
                    <div className="calendario-item">
                      <strong>Torneo Apertura (Fecha 4)</strong>
                      <small>En 2 días</small>
                      <div className="calendario-partido">
                        <span>La Cumbre</span> <span className="vs">vs</span> <span>Racing Club</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sección de Sponsors */}
              <section className="sponsors">
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
              </section>
            </div>
          )}
          
          {/* ... (Renderizado del resto de tus vistas: autoridades, clubes, etc.) ... */}
          {vista === "autoridades" && <Autoridades />}
          {vista === "clubes" && <VerClubes />}
          {vista === "jugadores" && <JugadoresPage />}
          {vista === "fixture" && <FixturePage />}
          {vista === "historia" && <Historia />}
          {vista === "estadisticas" && <EstadisticasPage />}
          {vista === "noticias" && <NoticiasPage />}
          {vista === "reglamento" && <Reglamento />}
          {vista === "referentes" && <ReferentesPage />}
          {vista === "Pago de Arbitros" && <PagosPage />}
        </main>

        <footer>
          {/* ... (Tu footer - sin cambios) ... */}
          <div className="footer-contact">
            <div>
              <img src="/whatsapp.png" alt="WhatsApp" /> +54 9 351 273 6990 (Atención Lun a Vie de 09:30 a 12:30 y 16:30 a 21:30, salvo días de partido)
            </div>
            <div>
              <img src="/Instagram.png" alt="Instagram" /> Visitanos tambien en nuestro Instagram <a href="https://www.instagram.com/ligapunillahandball/?igsh=MWdreWJwdmN0NjFtMg%3D%3D#" target="_blank" rel="noopener noreferrer">@ligapunillahandball</a>
            </div>
            <div>&copy; 2025 Liga Recreativa Handball Punilla - Todos los derechos reservados.</div>
          </div>
        </footer>
      </div>

      {/* --- 5. RENDERIZAR EL MODAL CONDICIONALMENTE --- */}
      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}