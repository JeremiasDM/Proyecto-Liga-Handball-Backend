import React from "react";
import type { Pago } from "../types/types";

type Props = {
  pagos: Pago[];
  onEliminar?: (id: number) => void;
  onEditar?: (pago: Pago) => void;
};

const ListaPagos: React.FC<Props> = ({ pagos, onEliminar, onEditar }) => {
  if (!pagos || pagos.length === 0) {
    return <p className="text-gray-500">No hay pagos registrados.</p>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border-collapse shadow bg-white rounded-xl">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-2">Club</th>
            <th className="p-2">Partido</th>
            <th className="p-2">Monto</th>
            <th className="p-2">Comprobante</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{pago.club}</td>
              <td className="p-2">{pago.partidoId}</td>
              <td className="p-2">${pago.monto}</td>
              <td className="p-2">{pago.comprobante}</td>
              <td className="p-2">{new Date(pago.fecha).toLocaleDateString()}</td>
              <td className="p-2">{pago.estado}</td>
              <td className="p-2 flex gap-2">
                {onEditar && (
                  <button
                    onClick={() => onEditar(pago)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                )}
                {onEliminar && (
                  <button
                    onClick={() => onEliminar(pago.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPagos;