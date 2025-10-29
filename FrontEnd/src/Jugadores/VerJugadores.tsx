import React, { useState } from "react";
// Se asume que FormularioDatos y FormularioDocumentacion están definidos
import FormularioDatos from "./FormularioDatos"; 
import FormularioDocumentacion from "./FormularioDocumentacion";
// Usamos el tipo Jugador de los archivos de tu proyecto
// Inlined Jugador type
type Jugador = {
    estado?: string;
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    club: string;
    categoria: string;
    telefono?: string;
    vencimiento?: string;
    carnetUrl?: string;
    fichaMedicaUrl?: string;
};
// El import de Jugador puede variar según la ruta final en tu proyecto
// import type { Jugador } from "./FormularioDatos"; // Si está en el mismo archivo de tipos

type Props = {
    jugador: Jugador;
    onActualizar: (jugador: Jugador) => void;
    onEliminar: (id: number) => void;
};

const VerJugadores: React.FC<Props> = ({ jugador, onActualizar, onEliminar }) => {
    const [editandoDatos, setEditandoDatos] = useState(false);
    const [editandoDocs, setEditandoDocs] = useState(false);

    // Función auxiliar para manejar el guardado y cerrar el formulario
    const handleGuardarDatos = (j: Jugador) => {
        onActualizar(j);
        setEditandoDatos(false);
    };
    
    const handleGuardarDocs = (j: Jugador) => {
        onActualizar(j);
        setEditandoDocs(false);
    };

    // Manejador de eliminación con confirmación
    const handleEliminar = () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar a ${jugador.nombre} ${jugador.apellido}?`)) {
            onEliminar(jugador.id);
        }
    };

    // Función para determinar la clase de estilo para el estado
    const getStatusClass = (estado?: string) => {
        const status = (estado || "activo").toLowerCase();
        return `status-pill status-${status}`;
    };

    return (
        <>
            {/* ✅ SECCIÓN DE ESTILOS YA INCLUIDA */}
            <style>{`
                /* Definiciones de color y variables */
                :root {
                    --primary-blue: #1f3c88;
                    --hover-blue: #1a326b;
                    --edit-data-color: var(--primary-blue);
                    --edit-docs-color: #059669; /* green-600 */
                    --delete-color: #dc2626; /* red-600 */
                    --shadow-color: rgba(0, 0, 0, 0.15);
                }

                /* Contenedor principal de la tarjeta de jugador */
                .player-card {
                    background-color: white;
                    box-shadow: 0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
                    border-radius: 1rem; /* rounded-xl */
                    padding: 1.5rem; /* p-6 */
                    margin-bottom: 1.5rem; 
                    border-left: 5px solid var(--primary-blue); /* Destacar la tarjeta */
                    transition: box-shadow 0.2s;
                }

                .player-card:hover {
                    box-shadow: 0 8px 12px -2px rgba(0, 0, 0, 0.18), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
                }

                /* Título del jugador */
                .player-name {
                    font-size: 1.5rem; /* text-xl */
                    font-weight: 700;
                    color: var(--primary-blue);
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #e5e7eb;
                }

                /* Información secundaria */
                .player-info {
                    margin-bottom: 0.5rem;
                    color: #4b5563; /* Gris medio */
                }
                
                .player-info strong {
                    font-weight: 600;
                    color: #374151; /* Gris oscuro */
                }

                /* ✅ NUEVO: Estilos para la pastilla (pill) de estado */
                .status-pill {
                    display: inline-block;
                    padding: 0.2rem 0.6rem;
                    border-radius: 9999px; /* rounded-full */
                    font-size: 0.875rem;
                    font-weight: 700;
                    text-transform: capitalize;
                    line-height: 1;
                }

                .status-activo {
                    background-color: #d1fae5; /* green-100 */
                    color: #059669; /* green-600 */
                }
                
                .status-lesionado {
                    background-color: #fee2e2; /* red-100 */
                    color: #ef4444; /* red-500 */
                }
                
                .status-sancionado {
                    background-color: #fef3c7; /* amber-100 */
                    color: #f59e0b; /* amber-500 */
                }
                
                .status-inactivo {
                    background-color: #e5e7eb; /* gray-200 */
                    color: #6b7280; /* gray-500 */
                }
                
                /* Estilo para imágenes (Carnet) */
                .document-image {
                    margin-top: 1rem;
                    max-width: 200px;
                    border-radius: 0.75rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    border: 1px solid #e5e7eb;
                }

                /* Enlace de documentación (Ficha Médica) */
                .document-link {
                    color: var(--edit-docs-color); /* Usar el color verde de docs */
                    text-decoration: underline;
                    display: block;
                    margin-top: 0.75rem;
                    font-weight: 500;
                }

                .document-link:hover {
                    color: #047857; /* Un verde más oscuro */
                }

                /* Contenedor de botones de acción */
                .action-buttons-container {
                    display: flex;
                    gap: 0.75rem;
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px dashed #e5e7eb;
                    flex-wrap: wrap; 
                }

                /* Botones base */
                .action-button {
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    color: white;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.2s, transform 0.1s;
                    white-space: nowrap;
                }
                
                .action-button:active {
                    transform: scale(0.98);
                }

                /* Botón Editar Datos (Azul) */
                .btn-edit-data {
                    background-color: var(--edit-data-color);
                }

                .btn-edit-data:hover {
                    background-color: #1a326b; 
                }

                /* Botón Editar Documentación (Verde) */
                .btn-edit-docs {
                    background-color: var(--edit-docs-color);
                }

                .btn-edit-docs:hover {
                    background-color: #047857; 
                }

                /* Botón Eliminar (Rojo) */
                .btn-delete {
                    background-color: var(--delete-color);
                    margin-left: auto; /* Empuja el botón eliminar a la derecha */
                }

                .btn-delete:hover {
                    background-color: #b91c1c; 
                }

                /* Contenedores de formularios de edición */
                .edit-form-container {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #f3f4f6;
                }

            `}</style>

            <div className="player-card">
                <h3 className="player-name">
                    {jugador.nombre} {jugador.apellido}
                </h3>
                <p className="player-info"><strong>Club:</strong> {jugador.club}</p>
                <p className="player-info"><strong>DNI:</strong> {jugador.dni}</p>
                <p className="player-info">
                    <strong>Estado:</strong> 
                    {/* ✅ APLICACIÓN DEL ESTILO DINÁMICO DE ESTADO */}
                    <span className={getStatusClass(jugador.estado)}>
                        {jugador.estado || 'activo'}
                    </span>
                </p>

                {/* Información opcional */}
                <p className="player-info"><strong>Categoría:</strong> {jugador.categoria}</p>
                {jugador.telefono && <p className="player-info"><strong>Teléfono:</strong> {jugador.telefono}</p>}
                {jugador.vencimiento && <p className="player-info"><strong>Vencimiento Carnet:</strong> {jugador.vencimiento}</p>}


                {jugador.carnetUrl && <img src={jugador.carnetUrl} alt={`Carnet de ${jugador.nombre}`} className="document-image" />}
                
                {jugador.fichaMedicaUrl && (
                    <a href={jugador.fichaMedicaUrl} target="_blank" rel="noopener noreferrer" className="document-link">
                        🔗 Ver ficha médica (PDF/Imagen)
                    </a>
                )}

                <div className="action-buttons-container">
                    <button 
                        onClick={() => {setEditandoDocs(false); setEditandoDatos(!editandoDatos);}} 
                        className="action-button btn-edit-data"
                    >
                        {editandoDatos ? "🚫 Cancelar Edición" : "✏️ Editar Datos"}
                    </button>
                    
                    <button 
                        onClick={() => {setEditandoDatos(false); setEditandoDocs(!editandoDocs);}} 
                        className="action-button btn-edit-docs"
                    >
                        {editandoDocs ? "🚫 Cancelar Docs" : "📄 Editar Documentación"}
                    </button>
                    
                    <button onClick={handleEliminar} className="action-button btn-delete">
                        🗑️ Eliminar
                    </button>
                </div>

                {(editandoDatos || editandoDocs) && (
                    <div className="edit-form-container">
                        {editandoDatos && (
                            <FormularioDatos 
                                jugador={jugador} 
                                onGuardar={handleGuardarDatos} 
                                onCancelar={() => setEditandoDatos(false)} 
                            />
                        )}
                        {editandoDocs && (
                            <FormularioDocumentacion 
                                jugador={jugador} 
                                onGuardar={handleGuardarDocs} 
                                onCancelar={() => setEditandoDocs(false)} 
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default VerJugadores;