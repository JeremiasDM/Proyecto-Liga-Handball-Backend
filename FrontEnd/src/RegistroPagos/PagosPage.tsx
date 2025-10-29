import React, { useState, useEffect } from "react";
// import { usePagos } from "../hooks/usePagos"; // Eliminado o adaptado si gestiona llamadas API
import TablaPagosClub from "./TablaPagosClub";
import FormularioPago from "./FormularioPago";
import HistorialPagos from "./HistorialPagos";
import EditarPago from "./EditarPago";
import type { CSSProperties } from "react";

// ============================================
// SECCIÓN DE CONFIGURACIÓN DE CLASES Y ESTILOS
// ============================================
const styleConfig = {
    container: "pagos-container",
    contentWrapper: "content-wrapper",
    title: "main-title",
    modalBackdrop: "modal-backdrop",
    sancionesSectionWrapper: "sanciones-section-wrapper",
    sancionesHeader: "sanciones-header",
    sancionesTitle: "sanciones-title",
    sancionesBody: "sanciones-body",
    sancionesList: "sanciones-list",
    sancionItem: "sancion-item",
    sancionIcon: "sancion-icon",
    sancionClub: "sancion-club",
    sancionDescription: "sancion-description",
    sancionTypeBadge: "sancion-type-badge",
    sancionMetadata: "sancion-metadata",
    noSancionesMessage: "no-sanciones-message",
    apiStatusAlert: "api-status-alert",
    // NUEVAS CLASES PARA LA NAVEGACIÓN
    navBar: "nav-bar", 
    navButton: "nav-button",
    navButtonActive: "nav-button-active",
};

/**
 * Bloque de estilos CSS inyectados para el componente PagosPage.
 */
