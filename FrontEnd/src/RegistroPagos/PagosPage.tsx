import React, { useState, useEffect } from "react";
// import { usePagos } from "../hooks/usePagos"; // Eliminado o adaptado si gestiona llamadas API
import TablaPagosClub from "./TablaPagosClub";
import FormularioPago from "./FormularioPago";
import HistorialPagos from "./HistorialPagos"; // Asegúrate de importarlo si lo usas
import EditarPago from "./EditarPago"; // Asegúrate de importarlo si lo usas
import type { CSSProperties } from "react";

// --- TIPOS ---
// Tipos de la API (Asegúrate que coincidan con tu backend)
interface ClubAPI {
  id: number;
  nombre: string;
  activo?: boolean;
}

type TipoPago = "cuota" | "arbitraje" | "multa" | "otro";

interface PagoAPI { // Como lo devuelve la API (puede tener club anidado)
  id: number;
  tipo: TipoPago;
  clubId: number;
  club?: ClubAPI; // El backend puede devolver el objeto club
  monto: number;
  comprobante: string;
  comprobanteArchivo?: string;
  fecha: string; // ISO String
  estado: "pendiente" | "pagado" | "validado" | "invalido";
  categoria?: "Masculino" | "Femenino" | "Ambos";
  partidoId?: number;
  cantidadJugadores?: number;
  motivo?: string;
}

// Tipo Pago para usar en el Frontend (con nombre de club simplificado)
interface Pago {
    id: number;
    tipo: TipoPago;
    club: string; // Nombre del club
    monto: number;
    comprobante: string;
    comprobanteArchivo?: string;
    fecha: string;
    estado: "pendiente" | "pagado" | "validado" | "invalido";
    categoria?: "Masculino" | "Femenino" | "Ambos";
    partidoId?: number;
    cantidadJugadores?: number;
    motivo?: string;
}


// DTO para enviar al backend al crear (Asegúrate que coincida con CreatePagoDto)
interface CreatePagoDto {
  tipo: TipoPago;
  clubId: number; // <-- ID numérico
  monto: number;
  comprobante?: string;
  comprobanteArchivo?: string; // Base64
  categoria?: string;
  partidoId?: number;
  cantidadJugadores?: number;
  motivo?: string;
}

// DTO para enviar al backend al actualizar (Asegúrate que coincida con UpdatePagoDto)
type UpdatePagoDto = Partial<CreatePagoDto> & { estado?: string };


// --- CONSTANTES ---
const API_URL = "http://localhost:3001"; // Reemplaza con tu URL de backend
const montoMinimoCuota = 10000;
const montoMinimoArbitraje = 35000;
const montoMinimoOtro = 5000;

// (Pega tu styleConfig y globalStyles aquí si los usas)
const styleConfig = { /* ... */ };
const globalStyles = ` /* ... */ `;

