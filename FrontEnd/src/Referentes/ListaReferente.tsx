import React from "react";
// (Pega tus 'tablaStyles' aquí)
// ...

// --- Definiciones de tipo (ajustadas) ---
interface Club {
  id: number;
  nombre: string;
}

interface Referente {
  id: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  clubId: number;
  club: Club; // <-- La API devuelve un objeto 'club'
}

interface Props {
  referentes: Referente[];
  onVer: (referente: Referente) => void;
  onEditar?: (referente: Referente) => void;
  onEliminar?: (id: number) => void;
}

// (Pega tus 'tablaStyles' aquí)
const tablaStyles = { /* ... tu objeto de estilos ... */ };

const ListaReferente: React.FC<Props> = ({
  referentes,
  onVer,
  onEditar,
  onEliminar,
}) => {
  if (!referentes || referentes.length === 0) {
    return (
      <p style={{ color: "#6b7280", textAlign: "center", padding: "20px" }}>
        No hay referentes registrados.
      </p>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={tablaStyles.tableHeader}>
          <tr>
            <th style={{ ...tablaStyles.headerCell, borderTopLeftRadius: "10px" }}>
              Nombre
            </th>
            <th style={tablaStyles.headerCell}>Apellido</th>
            <th style={tablaStyles.headerCell}>Equipo</th> {/* <-- CAMBIO DE TEXTO */}
            <th style={tablaStyles.headerCell}>Correo</th>
            <th
              style={{ ...tablaStyles.headerCell, borderTopRightRadius: "10px" }}
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {referentes.map((ref, index) => (
            <tr
              key={ref.id}
              style={{
                ...tablaStyles.bodyRow,
                backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                borderTop: index === 0 ? "none" : undefined,
              }}
            >
              <td style={tablaStyles.bodyCell}>{ref.nombre}</td>
              <td style={tablaStyles.bodyCell}>{ref.apellido}</td>
              {/* --- CAMBIO: Mostrar nombre del club --- */}
              <td style={tablaStyles.bodyCell}>
                {ref.club ? ref.club.nombre : "Sin club"}
              </td>
              <td style={tablaStyles.bodyCell}>{ref.correo}</td>
              <td style={tablaStyles.actionsContainer}>
                <button
                  onClick={() => onVer(ref)}
                  style={{ ...tablaStyles.buttonBase, ...tablaStyles.buttonVer }}
                >
                  Ver
                </button>
                {onEditar && (
                  <button
                    onClick={() => onEditar(ref)}
                    style={{
                      ...tablaStyles.buttonBase,
                      ...tablaStyles.buttonEditar,
                    }}
                  >
                    Editar
                  </button>
                )}
                {onEliminar && (
                  <button
                    onClick={() => onEliminar(ref.id)}
                    style={{
                      ...tablaStyles.buttonBase,
                      ...tablaStyles.buttonEliminar,
                    }}
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

export default ListaReferente;