const globalStyles = `
/* ... (Estilos existentes) ... */
${/* Estructura Principal */''}
.pagos-container {
    min-height: 100vh;
    background-color: #f3f4f6; /* bg-gray-100 */
    padding: 1rem; /* p-4 */
}
@media (min-width: 768px) {
    .pagos-container {
        padding: 2rem; /* md:p-8 */
    }
}

.content-wrapper {
    max-width: 80rem; /* max-w-7xl */
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff; /* bg-white */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */
    border-radius: 0.5rem; /* rounded-lg */
    padding: 1.5rem; /* p-6 */
    display: flex;
    flex-direction: column;
    gap: 2rem; /* space-y-8 */
}

.main-title {
    font-size: 1.875rem; /* text-3xl */
    font-weight: 800; /* font-extrabold */
    color: #1f2937; /* text-gray-800 */
    border-bottom: 2px solid #e5e7eb; /* border-b-2 */
    padding-bottom: 1rem; /* pb-4 */
    margin-bottom: 1.5rem; /* mb-6 */
}

/* Estilos de Modal */
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5); /* bg-black bg-opacity-50 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}

/* Sección de Sanciones (Sin iconos) */
.sanciones-section-wrapper {
    /* Mantenemos el estilo visual, pero eliminamos el margin-top de 2.5rem para que no quede espacio innecesario al cambiar de pestaña */
    padding: 1.25rem; /* p-5 */
    border: 2px solid #fca5a5; /* border-2 border-red-300 */
    border-radius: 0.75rem; /* rounded-xl */
    background-color: #fef2f2; /* bg-red-50 */
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); /* shadow-inner */
}

.sanciones-header {
    margin-bottom: 1rem; /* mb-4 */
    padding-bottom: 0.5rem; /* pb-2 */
    border-bottom: 1px solid #fee2e2; /* border-b border-red-200 */
}

.sanciones-title {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* gap-2 */
    font-size: 1.25rem; /* text-xl */
    font-weight: 700; /* font-bold */
    color: #b91c1c; /* text-red-700 */
}
/* Eliminado: .sanciones-title svg {} */
.sanciones-body {
    max-height: 20rem; /* max-h-80 */
    overflow-y: auto;
}
.sanciones-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem; /* space-y-3 */
}
.sancion-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem; /* gap-4 */
    padding: 0.75rem; /* p-3 */
    background-color: #ffffff; /* bg-white */
    border-radius: 0.5rem; /* rounded-lg */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06); /* shadow-md */
    transition: background-color 0.2s;
    cursor: default;
    border: 1px solid #fee2e2; /* border border-red-100 */
}
.sancion-item:hover {
    background-color: #fef2f2; /* hover:bg-red-100 */
}
.sancion-icon {
    /* Mantenido para estructura, pero puede estar vacío o contener un placeholder simple */
    font-size: 1.5rem; /* text-2xl */
    flex-shrink: 0;
}
.sancion-club {
    font-size: 1.125rem; /* text-lg */
    font-weight: 600; /* font-semibold */
    color: #111827; /* text-gray-900 */
}
.sancion-description {
    font-size: 0.875rem; /* text-sm */
    color: #4b5563; /* text-gray-600 */
    margin-top: 0.125rem; /* mt-0.5 */
}
.sancion-type-badge {
    display: inline-block;
    padding: 0.125rem 0.5rem; /* px-2 py-0.5 */
    margin-right: 0.5rem;
    font-size: 0.75rem; /* text-xs */
    font-weight: 500; /* font-medium */
    border-radius: 9999px; /* rounded-full */
    background-color: #fecaca; /* bg-red-200 */
    color: #991b1b; /* text-red-800 */
    text-transform: uppercase;
}
.sancion-metadata {
    font-size: 0.75rem; /* text-xs */
    color: #6b7280; /* text-gray-500 */
    margin-top: 0.25rem; /* mt-1 */
}
.sancion-metadata .font-semibold {
    font-weight: 600;
    color: #b91c1c; /* text-red-700 */
}
.no-sanciones-message {
    text-align: center;
    padding: 1.25rem; /* p-5 */
    color: #4b5563; /* text-gray-600 */
    background-color: #ecfdf5; /* bg-green-50 */
    border-radius: 0.5rem; /* rounded-lg */
    border: 1px solid #a7f3d0; /* border border-green-200 */
}
/* NUEVOS ESTILOS PARA INDICADORES DE ESTADO API */
.api-status-alert {
    padding: 0.75rem; /* p-3 */
    margin-bottom: 1rem; /* mb-4 */
    border-radius: 0.375rem; /* rounded-md */
    font-weight: 500;
}
.api-status-alert.error {
    background-color: #fee2e2; /* bg-red-100 */
    color: #991b1b; /* text-red-800 */
    border: 1px solid #fca5a5; /* border-red-300 */
}
.api-status-alert.loading {
    background-color: #f0f9ff; /* bg-blue-50 */
    color: #0c4a6e; /* text-sky-800 */
    border: 1px solid #7dd3fc; /* border-sky-300 */
}

/* 🆕 ESTILOS PARA LA BARRA DE NAVEGACIÓN (tabs) */
.nav-bar {
    display: flex;
    justify-content: center;
    gap: 1rem; /* space-x-4 */
    margin-bottom: 2rem;
    padding: 0.5rem 0;
    /* Eliminamos el border-bottom para usarlo como separador visual de la pestaña activa */
}

.nav-button {
    background-color: #f9fafb; /* bg-gray-50 */
    color: #4b5563; /* text-gray-600 */
    padding: 0.6rem 1.2rem;
    border: 1px solid #d1d5db; /* border-gray-300 */
    border-radius: 0.375rem 0.375rem 0 0; /* Bordes superiores redondeados */
    border-bottom: none; /* Quitamos el borde inferior */
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    position: relative;
    z-index: 10;
}

.nav-button:hover:not(.nav-button-active) {
    background-color: #e5e7eb; /* hover:bg-gray-200 */
    color: #1f2937;
    border-color: #9ca3af;
}

.nav-button-active {
    background-color: #ffffff; /* Fondo blanco para la pestaña activa */
    color: #059669; /* Color de texto del tema (emerald) */
    border-color: #e5e7eb; /* Borde superior y laterales grises */
    border-bottom: 2px solid #ffffff; /* Simula la línea divisoria debajo de la pestaña activa */
    margin-bottom: -2px; /* Mueve la pestaña activa para superponer la línea divisoria del contenedor */
    z-index: 20;
}

.nav-button-active:hover {
    background-color: #ffffff; 
    color: #047857; /* Un poco más oscuro en hover */
    border-color: #d1d5db;
}

/* Contenedor para el contenido de las pestañas (agregado) */
.tab-content-container {
    padding-top: 0.5rem; /* Espacio superior */
    border-top: 1px solid #e5e7eb; /* Línea divisoria de las pestañas */
    margin-top: -1.5rem; /* Para que la línea toque las pestañas */
}

`;


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


