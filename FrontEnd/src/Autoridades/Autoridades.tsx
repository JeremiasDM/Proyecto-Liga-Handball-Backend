import React from 'react';

export default function Autoridades() {
  const autoridades = [
    {
      nombre: "Myriam Calderon",
      cargo: "Presidenta",
      foto: "./Autoridades/Myriam Calderon.jpeg"
    },
    {
      nombre: "Marcelo Gallardo",
      cargo: "Tesorero",
      foto: "./Autoridades/Marcelo Gallardo.jpeg"
    },
    {
      nombre: "Laura Tambe",
      cargo: "Secretaria",
      foto: "./Autoridades/Laura Tambe.jpeg"
    },
    {
      nombre: "Jesús Vergara",
      cargo: "Vocal Titular",
      foto: "./Autoridades/JesusVergara.jpeg"
    },
    {
      nombre: "Carolina Torres",
      cargo: "Vocal Titular",
      foto: "./Autoridades/Carolinatorres.jpeg"
    },
    {
      nombre: "Cristian Seijo",
      cargo: "Revisor de cuentas",
      foto: "./Autoridades/Cristian Seijo.jpeg"
    },
    {
      nombre: "Santiago Altamirano",
      cargo: "Revisor de cuentas",
      foto: "./Autoridades/Santiago Altamirano.jpeg"
    }
  ];

  return (
    <>
      <style>{`
        /* * 1. SOLUCIÓN AL PROBLEMA DE LA ALTURA:
        * Configura los elementos raíz para que el contenedor ocupe toda la pantalla.
        */
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        /* * 2. MEJORAS ESTÉTICAS GENERALES
        */
        .autoridades-container {
          background: radial-gradient(circle at center, #1a1e2a 0%, #0b0e19 100%);
          color: #E0E0E0;
          max-width: 100vw;
          min-height: 100vh;
          padding: 3rem 2.5rem;
          font-family: 'Inter', sans-serif;
          width: 100%;
          height: 100%;
          transition: background 0.5s ease;
        }
        
        .titulo {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          letter-spacing: 0.05rem;
          color: white;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          justify-items: center;
        }
        
        .card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
          /* ELIMINADO: border: 1px solid rgba(255,255,255,0.1); */
          border: none; /* Asegura que no haya ningún borde */
          border-radius: 1.25rem;
          padding: 1.5rem;
          text-align: center;
          width: 100%;
          max-width: 300px;
          backdrop-filter: blur(8px);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          cursor: pointer;
        }
        
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 45px 0 rgba(0, 0, 0, 0.25), 0 0 20px rgba(255, 255, 255, 0.1);
        }
        
        .card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 1rem;
          margin-bottom: 1rem;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
          transition: filter 0.3s ease-in-out;
        }
        
        .card:hover img {
          filter: brightness(1.1);
        }
        
        .nombre {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          letter-spacing: 0.02rem;
        }
        
        .cargo {
          font-size: 1rem;
          opacity: 0.7;
          letter-spacing: 0.05rem;
          margin-top: 0.5rem;
        }
        
        .organigrama {
          margin-top: 5rem;
          text-align: center;
        }
        
        .organigrama h2 {
          font-size: 2rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1.5rem;
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
        }
        
        .organigrama img {
          max-width: 100%;
          height: auto;
          /* ELIMINADO: border: 1px solid rgba(255,255,255,0.2); */
          border: none; /* Asegura que no haya ningún borde */
          border-radius: 1rem;
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease-in-out;
        }
        
        .organigrama img:hover {
          transform: scale(1.02);
        }
      `}</style>
      
      <div className="autoridades-container">
        <h1 className="titulo">Autoridades de la Organización</h1>
        <div className="grid">
          {autoridades.map((a, index) => (
            <div className="card" key={index}>
              <img src={a.foto} alt={a.nombre} />
              <div className="nombre">{a.nombre}</div>
              <div className="cargo">{a.cargo}</div>
            </div>
          ))}
        </div>

        <div className="organigrama">
          <h2>Organigrama</h2>
          <img src="/Organigrama.png" alt="Organigrama" />
        </div>
      </div>
    </>
  );
}