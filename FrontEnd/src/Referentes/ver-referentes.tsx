/**
 * Archivo: ver-referentes.ts
 *
 * Descripción:
 * Este script de TypeScript gestiona la interactividad de la página "Ver Referentes".
 * Aunque la página HTML y los estilos CSS ya están definidos, este código añade la
 * lógica necesaria para:
 * 1. Manejar la funcionalidad de búsqueda.
 * 2. Asignar eventos a los botones de acción ("alta", "baja", etc.).
 * 3. Simular la carga dinámica de una lista de referentes en el contenedor principal.
 * 4. Gestionar la navegación a otras páginas (simulada).
 */

// Se define una interfaz para la estructura de datos de un referente.
// Esto es útil si los datos se cargan desde una API.
interface Referente {
  id: number;
  nombre: string;
  apellido: string;
  equipo: string;
}

// Datos de referentes simulados. En una aplicación real, estos datos vendrían de una base de datos.
const referentesSimulados: Referente[] = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', equipo: 'Los Cóndores' },
  { id: 2, nombre: 'Ana', apellido: 'Gómez', equipo: 'Las Águilas' },
  { id: 3, nombre: 'Carlos', apellido: 'López', equipo: 'Los Halcones' },
  { id: 4, nombre: 'Marta', apellido: 'Rodríguez', equipo: 'Las Panteras' },
  { id: 5, nombre: 'Jorge', apellido: 'García', equipo: 'Los Titanes' },
];

/**
 * @function renderizarReferentes
 * @description Inserta elementos HTML en el cuadro de referentes para mostrar la lista.
 * @param {Referente[]} referentes - Un array de objetos Referente a mostrar.
 */
function renderizarReferentes(referentes: Referente[]): void {
  const cuadroReferentes = document.querySelector('.cuadro-referentes');
  if (!cuadroReferentes) return; // Si el elemento no existe, salimos de la función.

  cuadroReferentes.innerHTML = ''; // Limpiamos el contenido anterior.

  if (referentes.length === 0) {
    cuadroReferentes.innerHTML = '<p class="no-results">No se encontraron referentes.</p>';
    return;
  }

  referentes.forEach(referente => {
    // Se crea un div por cada referente.
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
 * @description Filtra la lista de referentes basada en el texto del buscador.
 * @param {string} terminoBusqueda - El texto ingresado por el usuario en el buscador.
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

/**
 * @description Este es el principal escuchador de eventos que se activa cuando el DOM ha cargado completamente.
 * Contiene toda la lógica para configurar los eventos de la página.
 */
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
  // Se seleccionan todos los botones de acción para asignarles eventos.
  const botonesAccion = document.querySelectorAll('.acciones-referentes .btn-verde');
  botonesAccion.forEach(boton => {
    boton.addEventListener('click', () => {
      const accion = boton.textContent?.trim().toLowerCase();
      switch (accion) {
        case 'alta de referente':
          alert('Navegando a la página de alta de referentes...');
          // window.location.href = 'alta-referente.html'; // Ejemplo de navegación real
          break;
        case 'baja de referente':
        case 'eliminar referente':
          alert('Función de baja/eliminación no implementada.');
          break;
        case 'modificar referente':
          alert('Navegando a la página de modificación de referentes...');
          // window.location.href = 'modificar-referente.html'; // Ejemplo de navegación real
          break;
        case 'volver':
          alert('Volviendo a la página anterior.');
          // window.history.back(); // Ejemplo para volver a la página anterior
          break;
        default:
          console.log(`Acción no reconocida: ${accion}`);
      }
    });
  });

  // --- Manejo de otros elementos ---
  const volverButton = document.querySelector('.btn-verde') as HTMLButtonElement;
  if (volverButton) {
    volverButton.addEventListener('click', () => {
      window.history.back();
    });
  }
});
