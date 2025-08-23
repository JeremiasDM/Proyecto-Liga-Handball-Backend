/**
 * Archivo: editar-referente.ts
 *
 * Descripción:
 * Este archivo contiene la lógica en TypeScript para manejar la funcionalidad de la
 * página de edición de referentes. Se encarga de la validación del formulario, la
 * previsualización y gestión de la foto de perfil, y la interacción con un modal
 * de confirmación antes de simular el envío de los datos a una API.
 */


// Define interfaces para la estructura de datos si planeas usar esto en una aplicación más grande.
// Esto ayuda con la seguridad de tipos y la legibilidad del código.

/**
 * @interface ReferenteData
 * @description Interfaz que define la estructura de los datos de un referente.
 * @property {string} nombre - El nombre del referente.
 * @property {string} apellido - El apellido del referente.
 * @property {'Masculino' | 'Femenino' | ''} categoria - La categoría a la que pertenece el referente.
 * @property {string} dni - El DNI del referente.
 * @property {string} correo - El correo electrónico del referente.
 * @property {string} equipo - El equipo al que pertenece el referente.
 * @property {File | null | undefined} foto - El archivo de la foto de perfil, o null si se elimina. Es opcional.
 */
interface ReferenteData {
  nombre: string;
  apellido: string;
  categoria: 'Masculino' | 'Femenino' | '';
  dni: string;
  correo: string;
  equipo: string;
  foto?: File | null; // El archivo en sí, o null si se elimina
}

// Function to handle the form submission or API call
/**
 * @async
 * @function updateReferente
 * @description Función asíncrona para simular la actualización de los datos de un referente en el backend.
 * @param {ReferenteData} data - El objeto con los datos del referente a actualizar.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que la operación ha terminado (simulada).
 */
async function updateReferente(data: ReferenteData): Promise<void> {
  // Esta es una función de marcador de posición. En una aplicación real, se enviarían los datos a la API del backend.
  console.log('Actualizando referente con los siguientes datos:', data);

  // Ejemplo de una llamada a una API hipotética usando fetch (comentado):
  /*
  const formData = new FormData();
  formData.append('nombre', data.nombre);
  formData.append('apellido', data.apellido);
  formData.append('categoria', data.categoria);
  formData.append('dni', data.dni);
  formData.append('correo', data.correo);
  formData.append('equipo', data.equipo);
  if (data.foto) {
    formData.append('foto', data.foto);
  }

  try {
    const response = await fetch('/api/referentes/update', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to update referente');
    }
    console.log('Referente updated successfully!');
    alert('Referente editado exitosamente!');
    window.location.reload(); // O redirigir a otra página
  } catch (error) {
    console.error('Error updating referente:', error);
    alert('Ocurrió un error al editar el referente.');
  }
  */
}


