/**
 * Archivo: vista-de-referente.ts
 *
 * Descripción:
 * Este script de TypeScript se encarga de poblar dinámicamente los campos de la página
 * "Vista del Referente" con datos obtenidos, por ejemplo, de una API o de la URL.
 * El script simula la carga de datos de un referente específico y los muestra en la
 * interfaz HTML predefinida.
 */

// Se define una interfaz para la estructura de datos de un referente,
// lo que ayuda a mantener la consistencia y la seguridad de tipos.
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
  // En una aplicación real, aquí harías una llamada a una API, por ejemplo:
  // const response = await fetch(`/api/referentes/${id}`);
  // if (!response.ok) return null;
  // const data: Referente = await response.json();
  // return data;

  // Datos simulados para demostración.
  const datosSimulados: Referente = {
    nombre: 'María',
    apellido: 'González',
    categoria: 'Femenino',
    dni: '12.345.678',
    correo: 'maria.gonzalez@example.com',
    equipo: 'Los Halcones',
    fotoUrl: 'https://via.placeholder.com/150/00cc66/ffffff?text=MG' // URL de una imagen de ejemplo
  };

  // Se devuelve una promesa para simular el comportamiento asíncrono de una petición real.
  return new Promise(resolve => setTimeout(() => resolve(datosSimulados), 500));
}

/**
 * @function mostrarDatosReferente
 * @description Rellena los elementos HTML de la página con los datos del referente.
 * @param {Referente} referente - El objeto con la información del referente.
 */
function mostrarDatosReferente(referente: Referente): void {
  // Se obtienen los elementos HTML por su ID y se les asigna el valor correspondiente.
  (document.getElementById('nombreReferente') as HTMLSpanElement).textContent = referente.nombre;
  (document.getElementById('apellidoReferente') as HTMLSpanElement).textContent = referente.apellido;
  (document.getElementById('categoriaReferente') as HTMLSpanElement).textContent = referente.categoria;
  (document.getElementById('dniReferente') as HTMLSpanElement).textContent = referente.dni;
  (document.getElementById('correoReferente') as HTMLSpanElement).textContent = referente.correo;
  (document.getElementById('equipoReferente') as HTMLSpanElement).textContent = referente.equipo;

  const fotoElement = document.getElementById('referentePhoto') as HTMLImageElement;
  if (fotoElement) {
    fotoElement.src = referente.fotoUrl;
    fotoElement.alt = `Foto de ${referente.nombre} ${referente.apellido}`;
  }
}

/**
 * @function inicializarPagina
 * @description Función principal para iniciar la carga de datos al cargar la página.
 */
async function inicializarPagina(): Promise<void> {
  // En una aplicación real, se obtendría el ID de la URL.
  // const urlParams = new URLSearchParams(window.location.search);
  // const referenteId = urlParams.get('id');

  // Aquí se simula un ID para la demostración.
  const referenteId = '123';

  if (referenteId) {
    // Se simula un estado de carga mientras se obtienen los datos.
    console.log(`Cargando datos del referente con ID: ${referenteId}...`);
    // Se obtienen los datos del referente de forma asíncrona.
    const referente = await obtenerReferentePorId(referenteId);
    
    if (referente) {
      // Si se encuentran los datos, se muestran en la página.
      mostrarDatosReferente(referente);
    } else {
      // Si el referente no se encuentra, se muestra un mensaje de error.
      const viewContainer = document.querySelector('.view-container') as HTMLElement;
      if (viewContainer) {
        viewContainer.innerHTML = '<p class="error-message">Referente no encontrado.</p>';
      }
    }
  } else {
    // Si no hay ID en la URL, se muestra un mensaje de error.
    const viewContainer = document.querySelector('.view-container') as HTMLElement;
    if (viewContainer) {
      viewContainer.innerHTML = '<p class="error-message">No se ha especificado un referente para mostrar.</p>';
    }
  }
}

// Escuchador de eventos que ejecuta la función de inicialización cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', inicializarPagina);
