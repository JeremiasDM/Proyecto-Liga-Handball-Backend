export default function Historia() {
  return (
    <div className="historia-container">
      <style>{`
        .historia-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 900px;
          margin: auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          line-height: 1.6;
          color: #333;
        }
        .historia-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .historia-header h2 {
          color: #1f3c88;
        }
        .historia-imagenes {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }
        .historia-imagenes img {
          width: 100%;
          max-width: 280px;
          border-radius: 8px;
          object-fit: cover;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
      `}</style>

      <div className="historia-header">
        <h2>Nuestra Historia</h2>
      </div>

      <p>
        La Liga nace en 2018 con el objetivo de desarrollar el handball en la región. A partir de noviembre de 2023,
        se convierte en la Asociación Liga Recreativa Handball Punilla por resolución 489 C/23. Actualmente, cuenta con
        más de 200 jugadores en la categoría mayores y más de 50 niños en las categorías formativas, abarcando edades de 7
        a 50 años, quienes disfrutan de este espacio de recreación y deporte cada 15 días.
      </p>

      <p>
        Las competencias anuales incluyen 9 jornadas en la categoría mayores, con sedes alternas en las distintas localidades
        participantes. En las categorías formativas se realiza un encuentro mensual, también en diferentes localidades. La asociación
        cuenta con más de 12 equipos en la categoría mayores y más de 5 equipos en las categorías formativas, que disfrutan de este
        espacio cada fin de semana. Detrás de esta organización hay una comisión y colaboradores dedicados a gestionar las necesidades
        de los jugadores y las instituciones que representan.
      </p>

      <div className="historia-imagenes">
        <img src="/foto2.jpeg" alt="Historia 1" />
        <img src="/foto4.jpeg" alt="Historia 2" />
        <img src="/foto6.jpeg" alt="Historia 3" />
      </div>
    </div>
  );
}
