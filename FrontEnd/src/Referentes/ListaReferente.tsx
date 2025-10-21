import React from "react";

// Inlined Referente type
type Referente = {
  id: number;
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  equipo: string;
};
// 🛑 Importamos los estilos del archivo principal

interface Props {
  referentes: Referente[];
  onVer: (referente: Referente) => void;
  onEditar?: (referente: Referente) => void;
  onEliminar?: (id: number) => void;
}

// 🆕 NUEVOS ESTILOS ESPECÍFICOS PARA LA TABLA (usando CSS in JS)
const tablaStyles = {
    // 1. Cabecera (Thead)
    tableHeader: {
        backgroundColor: '#1e40af', // Azul oscuro (coincide con el título)
        color: '#ffffff',
        fontWeight: '700',
        textTransform: 'uppercase' as const,
        fontSize: '14px',
    },
    // 2. Celdas de Cabecera
    headerCell: {
        padding: '12px 16px',
        textAlign: 'left' as const,
    },
    // 3. Filas (Tr)
    bodyRow: {
        borderBottom: '1px solid #e5e7eb', // Gris muy claro
        transition: 'background-color 0.3s ease',
        cursor: 'default',
    },
    // 4. Celdas de Datos (Td)
    bodyCell: {
        padding: '12px 16px',
        color: '#374151', // Gris oscuro
        fontSize: '15px',
    },
    // 5. Contenedor de Acciones (Para alinear botones)
    actionsContainer: {
        display: 'flex',
        gap: '8px',
        padding: '12px 16px',
    },
    // 6. Botones (Adaptando los estilos Primario/Secundario para la tabla)
    buttonBase: {
        padding: '6px 12px',
        borderRadius: '6px',
        fontWeight: '500',
        fontSize: '14px',
        border: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease, transform 0.1s ease',
        whiteSpace: 'nowrap' as const,
    },
    buttonVer: {
        backgroundColor: '#10b981', // Verde
        color: '#ffffff',
    },
    buttonEditar: {
        backgroundColor: '#3b82f6', // Azul Primario
        color: '#ffffff',
    },
    buttonEliminar: {
        backgroundColor: '#ef4444', // Rojo
        color: '#ffffff',
    },
};

const ListaReferente: React.FC<Props> = ({ referentes, onVer, onEditar, onEliminar }) => {
  if (!referentes || referentes.length === 0) {
    return <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>No hay referentes registrados.</p>;
  }

  return (
    // 🛑 Usamos el estilo del contenedor de lista definido en ReferentesPage
    // NOTA: El contenedor ya está aplicado en ReferentesPage, aquí solo necesitamos el div de la tabla
    <div style={{ overflowX: 'auto' }}> 
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        
        {/* CABECERA DE LA TABLA */}
        <thead style={tablaStyles.tableHeader}>
          <tr>
            <th style={{ ...tablaStyles.headerCell, borderTopLeftRadius: '10px' }}>Nombre</th>
            <th style={tablaStyles.headerCell}>Apellido</th>
            <th style={tablaStyles.headerCell}>Equipo</th>
            <th style={tablaStyles.headerCell}>Correo</th>
            <th style={{ ...tablaStyles.headerCell, borderTopRightRadius: '10px' }}>Acciones</th>
          </tr>
        </thead>
        
        {/* CUERPO DE LA TABLA */}
        <tbody>
          {referentes.map((ref, index) => (
            <tr 
                key={ref.id} 
                style={{ 
                    ...tablaStyles.bodyRow,
                    backgroundColor: index % 2 === 0 ? '#f9fafb' : '#ffffff', // Rayas para mejor lectura
                    borderTop: index === 0 ? 'none' : undefined, // Quitar borde superior de la primera fila
                }}
                // Se podría agregar onMouseOver/onMouseOut para el hover si fuera necesario
            >
              <td style={tablaStyles.bodyCell}>{ref.nombre}</td>
              <td style={tablaStyles.bodyCell}>{ref.apellido}</td>
              <td style={tablaStyles.bodyCell}>{ref.equipo}</td>
              <td style={tablaStyles.bodyCell}>{ref.correo}</td>
              
              {/* CELDAS DE ACCIONES */}
              <td style={tablaStyles.actionsContainer}>
                
                {/* Botón Ver */}
                <button
                  onClick={() => onVer(ref)}
                  style={{ ...tablaStyles.buttonBase, ...tablaStyles.buttonVer }}
                >
                  Ver
                </button>
                
                {/* Botón Editar (condicional) */}
                {onEditar && (
                  <button
                    onClick={() => onEditar(ref)}
                    style={{ ...tablaStyles.buttonBase, ...tablaStyles.buttonEditar }}
                  >
                    Editar
                  </button>
                )}
                
                {/* Botón Eliminar (condicional) */}
                {onEliminar && (
                  <button
                    onClick={() => onEliminar(ref.id)}
                    style={{ ...tablaStyles.buttonBase, ...tablaStyles.buttonEliminar }}
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
