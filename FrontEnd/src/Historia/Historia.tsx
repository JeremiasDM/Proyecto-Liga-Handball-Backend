import React, { useState, useMemo } from "react";

const eventos = [
  {
    año: 2018,
    imagen: "./Historia/foto3.jpeg",
    texto: "15 de mayo Fundación de la liga.",
  },
  {
    año: 2018,
    imagen: "./Historia/foto2.jpeg",
    texto: "Primer Logo de la Liga diseñado por los miembros fundadores.",
  },
  {
    año: 2019,
    imagen: "./Historia/foto1.jpeg",
    texto: "La Liga suma nuevos miembros.",
  },
  {
    año: 2020,
    imagen: "./Historia/foto4.jpeg",
    texto: "Se suman nuevos Clubes a la Liga.",
  },
  {
    año: 2022,
    imagen: "./Historia/foto5.jpeg",
    texto: "Nuevos integrantes se suman a la Liga.",
  },
  {
    año: 2023,
    imagen: "./Historia/foto6.jpeg",
    texto: "Seleccionado de la liga punilla en el primer torneo de ligas realizado en Alta Gracia.",
  },
  {
    año: 2025,
    imagen: "./Historia/foto7.jpeg",
    texto: "la liga firma un convenio y tiene sus propios arbitros y ya no depende de los árbitros de la federacións.",
  },
];

export default function Historia() {
  // 1. Agrupamos los eventos por año
  const eventosAgrupados = useMemo(() => {
    return eventos.reduce((acc, evento) => {
      // Si el año ya existe en el acumulador, añade el evento
      if (acc[evento.año]) {
        acc[evento.año].push(evento);
      } else {
        // Si no existe, crea un nuevo array con el evento
        acc[evento.año] = [evento];
      }
      return acc;
    }, {} as Record<number, typeof eventos>);
  }, []);

  // Obtenemos una lista de años únicos para la navegación (botones)
  const añosUnicos = useMemo(
    () => Object.keys(eventosAgrupados).map(Number).sort(),
    [eventosAgrupados]
  );

  // El estado ahora guarda el AÑO activo, no el índice
  const [añoActivo, setAñoActivo] = useState(añosUnicos[0]);

  // Obtenemos los eventos específicos del año activo
  const eventosDelAñoActivo = useMemo(
    () => eventosAgrupados[añoActivo] || [],
    [eventosAgrupados, añoActivo]
  );

  return (
    <div className="historia-timeline-container">
      <style>{`
        /* ... CSS MANTENIDO ... */
        :root {
          --color-primary: #1a5276; /* Azul Oscuro/Navy */
          --color-secondary: #4a90e2; /* Azul Brillante */
          --color-background: #ffffff; /* ¡Blanco puro! */
          --color-text: #333333;
          --color-line: #c0c9d6;
        }

        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: var(--color-background);
        }

        .historia-timeline-container {
          background: var(--color-background);
          color: var(--color-text);
          width: 90vw;
          max-width: 1200px;
          margin: 2rem auto;
          padding: 3rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05); 
        }
        
        .historia-header {
          text-align: center;
          margin-bottom: 3rem; 
        }

        .historia-header h2 {
          font-size: 2.5rem;
          color: var(--color-primary);
          border-bottom: 4px solid var(--color-secondary);
          display: inline-block;
          padding-bottom: 0.5rem;
        }

        /* --- Línea y Puntos de la línea de tiempo --- */
        .timeline {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 3rem;
          overflow-x: auto;
          padding: 1rem 1rem 2rem;
          position: relative;
        }

        /* Línea horizontal continua */
        .timeline::before {
          content: '';
          position: absolute;
          bottom: 1.5rem;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--color-line);
          z-index: 1;
        }

        .timeline-fecha {
          cursor: pointer;
          padding: 0.6rem 1.3rem;
          border-radius: 25px;
          background: #ffffff; 
          color: var(--color-primary);
          font-weight: 600;
          border: 1px solid var(--color-line);
          transition: all 0.3s ease;
          flex-shrink: 0;
          font-size: 1rem;
          position: relative;
          z-index: 2;
        }
        
        .timeline-fecha:hover {
          background: #e9e9e9;
          color: var(--color-primary);
          transform: translateY(-2px);
        }

        .timeline-fecha.activo {
          color: var(--color-secondary);
          font-weight: 700;
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(26, 82, 118, 0.3);
          transform: scale(1.05);
          background: #ffffff;
        }

        /* Puntos circulares en la línea */
        .timeline-fecha::after {
            content: '';
            position: absolute;
            bottom: -1rem;
            left: 50%;
            transform: translateX(-50%);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--color-line);
            border: 2px solid var(--color-background);
            transition: all 0.3s ease;
            z-index: 3;
        }
        
        .timeline-fecha.activo::after {
            background: var(--color-primary);
            width: 16px;
            height: 16px;
            bottom: -1.2rem;
        }

        /* --- CONTENEDOR DE EVENTOS AGREGADO --- */
        .eventos-multiples-container {
            display: flex;
            gap: 20px; /* Espacio entre los eventos del mismo año */
            justify-content: center;
            flex-wrap: wrap; /* Permite que los eventos salten de línea en pantallas pequeñas */
            animation: fadeIn 0.5s ease-out;
        }
        /* --- Contenido del Evento Individual --- */
        .evento {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem; 
          padding: 0 1rem;
          /* Eliminamos la animación fade-in de aquí, la ponemos en el contenedor */
          flex-basis: calc(33.33% - 15px); /* Intento de 3 en fila por defecto */
          min-width: 250px; /* Tamaño mínimo para evitar que se colapsen mucho */
          max-width: 400px;
        }
        
        .evento img {
          width: 100%;
          height: 180px; /* Altura más uniforme para el diseño en grilla */
          max-width: 400px; 
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); 
          border: 4px solid #ffffff;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .evento-texto {
          background: #ffffff;
          padding: 1rem;
          border-radius: 10px;
          font-size: 0.95rem; /* Letra un poco más pequeña */
          line-height: 1.4;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          border-left: 5px solid var(--color-secondary);
          width: 100%; /* Ocupa todo el ancho de su contenedor */
        }

        /* Estilos Responsive */
        @media (max-width: 768px) {
          .historia-timeline-container {
            box-shadow: none;
            margin: 0;
            padding: 2rem 1rem;
            border-radius: 0;
          }
          .evento {
              flex-basis: 100%; /* Un evento por fila en móvil */
              max-width: none;
          }
          .evento img {
             height: 180px;
          }
        }
      `}</style>

      <div className="historia-header">
        <h2>Nuestra Historia 📜</h2>
      </div>

      {/* --- Línea de tiempo (Botones de Año) --- */}
      <div className="timeline">
        {añosUnicos.map((año) => (
          <div
            key={año}
            className={`timeline-fecha${añoActivo === año ? " activo" : ""}`}
            onClick={() => setAñoActivo(año)}
          >
            {año}
          </div>
        ))}
      </div>

      {/* --- Contenido del Año Activo (Múltiples Eventos) --- */}
      <div className="eventos-multiples-container">
        {eventosDelAñoActivo.map((evento, index) => (
          <div className="evento" key={index}>
            <img src={evento.imagen} alt={`Evento ${evento.año}`} />
            <div className="evento-texto">
              **{evento.año}:** {evento.texto}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
