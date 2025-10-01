import React, { useState } from "react";
import type { Referente } from "../types/types";
import { validarReferente } from "../utils/validaciones";
// 🛑 Importamos los estilos del archivo principal
import { styles } from "./ReferentesPage"; 

type Props = {
  onGuardar: (referente: Referente) => void;
};

const categorias = ["Masculino", "Femenino"];

const RegistrarReferente: React.FC<Props> = ({ onGuardar }) => {
  const [form, setForm] = useState<Referente>({
    id: Date.now(),
    nombre: "",
    apellido: "",
    categoria: "Masculino",
    dni: "",
    correo: "",
    equipo: "",
  });
  
  const [mensaje, setMensaje] = useState<{ tipo: 'error' | 'exito', texto: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (mensaje) setMensaje(null); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTA: 'validarReferente(form, [])' solo valida el formato, no la unicidad.
    const error = validarReferente(form, []); 

    if (error) {
      setMensaje({ tipo: 'error', texto: error });
      return;
    }
    
    onGuardar({ ...form, id: Date.now() });
    // El mensaje de éxito ya no es tan relevante, ya que la vista cambiará automáticamente
    // Pero lo dejamos para la validación de formato
    setMensaje({ tipo: 'exito', texto: `Referente ${form.nombre} guardado exitosamente.` });
    
    // Resetear formulario
    setForm({
      id: Date.now(),
      nombre: "",
      apellido: "",
      categoria: "Masculino",
      dni: "",
      correo: "",
      equipo: "",
    });
  };

  return (
    <div>
      <h2 style={styles.formTitulo}>
        Registro de Referente
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
                // 🚀 CAMBIO: Agregar margen inferior para separarlo del siguiente campo (Categoría)
                marginBottom: '16px' 
            }}
        > 
          <input 
            name="nombre" 
            placeholder="Nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            // 🛑 APLICACIÓN DEL ESTILO OSCURO
            style={{ ...styles.inputOscuro, flex: 1, marginBottom: 0 }} // Ajuste de marginBottom
            required 
          />
          <input 
            name="apellido" 
            placeholder="Apellido" 
            value={form.apellido} 
            onChange={handleChange} 
            // 🛑 APLICACIÓN DEL ESTILO OSCURO
            style={{ ...styles.inputOscuro, flex: 1, marginBottom: 0 }} // Ajuste de marginBottom
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
        
        {/* Botón de Enviar */}
        <button 
          type="submit" 
          // 🛑 APLICACIÓN DEL ESTILO PRIMARIO
          style={styles.botonPrimario}
        >
          Guardar Referente
        </button>
      </form>
    </div>
  );
};

export default RegistrarReferente;
