import React, { useEffect, useState } from "react";
import FormularioNoticia from "./FormularioNoticia";
import NoticiasLista from "./NoticiasLista";
import CarrouselNoticias from "./CarruselNoticias";

// Uso temporal de 'as any' para evitar un error de tipado si CarrouselNoticias no está tipado
const CarrouselNoticiasTyped = CarrouselNoticias as React.FC<{ noticias: Noticia[] }>;

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
const PRIMARY_BLUE = '#1d4ed8'; 
const LIGHT_BLUE = '#bfdbfe'; 
const PRIMARY_INDIGO = '#4f46e5'; 

const styles = {
    pageContainer: {
        minHeight: '100vh', 
        backgroundColor: '#f9fafb',
        padding: '1.5rem 2rem',  
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '2rem', 
        fontFamily: 'sans-serif',
        width: '100%', 
    },
    contentWrapper: {
        margin: '0 auto', 
        width: '100%', 
        maxWidth: '1000px', 
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
        borderLeft: `4px solid ${PRIMARY_INDIGO}`, 
        paddingLeft: '0.75rem', 
    },
    // ❌ ESTE ESTILO SE HA ELIMINADO/DEJADO OBSOLETO ya que vamos a usar toggleButton con condicionales.
    // carrouselToggleButton: { ... }, 
    
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
        color: PRIMARY_BLUE, 
        marginBottom: '1.5rem', 
        textAlign: 'center' as const, 
        borderBottom: `1px solid ${LIGHT_BLUE}`, 
        paddingBottom: '0.75rem', 
    },
    listTitle: {
        fontSize: '1.875rem', 
        fontWeight: '700', 
        color: PRIMARY_BLUE, 
        marginBottom: '1.5rem', 
        textAlign: 'center' as const, 
        borderBottom: `1px solid ${LIGHT_BLUE}`, 
        paddingBottom: '0.75rem', 
    },
    // ✅ Estilo unificado para el contenedor de los 3 botones
    threeButtonContainer: { 
        display: 'flex', 
        flexDirection: 'row' as const, 
        gap: '0.5rem', 
        marginBottom: '2rem', 
        width: '100%',
        margin: '0 auto 2rem auto', 
    },
    // ✅ Estilo base para los 3 botones
    toggleButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      border: '2px solid', 
      transition: 'all 0.2s',
      flex: 1, 
      minWidth: '100px', 
      textAlign: 'center' as const,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
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
    setNoticiaAEditar(null); 
    alert("Noticia guardada correctamente.");
  };

  const handleActualizar = (noticiaActualizada: Noticia) => {
    setNoticias(noticias.map(n => 
        n.id === noticiaActualizada.id ? noticiaActualizada : n
    ));
    setNoticiaAEditar(null); 
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
    // Limpiamos la noticia a editar siempre que cambiamos de vista
    setNoticiaAEditar(null); 
    setActiveView(view);
  };
    
  const handleToggleCarrusel = () => {
      setMostrarCarrusel(!mostrarCarrusel);
      setNoticiaAEditar(null); 
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

        {/* CONTENEDOR DE TRES BOTONES UNIFICADO */}
        <div style={styles.threeButtonContainer}> 
            <button
                onClick={() => handleVistaToggle('formulario')}
                style={{
                    ...styles.toggleButton,
                    // Estilo activo/inactivo para el formulario
                    ...(activeView === 'formulario' ? styles.activeButton : styles.inactiveButton)
                }}
            >
                 Gestión de Noticias
            </button>

            {/* ✅ BOTÓN CENTRAL (CARRUSEL) AHORA CON ESTILO CONDICIONAL */}
            <button
                onClick={handleToggleCarrusel} 
                style={{
                    ...styles.toggleButton, // Usamos la base de los otros botones
                    // Estilo activo/inactivo basado en si el carrusel está visible
                    ...(mostrarCarrusel ? styles.activeButton : styles.inactiveButton)
                }}
            >
                  {mostrarCarrusel ? 'Ocultar Novedades' : 'Ver Últimas Novedades'}
            </button>
        
            <button
                onClick={() => handleVistaToggle('lista')}
                style={{
                    ...styles.toggleButton,
                    // Estilo activo/inactivo para la lista
                    ...(activeView === 'lista' ? styles.activeButton : styles.inactiveButton)
                }}
            >
                 Ver Listado
            </button>
        </div>

        {/* Sección de Últimas Noticias (Carrusel) */}
        {mostrarCarrusel && (
        <section style={styles.carrouselSection}>
          <h3 style={styles.carrouselTitle}>
            Últimas Novedades
          </h3>
          <CarrouselNoticiasTyped noticias={noticias} />
        </section>
        )}

        {/* SECCIÓN ACTIVA (SOLO UNA VISIBLE) */}
        
        {/* Contenido del Formulario */}
        {activeView === 'formulario' && (
          <section style={styles.managementSection}> 
            <h3 style={styles.formTitle as React.CSSProperties}>
              {noticiaAEditar ? 'Editar Noticia Existente' : 'Crear Nueva Noticia'}
            </h3>
            <FormularioNoticia 
                key={noticiaAEditar ? noticiaAEditar.id : 0} 
                onGuardar={handleGuardar} 
                onActualizar={handleActualizar}
                noticiaAEditar={noticiaAEditar}
                onCancelEdit={handleCancelEdit}
            />
          </section>
        )}

        {/* Contenido de la Lista */}
        {activeView === 'lista' && (
          <section style={styles.managementSection}> 
            <h3 style={styles.listTitle as React.CSSProperties}>
               Noticias Publicadas
            </h3>
            <NoticiasLista 
              noticias={noticias} 
              onEliminar={handleEliminar} 
              onEditar={handleEditar}
            />
          </section>
        )}
      </div>
      <style>{`
        /* Estilos para la barra de desplazamiento en la lista */
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
        /* Asegura que el fondo de la página sea el deseado */
        body, html, #root {
            background-color: #f9fafb !important;
        }
      `}</style>
    </div>
  );
};

export default NoticiasPage;
