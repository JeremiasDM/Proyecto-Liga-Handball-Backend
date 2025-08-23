import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";

(pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function Reglamento() {
  const [pdf, setPdf] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cambia la ruta por la de tu PDF
  const pdfUrl = "./REGLAMENTO DISCIPLINARIO LIGA RECREATIVA DE HANDBALL PUNILLA.pdf";
  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const loadedPdf = await loadingTask.promise;
      setPdf(loadedPdf);
      setNumPages(loadedPdf.numPages);
    };
    fetchPdf();
  }, [pdfUrl]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdf || !canvasRef.current) return;
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
    };
    renderPage();
  }, [pdf, pageNum]);

  const handlePrev = () => setPageNum((n) => (n > 1 ? n - 1 : n));
  const handleNext = () => setPageNum((n) => (n < numPages ? n + 1 : n));

  return (
    <div className="container">
      <style>{`
        body {
          background-color: #0B0E19;
          color: #FFFFFF;
          font-family: Arial, sans-serif;
        }
        .container {
          background-color: #1F3C88;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          width: 90%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .header {
          width: 100%;
          margin-bottom: 20px;
        }
        .main-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #pdf-container {
          width: 100%;
          height: 700px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #pdf-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        .navigation-buttons {
          margin-top: 20px;
        }
        button {
          background-color: #FFFFFF;
          color: #1F3C88;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          margin: 0 10px;
        }
        button:hover {
          background-color: #ddd;
        }
        .footer {
          width: 100%;
          margin-top: 20px;
        }
        @media (max-width: 700px) {
          .container {
            padding: 8px;
          }
          #pdf-container {
            height: 350px;
          }
        }
      `}</style>
      <header className="header">
        <h1>Reglamento Disciplinario - Liga Recreativa de Handball Punilla</h1>
      </header>
      <main className="main-content">
        <div id="pdf-container">
          <canvas id="pdf-canvas" ref={canvasRef}></canvas>
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePrev} disabled={pageNum <= 1}>
            Página Anterior
          </button>
          <span style={{ color: "#fff", margin: "0 10px" }}>
            Página {pageNum} de {numPages}
          </span>
          <button onClick={handleNext} disabled={pageNum >= numPages}>
            Página Siguiente
          </button>
        </div>
      </main>
      <footer className="footer">
        <p>Liga Recreativa de Handball Punilla - Agosto 2023</p>
      </footer>
    </div>
  );
}