import React, { useState } from "react";
import RegistrarReferente from "./RegistrarReferente";
import EditarReferente from "./EditarReferente";
import ListaReferente from "./ListaReferente";
import VistaReferente from "./VistaReferente";
import { useReferentes } from "../hooks/useReferentes";
import { validarReferente } from "../utils/validaciones";
import type { Referente } from "../types/types";

const ReferentesPage: React.FC = () => {
  const { referentes, agregar, actualizar, eliminar } = useReferentes();
  const [referenteSeleccionado, setReferenteSeleccionado] = useState<Referente | null>(null);
  const [editando, setEditando] = useState(false);

  const registrarReferente = (nuevo: Referente) => {
    const error = validarReferente(nuevo, referentes);
    if (error) {
      alert(error);
      return;
    }
    agregar({ ...nuevo, id: Date.now() });
  };

  const actualizarReferente = (editado: Referente) => {
    const error = validarReferente(editado, referentes);
    if (error) {
      alert(error);
      return;
    }
    actualizar(editado);
    setEditando(false);
    setReferenteSeleccionado(null);
  };

  const eliminarReferente = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este referente?")) {
      eliminar(id);
      setReferenteSeleccionado(null);
      setEditando(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Gestión de Referentes
      </h2>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 mb-6">
        <RegistrarReferente onGuardar={registrarReferente} />
      </div>
      <div className="bg-white shadow-md rounded-xl p-6">
        <ListaReferente
          referentes={referentes}
          onVer={setReferenteSeleccionado}
          onEditar={(ref) => {
            setReferenteSeleccionado(ref);
            setEditando(true);
          }}
          onEliminar={eliminarReferente}
        />
      </div>
      {referenteSeleccionado && !editando && (
        <VistaReferente
          referente={referenteSeleccionado}
          onVolver={() => setReferenteSeleccionado(null)}
        />
      )}
      {referenteSeleccionado && editando && (
        <EditarReferente
          referente={referenteSeleccionado}
          onActualizar={actualizarReferente}
          onCancelar={() => {
            setEditando(false);
            setReferenteSeleccionado(null);
          }}
        />
      )}
    </div>
  );
};

export default ReferentesPage;
