import React, { useState } from "react";

const eventos = [
  {
    año: 2018,
    imagen: "/foto1.jpeg",
    texto: "Texto de relleno para el año 2018. Aquí puedes contar el inicio de la liga y los primeros pasos.",
  },
  {
    año: 2019,
    imagen: "/foto2.jpeg",
    texto: "Texto de relleno para el año 2019. Describe los avances y logros de este año.",
  },
  {
    año: 2020,
    imagen: "/foto3.jpeg",
    texto: "Texto de relleno para el año 2020. Puedes mencionar desafíos y actividades realizadas.",
  },
  {
    año: 2021,
    imagen: "/foto4.jpeg",
    texto: "Texto de relleno para el año 2021. Resalta eventos importantes o cambios.",
  },
  {
    año: 2022,
    imagen: "/foto5.jpeg",
    texto: "Texto de relleno para el año 2022. Agrega información relevante de este año.",
  },
  {
    año: 2023,
    imagen: "/foto6.jpeg",
    texto: "Texto de relleno para el año 2023. Menciona la resolución y el crecimiento.",
  },
  {
    año: 2024,
    imagen: "/foto7.jpeg",
    texto: "Texto de relleno para el año 2024. Habla sobre la actualidad y proyecciones.",
  },
];

export default function Historia() {
  const [activo, setActivo] = useState(0);

  return (
    <div className="historia-timeline-container">
      <style>{`
        body {
            margin: 0;
            padding: 2.5;
            box-sizing: border-box;
        }
        .historia-timeline-container {
          background: #f0f2f5;
          color: #333;
          width: 80vw;
          min-height: 50vh;
          padding: 2rem ;
          box-sizing: border-box; /* Asegura que el padding no se agregue al ancho total */
        }
        .historia-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .timeline {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          padding: 0 1rem;
        }
        .timeline-fecha {
          cursor: pointer;
          padding: 0.7rem 1.2rem;
          border-radius: 20px;
          background: #e9eef6;
          color: #1f3c88;
          font-weight: 600;
          border: 2px solid transparent;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .timeline-fecha.activo {
          background: #1f3c88;
          color: #fff;
          border-color: #1f3c88;
          box-shadow: 0 2px 8px rgba(31,60,136,0.08);
        }
        .evento {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          padding: 0 1rem;
        }
        .evento img {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 10px;
          object-fit: cover;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        }
        .evento-texto {
          background: #fff;
          padding: 1.2rem 1.5rem;
          border-radius: 8px;
          font-size: 1.1rem;
          text-align: center;
          max-width: 500px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
      `}</style>

      <div className="historia-header">
        <h2>Nuestra Historia</h2>
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

      <div className="evento">
        <img src={eventos[activo].imagen} alt={`Evento ${eventos[activo].año}`} />
        <div className="evento-texto">{eventos[activo].texto}</div>
      </div>
    </div>
  );
}