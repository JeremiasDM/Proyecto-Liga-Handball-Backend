import React from 'react';

export default function Autoridades() {
  const autoridades = [
    { nombre: "Myriam Calderon", cargo: "Presidenta", foto: "./Autoridades/Myriam Calderon.jpeg" },
    { nombre: "Marcelo Gallardo", cargo: "Tesorero", foto: "./Autoridades/Marcelo Gallardo.jpeg" },
    { nombre: "Laura Tambe", cargo: "Secretaria", foto: "./Autoridades/Laura Tambe.jpeg" },
    { nombre: "Jesús Vergara", cargo: "Vocal Titular", foto: "./Autoridades/JesusVergara.jpeg" },
    { nombre: "Carolina Torres", cargo: "Vocal Titular", foto: "./Autoridades/Carolinatorres.jpeg" },
    { nombre: "Cristian Seijo", cargo: "Revisor de cuentas", foto: "./Autoridades/Cristian Seijo.jpeg" },
    { nombre: "Santiago Altamirano", cargo: "Revisor de cuentas", foto: "./Autoridades/Santiago Altamirano.jpeg" }
  ];

  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .autoridades-container {
          background: #f9f9f9; /* ✅ fondo claro en vez del negro */
          color: #333;
          width: 100%;
          min-height: 100vh;
          padding: 3rem 2rem;
          font-family: 'Inter', sans-serif;
        }
        
        .titulo {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          letter-spacing: 0.05rem;
          color: #222;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          justify-items: center;
        }
        
        .card {
          background: white;
          border-radius: 1.25rem;
          padding: 1.5rem;
          text-align: center;
          width: 100%;
          max-width: 300px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          cursor: pointer;

          /* Animación inicial */
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 1rem;
          margin-bottom: 1rem;
          transition: filter 0.3s ease-in-out;
        }
        
        .card:hover img {
          filter: brightness(1.05);
        }
        
        .nombre {
          font-size: 1.25rem;
          font-weight: 700;
          color: #222;
          letter-spacing: 0.02rem;
          position: relative;
        }

        /* Efecto subrayado animado */
        .nombre::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          width: 0;
          height: 2px;
          background: #1f3c88;
          transition: width 0.3s ease, left 0.3s ease;
        }
        .card:hover .nombre::after {
          width: 100%;
          left: 0;
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
          color: #222;
          margin-bottom: 1.5rem;
        }
        
        .organigrama img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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