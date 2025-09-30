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
  const [activo, setActivo] = useState(0);

  const eventoActivo = useMemo(() => eventos[activo], [activo]);

  return (
    <div className="historia-timeline-container">
      <style>{`
        /* --- Paleta de Colores (ACTUALIZADA A BLANCO) --- */
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
          background: var(--color-background); /* El body ahora es blanco */
        }

        .historia-timeline-container {
          background: var(--color-background); /* El contenedor ahora es blanco */
          color: var(--color-text);
          width: 90vw;
          max-width: 1200px;
          margin: 2rem auto;
          padding: 3rem 1.5rem;
          border-radius: 12px;
          /* Mantenemos la sombra para "levantar" el componente del fondo blanco */
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
          /* Fondo de los botones también blanco o muy claro para que se mezcle con la línea */
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
          background: #e9e9e9; /* Un gris muy sutil al hacer hover */
          color: var(--color-primary);
          transform: translateY(-2px);
        }

        .timeline-fecha.activo {
          color: var(--color-secondary);
          font-weight: 700;
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(26, 82, 118, 0.3);
          transform: scale(1.05);
          background: #ffffff; /* Aseguramos que el activo también tenga fondo blanco */
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
            border: 2px solid var(--color-background); /* CLAVE: El borde del punto es blanco */
            transition: all 0.3s ease;
            z-index: 3;
        }
        
        .timeline-fecha.activo::after {
            background: var(--color-primary);
            width: 16px;
            height: 16px;
            bottom: -1.2rem;
        }

        /* --- Contenido del Evento (Mantenido) --- */
        .evento {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem; 
          padding: 0 1rem;
          animation: fadeIn 0.5s ease-out;
        }
        
        .evento img {
          width: 100%;
          max-width: 400px; 
          height: 220px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); 
          border: 4px solid #ffffff; /* Borde blanco para integrarse */
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .evento-texto {
          background: #ffffff;
          padding: 1.2rem 1.8rem;
          border-radius: 10px;
          font-size: 1.05rem;
          line-height: 1.5;
          text-align: center;
          max-width: 600px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          border-left: 5px solid var(--color-secondary);
        }

        /* Estilos Responsive */
        @media (max-width: 768px) {
          .historia-timeline-container {
            box-shadow: none; /* Quitamos la sombra en móviles para el look "full-width" */
            margin: 0;
            padding: 2rem 1rem;
            border-radius: 0;
          }
          .evento img {
             height: 180px;
          }
        }
      `}</style>

      <div className="historia-header">
        <h2>Nuestra Historia 📜</h2>
      </div>

      <div className="timeline">
        {eventos.map((evento, idx) => (
          <div
            key={evento.año}
            className={`timeline-fecha${activo === idx ? " activo" : ""}`}
            onClick={() => setActivo(idx)}
          >
            {evento.año}
          </div>
        ))}
      </div>

      <div className="evento" key={eventoActivo.año}>
        <img src={eventoActivo.imagen} alt={`Evento ${eventoActivo.año}`} />
        <div className="evento-texto">
          **{eventoActivo.año}:** {eventoActivo.texto}
        </div>
      </div>
    </div>
  );
}