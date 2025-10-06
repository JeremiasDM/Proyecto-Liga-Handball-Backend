import React, { useEffect, useState } from "react";
import FormularioNoticia from "./FormularioNoticia";
import NoticiasLista from "./NoticiasLista";
import CarrouselNoticias from "./CarruselNoticias";

type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
};

// ====================================================================
// SECCIÓN DE ESTILOS EN LÍNEA (STYLE OBJECTS)
// ====================================================================
const styles = {
    // ... (Estilos de NoticiasPage se mantienen sin cambios)
    pageContainer: {
        padding: '1rem', 
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '2.5rem', 
        backgroundColor: '#f9fafb', 
        minHeight: '100vh', 
        fontFamily: 'sans-serif' 
    },
    contentWrapper: {
        maxWidth: '1280px', 
        margin: '0 auto', 
        width: '100%', 
    },
    mainTitle: {
        fontSize: '3rem', 
        fontWeight: '800', 
        textAlign: 'center' as const, 
        color: '#4338ca', 
        marginBottom: '3rem', 
        borderBottom: '4px solid #c7d2fe', 
        paddingBottom: '1rem', 
        letterSpacing: '-0.025em', 
    },
    carrouselSection: {
        marginBottom: '3rem', 
        padding: '2rem', 
        backgroundColor: 'white', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
        borderRadius: '1.5rem', 
        border: '1px solid #e0e7ff', 
    },
    carrouselTitle: {
        fontSize: '1.875rem', 
        fontWeight: '700', 
        color: '#1f2937', 
        marginBottom: '1.5rem', 
        borderLeft: '4px solid #4f46e5', 
        paddingLeft: '1rem', 
    },
    // NUEVO: Estilos para el botón de alternancia del carrusel
    toggleCarruselButton: {
        display: 'block',
        margin: '0 auto 1.5rem auto',
        padding: '0.75rem 2rem',
        backgroundColor: '#4f46e5', // indigo-600
        color: 'white',
        fontWeight: '600',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.2s',
        minWidth: '250px',
        textAlign: 'center' as const,
    },
    gridSection: {
        display: 'grid',
        gap: '2.5rem', 
    },
    formColumn: {
        padding: '2rem', 
        backgroundColor: 'white', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
        borderRadius: '1.5rem', 
        border: '1px solid #d1fae5', 
        height: 'fit-content', 
        maxWidth: '500px', 
        margin: '0 auto', 
        width: '100%', 
    },
    formTitle: {
        fontSize: '1.875rem', 
        fontWeight: '700', 
        color: '#047857', 
        marginBottom: '1.5rem', 
        textAlign: 'center' as const, 
        borderBottom: '1px solid #a7f3d0', 
        paddingBottom: '0.75rem', 
    },
    listColumn: {
        padding: '2rem', 
        backgroundColor: 'white', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
        borderRadius: '1.5rem', 
        border: '1px solid #eff6ff', 
        maxWidth: '500px', 
        margin: '0 auto', 
        width: '100%', 
    },
    listTitle: {
        fontSize: '1.875rem', 
        fontWeight: '700', 
        color: '#1d4ed8', 
        marginBottom: '1.5rem', 
        textAlign: 'center' as const, 
        borderBottom: '1px solid #bfdbfe', 
        paddingBottom: '0.75rem', 
    },
    toggleButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      margin: '0.5rem 0',
      border: '1px solid',
      transition: 'all 0.2s',
      flex: 1, 
    },
    activeFormButton: {
      backgroundColor: '#047857', 
      color: 'white',
      borderColor: '#047857',
    },
    inactiveFormButton: {
      backgroundColor: 'white',
      color: '#047857',
      borderColor: '#047857',
    },
    activeListButton: {
      backgroundColor: '#1d4ed8', 
      color: 'white',
      borderColor: '#1d4ed8',
    },
    inactiveListButton: {
      backgroundColor: 'white',
      color: '#1d4ed8',
      borderColor: '#1d4ed8',
    },
};

// Función de utilidad para manejar la lógica de la media query
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

// Definir el tipo de vista para pantallas pequeñas
type View = 'formulario' | 'lista';

