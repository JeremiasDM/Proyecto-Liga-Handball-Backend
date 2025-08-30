
/**
 * Archivo: registrar-referentes.ts
 *
 * Descripción:
 * Este script de TypeScript maneja la funcionalidad de un formulario de registro de referentes
 * de handball en tres fases. Incluye la navegación entre fases, validación de datos en cada
 * paso, previsualización de imágenes y la gestión de la barra de progreso. Al final del
 * proceso, simula el envío del formulario y muestra un modal de éxito.
 */

// Se define una interfaz para la estructura de datos del referente.
interface ReferenteData {
    nombre: string;
    apellido: string;
    categoria: 'Masculino' | 'Femenino' | '';
    dni: string;
    correo: string;
    equipo: string;
    foto?: File | null;
}

// Variables de estado
let faseActual = 1;
// Se guarda el archivo de la foto en una variable de estado
let fotoReferente: File | null = null;


/**
 * @function actualizarEstado
 * @description Centraliza el control de la interfaz de usuario basándose en la fase actual.
 */
function actualizarEstado(): void {
    const fases = [
        document.getElementById('fase1'),
        document.getElementById('fase2'),
        document.getElementById('fase3')
    ];
    const pasos = document.querySelectorAll('.paso');

    fases.forEach((fase, index) => {
        if (fase) {
            fase.style.display = index + 1 === faseActual ? 'block' : 'none';
        }
    });

    pasos.forEach((paso, index) => {
        paso.classList.toggle('activo', index < faseActual);
    });
}

/**
 * @function validarFase
 * @description Valida los campos de la fase actual antes de permitir el avance.
 * @param {number} fase - El número de la fase a validar.
 * @returns {boolean} Retorna true si la validación es exitosa.
 */
function validarFase(fase: number): boolean {
    if (fase === 1) {
        const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
        const apellido = (document.getElementById('apellido') as HTMLInputElement).value.trim();
        const categoria = (document.getElementById('categoria') as HTMLSelectElement).value;

        if (!nombre || !apellido || !categoria) {
            alert("Por favor, completá todos los campos obligatorios de esta fase.");
            return false;
        }
    } else if (fase === 2) {
        const dni = (document.getElementById('dni') as HTMLInputElement).value.trim();
        const correo = (document.getElementById('correo') as HTMLInputElement).value.trim();
        const equipo = (document.getElementById('equipo') as HTMLInputElement).value.trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const dniRegex = /^\d{7,10}$/;

        if (!dni || !correo || !equipo) {
            alert("Por favor, completá todos los campos obligatorios de esta fase.");
            return false;
        }

        if (!emailRegex.test(correo)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return false;
        }

        if (!dniRegex.test(dni)) {
            alert("Por favor, ingresa un DNI válido (7 a 10 dígitos numéricos).");
            return false;
        }
    }
    return true;
}

/**
 * @function manejarNavegacion
 * @description Controla la transición entre fases.
 * @param {1 | -1} direccion - 1 para avanzar, -1 para retroceder.
 */
function manejarNavegacion(direccion: 1 | -1): void {
    if (direccion === 1) {
        if (validarFase(faseActual)) {
            faseActual++;
        } else {
            return;
        }
    } else {
        faseActual--;
    }
    actualizarEstado();
}

/**
 * @function mostrarImagen
 * @description Muestra una vista previa de la imagen seleccionada y la guarda.
 */
function mostrarImagen(event: Event): void {
    const imagen = document.getElementById('preview') as HTMLImageElement;
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (imagen && input && archivo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagen.src = e.target?.result as string;
            imagen.classList.remove('silhouette-preview');
            imagen.style.display = 'block';
        };
        reader.readAsDataURL(archivo);
        fotoReferente = archivo; // ¡Ahora guardamos el archivo en la variable de estado!
    } else if (imagen) {
        imagen.src = 'silhouette.png';
        imagen.classList.add('silhouette-preview');
        fotoReferente = null; // Limpiamos la variable si no hay foto.
    }
}

/**
 * @function cerrarModal
 * @description Oculta el modal de éxito y recarga la página.
 */
function cerrarModal(): void {
    const modalExito = document.getElementById('modalExito');
    if (modalExito) {
        modalExito.style.display = 'none';
        window.location.reload();
    }
}

// Event listener principal que se ejecuta al cargar el DOM.
document.addEventListener('DOMContentLoaded', () => {
    // Asigna event listeners a los botones de navegación
    const btnSiguienteFase1 = document.getElementById('siguienteFase1');
    const btnAnteriorFase1 = document.getElementById('anteriorFase1');
    const btnSiguienteFase2 = document.getElementById('siguienteFase2');
    const btnAnteriorFase2 = document.getElementById('anteriorFase2');
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const inputFoto = document.getElementById('foto') as HTMLInputElement;
    const formReferente = document.getElementById('formReferente') as HTMLFormElement;

    if (btnSiguienteFase1) btnSiguienteFase1.addEventListener('click', () => manejarNavegacion(1));
    if (btnAnteriorFase1) btnAnteriorFase1.addEventListener('click', () => manejarNavegacion(-1));
    if (btnSiguienteFase2) btnSiguienteFase2.addEventListener('click', () => manejarNavegacion(1));
    if (btnAnteriorFase2) btnAnteriorFase2.addEventListener('click', () => manejarNavegacion(-1));
    if (btnCerrarModal) btnCerrarModal.addEventListener('click', cerrarModal);
    if (inputFoto) inputFoto.addEventListener('change', mostrarImagen);

    // Manejo del envío del formulario
    if (formReferente) {
        formReferente.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Creamos un objeto de tipo ReferenteData con los valores del formulario
            const datosReferente: ReferenteData = {
                nombre: (document.getElementById('nombre') as HTMLInputElement).value,
                apellido: (document.getElementById('apellido') as HTMLInputElement).value,
                categoria: (document.getElementById('categoria') as HTMLSelectElement).value as ReferenteData['categoria'],
                dni: (document.getElementById('dni') as HTMLInputElement).value,
                correo: (document.getElementById('correo') as HTMLInputElement).value,
                equipo: (document.getElementById('equipo') as HTMLInputElement).value,
                foto: fotoReferente // Usamos la variable de estado para la foto
            };

            console.log('Datos del referente a registrar:', datosReferente);

            // Simulación del envío exitoso
            const modalExito = document.getElementById('modalExito');
            if (modalExito) {
                modalExito.style.display = 'flex';
            }
        });
    }

    // Inicializa la vista en la primera fase
    actualizarEstado();
});