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

// (Pega tu objeto 'styles' aquí)
export const styles: Styles = { /* ... tu objeto de estilos ... */ };

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
                ...styles.botonPrimario,
                width: "auto",
                opacity: mostrarRegistro ? 1 : 0.6,
                padding: "10px 20px",
                marginTop: 0,
              }}
            >
              Formulario de Registro
            </button>
            <button
              onClick={manejarIrLista}
              style={{
                ...styles.botonPrimario,
                width: "auto",
                opacity: !mostrarRegistro ? 1 : 0.6,
                padding: "10px 20px",
                marginTop: 0,
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