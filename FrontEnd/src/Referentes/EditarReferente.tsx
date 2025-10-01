import React, { useState } from "react";
import type { Referente } from "../types/types";
import { validarReferente } from "../utils/validaciones";
// 🛑 Importamos los estilos del archivo principal
import { styles } from "./ReferentesPage"; 

type Props = {
  referente: Referente;
  onActualizar: (referente: Referente) => void;
  onCancelar: () => void;
  referentes?: Referente[]; 
};

const categorias = ["Masculino", "Femenino"];

const EditarReferente: React.FC<Props> = ({ referente, onActualizar, onCancelar, referentes = [] }) => {
  const [form, setForm] = useState<Referente>({ ...referente });
  const [mensaje, setMensaje] = useState<{ tipo: 'error' | 'exito', texto: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (mensaje) setMensaje(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // La validación debe excluir al referente actual (form.id) para que no falle por DNI/Correo repetido consigo mismo.
    // Aunque tu función `validarReferente` en `ReferentesPage` parece manejar esto. 
    const referentesSinActual = referentes.filter(ref => ref.id !== form.id);
    const errorMsg = validarReferente(form, referentesSinActual);
    
    if (errorMsg) {
      setMensaje({ tipo: 'error', texto: errorMsg });
      return;
    }
    
    onActualizar(form);
    setMensaje(null);
    setMensaje({ tipo: 'exito', texto: `Referente ${form.nombre} actualizado exitosamente.` });
    // NOTA: La función 'onActualizar' en ReferentesPage ya llama a manejarIrLista, 
    // lo que cambia la vista. Por eso, el mensaje de éxito dura poco.
  };

  return (
    // 🛑 Aplicamos el estilo de la tarjeta de formulario
    <div style={styles.cardFormulario}> 
      <h2 style={styles.formTitulo}>
        Editar Referente
      </h2>
      
      {/* Mensajes de Validación/Éxito - Usando estilos en línea centralizados */}
      {mensaje && (
        <div 
          style={{
            ...styles.mensajeAlerta,
            ...(mensaje.tipo === 'error' ? styles.mensajeError : styles.mensajeExito),
          }}
        >
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Agrupación Nombre y Apellido */}
        <div 
            style={{ 
                display: 'flex', 
                gap: '16px',
                marginBottom: '16px' 
            }}
        > 
          <input 
            name="nombre" 
            placeholder="Nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            // 🛑 APLICACIÓN DEL ESTILO OSCURO
            style={{ ...styles.inputOscuro, flex: 1, marginBottom: 0 }}
            required 
          />
          <input 
            name="apellido" 
            placeholder="Apellido" 
            value={form.apellido} 
            onChange={handleChange} 
            // 🛑 APLICACIÓN DEL ESTILO OSCURO
            style={{ ...styles.inputOscuro, flex: 1, marginBottom: 0 }}
            required 
          />
        </div>
        
        {/* Categoria */}
        <div>
          <select 
            name="categoria" 
            value={form.categoria} 
            onChange={handleChange} 
            // 🛑 APLICACIÓN DEL ESTILO OSCURO
            style={styles.inputOscuro}
            required
          >
            <option value="" disabled>— Seleccione Categoría —</option>
            {categorias.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        
        {/* DNI */}
        <input 
          name="dni" 
          type="text" 
          placeholder="DNI (sin puntos)" 
          value={form.dni} 
          onChange={handleChange} 
          // 🛑 APLICACIÓN DEL ESTILO OSCURO
          style={styles.inputOscuro}
          required 
        />
        
        {/* Correo */}
        <input 
          name="correo" 
          type="email" 
          placeholder="Correo Electrónico" 
          value={form.correo} 
          onChange={handleChange} 
          // 🛑 APLICACIÓN DEL ESTILO OSCURO
          style={styles.inputOscuro}
          required 
        />
        
        {/* Equipo */}
        <input 
          name="equipo" 
          placeholder="Equipo" 
          value={form.equipo} 
          onChange={handleChange} 
          // 🛑 APLICACIÓN DEL ESTILO OSCURO
          style={styles.inputOscuro}
          required 
        />
        
        {/* Botones de Acción */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
          
          {/* Botón Actualizar (Primario) */}
          <button 
            type="submit" 
            style={{ 
                ...styles.botonPrimario, 
                width: '50%',
                marginTop: 0, // Quitamos el margen superior que viene por defecto
            }}
          >
            Actualizar
          </button>
          
          {/* Botón Cancelar (Secundario) */}
          <button 
            type="button" 
            onClick={onCancelar} 
            style={{ 
                ...styles.botonSecundario, 
                width: '50%',
                // Si necesitas un efecto hover, usa una clase CSS en su lugar.
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarReferente;