// --- COMPONENTE ---
const PagosPage: React.FC = () => {
  // Estados para datos de la API
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [clubesConId, setClubesConId] = useState<ClubAPI[]>([]);
  const [clubNombres, setClubNombres] = useState<string[]>([]);
  // Placeholder para partidos - Deberías cargarlos desde la API también si es necesario
  const [partidos, setPartidos] = useState<any[]>([]);

  // Estados UI
  const [modal, setModal] = useState<{ tipo: TipoPago; club: string } | null>(null);
  const [pagoEditando, setPagoEditando] = useState<Pago | null>(null); // Para el modal de edición
  const [loadingClubes, setLoadingClubes] = useState(true);
  const [errorClubes, setErrorClubes] = useState<string | null>(null);
  const [loadingPagos, setLoadingPagos] = useState(false);
  const [errorPagos, setErrorPagos] = useState<string | null>(null);

  // --- Cargar datos iniciales ---
  useEffect(() => {
    cargarClubes();
    cargarPagos();
    // cargarPartidos(); // <-- Llama si necesitas cargar partidos
  }, []);

  // --- FUNCIONES API ---
  const cargarClubes = async () => {
    setLoadingClubes(true);
    setErrorClubes(null);
    try {
      const response = await fetch(`${API_URL}/clubes`);
      if (!response.ok) throw new Error(`Error ${response.status}: No se pudieron cargar los clubes.`);
      const data: ClubAPI[] = await response.json();
      const activos = data.filter(club => club.activo !== false);
      setClubesConId(activos);
      setClubNombres(activos.map(club => club.nombre).sort());
    } catch (err) {
      setErrorClubes((err as Error).message);
    } finally {
      setLoadingClubes(false);
    }
  };

  const cargarPagos = async () => {
    setLoadingPagos(true);
    setErrorPagos(null);
    try {
      const res = await fetch(`${API_URL}/pagos`); // Asume GET /pagos
      if (!res.ok) throw new Error("Error al cargar la lista de pagos.");
      const data: PagoAPI[] = await res.json(); // Recibe datos de la API

      // Mapea la respuesta para asegurar la estructura deseada en el frontend
      const pagosAdaptados: Pago[] = data.map(p => ({
        ...p,
        // Extrae el nombre del club si viene el objeto, o busca por ID
        club: typeof p.club === 'object' && p.club !== null
            ? p.club.nombre
            : clubesConId.find(c => c.id === p.clubId)?.nombre || `ID: ${p.clubId}`,
        fecha: new Date(p.fecha).toISOString(), // Asegura formato ISO si es necesario
      }));

      setPagos(pagosAdaptados);
    } catch (err) {
      setErrorPagos((err as Error).message);
    } finally {
      setLoadingPagos(false);
    }
  };

  // --- MANEJO DE MODALES Y GUARDADO/ACTUALIZACIÓN ---
  const handleRealizarPago = (club: string, tipo: TipoPago) => {
    setErrorPagos(null); // Limpia errores previos al abrir
    setModal({ tipo, club });
  };

  const handleIniciarEdicion = (pago: Pago) => {
      setErrorPagos(null); // Limpia errores previos
      setPagoEditando(pago); // Abre el modal de edición
  };

  const handleCerrarModal = () => {
    setModal(null);
    setPagoEditando(null); // También cierra el modal de edición
  };

  const obtenerClubIdPorNombre = (nombre: string): number | null => {
    const clubEncontrado = clubesConId.find(c => c.nombre === nombre);
    return clubEncontrado ? clubEncontrado.id : null;
  };

  // Guarda un NUEVO pago
  const handleGuardarPago = async (pagoFormData: Omit<Pago, 'id' | 'fecha' | 'estado' | 'club'> & {club: string}) => {
    setErrorPagos(null);
    setLoadingPagos(true);

    const clubId = obtenerClubIdPorNombre(pagoFormData.club);
    if (clubId === null) {
      setErrorPagos(`Error: No se encontró el ID para el club "${pagoFormData.club}".`);
      setLoadingPagos(false);
      return;
    }

    try {
      const payload: CreatePagoDto = { // DTO para crear
        tipo: pagoFormData.tipo,
        clubId: clubId,
        monto: pagoFormData.monto,
        comprobante: pagoFormData.comprobante,
        comprobanteArchivo: pagoFormData.comprobanteArchivo,
        categoria: (pagoFormData.tipo === 'cuota' || pagoFormData.tipo === 'arbitraje') ? pagoFormData.categoria : undefined,
        partidoId: pagoFormData.tipo === 'arbitraje' ? pagoFormData.partidoId : undefined,
        cantidadJugadores: pagoFormData.tipo === 'cuota' ? pagoFormData.cantidadJugadores : undefined,
        motivo: (pagoFormData.tipo === 'multa' || pagoFormData.tipo === 'otro') ? pagoFormData.motivo : undefined,
      };

      const response = await fetch(`${API_URL}/pagos`, { // POST /pagos
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error ${response.status}: No se pudo registrar el pago.`);
      }

      await cargarPagos(); // Recarga la lista de pagos
      handleCerrarModal(); // Cierra el modal de registro
      alert(`Pago registrado exitosamente.`);

    } catch (err) {
      setErrorPagos((err as Error).message); // Muestra error específico del modal
    } finally {
      setLoadingPagos(false);
    }
  };

   // Actualiza un PAGO EXISTENTE
  const handleActualizarPago = async (pagoActualizado: Pago) => {
    if (!pagoActualizado.id) return; // Necesita ID para actualizar
    setErrorPagos(null);
    setLoadingPagos(true);

    // El club no debería cambiar, pero si lo permites, busca el ID
    const clubId = obtenerClubIdPorNombre(pagoActualizado.club);
     if (clubId === null) {
      setErrorPagos(`Error: No se encontró el ID para el club "${pagoActualizado.club}".`);
      setLoadingPagos(false);
      return;
    }

    try {
        // Prepara el DTO de actualización
        const payload: UpdatePagoDto = {
            // Incluye solo los campos que pueden cambiar
            monto: pagoActualizado.monto,
            comprobante: pagoActualizado.comprobante,
            // comprobanteArchivo: ??? // La edición de archivos es más compleja
            estado: pagoActualizado.estado,
            fecha: new Date(pagoActualizado.fecha).toISOString(), // Asegura formato ISO
            // Añade otros campos si se pueden editar: categoria, partidoId, motivo...
            partidoId: pagoActualizado.partidoId,
            motivo: pagoActualizado.motivo,
            // NO envíes clubId si no permites cambiar el club
        };

        const response = await fetch(`${API_URL}/pagos/${pagoActualizado.id}`, { // PATCH /pagos/:id
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error ${response.status}: No se pudo actualizar el pago.`);
        }

        await cargarPagos(); // Recarga la lista
        handleCerrarModal(); // Cierra el modal de edición
        alert(`Pago ID ${pagoActualizado.id} actualizado.`);

    } catch (err) {
        setErrorPagos((err as Error).message); // Muestra error en el modal de edición
    } finally {
        setLoadingPagos(false);
    }
  };

   // Elimina un PAGO
  const handleEliminarPago = async (id: number) => {
      if (window.confirm(`¿Seguro que quieres eliminar el registro de pago ID ${id}?`)) {
          setErrorPagos(null);
          setLoadingPagos(true);
          try {
              const response = await fetch(`${API_URL}/pagos/${id}`, { // DELETE /pagos/:id
                  method: 'DELETE',
              });
              if (!response.ok) {
                  throw new Error(`Error ${response.status}: No se pudo eliminar el pago.`);
              }
              await cargarPagos(); // Recarga la lista
              alert(`Pago ID ${id} eliminado.`);
          } catch (err) {
              setErrorPagos((err as Error).message);
          } finally {
              setLoadingPagos(false);
          }
      }
  };


  // --- RENDERIZADO ---
  return (
    <>
      {/* <style>{globalStyles}</style> */} {/* Descomenta si usas CSS inyectado */}
      <div /* className={styleConfig.container} */>
        <div /* className={styleConfig.contentWrapper} */>
          <h2 /* className={styleConfig.title} */>Gestión de Pagos de Clubes</h2>

          {/* Indicadores de Carga/Error */}
          {loadingClubes && <p>Cargando lista de clubes...</p>}
          {errorClubes && <p style={{ color: 'red' }}>Error al cargar clubes: {errorClubes}</p>}
          {loadingPagos && <p>Actualizando pagos...</p>}
          {/* Muestra error global o específico del modal */}
          {(errorPagos && !modal && !pagoEditando) && <p style={{ color: 'red' }}>Error Pagos: {errorPagos}</p>}

          {/* Tabla principal */}
          {!loadingClubes && !errorClubes && (
            <TablaPagosClub
              clubes={clubNombres}
              pagos={pagos}
              onRealizarPago={handleRealizarPago}
              // Puedes añadir onEditar y onEliminar aquí si la tabla los necesita directamente
            />
          )}

          {/* Modal Registro */}
{modal && (
            <div /* className={styleConfig.modalBackdrop} */>
              <FormularioPago
                tipo={modal.tipo}
                club={modal.club}
                montoMinimo={
                  modal.tipo === "cuota" ? montoMinimoCuota :
                  modal.tipo === "arbitraje" ? montoMinimoArbitraje : montoMinimoOtro
                }
                partidos={partidos} // Pasa los partidos cargados
                onGuardar={handleGuardarPago} // Llama a la función POST
                onCerrar={handleCerrarModal}
                loadingPagos={loadingPagos} // <-- AÑADIR ESTA LÍNEA
              />
               {/* Muestra error específico del modal */}
               {errorPagos && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{errorPagos}</p>}
            </div>
          )}

           {/* Modal Edición */}
{pagoEditando && (
            <div /* className={styleConfig.modalBackdrop} */>
              <EditarPago
                pago={pagoEditando}
                montoMinimo={
                    pagoEditando.tipo === "cuota" ? montoMinimoCuota :
                    pagoEditando.tipo === "arbitraje" ? montoMinimoArbitraje : montoMinimoOtro
                }
                partidos={partidos} // Pasa partidos si EditarPago lo necesita
                onGuardar={handleActualizarPago} // Llama a la función PATCH
                onCancelar={handleCerrarModal}
                loadingPagos={loadingPagos} // <-- AÑADIR ESTA LÍNEA
              />
              {/* Muestra error específico del modal */}
              {errorPagos && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{errorPagos}</p>}
            </div>
          )}


          {/* Historial de Pagos (si lo usas en esta página) */}
          {!loadingClubes && !errorClubes && (
            <HistorialPagos
                pagos={pagos}
                clubes={clubNombres} // Pasa los nombres para el filtro
                onEditar={handleIniciarEdicion} // Pasa la función para abrir el modal de edición
                onEliminar={handleEliminarPago} // Pasa la función DELETE
            />
          )}

        </div>
      </div>
    </>
  );
};

export default PagosPage;
