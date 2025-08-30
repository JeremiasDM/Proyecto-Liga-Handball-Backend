/**
 * Archivo: ver-referentes.ts
 *
 * Descripción:
 * Este script de TypeScript gestiona la interactividad de la página "Ver Referentes".
 * Añade la lógica para la búsqueda, el renderizado dinámico y el manejo de acciones
 * en los botones, usando un enfoque más robusto y centralizado.
 */

// Se define una interfaz para la estructura de datos de un referente.
interface Referente {
  id: number;
  nombre: string;
  apellido: string;
  equipo: string;
}

// Datos de referentes simulados.
const referentesSimulados: Referente[] = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', equipo: 'Los Cóndores' },
  { id: 2, nombre: 'Ana', apellido: 'Gómez', equipo: 'Las Águilas' },
  { id: 3, nombre: 'Carlos', apellido: 'López', equipo: 'Los Halcones' },
  { id: 4, nombre: 'Marta', apellido: 'Rodríguez', equipo: 'Las Panteras' },
  { id: 5, nombre: 'Jorge', apellido: 'García', equipo: 'Los Titanes' },
  { id: 6, nombre: 'Sofía', apellido: 'Martínez', equipo: 'Los Dragones' },
  { id: 7, nombre: 'Pedro', apellido: 'Fernández', equipo: 'Los Gigantes' },
];

/**
 * @function renderizarReferentes
 * @description Inserta elementos HTML en el contenedor para mostrar la lista de referentes.
 * @param {Referente[]} referentes - Un array de objetos Referente a mostrar.
 */
function renderizarReferentes(referentes: Referente[]): void {
  const cuadroReferentes = document.querySelector('.cuadro-referentes');
  if (!cuadroReferentes) {
    console.error('El contenedor ".cuadro-referentes" no fue encontrado.');
    return;
  }

  // Limpiamos el contenido anterior.
  cuadroReferentes.innerHTML = '';

  if (referentes.length === 0) {
    cuadroReferentes.innerHTML = '<p class="no-results">No se encontraron referentes.</p>';
    return;
  }

  // Creamos y añadimos los elementos para cada referente.
  referentes.forEach(referente => {
    const referenteDiv = document.createElement('div');
    referenteDiv.className = 'item-referente';
    referenteDiv.innerHTML = `
      <p><strong>Nombre:</strong> ${referente.nombre} ${referente.apellido}</p>
      <p><strong>Equipo:</strong> ${referente.equipo}</p>
    `;
    cuadroReferentes.appendChild(referenteDiv);
  });
}

/**
 * @function manejarBusqueda
 * @description Filtra la lista de referentes basándose en el texto del buscador.
 * @param {string} terminoBusqueda - El texto ingresado por el usuario.
 */
function manejarBusqueda(terminoBusqueda: string): void {
  const termino = terminoBusqueda.toLowerCase();
  const referentesFiltrados = referentesSimulados.filter(referente =>
    referente.nombre.toLowerCase().includes(termino) ||
    referente.apellido.toLowerCase().includes(termino) ||
    referente.equipo.toLowerCase().includes(termino)
  );
  renderizarReferentes(referentesFiltrados);
}

// Lógica principal al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Inicialmente, se renderiza la lista completa de referentes.
  renderizarReferentes(referentesSimulados);

  // --- Manejo del buscador ---
  const buscadorInput = document.querySelector('.buscador') as HTMLInputElement;
  if (buscadorInput) {
    buscadorInput.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      manejarBusqueda(target.value);
    });
  }

  // --- Manejo de los botones de acción ---
  // Se asigna un listener a los botones de acción usando un atributo 'data-action'
  const botonesAccion = document.querySelectorAll('.acciones-referentes .btn-verde');
  botonesAccion.forEach(boton => {
    boton.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const accion = target.dataset.action || target.textContent?.trim().toLowerCase();

      switch (accion) {
        case 'alta':
        case 'alta de referente':
          alert('Navegando a la página de alta de referentes...');
          // window.location.href = 'alta-referente.html';
          break;
        case 'baja':
        case 'baja de referente':
        case 'eliminar referente':
          alert('Función de baja/eliminación no implementada.');
          break;
        case 'modificar':
        case 'modificar referente':
          alert('Navegando a la página de modificación de referentes...');
          // window.location.href = 'modificar-referente.html';
          break;
        case 'volver':
          alert('Volviendo a la página anterior.');
          // window.history.back();
          break;
        default:
          console.log(`Acción no reconocida: ${accion}`);
          break;
      }
    });
  });
});