const NoticiasPage: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  // Estado para saber qué noticia estamos editando (o null si estamos creando)
  const [noticiaAEditar, setNoticiaAEditar] = useState<Noticia | null>(null);
  // Estado para la vista activa en pantallas pequeñas (Formulario/Lista)
  const [activeView, setActiveView] = useState<View>('formulario');
  // NUEVO ESTADO: Controla si el carrusel es visible
  const [mostrarCarrusel, setMostrarCarrusel] = useState(false);

  // Simular el breakpoint 'md' de Tailwind (usualmente 768px)
  const isMediumScreen = useMediaQuery('(min-width: 768px)');
  
  // Estilo dinámico para gridSection
  const gridStyle: React.CSSProperties = {
    ...styles.gridSection,
    // Aplica '1fr 1fr' (grid-cols-2) si es pantalla mediana o más grande, si no, usa '1fr' (grid-cols-1)
    gridTemplateColumns: isMediumScreen ? '1fr 1fr' : '1fr',
  };

  // Cargar noticias de localStorage al inicio
  useEffect(() => {
    const guardadas = localStorage.getItem("noticias");
    if (guardadas) setNoticias(JSON.parse(guardadas));
  }, []);

  // Guardar noticias en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("noticias", JSON.stringify(noticias));
  }, [noticias]);

  // Manejar la creación de una nueva noticia
  const handleGuardar = (nueva: Noticia) => {
    setNoticias([...noticias, nueva]);
    // Navegar a la vista de lista después de guardar en móvil
    if (!isMediumScreen) {
        setActiveView('lista');
    }
    // Si estábamos editando, salir del modo edición
    setNoticiaAEditar(null); 
  };

  // Manejar la actualización de una noticia existente
  const handleActualizar = (noticiaActualizada: Noticia) => {
    setNoticias(noticias.map(n => 
        n.id === noticiaActualizada.id ? noticiaActualizada : n
    ));
    setNoticiaAEditar(null); // Salir del modo edición
    alert("✅ Noticia actualizada correctamente.");
  };

  // Manejar la eliminación de una noticia
  const handleEliminar = (id: number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;
    setNoticias(noticias.filter((n) => n.id !== id));
    // Si se elimina la única noticia en edición, salir del modo edición
    if (noticiaAEditar && noticiaAEditar.id === id) {
        setNoticiaAEditar(null);
    }
  };

  // Entrar en modo edición
  const handleEditar = (noticia: Noticia) => {
    setNoticiaAEditar(noticia);
    // Asegurar que el formulario sea visible en móvil
    if (!isMediumScreen) {
        setActiveView('formulario');
    }
  };

  // Alternar entre Formulario y Lista en pantallas pequeñas
  const handleVistaToggle = (view: View) => {
    // Si cambiamos de vista, y la nueva vista es la lista, salir del modo edición.
    if (view === 'lista' && noticiaAEditar) {
        setNoticiaAEditar(null);
    }
    setActiveView(view);
  };


  return (
    <div style={styles.pageContainer as React.CSSProperties}>
      <div style={styles.contentWrapper}>
        <h2 style={styles.mainTitle as React.CSSProperties}>
          📰 Portal de Noticias y Anuncios
        </h2>

        {/* NUEVO: Botón para alternar la visibilidad del carrusel */}
        <button
            onClick={() => setMostrarCarrusel(!mostrarCarrusel)}
            style={styles.toggleCarruselButton}
        >
            {mostrarCarrusel ? '🔼 Ocultar Últimas Novedades' : '🔽 Ver Últimas Novedades'}
        </button>


        {/* Sección de Últimas Noticias (Carrusel) */}
        {mostrarCarrusel && (
        <section style={styles.carrouselSection}>
          <h3 style={styles.carrouselTitle}>
            Últimas Novedades
          </h3>
          <CarrouselNoticias noticias={noticias} />
        </section>
        )}

        {/* Botones de Navegación para pantallas pequeñas */}
        {!isMediumScreen && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => handleVistaToggle('formulario')}
                    style={{
                        ...styles.toggleButton,
                        ...(activeView === 'formulario' ? styles.activeFormButton : styles.inactiveFormButton)
                    }}
                >
                    ✍️ Formulario
                </button>
                <button
                    onClick={() => handleVistaToggle('lista')}
                    style={{
                        ...styles.toggleButton,
                        ...(activeView === 'lista' ? styles.activeListButton : styles.inactiveListButton)
                    }}
                >
                    📚 Lista
                </button>
            </div>
        )}

        {/* Sección de Gestión (Formulario y Lista) */}
        <section style={gridStyle}> 
          
          {/* Columna de Formulario */}
          {(isMediumScreen || activeView === 'formulario') && (
            <div style={styles.formColumn}>
              <h3 style={styles.formTitle as React.CSSProperties}>
                {noticiaAEditar ? '✏️ Editar Noticia Existente' : '✍️ Crear Nueva Noticia'}
              </h3>
              <FormularioNoticia 
                onGuardar={handleGuardar} 
                onActualizar={handleActualizar}
                noticiaAEditar={noticiaAEditar}
                onCancelEdit={() => setNoticiaAEditar(null)}
              />
            </div>
          )}

          {/* Columna de Lista */}
          {(isMediumScreen || activeView === 'lista') && (
            <div style={styles.listColumn}>
              <h3 style={styles.listTitle as React.CSSProperties}>
                📚 Noticias Publicadas
              </h3>
              <NoticiasLista 
                noticias={noticias} 
                onEliminar={handleEliminar} 
                onEditar={handleEditar}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default NoticiasPage;
