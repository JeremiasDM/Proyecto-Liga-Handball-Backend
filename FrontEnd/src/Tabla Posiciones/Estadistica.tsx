import React from "react";

export default function Estadistica() {
  const masculino = [
    { pos: 1, equipo: "Filosofía", pts: 27, pj: 9, g: 9, e: 0, p: 0, dg: 258 },
    { pos: 2, equipo: "Club Unión HG", pts: 21, pj: 7, g: 6, e: 2, p: 0, dg: 66 },
    { pos: 3, equipo: "Capilla del Monte", pts: 18, pj: 6, g: 3, e: 3, p: 0, dg: 76 },
    { pos: 4, equipo: "Malagueño", pts: 18, pj: 6, g: 3, e: 0, p: 3, dg: 15 },
    { pos: 5, equipo: "Saldán", pts: 12, pj: 4, g: 0, e: 5, p: 0, dg: -35 },
  ];

  const femenino = [
    { pos: 1, equipo: "Las Águilas", pts: 25, pj: 9, g: 8, e: 1, p: 0, dg: 200 },
    { pos: 2, equipo: "Club Unión HG Fem", pts: 22, pj: 8, g: 7, e: 1, p: 0, dg: 150 },
    { pos: 3, equipo: "Capilla del Monte Fem", pts: 19, pj: 7, g: 6, e: 1, p: 0, dg: 120 },
    { pos: 4, equipo: "Malagueño Fem", pts: 16, pj: 6, g: 5, e: 1, p: 0, dg: 80 },
    { pos: 5, equipo: "Saldán Fem", pts: 14, pj: 6, g: 4, e: 2, p: 0, dg: 60 },
  ];

  const tablaStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "2rem",
  };

  const thtdStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#1f3c88" }}>
        Tabla de Posiciones Masculino
      </h1>
      <table style={tablaStyle}>
        <thead>
          <tr>
            <th style={thtdStyle}>Pos</th>
            <th style={thtdStyle}>Equipo</th>
            <th style={thtdStyle}>Pts</th>
            <th style={thtdStyle}>PJ</th>
            <th style={thtdStyle}>G</th>
            <th style={thtdStyle}>E</th>
            <th style={thtdStyle}>P</th>
            <th style={thtdStyle}>DG</th>
          </tr>
        </thead>
        <tbody>
          {masculino.map((eq) => (
            <tr key={eq.pos}>
              <td style={thtdStyle}>{eq.pos}</td>
              <td style={thtdStyle}>{eq.equipo}</td>
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

      <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#c2185b" }}>
        Tabla de Posiciones Femenino
      </h1>
      <table style={tablaStyle}>
        <thead>
          <tr>
            <th style={thtdStyle}>Pos</th>
            <th style={thtdStyle}>Equipo</th>
            <th style={thtdStyle}>Pts</th>
            <th style={thtdStyle}>PJ</th>
            <th style={thtdStyle}>G</th>
            <th style={thtdStyle}>E</th>
            <th style={thtdStyle}>P</th>
            <th style={thtdStyle}>DG</th>
          </tr>
        </thead>
        <tbody>
          {femenino.map((eq) => (
            <tr key={eq.pos}>
              <td style={thtdStyle}>{eq.pos}</td>
              <td style={thtdStyle}>{eq.equipo}</td>
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
  );
}
