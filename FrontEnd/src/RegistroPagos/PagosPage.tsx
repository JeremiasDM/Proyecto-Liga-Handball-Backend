import React, { useState } from "react";
import { usePagos } from "../hooks/usePagos";
import TablaPagosClub from "./TablaPagosClub";
import FormularioCuota from "./FormularioCuota";
import FormularioArbitraje from "./FormularioArbitraje";
import type { Pago } from "../types/types";
import { verificarSancion } from "../utils/validaciones";

const clubes = [
  "Club A1", "Club A2", "Club A3", "Club A4",
  "Club B1", "Club B2", "Club B3", "Club B4"
];

const montoMinimoCuota = 10000;
const montoMinimoArbitraje = 35000;

const styleConfig = {
  container: "pagos-container",
  contentWrapper: "content-wrapper",
  title: "main-title",
  modalBackdrop: "modal-backdrop",
  sancionesSectionWrapper: "sanciones-section-wrapper",
  sancionesHeader: "sanciones-header",
  sancionesTitle: "sanciones-title",
  sancionesBody: "sanciones-body",
  sancionesList: "sanciones-list",
  sancionItem: "sancion-item",
  sancionIcon: "sancion-icon",
  sancionClub: "sancion-club",
  sancionDescription: "sancion-description",
  sancionTypeBadge: "sancion-type-badge",
  sancionMetadata: "sancion-metadata",
  noSancionesMessage: "no-sanciones-message"
};

// ============================================
// SECCIÓN DE ESTILOS CSS PLANOS INYECTADOS
// ============================================
const globalStyles = `
/* Estructura Principal */
.pagos-container {
  min-height: 100vh;
  background-color: #f3f4f6; /* bg-gray-100 */
  padding: 1rem; /* p-4 */
}
@media (min-width: 768px) {
  .pagos-container {
    padding: 2rem; /* md:p-8 */
  }
}

.content-wrapper {
  max-width: 80rem; /* max-w-7xl */
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff; /* bg-white */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
  border-radius: 0.5rem; /* rounded-lg */
  padding: 1.5rem; /* p-6 */
  display: flex;
  flex-direction: column;
  gap: 2rem; /* space-y-8 */
}

.main-title {
  font-size: 1.875rem; /* text-3xl */
  font-weight: 800; /* font-extrabold */
  color: #1f2937; /* text-gray-800 */
  border-bottom: 2px solid #e5e7eb; /* border-b-2 */
  padding-bottom: 1rem; /* pb-4 */
  margin-bottom: 1.5rem; /* mb-6 */
}

/* Estilos de Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5); /* bg-black bg-opacity-50 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

/* Sección de Sanciones */
.sanciones-section-wrapper {
  margin-top: 2.5rem; /* mt-10 */
  padding: 1.25rem; /* p-5 */
  border: 2px solid #fca5a5; /* border-2 border-red-300 */
  border-radius: 0.75rem; /* rounded-xl */
  background-color: #fef2f2; /* bg-red-50 */
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); /* shadow-inner */
}

.sanciones-header {
  margin-bottom: 1rem; /* mb-4 */
  padding-bottom: 0.5rem; /* pb-2 */
  border-bottom: 1px solid #fee2e2; /* border-b border-red-200 */
}

.sanciones-title {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-2 */
  font-size: 1.25rem; /* text-xl */
  font-weight: 700; /* font-bold */
  color: #b91c1c; /* text-red-700 */
}

.sanciones-title svg {
  color: #dc2626; /* text-red-600 */
  width: 1.75rem;
  height: 1.75rem;
}

.sanciones-body {
  max-height: 20rem; /* max-h-80 */
  overflow-y: auto;
}

.sanciones-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* space-y-3 */
}

.sancion-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem; /* gap-4 */
  padding: 0.75rem; /* p-3 */
  background-color: #ffffff; /* bg-white */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06); /* shadow-md */
  transition: background-color 0.2s;
  cursor: default;
  border: 1px solid #fee2e2; /* border border-red-100 */
}

.sancion-item:hover {
  background-color: #fef2f2; /* hover:bg-red-100 */
}

.sancion-icon {
  font-size: 1.5rem; /* text-2xl */
  flex-shrink: 0;
}

.sancion-club {
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
  color: #111827; /* text-gray-900 */
}

.sancion-description {
  font-size: 0.875rem; /* text-sm */
  color: #4b5563; /* text-gray-600 */
  margin-top: 0.125rem; /* mt-0.5 */
}

.sancion-type-badge {
  display: inline-block;
  padding: 0.125rem 0.5rem; /* px-2 py-0.5 */
  margin-right: 0.5rem;
  font-size: 0.75rem; /* text-xs */
  font-weight: 500; /* font-medium */
  border-radius: 9999px; /* rounded-full */
  background-color: #fecaca; /* bg-red-200 */
  color: #991b1b; /* text-red-800 */
  text-transform: uppercase;
}

.sancion-metadata {
  font-size: 0.75rem; /* text-xs */
  color: #6b7280; /* text-gray-500 */
  margin-top: 0.25rem; /* mt-1 */
}

.sancion-metadata .font-semibold {
  font-weight: 600;
  color: #b91c1c; /* text-red-700 */
}

.no-sanciones-message {
  text-align: center;
  padding: 1.25rem; /* p-5 */
  color: #4b5563; /* text-gray-600 */
  background-color: #ecfdf5; /* bg-green-50 */
  border-radius: 0.5rem; /* rounded-lg */
  border: 1px solid #a7f3d0; /* border border-green-200 */
}
`;
// ============================================

