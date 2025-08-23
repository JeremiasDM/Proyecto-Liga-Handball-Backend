import React from 'react';

const ListaFixture = ({ jornadas }) => {
  return (
    <div style={{ backgroundColor: '#1F3C88', padding: '20px', borderRadius: '10px', color: 'white' }}>
      <h2>Fixture</h2>
      {jornadas.length === 0 ? (
        <p>No hay jornadas registradas.</p>
      ) : (
        jornadas.map((jornada, idx) => (
          <div key={idx} style={{ marginBottom: '20px', border: '1px solid white', padding: '10px', borderRadius: '8px' }}>
            <h4>{jornada.fecha} - {jornada.lugar} - {jornada.hora}</h4>
            <ul>
              {jornada.partidos.map((p, i) => (
                <li key={i}>
                  {p.equipoA} vs {p.equipoB} ({p.categoria}) - Árbitro: {p.arbitro} - Estado: {p.estado}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaFixture;
