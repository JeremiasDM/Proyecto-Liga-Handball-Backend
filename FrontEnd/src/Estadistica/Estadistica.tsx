import React from "react";

export default function Estadistica() {
  const masculino = [
    { pos: 1, equipo: { nombre: "Filosofía", escudo: "https://via.placeholder.com/50x50/1f3c88/ffffff?text=FIL" }, pts: 27, pj: 9, g: 9, e: 0, p: 0, dg: 258 },
    { pos: 2, equipo: { nombre: "Club Unión HG", escudo: "https://via.placeholder.com/50x50/1f3c88/ffffff?text=UNI" }, pts: 21, pj: 7, g: 6, e: 2, p: 0, dg: 66 },
    { pos: 3, equipo: { nombre: "Capilla del Monte", escudo: "https://via.placeholder.com/50x50/1f3c88/ffffff?text=CDM" }, pts: 18, pj: 6, g: 3, e: 3, p: 0, dg: 76 },
    { pos: 4, equipo: { nombre: "Malagueño", escudo: "https://via.placeholder.com/50x50/1f3c88/ffffff?text=MAL" }, pts: 18, pj: 6, g: 3, e: 0, p: 3, dg: 15 },
    { pos: 5, equipo: "Saldán", pts: 12, pj: 4, g: 0, e: 5, p: 0, dg: -35 },
  ];

  const femenino = [
    { pos: 1, equipo: { nombre: "Las Águilas", escudo: "https://via.placeholder.com/50x50/c2185b/ffffff?text=AGU" }, pts: 25, pj: 9, g: 8, e: 1, p: 0, dg: 200 },
    { pos: 2, equipo: { nombre: "Club Unión HG Fem", escudo: "https://via.placeholder.com/50x50/c2185b/ffffff?text=UNI" }, pts: 22, pj: 8, g: 7, e: 1, p: 0, dg: 150 },
    { pos: 3, equipo: { nombre: "Capilla del Monte Fem", escudo: "https://via.placeholder.com/50x50/c2185b/ffffff?text=CDM" }, pts: 19, pj: 7, g: 6, e: 1, p: 0, dg: 120 },
    { pos: 4, equipo: { nombre: "Malagueño Fem", escudo: "https://via.placeholder.com/50x50/c2185b/ffffff?text=MAL" }, pts: 16, pj: 6, e: 5, p: 1, dg: 80 },
    { pos: 5, equipo: { nombre: "Saldán Fem", escudo: "https://via.placeholder.com/50x50/c2185b/ffffff?text=SAL" }, pts: 14, pj: 6, g: 4, e: 2, p: 0, dg: 60 },
  ];

  const tablaStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden", // Para que los bordes redondeados se apliquen a los td
  };

  const thtdStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  };

  const thStyle: React.CSSProperties = {
    ...thtdStyle,
    backgroundColor: '#1f3c88',
    color: 'white',
    fontWeight: 'bold',
  };

  const thStyleFem: React.CSSProperties = {
    ...thtdStyle,
    backgroundColor: '#c2185b',
    color: 'white',
    fontWeight: 'bold',
  };

  const leaderRowStyle: React.CSSProperties = {
    backgroundColor: '#e6f7ff',
    fontWeight: 'bold',
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1500px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}>
        Tablas de Posiciones
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "500px" }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: "1rem" }}>
            {masculino[0] && masculino[0].equipo.escudo && (
              <img
                src={masculino[0].equipo.escudo}
                alt={`Escudo del equipo ${masculino[0].equipo.nombre}`}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
            )}
            <h2 style={{ color: "#1f3c88", margin: 0 }}>
              Masculino
            </h2>
          </div>
          <table style={tablaStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Pos</th>
                <th style={thStyle}>Equipo</th>
                <th style={thStyle}>Pts</th>
                <th style={thStyle}>PJ</th>
                <th style={thStyle}>G</th>
                <th style={thStyle}>E</th>
                <th style={thStyle}>P</th>
                <th style={thStyle}>DG</th>
              </tr>
            </thead>
            <tbody>
              {masculino.map((eq) => (
                <tr key={eq.pos} style={eq.pos === 1 ? leaderRowStyle : {}}>
                  <td style={thtdStyle}>{eq.pos}</td>
                  <td style={thtdStyle}>{typeof eq.equipo === 'object' ? eq.equipo.nombre : eq.equipo}</td>
                  <td style={thtdStyle}>{eq.pts}</td>
                  <td style={thtdStyle}>{eq.pj}</td>
                  <td style={thtdStyle}>{eq.g}</td>
                  <td style={thtdStyle}>{eq.e}</td>
                  <td style={thtdStyle}>{eq.p}</td>
                  <td style={thtdStyle}>{eq.dg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ flex: 1, minWidth: "500px" }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginBottom: "1rem" }}>
            <h2 style={{ color: "#c2185b", margin: 0, marginRight: "10px" }}>
              Femenino
            </h2>
            {femenino[0] && femenino[0].equipo.escudo && (
              <img
                src={femenino[0].equipo.escudo}
                alt={`Escudo del equipo ${femenino[0].equipo.nombre}`}
                style={{ width: "50px", height: "50px" }}
              />
            )}
          </div>
          <table style={tablaStyle}>
            <thead>
              <tr>
                <th style={thStyleFem}>Pos</th>
                <th style={thStyleFem}>Equipo</th>
                <th style={thStyleFem}>Pts</th>
                <th style={thStyleFem}>PJ</th>
                <th style={thStyleFem}>G</th>
                <th style={thStyleFem}>E</th>
                <th style={thStyleFem}>P</th>
                <th style={thStyleFem}>DG</th>
              </tr>
            </thead>
            <tbody>
              {femenino.map((eq) => (
                <tr key={eq.pos} style={eq.pos === 1 ? { ...leaderRowStyle, backgroundColor: '#fff0f5' } : {}}>
                  <td style={thtdStyle}>{eq.pos}</td>
                  <td style={thtdStyle}>{typeof eq.equipo === 'object' ? eq.equipo.nombre : eq.equipo}</td>
                  <td style={thtdStyle}>{eq.pts}</td>
                  <td style={thtdStyle}>{eq.pj}</td>
                  <td style={thtdStyle}>{eq.g}</td>
                  <td style={thtdStyle}>{eq.e}</td>
                  <td style={thtdStyle}>{eq.p}</td>
                  <td style={thtdStyle}>{eq.dg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}