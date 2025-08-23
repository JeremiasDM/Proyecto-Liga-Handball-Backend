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
// Esto mejora la seguridad de tipos y la legibilidad del código.
interface ReferenteData {
    nombre: string;
    apellido: string;
    categoria: 'Masculino' | 'Femenino' | '';
    dni: string;
    correo: string;
    equipo: string;
    foto?: File | null;
}

/**
 * @function actualizarBarra
 * @description Actualiza el estado visual de la barra de progreso.
 * @param {number} fase - El número de la fase actual (1, 2 o 3).
 */
function actualizarBarra(fase: number): void {
    const pasos = document.querySelectorAll('.paso');
    pasos.forEach((paso, index) => {
        // La clase 'activo' se aplica a todos los pasos menores a la fase actual.
        paso.classList.toggle('activo', index < fase);
    });
}

/**
 * @function validarCorreo
 * @description Valida el formato de una dirección de correo electrónico.
 * @param {string} correo - La cadena de texto del correo a validar.
 * @returns {boolean} Retorna true si el formato es válido, de lo contrario, false.
 */
function validarCorreo(correo: string): boolean {
    // Expresión regular para validar el formato de correo.
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|com\.ar|net|org|edu)$/;
    return emailRegex.test(correo);
}

/**
 * @function siguienteFase1
 * @description Maneja la lógica para avanzar de la fase 1 a la fase 2.
 * Valida que los campos de la fase 1 estén completos.
 */
function siguienteFase1(): void {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
    const apellido = (document.getElementById('apellido') as HTMLInputElement).value.trim();
    const categoria = (document.getElementById('categoria') as HTMLSelectElement).value;

    if (!nombre || !apellido || !categoria) {
        alert("Por favor, completá todos los campos obligatorios de esta fase.");
        return;
    }
    // Oculta la fase 1 y muestra la fase 2.
    document.getElementById('fase1')!.style.display = 'none';
    document.getElementById('fase2')!.style.display = 'block';
    actualizarBarra(2);
}

/**
 * @function anteriorFase1
 * @description Maneja la lógica para retroceder de la fase 2 a la fase 1.
 */
function anteriorFase1(): void {
    // Oculta la fase 2 y muestra la fase 1.
    document.getElementById('fase2')!.style.display = 'none';
    document.getElementById('fase1')!.style.display = 'block';
    actualizarBarra(1);
}

/**
 * @function siguienteFase2
 * @description Maneja la lógica para avanzar de la fase 2 a la fase 3.
 * Valida que los campos de la fase 2 estén completos y que el correo sea válido.
 */
function siguienteFase2(): void {
    const dni = (document.getElementById('dni') as HTMLInputElement).value.trim();
    const correo = (document.getElementById('correo') as HTMLInputElement).value.trim();
    const equipo = (document.getElementById('equipo') as HTMLInputElement).value.trim();

    if (!dni || !correo || !equipo) {
        alert("Por favor, completá todos los campos obligatorios de esta fase.");
        return;
    }
    if (!validarCorreo(correo)) {
        alert("Correo inválido. Debe contener @ y terminar en .com, .com.ar, .net, .org, o .edu.");
        return;
    }
    // Oculta la fase 2 y muestra la fase 3.
    document.getElementById('fase2')!.style.display = 'none';
    document.getElementById('fase3')!.style.display = 'block';
    actualizarBarra(3);
}

/**
 * @function anteriorFase2
 * @description Maneja la lógica para retroceder de la fase 3 a la fase 2.
 */
function anteriorFase2(): void {
    // Oculta la fase 3 y muestra la fase 2.
    document.getElementById('fase3')!.style.display = 'none';
    document.getElementById('fase2')!.style.display = 'block';
    actualizarBarra(2);
}

/**
 * @function mostrarImagen
 * @description Muestra una vista previa de la imagen seleccionada por el usuario.
 * @param {Event} event - El evento de cambio del input de tipo 'file'.
 */
function mostrarImagen(event: Event): void {
    const imagen = document.getElementById('preview') as HTMLImageElement;
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (archivo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagen.src = e.target!.result as string;
            // Al cargar una imagen, se eliminan los estilos de la silueta.
            imagen.classList.remove('silhouette-preview');
            imagen.style.display = 'block';
        };
        reader.readAsDataURL(archivo);
    } else {
        // Si no se selecciona ningún archivo, se restablece a la silueta por defecto.
        imagen.src = 'silhouette.png';
        imagen.classList.add('silhouette-preview');
    }
}

/**
 * @function cerrarModal
 * @description Oculta el modal de éxito y recarga la página para resetear el formulario.
 */
function cerrarModal(): void {
    document.getElementById('modalExito')!.style.display = 'none';
    window.location.reload();
}

// Event listener principal que se ejecuta al cargar el DOM.
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene el formulario y agrega un escuchador para el evento 'submit'.
    document.getElementById('formReferente')!.addEventListener('submit', function(e) {
        e.preventDefault();
        // En una aplicación real, aquí se enviarían los datos al servidor.
        // Se simula un envío exitoso mostrando el modal.
        document.getElementById('modalExito')!.style.display = 'flex';
    });

    // Se asignan las funciones a las variables globales para que puedan ser usadas
    // en los atributos `onclick` del HTML.
    (window as any).siguienteFase1 = siguienteFase1;
    (window as any).anteriorFase1 = anteriorFase1;
    (window as any).siguienteFase2 = siguienteFase2;
    (window as any).anteriorFase2 = anteriorFase2;
    (window as any).mostrarImagen = mostrarImagen;
    (window as any).cerrarModal = cerrarModal;
});
