import React from "react";
import type { Referente } from "../types/types";
// 🛑 Importamos los estilos del archivo principal
import { styles } from "./ReferentesPage"; 
import type { CSSProperties } from "react";

interface Props {
  referente: Referente;
  onVolver: () => void;
}

// 🆕 ESTILOS ESPECÍFICOS PARA LA VISTA DE DETALLE
const vistaStyles: { [key: string]: CSSProperties } = {
    // 1. Estilo para la etiqueta (ej: "DNI:")
    etiqueta: {
        fontWeight: '700', // Más negrita
        color: '#1f2937', // Gris oscuro
        minWidth: '100px', // Ancho fijo para alinear los valores
        display: 'inline-block',
    },
    // 2. Estilo para el valor (ej: "12345678")
    valor: {
        color: '#374151', // Gris
    },
    // 3. Contenedor de cada par etiqueta-valor
    fila: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: '1px solid #e5e7eb', // Línea separadora
    },
    // 4. Última fila sin borde
    ultimaFila: {
        padding: '10px 0',
    }
};

const VistaReferente: React.FC<Props> = ({ referente, onVolver }) => {
    // Usamos cardFormulario ya que tiene el ancho, padding y sombra adecuados.
    // Usaremos un ancho más pequeño para que la vista de detalle se centre mejor.
    const cardEstiloDetalle: CSSProperties = {
        ...styles.cardFormulario,
        maxWidth: '30rem', // Un poco más estrecho que los formularios (52rem)
        padding: '30px',
        marginBottom: '0',
    };

    // Array de los campos a mostrar
    const fields = [
        { label: 'Categoría', value: referente.categoria },
        { label: 'DNI', value: referente.dni },
        { label: 'Correo', value: referente.correo },
        { label: 'Equipo', value: referente.equipo },
    ];

    return (
        <div style={cardEstiloDetalle}>
            {/* Título: Nombre y Apellido */}
            <h3 style={{ ...styles.formTitulo, marginBottom: '20px', fontSize: '28px' }}>
                {referente.nombre} {referente.apellido}
            </h3>

            {/* Lista de Detalles */}
            <div style={{ marginBottom: '20px' }}>
                {fields.map((field, index) => (
                    <div 
                        key={field.label}
                        style={index === fields.length - 1 ? vistaStyles.ultimaFila : vistaStyles.fila}
                    >
                        <span style={vistaStyles.etiqueta}>{field.label}:</span>
                        <span style={vistaStyles.valor}>{field.value}</span>
                    </div>
                ))}
            </div>

            {/* Botón Volver (Usamos el estilo secundario, ya que es una acción de navegación) */}
            <button
                onClick={onVolver}
                style={{
                    ...styles.botonSecundario,
                    width: '100%',
                    padding: '12px 24px', // Un poco más grande para llenar el espacio
                    backgroundColor: '#6b7280', // Un gris más oscuro para el botón de volver
                }}
            >
                Volver a la Lista
            </button>
        </div>
    );
};

export default VistaReferente;
