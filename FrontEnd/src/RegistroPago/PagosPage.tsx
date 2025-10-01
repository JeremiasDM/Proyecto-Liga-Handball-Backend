import React, { useState } from "react";
import { usePagos } from "../hooks/usePagos";
import TablaPagosClub from "./TablaPagosClub";
import FormularioCuota from "./FormularioCuota";
import FormularioArbitraje from "./FormularioArbitraje";
import type { Pago } from "../types/types";
import { verificarSancion } from "./utils/validaciones";

const clubes = [
  "Club A1", "Club A2", "Club A3", "Club A4",
  "Club B1", "Club B2", "Club B3", "Club B4"
];

const montoMinimoCuota = 10000;
const montoMinimoArbitraje = 35000;

const PagosPage: React.FC = () => {
  const { pagos, agregar } = usePagos();
  const [modal, setModal] = useState<{ tipo: "cuota" | "arbitraje"; club: string } | null>(null);
  const [formCompletado, setFormCompletado] = useState(false);

  const handleRealizarPago = (club: string, tipo: "cuota" | "arbitraje") => {
    setModal({ tipo, club });
    setFormCompletado(false);
  };

  const handleGuardarPago = (pago: Pago) => {
    agregar(pago);
    setFormCompletado(true);
  };

  const handleVolver = () => {
    setModal(null);
    setFormCompletado(false);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Gestión de Pagos
      </h2>
      {!modal && (
        <>
          <TablaPagosClub clubes={clubes} pagos={pagos} onRealizarPago={handleRealizarPago} />
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-2 text-blue-900">Sanciones Simuladas</h3>
            <ul>
              {pagos.map(p => {
                const sancion = verificarSancion(p);
                return sancion ? (
                  <li key={p.id} className="text-red-600">
                    {p.club} ({p.tipo}): {sancion}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </>
      )}
      {modal && !formCompletado && modal.tipo === "cuota" && (
        <FormularioCuota
          club={modal.club}
          montoMinimo={montoMinimoCuota}
          onGuardar={handleGuardarPago}
        />
      )}
      {modal && !formCompletado && modal.tipo === "arbitraje" && (
        <FormularioArbitraje
          club={modal.club}
          partidos={[]}
          montoMinimo={montoMinimoArbitraje}
          onGuardar={handleGuardarPago}
        />
      )}
      {modal && formCompletado && (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-green-700 mb-4">¡Formulario completado!</h3>
          <p className="mb-6 text-gray-700">El pago fue registrado correctamente.</p>
          <button
            onClick={handleVolver}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Volver a la gestión de pagos
          </button>
        </div>
      )}
    </div>
  );
};

export default PagosPage;