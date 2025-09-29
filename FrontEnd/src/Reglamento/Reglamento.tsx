import React from "react";

export default function Reglamento() {
  return (
    <div className="reglamento-timeline-container">
      <style>{`
        .reglamento-timeline-container {
          background: #f7f9fc;
          padding: 3rem;
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #1f3c88;
          font-family: 'Segoe UI', Arial, sans-serif;
          width: 100%;
        }

        .reglamento-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .reglamento-header h2 {
          margin: 0;
          color: #1f3c88;
        }

        .reglamento-main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          flex-grow: 1;
        }

        .reglamento-pdf-container {
          width: 100%;
          max-width: 900px;
          min-height: 600px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.07);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
        }

        .reglamento-pdf-iframe {
          width: 95%;
          height: 90vh;
          border: none;
          border-radius: 8px;
          overflow-x: auto;
        }

        .reglamento-footer {
          text-align: center;
          margin-top: auto;
          color: #888;
          font-size: 0.95rem;
        }

        a {
          background: #1f3c88;
          color: #fff;
          padding: 0.7rem 1.5rem;
          border-radius: 6px;
          font-weight: 800;
          text-decoration: none;
          margin-top: 8px;
          display: inline-block;
          transition: background 0.2s;
        }

        a:hover {
          background: #2746a6;
        }

        @media (max-width: 800px) {
          .reglamento-timeline-container {
            padding: 1rem;
          }
          .reglamento-pdf-container {
            min-height: 800px;
            width: 100%;
          }
        }
      `}</style>

      {/* Header */}
      <div className="reglamento-header">
        <h2>Reglamento Disciplinario</h2>
        <p style={{ color: "#2746a6", marginTop: 8, fontSize: "1.1rem" }}>
          Liga Recreativa de Handball Punilla
        </p>
      </div>

      {/* PDF y botón de descarga */}
      <div className="reglamento-main-content">
        <div className="reglamento-pdf-container">
          <iframe
            src="/REGLAMENTO.pdf"
            className="reglamento-pdf-iframe"
            title="Reglamento PDF"
          />
        </div>
        <a href="/REGLAMENTO.pdf" download>
          Descargar PDF
        </a>
      </div>

      {/* Footer */}
      <div className="reglamento-footer">
        Liga Recreativa de Handball Punilla - Agosto 2025
      </div>
    </div>
  );
}