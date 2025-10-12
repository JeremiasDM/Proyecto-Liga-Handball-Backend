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
// Definimos un color azul primario uniforme
const PRIMARY_BLUE = '#1d4ed8'; // Azul oscuro para acciones primarias
const LIGHT_BLUE = '#bfdbfe'; // Azul claro para bordes inactivos

const styles = {
    pageContainer: {
        padding: '1.5rem', 
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '2rem', 
        backgroundColor: '#f9fafb', 
        minHeight: '100vh',
        minwidth: '400px',
        fontFamily: 'sans-serif' 
    },
    contentWrapper: {
        maxWidth: '800px', 
        margin: '0 auto', 
        width: '100%', 
    },
    mainTitle: {
        fontSize: '2.5rem', 
        fontWeight: '800', 
        textAlign: 'center' as const, 
        color: '#4338ca', 
        marginBottom: '2rem', 
        borderBottom: '4px solid #c7d2fe', 
        paddingBottom: '1rem', 
        letterSpacing: '-0.025em', 
    },
    carrouselSection: {
        marginBottom: '2rem', 
        padding: '1.5rem', 
        backgroundColor: 'white', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
        borderRadius: '1rem', 
        border: '1px solid #e0e7ff', 
    },
    carrouselTitle: {
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#1f2937', 
        marginBottom: '1rem', 
        borderLeft: '4px solid #4f46e5', 
        paddingLeft: '0.75rem', 
    },
    toggleCarruselButton: {
        display: 'block',
        margin: '0 auto 2rem auto',
        padding: '0.75rem 2rem',
        backgroundColor: '#4f46e5', 
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
    managementSection: {
        padding: '2rem', 
        backgroundColor: 'white', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', 
        borderRadius: '1.5rem', 
        border: '1px solid #d1fae5', 
        width: '100%', 
        margin: '0 auto', 
    },
    formTitle: {
        fontSize: '1.875rem', 
        fontWeight: '700', 
        color: PRIMARY_BLUE, // USADO: Color azul uniforme
        marginBottom: '1.5rem', 
        textAlign: 'center' as const, 
        borderBottom: `1px solid ${LIGHT_BLUE}`, // USADO: Borde azul claro
        paddingBottom: '0.75rem', 
    },
    listTitle: {
        fontSize: '1.875rem', 
        fontWeight: '700', 
        color: PRIMARY_BLUE, // USADO: Color azul uniforme
        marginBottom: '1.5rem', 
        textAlign: 'center' as const, 
        borderBottom: `1px solid ${LIGHT_BLUE}`, // USADO: Borde azul claro
        paddingBottom: '0.75rem', 
    },
    toggleButtonContainer: {
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem', 
        width: '100%',
        maxWidth: '800px', 
        margin: '0 auto 2rem auto', 
    },
    toggleButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      border: '2px solid', 
      transition: 'all 0.2s',
      flex: 1, 
      minWidth: '150px',
      textAlign: 'center' as const,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    // ESTILOS AZULES UNIFORMES
    activeButton: {
      backgroundColor: PRIMARY_BLUE, 
      color: 'white',
      borderColor: PRIMARY_BLUE,
    },
    inactiveButton: {
      backgroundColor: 'white',
      color: PRIMARY_BLUE, 
      borderColor: PRIMARY_BLUE, 
    },
};

// Definir el tipo de vista
type View = 'formulario' | 'lista';

const NoticiasPage: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [noticiaAEditar, setNoticiaAEditar] = useState<Noticia | null>(null);
  const [activeView, setActiveView] = useState<View>('formulario');
  const [mostrarCarrusel, setMostrarCarrusel] = useState(false);
  
  useEffect(() => {
    const guardadas = localStorage.getItem("noticias");
    if (guardadas) setNoticias(JSON.parse(guardadas));
  }, []);

  useEffect(() => {
    localStorage.setItem("noticias", JSON.stringify(noticias));
  }, [noticias]);

  const handleGuardar = (nueva: Noticia) => {
    setNoticias([...noticias, nueva]);
    setActiveView('lista');
    setNoticiaAEditar(null); 
  };

  const handleActualizar = (noticiaActualizada: Noticia) => {
    setNoticias(noticias.map(n => 
        n.id === noticiaActualizada.id ? noticiaActualizada : n
    ));
    setNoticiaAEditar(null); 
    setActiveView('lista'); 
    alert("Noticia actualizada correctamente.");
  };

  const handleEliminar = (id: number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;
    setNoticias(noticias.filter((n) => n.id !== id));
    if (noticiaAEditar && noticiaAEditar.id === id) {
        setNoticiaAEditar(null);
    }
  };

  const handleEditar = (noticia: Noticia) => {
    setNoticiaAEditar(noticia);
    setActiveView('formulario'); 
  };

  const handleVistaToggle = (view: View) => {
    if (view === 'lista') {
        setNoticiaAEditar(null);
    }
    setActiveView(view);
  };

  const handleCancelEdit = () => {
    setNoticiaAEditar(null);
    setActiveView('formulario'); 
  };


  return (
    <div style={styles.pageContainer as React.CSSProperties}>
      <div style={styles.contentWrapper}>
        <h2 style={styles.mainTitle as React.CSSProperties}>
           Portal de Noticias y Anuncios
        </h2>

        {/* Botón para alternar la visibilidad del carrusel */}
        <button
            onClick={() => setMostrarCarrusel(!mostrarCarrusel)}
            style={styles.toggleCarruselButton}
        >
            {mostrarCarrusel ? 'Ocultar Últimas Novedades' : 'Ver Últimas Novedades'}
        </button>
{/* ------------------------------------------------------------------ */}
        {/* Sección de Últimas Noticias (Carrusel) */}
        {mostrarCarrusel && (
        <section style={styles.carrouselSection}>
          <h3 style={styles.carrouselTitle}>
            Últimas Novedades
          </h3>
          <CarrouselNoticias noticias={noticias} />
        </section>
        )}
{/* ------------------------------------------------------------------ */}
        {/* Botones de Navegación entre secciones (AZULES UNIFORMES) */}
        <div style={styles.toggleButtonContainer}>
            <button
                onClick={() => handleVistaToggle('formulario')}
                style={{
                    ...styles.toggleButton,
                    ...(activeView === 'formulario' ? styles.activeButton : styles.inactiveButton)
                }}
            >
                 Gestión de Noticias
            </button>
            <button
                onClick={() => handleVistaToggle('lista')}
                style={{
                    ...styles.toggleButton,
                    ...(activeView === 'lista' ? styles.activeButton : styles.inactiveButton)
                }}
            >
                 Ver Listado
            </button>
        </div>
{/* ------------------------------------------------------------------ */}
        {/* SECCIÓN ACTIVA (SOLO UNA VISIBLE) */}
        <section style={styles.managementSection}> 
          
          {/* Contenido del Formulario */}
          {activeView === 'formulario' && (
            <div>
              <h3 style={styles.formTitle as React.CSSProperties}>
                {noticiaAEditar ? 'Editar Noticia Existente' : 'Crear Nueva Noticia'}
              </h3>
              <FormularioNoticia 
                onGuardar={handleGuardar} 
                onActualizar={handleActualizar}
                noticiaAEditar={noticiaAEditar}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          )}

          {/* Contenido de la Lista */}
          {activeView === 'lista' && (
            <div>
              <h3 style={styles.listTitle as React.CSSProperties}>
                 Noticias Publicadas
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
      <style>{`
        /* Estilos para la barra de desplazamiento en la lista para un toque más moderno */
        .list-scroll-container::-webkit-scrollbar {
            width: 8px;
        }
        .list-scroll-container::-webkit-scrollbar-thumb {
            background-color: #d1d5db; 
            border-radius: 10px;
        }
        .list-scroll-container::-webkit-scrollbar-thumb:hover {
            background-color: #9ca3af; 
        }
      `}</style>
    </div>
  );
};

export default NoticiasPage;
