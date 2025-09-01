/**
 * Archivo: vista-de-referente.ts
 *
 * Descripción:
 * Este script de TypeScript se encarga de poblar dinámicamente los campos de la página
 * "Vista del Referente" con datos obtenidos de forma asíncrona. Se ha mejorado la
 * lógica para manejar de forma segura los elementos del DOM y los posibles errores.
 */

// Se define una interfaz para la estructura de datos de un referente.
interface Referente {
  nombre: string;
  apellido: string;
  categoria: string;
  dni: string;
  correo: string;
  equipo: string;
  fotoUrl: string;
}

/**
 * @function obtenerReferentePorId
 * @description Simula la obtención de datos de un referente específico a partir de un ID.
 * @param {string} id - El identificador único del referente.
 * @returns {Promise<Referente | null>} Una promesa que se resuelve con los datos del referente o null si no se encuentra.
 */
async function obtenerReferentePorId(id: string): Promise<Referente | null> {
  // En una aplicación real, se haría una llamada a una API como esta:
  // try {
  //   const response = await fetch(`/api/referentes/${id}`);
  //   if (!response.ok) {
  //     console.error(`Error al obtener el referente. Código de estado: ${response.status}`);
  //     return null;
  //   }
  //   const data: Referente = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Ocurrió un error en la red:', error);
  //   return null;
  // }

  // Datos simulados para demostración.
  const datosSimulados: Referente = {
    nombre: 'María',
    apellido: 'González',
    categoria: 'Femenino',
    dni: '12.345.678',
    correo: 'maria.gonzalez@example.com',
    equipo: 'Los Halcones',
    fotoUrl: 'https://via.placeholder.com/150/00cc66/ffffff?text=MG'
  };

  // Simulación de respuesta exitosa o de error (para propósitos de demostración)
  const isFound = id === '123';
  return new Promise(resolve => setTimeout(() => resolve(isFound ? datosSimulados : null), 500));
}

/**
 * @function mostrarDatosReferente
 * @description Rellena los elementos HTML de la página con los datos del referente de forma segura.
 * @param {Referente} referente - El objeto con la información del referente.
 */
function mostrarDatosReferente(referente: Referente): void {
  // Mapa de IDs de elementos a las propiedades del objeto Referente.
  const fields = {
    nombreReferente: referente.nombre,
    apellidoReferente: referente.apellido,
    categoriaReferente: referente.categoria,
    dniReferente: referente.dni,
    correoReferente: referente.correo,
    equipoReferente: referente.equipo,
  };

  // Itera sobre el mapa para asignar los valores de forma segura.
  for (const [id, value] of Object.entries(fields)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    } else {
      console.warn(`Elemento con ID "${id}" no encontrado en el DOM.`);
    }
  }

  // Manejo de la imagen de forma separada para mejor control.
  const fotoElement = document.getElementById('referentePhoto') as HTMLImageElement;
  if (fotoElement) {
    fotoElement.src = referente.fotoUrl;
    fotoElement.alt = `Foto de ${referente.nombre} ${referente.apellido}`;
  } else {
    console.warn('Elemento de imagen con ID "referentePhoto" no encontrado.');
  }
}

/**
 * @function manejarMensaje
 * @description Muestra un mensaje de error o informativo en el contenedor principal.
 * @param {string} mensaje - El mensaje a mostrar.
 * @param {boolean} isError - Indica si el mensaje es de error.
 */
function manejarMensaje(mensaje: string, isError: boolean = false): void {
  const viewContainer = document.querySelector('.view-container') as HTMLElement;
  if (viewContainer) {
    const clase = isError ? 'error-message' : 'info-message';
    viewContainer.innerHTML = `<p class="${clase}">${mensaje}</p>`;
    // Opcional: ocultar otros elementos relevantes de la vista si hay un error.
  }
}

/**
 * @function inicializarPagina
 * @description Función principal para iniciar la carga de datos al cargar la página.
 */
async function inicializarPagina(): Promise<void> {
  const urlParams = new URLSearchParams(window.location.search);
  const referenteId = urlParams.get('id') || '123'; // Simulación: Si no hay ID en la URL, se usa '123'.

  if (referenteId) {
    console.log(`Cargando datos del referente con ID: ${referenteId}...`);
    const referente = await obtenerReferentePorId(referenteId);

    if (referente) {
      mostrarDatosReferente(referente);
    } else {
      manejarMensaje('Referente no encontrado.', true);
    }
  } else {
    manejarMensaje('No se ha especificado un referente para mostrar.', true);
  }
}

// Escuchador de eventos que ejecuta la función de inicialización cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', inicializarPagina);