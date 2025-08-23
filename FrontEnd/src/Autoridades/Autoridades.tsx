export default function Autoridades() {
  const autoridades = [
    {
      nombre: "Myriam Calderon",
      cargo: "Presidenta",
      foto: "./Myriam Calderon.jpeg"
    },
    {
      nombre: "Marcelo Gallardo",
      cargo: "Tesorero",
      foto: "./Marcelo Gallardo.jpeg"
    },
    {
      nombre: "Laura Tambe",
      cargo: "Secretaria",
      foto: "./Laura Tambe.jpeg"
    },
    {
      nombre: "Jesús Vergara",
      cargo: "Vocal Titular",
      foto: "./JesusVergara.jpeg"
    },
    {
      nombre: "Carolina Torres",
      cargo: "Vocal Titular",
      foto: "./Carolinatorres.jpeg"
    },
    {
      nombre: "Cristian Seijo",
      cargo: "Revisor de cuentas",
      foto: "./Cristian Seijo.jpeg"
    },
    {
      nombre: "Santiago Altamirano",
      cargo: "Revisor de cuentas",
      foto: "./Santiago Altamirano.jpeg"
    }
  ];

  return (
    <>
      <style>{`
        .autoridades-container {
          background: #0B0E19;
          color: white;
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        .titulo {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          justify-items: center;
        }
        .card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 1rem;
          text-align: center;
          width: 200px;
          backdrop-filter: blur(5px);
        }
        .card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .nombre {
          font-size: 1.1rem;
          font-weight: 600;
        }
        .cargo {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        .organigrama {
          margin-top: 3rem;
          text-align: center;
        }
        .organigrama img {
          max-width: 100%;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 0.5rem;
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
          <h2 style={{margin:"2rem 0 1rem"}}>Organigrama</h2>
          <img src="/Organigrama.png" alt="Organigrama" />
        </div>
      </div>
    </>
  );
}
