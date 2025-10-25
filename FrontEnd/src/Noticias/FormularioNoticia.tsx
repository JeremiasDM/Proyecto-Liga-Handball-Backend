// FormularioNoticia.tsx

import React, { useState, useEffect } from "react";

type Noticia = {
// ... Omitido por brevedad
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
};

// La noticiaAEditar no tiene id si es nueva, pero sí si viene de la lista.
type FormNoticia = Omit<Noticia, 'id'> & { id?: number };

type Props = {
// ... Omitido por brevedad
  onGuardar: (noticia: Noticia) => void;
  onActualizar: (noticia: Noticia) => void; 
  noticiaAEditar: Noticia | null; 
  onCancelEdit: () => void; 
};

// Definimos los colores primarios para usar en el foco y botones
const PRIMARY_BLUE = '#1d4ed8'; // Azul oscuro para el anillo de foco y botón principal
const LIGHT_BLUE = '#bfdbfe'; 
const RED_COLOR = '#ef4444'; // Rojo para el botón cancelar

// Estilos convertidos a objeto para su uso en línea
const styles = {
// ... Estilos de label, inputBase, textarea, etc. (sin cambios importantes)
    formContainer: {
        display: 'flex' as React.CSSProperties['display'],
        flexDirection: 'column' as React.CSSProperties['flexDirection'],
        gap: '1rem',
    } as React.CSSProperties,
    label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '600', 
        color: '#1f2937', 
        marginBottom: '0.35rem', 
    } as React.CSSProperties,
    inputBase: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out', 
        resize: 'none', 
    } as React.CSSProperties,
    textarea: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease-in-out', 
        resize: 'vertical' as 'vertical', 
    } as React.CSSProperties,
    fileInput: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    } as React.CSSProperties,
    successText: {
        marginTop: '0.5rem',
        fontSize: '0.875rem',
        color: '#059669',
    } as React.CSSProperties,
    buttonBase: { 
        padding: '0.75rem 1rem',
        fontWeight: '700',
        borderRadius: '0.5rem',
        transition: 'background-color 0.2s ease, transform 0.1s ease', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        cursor: 'pointer',
        border: 'none',
        width: '100%',
    } as React.CSSProperties,
    saveButton: {
      backgroundColor: PRIMARY_BLUE, // CAMBIO: Usar PRIMARY_BLUE para el botón principal
      color: 'white',
      marginTop: '1.25rem',
    },
    cancelButton: {
      backgroundColor: RED_COLOR, 
      color: 'white',
      marginTop: '0.5rem',
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      marginTop: '1.25rem',
    }
};


const FormularioNoticia: React.FC<Props> = ({ onGuardar, onActualizar, noticiaAEditar, onCancelEdit }) => {
// ... Lógica del componente (sin cambios)
  const initialState: FormNoticia = {
    titulo: "",
    contenido: "",
    fecha: "",
    imagenUrl: "",
  };

  const [form, setForm] = useState<FormNoticia>(initialState);

  useEffect(() => {
    if (noticiaAEditar) {
        setForm(noticiaAEditar);
    } else {
        setForm(initialState);
    }
  }, [noticiaAEditar]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setForm({ ...form, imagenUrl: form.imagenUrl || "" }); 
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("La imagen debe ser un archivo válido (jpg, png, etc).");
      e.target.value = ''; 
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no debe superar los 5MB.");
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setForm({ ...form, imagenUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (data: FormNoticia): boolean => {
    if (!data.titulo || data.titulo.length < 5) {
      alert("El título debe tener al menos 5 caracteres.");
      return false;
    }
    if (!data.contenido) {
      alert("El contenido es obligatorio.");
      return false;
    }
    if (!data.fecha) {
      alert("Debe seleccionar una fecha.");
      return false;
    }
    return true;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    if (form.id) {
        onActualizar(form as Noticia);
    } else {
        onGuardar({ ...form, id: Date.now() } as Noticia);
        alert(" Noticia guardada correctamente.");
    }
    
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
        {/* INYECCIÓN DE ESTILOS CSS PARA PSEUDO-SELECTORES (:focus, :hover, :active) */}
        <style>{`
            .form-input-base {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
            }

            /* 1. Estilo para el estado :focus (Anillo de enfoque azul) */
            .form-input-base:focus {
                outline: none;
                border-color: ${PRIMARY_BLUE};
                box-shadow: 0 0 0 3px ${LIGHT_BLUE}; /* Sutilmente más pequeño */
            }

            /* 2. Estilo para el estado :hover y :active en botones (Usando ahora PRIMARY_BLUE) */
            .button-save:hover {
                background-color: #1e40af; /* dark blue */
            }
            .button-save:active {
                transform: scale(0.99);
            }
            .button-cancel:hover {
                background-color: #dc2626; /* red-600 */
            }
            .button-cancel:active {
                transform: scale(0.99);
            }
        `}</style>

      <div>
        <label htmlFor="titulo" style={styles.label}>Título</label>
        <input
// ... inputs y textarea (sin cambios importantes)
            id="titulo"
            type="text"
            name="titulo"
            placeholder="Título de la Noticia (Mínimo 5 caracteres)"
            value={form.titulo}
            onChange={handleChange}
            style={styles.inputBase}
            className="form-input-base" 
            required
        />
      </div>

      <div>
        <label htmlFor="contenido" style={styles.label}>Contenido</label>
        <textarea
            id="contenido"
            name="contenido"
            placeholder="Escribe el contenido completo de la noticia aquí..."
            value={form.contenido}
            onChange={handleChange}
            rows={5}
            style={styles.textarea}
            className="form-input-base" 
            required
        />
      </div>
      
      <div>
        <label htmlFor="fecha" style={styles.label}>Fecha de Publicación</label>
        <input
            id="fecha"
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            style={styles.inputBase}
            className="form-input-base" 
            required
        />
      </div>
      
      <div>
        <label htmlFor="archivo" style={styles.label}>Imagen Principal (Máx 5MB)</label>
        <input 
            id="archivo"
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload} 
            style={styles.fileInput}
            className="form-input-base" 
        />
        {form.imagenUrl && (
            <p style={styles.successText}>
                {form.id ? '🖼️ Imagen actual cargada/existente' : 'Archivo cargado:'} <span style={{fontWeight: '500'}}>{(form.imagenUrl.length / 1024).toFixed(1)} KB</span>
            </p>
        )}
      </div>

      <div style={styles.buttonGroup}>
        <button 
            type="submit" 
            style={{...styles.buttonBase, ...styles.saveButton}}
            className="button-save" 
        >
            {form.id ? ' Actualizar Noticia' : ' Publicar Noticia'}
        </button>
        
        {form.id && ( 
            <button
                type="button"
                onClick={onCancelEdit}
                style={{...styles.buttonBase, ...styles.cancelButton}}
                className="button-cancel" 
            >
                 Cancelar Edición
            </button>
        )}
      </div>
    </form>
  );
};

export default FormularioNoticia;
