// FormularioPartido.tsx

import React from "react";
// Importamos 'CSSProperties' para tipar el objeto de estilos que recibiremos.
import type { Encuentro } from "../types/types";
import type { CSSProperties } from "react";

// --- Tipos de Props (Actualizado) ---

type Props = {
    partido: Encuentro;
    onChange: (campo: keyof Encuentro, valor: string) => void;
    clubesValidos: string[];
    gruposValidos: string[];
    // 💡 AGREGADO: Prop para recibir el estilo personalizado del input
    inputStyle: CSSProperties; 
};

// --- Estilos de Componente de Partido (Estética Mejorada) ---

const styles = {
    // Contenedor principal de un solo partido (la tarjeta)
    partidoContainer: {
        display: 'flex',
        flexWrap: 'wrap' as 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '15px 20px', 
        padding: '20px',
        border: '1px solid #dcdfe3', 
        borderRadius: '10px',
        backgroundColor: '#f9fbfd', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },

    // Estilo base para Selects e Inputs (se mantendrá, pero será sobrescrito por inputStyle)
    campoBase: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #c8d0d9',
        fontSize: '1em',
        backgroundColor: 'white', // Esto será sobrescrito
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
        transition: 'border-color 0.3s',
        minWidth: '60px',
    },

    // Estilo para las etiquetas
    label: {
        fontWeight: 'normal' as 'normal',
        color: '#555', // El color de la etiqueta (no del input) se mantiene oscuro
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        margin: 0, 
    },
    
    // Estilos específicos para ciertos campos para optimizar el espacio
    inputJornada: {
        minWidth: '60px',
        textAlign: 'center' as 'center',
    },
    selectGrupo: {
        minWidth: '100px',
    },
    selectClub: {
        flexGrow: 1, 
        minWidth: '150px',
    },
    inputResultado: {
        minWidth: '80px',
        textAlign: 'center' as 'center',
        fontWeight: 'bold' as 'bold',
        // 🛑 Importante: El color del texto en el inputResultado debe ser blanco
        // para que se vea sobre el fondo negro. El color anterior era '#1a4e8d'.
        color: 'white', 
    }
};

// 🛑 AÑADIDO: Tipo para el evento de cambio ya que Select e Input son diferentes
type FormElement = HTMLInputElement | HTMLSelectElement;

const FormularioPartido: React.FC<Props> = ({ partido, onChange, clubesValidos, gruposValidos, inputStyle }) => {
    
    // Ahora, baseInputStyle es una combinación del estilo por defecto y el estilo oscuro recibido.
    const combinedInputStyle = { ...styles.campoBase, ...inputStyle };
    
    // Función para simular el efecto :focus
    const handleFocus = (e: React.FocusEvent<FormElement>) => {
        e.currentTarget.style.borderColor = '#007bff';
    };
    // Función para restablecer el borde al perder el focus
    const handleBlur = (e: React.FocusEvent<FormElement>) => {
        // Obtenemos el valor del color del borde base
        const baseBorderColor = (combinedInputStyle.border as string).split(' ')[2] || '#555';
        e.currentTarget.style.borderColor = baseBorderColor;
    };
    
    const renderSelect = (campo: keyof Encuentro, valor: string, opciones: string[], style: React.CSSProperties, label: string, placeholder: string) => (
        <label style={styles.label}>
            {label}:
            <select
                value={valor}
                onChange={(e) => onChange(campo, e.target.value)}
                // 🛑 APLICACIÓN DEL ESTILO COMBINADO
                style={{ ...combinedInputStyle, ...style }} 
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <option value="" disabled>{placeholder}</option>
                {opciones.map(opt => (
                    <option key={opt} value={opt}>
                        {campo === 'grupo' ? `Grupo ${opt}` : opt}
                    </option>
                ))}
            </select>
        </label>
    );

    const renderInput = (campo: keyof Encuentro, valor: string, type: string, style: React.CSSProperties, label: string, placeholder: string) => (
        <label style={styles.label}>
            {label}:
            <input
                type={type}
                value={valor}
                onChange={(e) => onChange(campo, e.target.value)}
                // 🛑 APLICACIÓN DEL ESTILO COMBINADO
                style={{ ...combinedInputStyle, ...style }} 
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                min={campo === 'jornada' ? 1 : undefined}
            />
        </label>
    );

    return (
        <div style={styles.partidoContainer}>
            
            {/* Jornada */}
            {renderInput(
                "jornada", 
                String(partido.jornada), 
                "number", 
                styles.inputJornada, 
                "Jornada",
                "1"
            )}

            {/* Grupo */}
            {renderSelect(
                "grupo", 
                partido.grupo, 
                gruposValidos, 
                styles.selectGrupo, 
                "Grupo",
                "Seleccionar"
            )}

            {/* Club 1 */}
            {renderSelect(
                "club1", 
                partido.club1, 
                clubesValidos, 
                styles.selectClub, 
                "Club 1",
                "Selecciona Club 1"
            )}

            {/* Club 2 */}
            {renderSelect(
                "club2", 
                partido.club2, 
                clubesValidos, 
                styles.selectClub, 
                "Club 2",
                "Selecciona Club 2"
            )}

            {/* Resultado */}
            {renderInput(
                "resultado", 
                partido.resultado, 
                "text", 
                styles.inputResultado, 
                "Resultado",
                "Ej: 25-21"
            )}
        </div>
    );
};

export default FormularioPartido;
