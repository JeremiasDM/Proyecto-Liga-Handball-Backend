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

const styles = {
  // Contenedor principal
  container: {
    maxWidth: '850px', // Aumentado para más espacio horizontal para los campos del partido
    margin: '40px auto',
    padding: '30px',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 6px 25px rgba(0,0,0,0.15)', // Sombra más profunda
    backgroundColor: '#fefefe',
    fontFamily: 'Arial, sans-serif',
  },
  // Formulario
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '20px', // Espacio ajustado
  },
  // Encabezados
  heading: {
    color: '#1a4e8d',
    borderBottom: '4px solid #007bff',
    paddingBottom: '15px',
    marginBottom: '35px',
    textAlign: 'left' as 'left',
    fontSize: '2.2em', // Ligeramente más grande
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
  // El estilo 'input' ha sido eliminado ya que los inputs de fecha/lugar se han quitado.
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
    color: '#495057',
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

  // Se eliminó la función handleChange ya que los inputs de fecha y lugar ya no están.

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
          // El componente FormularioPartido ahora necesita los estilos actualizados.
          <FormularioPartido
            key={i}
            partido={partido}
            onChange={(campo, valor) => handlePartidoChange(i, campo, valor)}
            clubesValidos={clubesValidos}
            gruposValidos={gruposValidos}
          />
        ))}

        {/* Botones de Acción */}
        <div style={styles.buttonContainer}>
          <button 
            type="button" 
            onClick={onCancelar} 
            style={styles.buttonSecondary}
            // Simulación de :hover
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.buttonSecondary.backgroundColor}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            style={styles.buttonPrimary}
            // Simulación de :hover
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
