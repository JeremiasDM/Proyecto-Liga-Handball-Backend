import React from "react";

type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
};

type Props = {
  noticias: Noticia[];
};

// Estilos convertidos a objeto para su uso en línea
const styles = {
    carrouselContainer: {
        display: 'flex',
        overflowX: 'auto' as const,
        gap: '1.5rem', // space-x-6
        paddingTop: '1rem', // py-4
        paddingBottom: '1rem', // py-4
        paddingLeft: '0.5rem', // px-2 (simulando -mx-2 en el padre)
        paddingRight: '0.5rem', // px-2 (simulando -mx-2 en el padre)
        marginRight: '-0.5rem',
        marginLeft: '-0.5rem',
    },
    card: {
        minWidth: '280px',
        maxWidth: '280px',
        backgroundColor: '#fff',
        borderRadius: '0.75rem', // rounded-xl
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', // shadow-lg
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        border: '1px solid #e5e7eb', // border border-gray-200
        cursor: 'pointer',
    },
    image: {
        width: '100%',
        height: '10rem', // h-40
        objectFit: 'cover' as 'cover',
    },
    noImage: {
        width: '100%',
        height: '10rem', // h-40
        backgroundColor: '#eef2ff', // indigo-100
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: '0.75rem',
        borderTopRightRadius: '0.75rem',
        color: '#4f46e5', // indigo-700
        fontWeight: '600',
    },
    cardContent: {
        padding: '1rem', // p-4
    },
    title: {
        marginTop: '0.25rem', // mt-1
        fontSize: '1.125rem', // text-lg
        fontWeight: '800', // font-extrabold
        color: '#111827', // text-gray-900
        lineHeight: '1.375',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis', // truncate
    },
    date: {
        fontSize: '0.75rem', // text-xs
        color: '#6366f1', // text-indigo-500
        fontWeight: '500', // font-medium
        marginTop: '0.25rem', // mt-1
    },
    content: {
        fontSize: '0.875rem', // text-sm
        color: '#4b5563', // text-gray-600
        marginTop: '0.5rem', // mt-2
        display: '-webkit-box',
        WebkitLineClamp: 3, // line-clamp-3
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
    }
};

const CarrouselNoticias: React.FC<Props> = ({ noticias }) => {
  if (noticias.length === 0) return <p style={{ padding: '1rem', color: '#6b7280', fontStyle: 'italic' }}>No hay noticias recientes para mostrar en el carrusel.</p>;

  const ultimas = [...noticias]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5);

  return (
    <div style={styles.carrouselContainer}>
      {ultimas.map((n) => (
        <div 
            key={n.id} 
            style={styles.card}
            // NOTA: hover:shadow-xl y hover:scale-[1.02] no son posibles con estilos en línea simples.
        >
          {n.imagenUrl ? (
            <img 
                src={n.imagenUrl} 
                alt={n.titulo} 
                style={styles.image} 
            />
          ) : (
            <div style={styles.noImage}>
              🖼️ Sin imagen
            </div>
          )}
          <div style={styles.cardContent}>
            <h4 style={styles.title}>{n.titulo}</h4>
            <p style={styles.date}>
                {new Date(n.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <p style={styles.content}>
                {n.contenido}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarrouselNoticias;
