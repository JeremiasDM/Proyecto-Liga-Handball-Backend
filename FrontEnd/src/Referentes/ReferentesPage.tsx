import React, { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import RegistrarReferente from "./RegistrarReferente";
import EditarReferente from "./EditarReferente";
import ListaReferente from "./ListaReferente";
import VistaReferente from "./VistaReferente";
// NO MÁS 'useReferentes'.

// --- NUEVAS DEFINICIONES DE TIPOS ---
// (Puedes moverlas a un archivo types.ts si prefieres)
interface Club {
  id: number;
  nombre: string;
  // ...otras propiedades del club si las necesitas
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

interface CreateReferenteDto {
  nombre: string;
  apellido: string;
  categoria: "Masculino" | "Femenino";
  dni: string;
  correo: string;
  clubId: number;
}

type UpdateReferenteDto = Partial<CreateReferenteDto>;

// --- URL DE LA API ---
const API_URL = "http://localhost:3001"; // Ajusta a tu puerto de Nest

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
    fontWeight: '600', // ⬅️ Modificado de '800' a '600'
    textAlign: 'center',
    color: '#1e40af',
    // ESTILOS AÑADIDOS PARA EL SUBRAYADO (Borde inferior)
    borderBottom: '3px solid #1e40af', // El "subrayado"
    paddingBottom: '5px',
    display: 'block',
    width: 'fit-content',
    margin: '0 auto 24px auto', // Centrar el título y añadir margen inferior
    letterSpacing: '0.02em',
    // La propiedad 'marginBottom' original se reemplaza por el 'margin' de arriba.
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

// Función de validación (ahora recibe DTO y referentes)
function validarReferente(
  nuevo: CreateReferenteDto | UpdateReferenteDto,
  referentes: Referente[],
  editId: number | null = null,
): string | null {
  if (
    !nuevo.nombre?.trim() ||
    !nuevo.apellido?.trim() ||
    !nuevo.categoria ||
    !nuevo.dni?.trim() ||
    !nuevo.correo?.trim() ||
    !nuevo.clubId
  ) {
    return "Todos los campos son obligatorios.";
  }
  if (nuevo.dni && !/^\d{7,10}$/.test(nuevo.dni)) {
    return "El DNI debe tener entre 7 y 10 números.";
  }
  // Comprueba DNI duplicado (excluyendo el id que se está editando)
  if (
    nuevo.dni &&
    referentes.some((r) => r.dni === nuevo.dni && r.id !== editId)
  ) {
    return "El DNI ya está registrado.";
  }
  // (Puedes añadir más validaciones)
  return null;
}

// =========================================================

const ReferentesPage: React.FC = () => {
  // --- ESTADO MANEJADO POR API ---
  const [referentes, setReferentes] = useState<Referente[]>([]);
  const [clubes, setClubes] = useState<Club[]>([]);
  const [referenteSeleccionado, setReferenteSeleccionado] =
    useState<Referente | null>(null);
  const [editando, setEditando] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Cargar datos de la API al montar ---
  useEffect(() => {
    cargarReferentes();
    cargarClubes();
  }, []);

  const cargarReferentes = async () => {
    try {
      const res = await fetch(`${API_URL}/referentes`);
      if (!res.ok) throw new Error("Error al cargar referentes");
      const data: Referente[] = await res.json();
      setReferentes(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const cargarClubes = async () => {
    try {
      const res = await fetch(`${API_URL}/clubes`); // Asume endpoint de clubes
      if (!res.ok) throw new Error("Error al cargar clubes");
      const data: Club[] = await res.json();
      setClubes(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // --- Lógica de navegación ---
  const manejarVolver = () => {
    setReferenteSeleccionado(null);
    setEditando(false);
    setError(null);
  };

  const manejarIrRegistro = () => {
    setMostrarRegistro(true);
    manejarVolver();
  };

  const manejarIrLista = () => {
    setMostrarRegistro(false);
    manejarVolver();
  };

  // --- FUNCIONES CRUD (API) ---

  const registrarReferente = async (dto: CreateReferenteDto) => {
    setError(null);
    const errorMsg = validarReferente(dto, referentes);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/referentes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al crear referente");
      }
      await cargarReferentes(); // Recargar lista
      manejarIrLista(); // Ir a la lista
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const actualizarReferente = async (id: number, dto: UpdateReferenteDto) => {
    setError(null);
    const errorMsg = validarReferente(dto, referentes, id);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/referentes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Error al actualizar referente");
      }
      await cargarReferentes(); // Recargar lista
      manejarIrLista(); // Ir a la lista
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const eliminarReferente = async (id: number) => {
    if (window.confirm("¿Seguro que quieres eliminar este referente?")) {
      setError(null);
      try {
        const res = await fetch(`${API_URL}/referentes/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Error al eliminar referente");
        }
        await cargarReferentes(); // Recargar lista
        manejarVolver();
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const vistaDetalleActiva = referenteSeleccionado !== null;

  // --- NUEVO ESTILO PARA BOTONES DE NAVEGACIÓN ---
  const estiloBotonNavegacion: CSSProperties = {
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    backgroundColor: "#1f3c88", // Azul Fuerte
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease, opacity 0.3s ease",
    fontWeight: "600",
    fontSize: "16px",
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: "auto",
    marginTop: 0,
    // Estilo para hover/activo si fuera necesario, usando un color un poco más oscuro
    // '&:hover': { backgroundColor: '#1a316e' },
  };

  return (
    <div style={styles.contenedorPrincipal}>
      <h2 style={styles.titulo}>Gestión de Referentes</h2>

      {/* --- VISTAS DE DETALLE / EDICIÓN --- */}
      {referenteSeleccionado && !editando && (
        <VistaReferente
          referente={referenteSeleccionado}
          onVolver={manejarIrLista}
        />
      )}

      {referenteSeleccionado && editando && (
        <EditarReferente
          referente={referenteSeleccionado}
          clubes={clubes} // <-- Pasar clubes
          onActualizar={actualizarReferente} // <-- Pasar nueva función
          onCancelar={manejarIrLista}
          error={error} // <-- Pasar error para mostrar
        />
      )}

      {/* --- VISTAS PRINCIPALES: REGISTRO o LISTA --- */}
      {!vistaDetalleActiva && (
        <div
          style={{
            maxWidth: "52rem",
            margin: "0 auto",
            width: "100%",
            marginBottom: "-32px",
          }}
        >
          {/* Controles de Navegación */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            <button
              onClick={manejarIrRegistro}
              style={{
                ...estiloBotonNavegacion, // ⬅️ Aplicamos el nuevo estilo base
                opacity: mostrarRegistro ? 1 : 0.6, // Control de opacidad
              }}
            >
              Formulario de Registro
            </button>
            <button
              onClick={manejarIrLista}
              style={{
                ...estiloBotonNavegacion, // ⬅️ Aplicamos el nuevo estilo base
                opacity: !mostrarRegistro ? 1 : 0.6, // Control de opacidad
              }}
            >
              Lista de Referentes ({referentes.length})
            </button>
          </div>

          {/* Mensaje de Error Global (para Registro/Edición) */}
          {error && mostrarRegistro && (
            <div
              style={{
                ...styles.mensajeAlerta,
                ...styles.mensajeError,
                maxWidth: "52rem",
                margin: "0 auto 16px auto",
              }}
            >
              {error}
            </div>
          )}

          {/* Contenido Condicional */}
          {mostrarRegistro ? (
            <div style={styles.cardFormulario}>
              <RegistrarReferente
                onGuardar={registrarReferente}
                clubes={clubes} // <-- Pasar clubes
              />
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
