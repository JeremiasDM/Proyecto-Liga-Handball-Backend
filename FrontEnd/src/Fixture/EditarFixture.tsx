import React, { useState, useEffect } from "react";
import type { Encuentro, Fixture } from "../types/types";
import FormularioPartido from "./FormularioPartido";

// --- Datos de Validación ---

const clubesValidos = [
  "Club A1", "Club A2", "Club A3", "Club A4",
  "Club B1", "Club B2", "Club B3", "Club B4"
];
const gruposValidos = ["A", "B"];

// --- Tipos de Props ---

type Props = {
  fixture: Fixture;
  onGuardar: (f: Fixture) => void;
  onCancelar: () => void;
};

// --- SECCIÓN DE ESTILOS MEJORADA ---

// 🎯 Nuevo estilo para los inputs con fondo negro y letra blanca 🎯
const inputStylesNegro = {
  color: 'white', // Color del texto (letras) en blanco
  backgroundColor: '#333', // Fondo gris oscuro/negro
  border: '1px solid #555', // Borde gris más oscuro
  padding: '8px 12px',
  borderRadius: '4px',
  fontSize: '1em',
};


const styles = {
  // Contenedor principal
  container: {
    maxWidth: '850px', 
    margin: '40px auto',
    padding: '30px',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 6px 25px rgba(0,0,0,0.15)', 
    backgroundColor: '#fefefe',
    fontFamily: 'Arial, sans-serif',
  },
  // Formulario
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '20px', 
  },
  // Encabezados
  heading: {
    color: '#1a4e8d',
    borderBottom: '4px solid #007bff',
    paddingBottom: '15px',
    marginBottom: '35px',
    textAlign: 'left' as 'left',
    fontSize: '2.2em', 
  },
  subHeading: {
    color: '#333',
    marginTop: '10px',
    marginBottom: '25px',
    borderLeft: '5px solid #007bff',
    paddingLeft: '15px',
    fontWeight: '600' as '600',
    fontSize: '1.4em',
    letterSpacing: '0.5px',
  },
  // Contenedor de botones
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #e0e0e0',
  },
  // Botón Principal (Guardar)
  buttonPrimary: {
    padding: '14px 30px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: 'bold' as 'bold',
    transition: 'background-color 0.3s, transform 0.1s',
  },
  // Botón Secundario (Cancelar)
  buttonSecondary: {
    padding: '14px 30px',
    borderRadius: '8px',
    border: '1px solid #c8d0d9',
    backgroundColor: '#f1f4f8',
    color: '#036edaff',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s, border-color 0.3s',
  },
};

// --- Componente ---

const EditarFixture: React.FC<Props> = ({ fixture, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState<Fixture>(fixture);

  useEffect(() => {
    setFormData(fixture);
  }, [fixture]);

  const handlePartidoChange = (index: number, campo: keyof Encuentro, valor: string) => {
    const partidosActualizados = [...formData.partidos];
    const partido = { ...partidosActualizados[index] };
    (partido as any)[campo] = campo === "jornada" ? Number(valor) : valor;
    partidosActualizados[index] = partido;
    setFormData({ ...formData, partidos: partidosActualizados });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div style={styles.container}>
      {/* Título Principal */}
      <h2 style={styles.heading}>Editar Fixture</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Partidos */}
        <h3 style={styles.subHeading}>Partidos del Fixture</h3>
        {formData.partidos.map((partido, i) => (
          <FormularioPartido
            key={i}
            partido={partido}
            onChange={(campo, valor) => handlePartidoChange(i, campo, valor)}
            clubesValidos={clubesValidos}
            gruposValidos={gruposValidos}
            // 💡 Pasamos el nuevo estilo de input con fondo oscuro
            inputStyle={inputStylesNegro} 
          />
        ))}

        {/* Botones de Acción */}
        <div style={styles.buttonContainer}>
          <button 
            type="button" 
            onClick={onCancelar} 
            style={styles.buttonSecondary}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.buttonSecondary.backgroundColor}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            style={styles.buttonPrimary}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.buttonPrimary.backgroundColor}
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarFixture;
