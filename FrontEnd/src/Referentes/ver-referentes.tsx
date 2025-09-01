import React, { useState } from "react";

const referentesSimulados = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', equipo: 'Los Cóndores' },
  { id: 2, nombre: 'Ana', apellido: 'Gómez', equipo: 'Las Águilas' },
  { id: 3, nombre: 'Carlos', apellido: 'López', equipo: 'Los Halcones' },
  { id: 4, nombre: 'Marta', apellido: 'Rodríguez', equipo: 'Las Panteras' },
  { id: 5, nombre: 'Jorge', apellido: 'García', equipo: 'Los Titanes' },
  { id: 6, nombre: 'Sofía', apellido: 'Martínez', equipo: 'Los Dragones' },
  { id: 7, nombre: 'Pedro', apellido: 'Fernández', equipo: 'Los Gigantes' },
];

export default function VerReferentes() {
  const [busqueda, setBusqueda] = useState("");
  const referentesFiltrados = referentesSimulados.filter(r =>
    `${r.nombre} ${r.apellido} ${r.equipo}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 24, maxWidth: 600, margin: "0 auto", boxShadow: "0 4px 12px rgba(0,0,0,0.07)" }}>
      <h2 style={{ color: "#1f3c88", marginBottom: 16 }}>Referentes</h2>
      <input
        type="text"
        placeholder="Buscar referente o equipo..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "0.7rem 1rem",
          borderRadius: 8,
          border: "1px solid #bfc8e6",
          marginBottom: 20,
          fontSize: "1rem"
        }}
      />
      <div>
        {referentesFiltrados.length === 0 ? (
          <p style={{ color: "#888" }}>No se encontraron referentes.</p>
        ) : (
          referentesFiltrados.map(r => (
            <div key={r.id} style={{
              background: "#f7f9fc",
              borderRadius: 8,
              padding: "1rem",
              marginBottom: 12,
              boxShadow: "0 2px 8px rgba(31,60,136,0.04)"
            }}>
              <strong>{r.nombre} {r.apellido}</strong> <br />
              <span style={{ color: "#1f3c88" }}>{r.equipo}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}