const PagosPage: React.FC = () => {
  const { pagos, agregar} = usePagos();
  const [modal, setModal] = useState<{ tipo: "cuota" | "arbitraje"; club: string } | null>(null);

  const handleRealizarPago = (club: string, tipo: "cuota" | "arbitraje") => {
    setModal({ tipo, club });
  };

  const handleGuardarPago = (pago: Pago) => {
    agregar(pago);
    setModal(null);
  };
  
  const handleCerrarModal = () => {
    setModal(null);
  }
  
  // Asumiendo que verificarSancion devuelve una cadena de texto o un valor truthy si hay sanción
  const sanciones = pagos.filter(p => verificarSancion(p));
  
  return (
    <>
      {/* ⚠️ INYECCIÓN DE ESTILOS CSS PLANOS ⚠️ */}
      {/* Esto asegura que las clases como .pagos-container tengan estilos definidos */}
      <style>{globalStyles}</style>

      <div className={styleConfig.container}>
        <div className={styleConfig.contentWrapper}>
          
          {/* Título */}
          <h2 className={styleConfig.title}>
            Gestión de Pagos de Clubes
          </h2>
          
          <TablaPagosClub clubes={clubes} pagos={pagos} onRealizarPago={handleRealizarPago} />
          
          {/* Modales de Formulario */}
          {(modal?.tipo === "cuota" || modal?.tipo === "arbitraje") && (
            <div className={styleConfig.modalBackdrop}>
              {modal.tipo === "cuota" && (
                <FormularioCuota
                  club={modal.club}
                  montoMinimo={montoMinimoCuota}
                  onGuardar={handleGuardarPago}
                  onCerrar={handleCerrarModal} 
                />
              )}
              {modal.tipo === "arbitraje" && (
                <FormularioArbitraje
                  club={modal.club}
                  partidos={[]}
                  montoMinimo={montoMinimoArbitraje}
                  onGuardar={handleGuardarPago}
                  onCerrar={handleCerrarModal} 
                />
              )}
            </div>
          )}

          {/* Sección de Sanciones */}
          <div className={styleConfig.sancionesSectionWrapper}>
            <div className={styleConfig.sancionesHeader}>
              <h3 className={styleConfig.sancionesTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                ⚠️ Aviso de Sanciones Pendientes
              </h3>
            </div>
            
            <div className={styleConfig.sancionesBody}>
              <ul className={styleConfig.sancionesList}>
                {sanciones.map(p => {
                  // Asumiendo que verificarSancion(p) devuelve el texto de la sanción si existe
                  const sancion = verificarSancion(p); 
                  return (
                    <li 
                      key={p.id} 
                      className={styleConfig.sancionItem}
                    >
                      <span className={styleConfig.sancionIcon}>
                        🛑
                      </span>
                      <div className="flex-1">
                        <p className={styleConfig.sancionClub}>
                          {p.club}
                        </p>
                        <p className={styleConfig.sancionDescription}>
                          <span className={styleConfig.sancionTypeBadge}>
                            {p.tipo}
                          </span>
                          {sancion}
                        </p>
                        <p className={styleConfig.sancionMetadata}>
                          Pago N°: {p.id} | Estado: <span className="font-semibold">{p.estado.toUpperCase()}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}

                {/* Mensaje si no hay sanciones */}
                {sanciones.length === 0 && (
                  <p className={styleConfig.noSancionesMessage}>
                    ✅ No hay sanciones o pagos inválidos registrados actualmente.
                  </p>
                )}
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default PagosPage;
