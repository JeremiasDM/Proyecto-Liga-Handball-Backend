import React from "react";

export default function Reglamento() {
  return (
    <div className="reglamento-timeline-container">
      <style>{`
        .reglamento-timeline-container {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          max-width: 900px;
          margin: 2rem auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.07);
          color: #1f3c88;
          font-family: 'Segoe UI', Arial, sans-serif;
        }
        .reglamento-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .reglamento-header h2 {
          margin: 0;
          color: #1f3c88;
        }
        .reglamento-main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .reglamento-pdf-container {
          width: 100%;
          min-height: 500px;
          background: #f7f9fc;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(31,60,136,0.06);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
          overflow-x: auto;
        }
        .reglamento-footer {
          text-align: center;
          margin-top: 2rem;
          color: #888;
          font-size: 0.95rem;
        }
        @media (max-width: 700px) {
          .reglamento-timeline-container {
            padding: 1rem;
          }
          .reglamento-pdf-container {
            min-height: 250px;
          }
        }
      `}</style>
      <div className="reglamento-header">
        <h2>Reglamento Disciplinario</h2>
        <p style={{ color: "#2746a6", marginTop: 8, fontSize: "1.1rem" }}>
          Liga Recreativa de Handball Punilla
        </p>
      </div>
      <div className="reglamento-main-content">
        <div className="reglamento-pdf-container">
          <iframe
            src="/REGLAMENTO.pdf"
            width="100%"
            height="600px"
            style={{ border: "none", borderRadius: 8 }}
            title="Reglamento PDF"
          />
        </div>
        <a
          href="/REGLAMENTO.pdf"
          download
          style={{
            background: "#1f3c88",
            color: "#fff",
            padding: "0.7rem 1.5rem",
            borderRadius: 6,
            fontWeight: 600,
            textDecoration: "none",
            marginTop: 8,
            display: "inline-block",
            transition: "background 0.2s",
          }}
        >
          Descargar PDF
        </a>
      </div>
      <div className="reglamento-footer">
        Liga Recreativa de Handball Punilla - Agosto 2025
      </div>
    </div>
  );
}