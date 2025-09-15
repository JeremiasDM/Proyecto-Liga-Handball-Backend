import React, { useEffect, useState } from "react";
import RegistrarReferente from "./RegistrarReferente";
import EditarReferente from "./EditarReferente";
import ListaReferente from "./ListaReferente";
import VistaReferente from "./VistaReferente";

export type Referente = {
  id: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  equipo: string;
};

const ReferentesPage: React.FC = () => {
  const [referentes, setReferentes] = useState<Referente[]>([]);
  const [referenteSeleccionado, setReferenteSeleccionado] = useState<Referente | null>(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("referentes");
    if (data) {
      setReferentes(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("referentes", JSON.stringify(referentes));
  }, [referentes]);

  const registrarReferente = (nuevo: Referente) => {
    setReferentes([{ ...nuevo, id: Date.now() }, ...referentes]);
  };

  const actualizarReferente = (editado: Referente) => {
    setReferentes(referentes.map((r) => (r.id === editado.id ? editado : r)));
    setReferenteSeleccionado(null);
    setEditando(false);
  };

  const eliminarReferente = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este referente?")) {
      setReferentes(referentes.filter((r) => r.id !== id));
      setReferenteSeleccionado(null);
      setEditando(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-900">
        Gestión de Referentes
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6">
        <RegistrarReferente onGuardar={registrarReferente} existentes={referentes} />
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Lista de Referentes
        </h2>
        <ListaReferente
          referentes={referentes}
          onVer={(ref) => {
            setReferenteSeleccionado(ref);
            setEditando(false);
          }}
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
          existentes={referentes}
          onActualizar={actualizarReferente}
          onCancelar={() => {
            setReferenteSeleccionado(null);
            setEditando(false);
          }}
        />
      )}
    </div>
  );
};

export default ReferentesPage;
