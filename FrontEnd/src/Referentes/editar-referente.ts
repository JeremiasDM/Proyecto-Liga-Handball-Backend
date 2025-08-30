/**
 * Archivo: editar-referente.ts
 *
 * Descripción:
 * Este archivo contiene la lógica en TypeScript para manejar la funcionalidad de la
 * página de edición de referentes. Se encarga de la validación del formulario, la
 * previsualización y gestión de la foto de perfil, y la interacción con un modal
 * de confirmación antes de simular el envío de los datos a una API.
 */

// Define interfaces para la estructura de datos
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
 * @async
 * @function updateReferente
 * @description Función asíncrona para simular la actualización de los datos de un referente en el backend.
 * @param {ReferenteData} data - El objeto con los datos del referente a actualizar.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que la operación ha terminado (simulada).
 */
async function updateReferente(data: ReferenteData): Promise<void> {
  console.log('Actualizando referente con los siguientes datos:', data);
  // Simulación de una llamada exitosa a una API
  return new Promise(resolve => setTimeout(resolve, 1500));
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Selectores de Elementos ---
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
  const profilePhotoPreview = document.getElementById('profilePhotoPreview') as HTMLImageElement;
  const deletePhotoIcon = document.getElementById('deletePhotoIcon') as HTMLSpanElement;
  const photoUploadInput = document.getElementById('photoUpload') as HTMLInputElement;
  const cancelButton = document.querySelector('.btn-cancel') as HTMLButtonElement;

  let currentPhotoFile: File | null = null;

  // --- Funciones de Lógica ---
  const setupPhotoLogic = () => {
    photoUploadInput.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0] || null;
      currentPhotoFile = file;

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            profilePhotoPreview.src = e.target.result as string;
            deletePhotoIcon.style.visibility = 'visible';
            profilePhotoPreview.style.border = 'none';
          }
        };
        reader.readAsDataURL(file);
      }
    });

    deletePhotoIcon.addEventListener('click', () => {
      profilePhotoPreview.src = 'silhouette.png';
      deletePhotoIcon.style.visibility = 'hidden';
      photoUploadInput.value = '';
      currentPhotoFile = null;
      profilePhotoPreview.style.border = '2px dashed #667cbe';
    });
  };

  const validateForm = (): boolean => {
    const nombre = nombreReferenteInput.value.trim();
    const apellido = apellidoReferenteInput.value.trim();
    const categoria = categoriaReferenteSelect.value.trim();
    const dni = dniReferenteInput.value.trim();
    const correo = correoReferenteInput.value.trim();
    const equipo = equipoReferenteInput.value.trim();

    // Validar campos obligatorios
    if (!nombre || !apellido || !categoria || !dni || !correo || !equipo) {
      alert("Por favor, completá todos los campos obligatorios.");
      return false;
    }

    // Validación del correo electrónico (más permisiva)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (!emailRegex.test(correo)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return false;
    }

    // Validación del DNI (solo números y longitud de 8 a 10 dígitos)
    const dniRegex = /^\d{7,10}$/;
    if (!dniRegex.test(dni)) {
        alert("Por favor, ingresa un DNI válido (7 a 10 dígitos numéricos).");
        return false;
    }

    return true;
  };

  const setupModalAndFormLogic = () => {
    updateReferenteBtn.addEventListener('click', (event: Event) => {
      event.preventDefault();
      if (validateForm()) {
        const nombre = nombreReferenteInput.value.trim();
        const apellido = apellidoReferenteInput.value.trim();
        referenteNamePlaceholder.textContent = nombre ? `(${nombre} ${apellido})` : `(sin nombre)`;
        confirmModal.classList.add('show');
      }
    });

    cancelConfirmButton.addEventListener('click', () => {
      confirmModal.classList.remove('show');
    });

    confirmEditButton.addEventListener('click', async () => {
      const referenteData: ReferenteData = {
        nombre: nombreReferenteInput.value.trim(),
        apellido: apellidoReferenteInput.value.trim(),
        categoria: categoriaReferenteSelect.value as 'Masculino' | 'Femenino' | '',
        dni: dniReferenteInput.value.trim(),
        correo: correoReferenteInput.value.trim(),
        equipo: equipoReferenteInput.value.trim(),
        foto: currentPhotoFile,
      };

      try {
        await updateReferente(referenteData);
        alert('Referente actualizado exitosamente.');
        confirmModal.classList.remove('show');
        // Redirigir o recargar la página
        // window.location.href = '/ruta/a/referentes';
      } catch (error) {
        console.error("Error al actualizar el referente:", error);
        alert("Ocurrió un error al actualizar el referente. Intente nuevamente.");
      }
    });

    confirmModal.addEventListener('click', (event: Event) => {
      if (event.target === confirmModal) {
        confirmModal.classList.remove('show');
      }
    });

    if (cancelButton) {
      cancelButton.addEventListener('click', () => {
        alert('Edición cancelada.');
        // window.history.back();
      });
    }
  };

  // --- Inicialización ---
  setupPhotoLogic();
  setupModalAndFormLogic();
});