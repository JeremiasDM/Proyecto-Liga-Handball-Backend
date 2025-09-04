import React, { useEffect, useState } from "react";
import RegistrarReferente from "./RegistrarReferente";
import EditarReferente from "./EditarReferente";
import VerReferentes from "./ListaReferente";
import VistaReferente from "./VistaReferentes";


type Rol = "Presidenta" | "Referente" | "Usuario";

type Referente = {
  id: number;
  nombre: string;
  apellido: string;
  categoria: string;
  dni: string;
  correo: string;
  equipo: string;
  fotoUrl?: string; 
};

// Página principal
const ReferentesPage: React.FC = () => {
  const [rolActual, setRolActual] = useState<Rol>("Usuario");
  const [referentes, setReferentes] = useState<Referente[]>([]);
  const [referenteSeleccionado, setReferenteSeleccionado] = useState<Referente | null>(null);

  useEffect(() => {
    const mockData: Referente[] = [
      { id: 1, nombre: "Juan", apellido: "Pérez", categoria: "Masculino", dni: "12345678", correo: "juan@example.com", equipo: "Cóndores", fotoUrl: "/uploads/juan.png" },
      { id: 2, nombre: "Ana", apellido: "Gómez", categoria: "Femenino", dni: "87654321", correo: "ana@example.com", equipo: "Águilas" }
    ];
    setReferentes(mockData);

    const rolGuardado = localStorage.getItem("rol") as Rol;
    if (rolGuardado) setRolActual(rolGuardado);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Gestión de Referentes</h2>

      {rolActual === "Presidenta" && (
        <RegistrarReferente onGuardar={(nuevo) => setReferentes([...referentes, nuevo])} />
      )}

      <VerReferentes
        referentes={referentes}
        rol={rolActual}
        onSeleccionar={(ref) => setReferenteSeleccionado(ref)}
      />

      {referenteSeleccionado && (
        <VistaReferente referente={referenteSeleccionado} />
      )}

      {rolActual === "Presidenta" && referenteSeleccionado && (
        <EditarReferente
          referente={referenteSeleccionado}
          onActualizar={(editado) =>
            setReferentes(referentes.map(r => r.id === editado.id ? editado : r))
          }
        />
      )}
    </div>
  );
};

export default ReferentesPage;