// --- COMPONENTE ---
const PagosPage: React.FC = () => {
    // Estados para datos de la API
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [clubesConId, setClubesConId] = useState<ClubAPI[]>([]);
    const [clubNombres, setClubNombres] = useState<string[]>([]);
    // Placeholder para partidos - Deberías cargarlos desde la API también si es necesario
    const [partidos, setPartidos] = useState<any[]>([]);
    
    // ESTADO CLAVE: Controla qué sección está visible.
    const [activeSection, setActiveSection] = useState<'tablaClubes' | 'historialPagos' | 'sanciones'>('tablaClubes'); 

    // Estados UI
    const [modal, setModal] = useState<{ tipo: TipoPago; club: string } | null>(null);
    const [pagoEditando, setPagoEditando] = useState<Pago | null>(null); // Para el modal de edición
    const [loadingClubes, setLoadingClubes] = useState(true);
    const [errorClubes, setErrorClubes] = useState<string | null>(null);
    const [loadingPagos, setLoadingPagos] = useState(false);
    const [errorPagos, setErrorPagos] = useState<string | null>(null);

    // ... (El resto de las funciones cargarClubes, cargarPagos, handleGuardarPago, etc. quedan igual) ...
    // --- Cargar datos iniciales ---
    useEffect(() => {
        cargarClubes();
        cargarPagos();
        // cargarPartidos(); // <-- Llama si necesitas cargar partidos
    }, []);

    // --- FUNCIONES API (Mantengo solo las firmas para brevedad, pero en tu código real van aquí) ---
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
            <style>{globalStyles}</style> {/* CSS inyectado */}
            <div className={styleConfig.container}>
                <div className={styleConfig.contentWrapper}>
                    <h2 className={styleConfig.title}>Gestión de Pagos de Clubes </h2>

                    {/* BARRA DE NAVEGACIÓN (TABS) */}
                    <nav className={styleConfig.navBar}>
                        <button
                            className={`${styleConfig.navButton} ${activeSection === 'tablaClubes' ? styleConfig.navButtonActive : ''}`}
                            onClick={() => setActiveSection('tablaClubes')}
                        >
                            Resumen por Club
                        </button>
                        <button
                            className={`${styleConfig.navButton} ${activeSection === 'historialPagos' ? styleConfig.navButtonActive : ''}`}
                            onClick={() => setActiveSection('historialPagos')}
                        >
                            Historial de Pagos
                        </button>
                        <button
                            className={`${styleConfig.navButton} ${activeSection === 'sanciones' ? styleConfig.navButtonActive : ''}`}
                            onClick={() => setActiveSection('sanciones')}
                        >
                            Sanciones
                        </button>
                    </nav>

                    {/* Contenedor para el contenido de las pestañas */}
                    <div className="tab-content-container">

                        {/* Indicadores de Carga/Error Globales */}
                        {loadingClubes && <p className={`${styleConfig.apiStatusAlert} loading`}>Cargando lista de clubes...</p>}
                        {errorClubes && <p className={`${styleConfig.apiStatusAlert} error`}>🚨 Error al cargar clubes: {errorClubes}</p>}
                        {loadingPagos && <p className={`${styleConfig.apiStatusAlert} loading`}>Actualizando pagos...</p>}
                        {/* Muestra error global o específico del modal (si no está abierto un modal) */}
                        {(errorPagos && !modal && !pagoEditando) && <p className={`${styleConfig.apiStatusAlert} error`}>❌ Error Pagos: {errorPagos}</p>}

                        {/* --- RENDERIZADO CONDICIONAL DE SECCIONES --- */}
                        
                        {/* 1. Tabla principal: Resumen por Club */}
                        {activeSection === 'tablaClubes' && (
                            <div id="tablaClubes">
                                {!loadingClubes && !errorClubes && (
                                    <TablaPagosClub
                                        clubes={clubNombres}
                                        pagos={pagos}
                                        onRealizarPago={handleRealizarPago}
                                    />
                                )}
                            </div>
                        )}

                        {/* 2. Historial de Pagos */}
                        {activeSection === 'historialPagos' && (
                            <div id="historialPagos">
                                {!loadingClubes && !errorClubes && (
                                    <HistorialPagos
                                        pagos={pagos}
                                        clubes={clubNombres} // Pasa los nombres para el filtro
                                        onEditar={handleIniciarEdicion} // Pasa la función para abrir el modal de edición
                                        onEliminar={handleEliminarPago} // Pasa la función DELETE
                                    />
                                )}
                            </div>
                        )}

                        {/* 3. Sección de Sanciones (Ejemplo) */}
                        {activeSection === 'sanciones' && (
                            <div id="sanciones" className={styleConfig.sancionesSectionWrapper}>
                                <div className={styleConfig.sancionesHeader}>
                                    <h3 className={styleConfig.sancionesTitle}>
                                        ⚠️ Sanciones Pendientes (Ejemplo)
                                    </h3>
                                </div>
                                <div className={styleConfig.sancionesBody}>
                                    <ul className={styleConfig.sancionesList}>
                                        <li className={styleConfig.sancionItem}>
                                            <span className={styleConfig.sancionIcon}></span> 
                                            <div>
                                                <p className={styleConfig.sancionClub}>Club Atlético Ejemplo</p>
                                                <span className={styleConfig.sancionTypeBadge}>Multa</span>
                                                <span className={styleConfig.sancionDescription}>No presentación de planillas a tiempo.</span>
                                                <p className={styleConfig.sancionMetadata}>Monto: <span style={{ fontWeight: 600, color: '#b91c1c' }}>$15.000</span> | Pendiente</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <p className={styleConfig.noSancionesMessage} style={{ marginTop: '1rem' }}>✅ No hay sanciones pendientes de pago.</p> 
                                </div>
                            </div> 
                        )}

                    </div> {/* Fin del contenedor de pestañas */}


                    {/* Modal Registro (Flota por encima, NO CONDICIONAL AL activeSection) */}
                    {modal && (
                        <div className={styleConfig.modalBackdrop}>
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
                            />
                            {/* Muestra error específico del modal */}
                            {errorPagos && <p className={`${styleConfig.apiStatusAlert} error`} style={{ marginTop: '1rem', textAlign: 'center' }}>❌ {errorPagos}</p>}
                        </div>
                    )}

                    {/* Modal Edición (Flota por encima, NO CONDICIONAL AL activeSection) */}
                    {pagoEditando && (
                        <div className={styleConfig.modalBackdrop}>
                            <EditarPago
                                pago={pagoEditando}
                                montoMinimo={
                                    pagoEditando.tipo === "cuota" ? montoMinimoCuota :
                                    pagoEditando.tipo === "arbitraje" ? montoMinimoArbitraje : montoMinimoOtro
                                }
                                partidos={partidos} // Pasa partidos si EditarPago lo necesita
                                onGuardar={handleActualizarPago} // Llama a la función PATCH
                                onCancelar={handleCerrarModal}
                            />
                            {/* Muestra error específico del modal */}
                            {errorPagos && <p className={`${styleConfig.apiStatusAlert} error`} style={{ marginTop: '1rem', textAlign: 'center' }}>❌ {errorPagos}</p>}
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default PagosPage;