// Main DOMContentLoaded event listener to set up all event handlers
/**
 * @description Este es el principal escuchador de eventos que se activa cuando el DOM ha cargado completamente.
 * Contiene toda la lógica de la página, como la manipulación del DOM, los eventos y la validación.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- Selectores de Elementos ---
  // Se obtienen las referencias a los elementos HTML por su ID. Se usa 'as' para asegurar el tipo de elemento (por ejemplo, HTMLButtonElement).
  const updateReferenteBtn = document.getElementById('updateReferenteBtn') as HTMLButtonElement;
  const confirmModal = document.getElementById('confirmModal') as HTMLDivElement;
  const cancelConfirmButton = document.getElementById('cancelConfirm') as HTMLButtonElement;
  const confirmEditButton = document.getElementById('confirmEdit') as HTMLButtonElement;
  const nombreReferenteInput = document.getElementById('nombreReferente') as HTMLInputElement;
  const apellidoReferenteInput = document.getElementById('apellidoReferente') as HTMLInputElement;
  const categoriaReferenteSelect = document.getElementById('categoriaReferente') as HTMLSelectElement;
  const dniReferenteInput = document.getElementById('dniReferente') as HTMLInputElement;
  const correoReferenteInput = document.getElementById('correoReferente') as HTMLInputElement;
  const equipoReferenteInput = document.getElementById('equipoReferente') as HTMLInputElement;
  const referenteNamePlaceholder = document.querySelector('.referente-name-placeholder') as HTMLSpanElement;

  // Elementos para la subida de imágenes
  const profilePhotoPreview = document.getElementById('profilePhotoPreview') as HTMLImageElement;
  const deletePhotoIcon = document.getElementById('deletePhotoIcon') as HTMLSpanElement;
  const photoUploadInput = document.getElementById('photoUpload') as HTMLInputElement;

  // --- Gestión del Estado de la Foto ---
  // Se almacena el archivo de la foto actual. Es crucial para saber si se debe enviar un archivo o no al servidor.
  let currentPhotoFile: File | null = null;


  // --- Lógica para Subir/Eliminar Imagen ---
  // Escucha el evento 'change' en el input de tipo 'file'.
  photoUploadInput.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0] || null; // Obtiene el primer archivo seleccionado, si existe.
    currentPhotoFile = file; // Actualiza el estado con el nuevo archivo.

    if (file) {
      const reader = new FileReader(); // Crea un objeto FileReader para leer el contenido del archivo.
      reader.onload = (e) => {
        if (e.target?.result) {
          profilePhotoPreview.src = e.target.result as string; // Establece la URL de la imagen para la vista previa.
          deletePhotoIcon.style.visibility = 'visible'; // Muestra el icono de eliminar.
          profilePhotoPreview.style.border = 'none'; // Elimina el borde punteado.
        }
      };
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos.
    }
  });

  // Escucha el evento 'click' en el icono de eliminar.
  deletePhotoIcon.addEventListener('click', () => {
    profilePhotoPreview.src = 'silhouette.png'; // Restablece la vista previa a la imagen de silueta por defecto.
    deletePhotoIcon.style.visibility = 'hidden'; // Oculta el icono de eliminar.
    photoUploadInput.value = ''; // Borra el valor del input de archivo para que no se envíe la foto anterior.
    currentPhotoFile = null; // Borra el archivo del estado.
    profilePhotoPreview.style.border = '2px dashed #667cbe'; // Vuelve a añadir el borde punteado.
  });

  // --- Lógica del Modal y Validación del Formulario ---
  // Escucha el evento 'click' en el botón de "Actualizar".
  updateReferenteBtn.addEventListener('click', (event: Event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (envío).

    // Validación básica del formulario, obteniendo los valores de los inputs.
    const nombre = nombreReferenteInput.value.trim();
    const apellido = apellidoReferenteInput.value.trim();
    const categoria = categoriaReferenteSelect.value as 'Masculino' | 'Femenino' | '';
    const dni = dniReferenteInput.value.trim();
    const correo = correoReferenteInput.value.trim();
    const equipo = equipoReferenteInput.value.trim();

    // Comprueba si los campos obligatorios están vacíos.
    if (!nombre || !apellido || !categoria || !dni || !correo || !equipo) {
      alert("Por favor, completá todos los campos obligatorios.");
      return;
    }

    // Validación del correo electrónico usando una expresión regular.
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|com\.ar|net|org|edu)$/;
    if (!emailRegex.test(correo)) {
      alert("Por favor, ingresa un correo electrónico válido (ej. usuario@dominio.com o .com.ar).");
      return;
    }

    // Si la validación es exitosa, se actualiza el texto del modal y se muestra.
    referenteNamePlaceholder.textContent = nombre ? `(${nombre} ${apellido})` : `(sin nombre)`;
    confirmModal.classList.add('show');
  });

  // Escucha el evento 'click' en el botón "Cancelar" del modal.
  cancelConfirmButton.addEventListener('click', () => {
    confirmModal.classList.remove('show'); // Oculta el modal.
  });

  // Escucha el evento 'click' en el botón "Confirmar" del modal.
  confirmEditButton.addEventListener('click', () => {
    // Se recopilan todos los datos del formulario en un objeto `ReferenteData`.
    const referenteData: ReferenteData = {
      nombre: nombreReferenteInput.value.trim(),
      apellido: apellidoReferenteInput.value.trim(),
      categoria: categoriaReferenteSelect.value as 'Masculino' | 'Femenino' | '',
      dni: dniReferenteInput.value.trim(),
      correo: correoReferenteInput.value.trim(),
      equipo: equipoReferenteInput.value.trim(),
      foto: currentPhotoFile // Utiliza el archivo almacenado en el estado.
    };

    // Llama a la función de actualización (simulada aquí).
    updateReferente(referenteData)
      .then(() => {
        confirmModal.classList.remove('show');
        // En un escenario real, la función `updateReferente` manejaría el éxito/fracaso.
      })
      .catch(error => {
        console.error("Error al actualizar el referente:", error);
        confirmModal.classList.remove('show');
        alert("Ocurrió un error al actualizar el referente.");
      });
  });

  // Cierra el modal si el usuario hace clic fuera del contenido del modal.
  confirmModal.addEventListener('click', (event: Event) => {
    if (event.target === confirmModal) {
      confirmModal.classList.remove('show');
    }
  });

  // Agrega un escuchador de eventos para el botón "Cancelar" del formulario principal.
  const cancelButton = document.querySelector('.btn-cancel') as HTMLButtonElement;
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      // Lógica para cancelar, como redirigir o mostrar una alerta.
      alert('Edición cancelada.');
      // window.history.back(); // Ejemplo: Volver a la página anterior.
    });
  }
});
