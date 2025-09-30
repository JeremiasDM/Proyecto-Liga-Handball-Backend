import React from "react";
import type { Pago } from "../types/types";

type Props = {
  clubes: string[];
  pagos: Pago[];
  onRealizarPago: (club: string, tipo: "cuota" | "arbitraje") => void;
};

const estadosColor = {
  pendiente: "bg-yellow-300 text-yellow-900",
  pagado: "bg-green-300 text-green-900",
  invalido: "bg-red-300 text-red-900"
};

const TablaPagosClub: React.FC<Props> = ({ clubes, pagos, onRealizarPago }) => (
  <div className="overflow-x-auto mt-4">
    <table className="w-full border-collapse shadow bg-white rounded-xl">
      <thead className="bg-blue-900 text-white">
        <tr>
          <th className="p-2">Club</th>
          <th className="p-2">Cuota Anual</th>
          <th className="p-2">Pago Arbitraje</th>
        </tr>
      </thead>
      <tbody>
        {clubes.map(club => {
          const cuota = pagos.find(p => p.club === club && p.tipo === "cuota");
          const arbitraje = pagos.find(p => p.club === club && p.tipo === "arbitraje");
          return (
            <tr key={club} className="border-b hover:bg-gray-50">
              <td className="p-2 font-bold">{club}</td>
              <td className="p-2 flex items-center gap-2">
                <span className={`px-2 py-1 rounded ${estadosColor[cuota?.estado || "pendiente"]}`}>
                  {cuota?.estado || "pendiente"}
                </span>
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-xs"
                  onClick={() => onRealizarPago(club, "cuota")}
                  disabled={cuota?.estado === "pagado"}
                >
                  Realizar pago
                </button>
              </td>
              <td className="p-2 flex items-center gap-2">
                <span className={`px-2 py-1 rounded ${estadosColor[arbitraje?.estado || "pendiente"]}`}>
                  {arbitraje?.estado || "pendiente"}
                </span>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                  onClick={() => onRealizarPago(club, "arbitraje")}
                  disabled={arbitraje?.estado === "pagado"}
                >
                  Realizar pago
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default TablaPagosClub;