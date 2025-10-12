// FormularioPartido.tsx

import React from "react";
import type { Encuentro } from "../types/types";

// --- Tipos de Props ---

type Props = {
  partido: Encuentro;
  onChange: (campo: keyof Encuentro, valor: string) => void;
  clubesValidos: string[];
  gruposValidos: string[];
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
        border: '1px solid #dcdfe3', // Borde sutil
        borderRadius: '10px',
        backgroundColor: '#f9fbfd', // Fondo ligeramente distinto para agrupar
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },

    // Estilo base para Selects e Inputs
    campoBase: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #c8d0d9',
        fontSize: '1em',
        backgroundColor: 'white',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
        transition: 'border-color 0.3s',
        minWidth: '60px',
    },

    // Estilo para las etiquetas
    label: {
        fontWeight: 'normal' as 'normal',
        color: '#555',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        margin: 0, // Asegura que no haya margen extra
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
        flexGrow: 1, // Permite que se estiren para ocupar el espacio disponible
        minWidth: '150px',
    },
    inputResultado: {
        minWidth: '80px',
        textAlign: 'center' as 'center',
        fontWeight: 'bold' as 'bold',
        color: '#1a4e8d',
    }
};

const FormularioPartido: React.FC<Props> = ({ partido, onChange, clubesValidos, gruposValidos }) => {
    
    const baseInputStyle = styles.campoBase;
    
    // Función para simular el efecto :focus
    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.currentTarget.style.borderColor = '#007bff';
    };
    // Función para restablecer el borde al perder el focus
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        // Obtenemos el valor del color del borde base
        const baseBorderColor = (styles.campoBase.border as string).split(' ')[2];
        e.currentTarget.style.borderColor = baseBorderColor;
    };
    
    const renderSelect = (campo: keyof Encuentro, valor: string, opciones: string[], style: React.CSSProperties, label: string, placeholder: string) => (
        <label style={styles.label}>
            {label}:
            <select
                value={valor}
                onChange={(e) => onChange(campo, e.target.value)}
                style={{ ...baseInputStyle, ...style }}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <option value="" disabled>{placeholder}</option>
                {opciones.map(opt => (
                    // Si el campo es 'grupo', ajustamos el texto para que se vea "Grupo A", "Grupo B"
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
                style={{ ...baseInputStyle, ...style }}
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
