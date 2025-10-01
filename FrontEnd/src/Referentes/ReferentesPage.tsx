import React, { useState } from "react";
import type { CSSProperties } from "react";
import RegistrarReferente from "./RegistrarReferente";
import EditarReferente from "./EditarReferente";
import ListaReferente from "./ListaReferente";
import VistaReferente from "./VistaReferente";
import { useReferentes } from "../hooks/useReferentes";
import { validarReferente } from "../utils/validaciones";
import type { Referente } from "../types/types";

// =========================================================
// 🎨 SECCIÓN DE ESTILOS (EXPORTADA e Incluye inputs/botones oscuros) 🎨
// =========================================================
interface Styles {
  [key: string]: CSSProperties;
}

// 🛑 EXPORTAMOS STYLES para que los componentes hijos puedan acceder a ellos
export const styles: Styles = {
  // 1. Contenedor Principal
  contenedorPrincipal: {
    padding: '32px',
    backgroundColor: '#eef2f6', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  
  // 2. Título principal
  titulo: {
    fontSize: '36px',
    fontWeight: '800',
    textAlign: 'center',
    color: '#1e40af',
    marginBottom: '24px',
    letterSpacing: '0.02em',
  },

  // 3. Título del Formulario
  formTitulo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: '28px',
  },
  
  // 4. Tarjeta de Formulario
  cardFormulario: {
    maxWidth: '52rem',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)', 
    borderRadius: '16px',
    padding: '36px',
    marginBottom: '32px',
    border: '1px solid #e2e8f0',
  },
  
  // 5. Tarjeta de Lista
  cardLista: {
    // Aseguramos el mismo ancho máximo para que se alinee con el contenedor de navegación
    maxWidth: '52rem', 
    margin: '0 auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.05)', 
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #e2e8f0',
  },

  // 6. Estilo del Input Oscuro (Para replicar la imagen)
  inputOscuro: {
    backgroundColor: '#374151', 
    color: '#ffffff', 
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #4b5563',
    marginBottom: '16px',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '16px',
  } as CSSProperties,

  // 7. Estilo del Botón Primario
  botonPrimario: {
    backgroundColor: '#3b82f6', // Azul principal
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.1s ease, opacity 0.3s ease',
    boxShadow: '0 4px 10px rgba(59, 130, 246, 0.5)',
    width: '100%',
    marginTop: '20px',
  } as CSSProperties,

  // 8. Estilo de Botón Secundario (Para EditarReferente)
  botonSecundario: {
    backgroundColor: '#9ca3af', // Gris secundario
    color: '#ffffff', 
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
  } as CSSProperties,

  // 9. 🆕 ESTILOS PARA MENSAJES DE ALERTA/ERROR/ÉXITO
  mensajeAlerta: {
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '16px',
  } as CSSProperties,

  mensajeError: {
    backgroundColor: '#fee2e2', // Red-100
    color: '#b91c1c', // Red-700
    border: '1px solid #fca5a5', // Red-300
  },

  mensajeExito: {
    backgroundColor: '#d1fae5', // Green-100
    color: '#065f46', // Green-700
    border: '1px solid #a7f3d0', // Green-300
  },
};
// =========================================================


const ReferentesPage: React.FC = () => {
  
  const { referentes, agregar, actualizar, eliminar } = useReferentes();
  const [referenteSeleccionado, setReferenteSeleccionado] = useState<Referente | null>(null);
  const [editando, setEditando] = useState(false);
  
  // 🆕 ESTADO CLAVE: Controla si se muestra el formulario (true) o la lista (false)
  const [mostrarRegistro, setMostrarRegistro] = useState(true); 

  // Variable de control para el renderizado condicional de vistas de detalle
  const vistaDetalleActiva = referenteSeleccionado !== null; 
  
  const manejarVolver = () => {
    setReferenteSeleccionado(null);
    setEditando(false);
  };
  
  // 🆕 Funciones para conmutar las vistas principales
  const manejarIrRegistro = () => {
    setMostrarRegistro(true);
    manejarVolver();
  };
  
  const manejarIrLista = () => {
    setMostrarRegistro(false);
    manejarVolver();
  };

  const registrarReferente = (nuevo: Referente) => {
    const error = validarReferente(nuevo, referentes);
    if (error) {
      alert(error);
      return;
    }
    agregar({ ...nuevo, id: Date.now() });
    // 🆕 Después de registrar, lo enviamos a la vista de lista
    setMostrarRegistro(false);
  };

  const actualizarReferente = (editado: Referente) => {
    const error = validarReferente(editado, referentes);
    if (error) {
      alert(error);
      return;
    }
    actualizar(editado);
    // 🆕 Después de actualizar, lo enviamos a la vista de lista
    manejarIrLista();
  };

  const eliminarReferente = (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este referente?")) {
      eliminar(id);
      manejarVolver();
    }
  };
  
  return (
    <div style={styles.contenedorPrincipal}> 
      <h2 style={styles.titulo}> 
        Gestión de Referentes
      </h2>
      
      {/* 🛑 VISTAS DE DETALLE / EDICIÓN (Prioritarias) 🛑 */}

      {referenteSeleccionado && !editando && (
        <VistaReferente
          referente={referenteSeleccionado}
          onVolver={manejarIrLista} // Vuelve a la lista
        />
      )}
      
      {referenteSeleccionado && editando && (
        <EditarReferente
          referente={referenteSeleccionado}
          onActualizar={actualizarReferente}
          onCancelar={manejarIrLista} // Vuelve a la lista
          referentes={referentes} 
        />
      )}
      
      {/* 🛑 VISTAS PRINCIPALES: REGISTRO o LISTA 🛑 */}
      {!vistaDetalleActiva && (
        // Contenedor para alinear los botones de navegación con las tarjetas
        <div style={{ maxWidth: '52rem', margin: '0 auto', width: '100%', marginBottom: '-32px' }}> 
          
          {/* Controles de Navegación (Pestañas/Botones) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
            <button
              onClick={manejarIrRegistro}
              style={{
                ...styles.botonPrimario, 
                width: 'auto', 
                opacity: mostrarRegistro ? 1 : 0.6,
                padding: '10px 20px',
                marginTop: 0
              }}
            >
              Formulario de Registro
            </button>
            <button
              onClick={manejarIrLista}
              style={{
                ...styles.botonPrimario,
                width: 'auto', 
                opacity: !mostrarRegistro ? 1 : 0.6,
                padding: '10px 20px',
                marginTop: 0
              }}
            >
              Lista de Referentes ({referentes.length})
            </button>
          </div>
        
          {/* Contenido Condicional */}
          {mostrarRegistro ? (
            <div style={styles.cardFormulario}> 
              <RegistrarReferente onGuardar={registrarReferente} />
            </div>
          ) : (
            <div style={styles.cardLista}> 
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
          )}
        </div>
      )}
    </div>
  );
};

export default ReferentesPage;
