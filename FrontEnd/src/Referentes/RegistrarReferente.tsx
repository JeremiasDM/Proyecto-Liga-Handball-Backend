import React, { useState, useEffect } from "react";

// Inlined Referente type
type Referente = {
	id: number;
	nombre: string;
	apellido: string;
	categoria: "Masculino" | "Femenino";
	dni: string;
	correo: string;
	equipo: string;
};

// Inlined validarReferente
function validarReferente(nuevo: Referente, referentes: Referente[]): string | null {
	if (
		!nuevo.nombre.trim() ||
		!nuevo.apellido.trim() ||
		!nuevo.categoria ||
		!nuevo.dni.trim() ||
		!nuevo.correo.trim() ||
		!nuevo.equipo.trim()
	) {
		return "Todos los campos son obligatorios.";
	}
	if (!/^[a-zA-Z\s]{2,}$/.test(nuevo.nombre)) {
		return "El nombre debe tener solo letras y al menos 2 caracteres.";
	}
	if (!/^[a-zA-Z\s]{2,}$/.test(nuevo.apellido)) {
		return "El apellido debe tener solo letras y al menos 2 caracteres.";
	}
	if (!/^\d{7,10}$/.test(nuevo.dni)) {
		return "El DNI debe tener entre 7 y 10 números.";
	}
	if (referentes.some(r => r.dni === nuevo.dni && r.id !== nuevo.id)) {
		return "El DNI ya está registrado.";
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevo.correo)) {
		return "Correo inválido.";
	}
	if (!/^[a-zA-Z0-9\s]{2,}$/.test(nuevo.equipo)) {
		return "El equipo debe contener solo letras, números y espacios.";
	}
	return null;
}
// 🛑 Importamos los estilos del archivo principal
import { styles } from "./ReferentesPage"; 

type Props = {
  onGuardar: (referente: Referente) => void;
};

const categorias = ["Masculino", "Femenino"];

const RegistrarReferente: React.FC<Props> = ({ onGuardar }) => {
  interface FormData {
    nombre: string;
    apellido: string;
    categoria: string;
    dni: string;
    correo: string;
    equipoId: number;
  }
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    categoria: "Masculino",
    dni: "",
    correo: "",
    equipoId: 0,
  });
  const [clubs, setClubs] = useState<Array<{ id: number; nombre: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'error' | 'exito', texto: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/clubes')
      .then(res => res.json())
      .then(data => setClubs(data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'equipoId' ? Number(value) : value,
    });
    if (mensaje) setMensaje(null); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Construir el objeto Referente correctamente
    const referente: Referente = {
      id: Date.now(),
      nombre: form.nombre,
      apellido: form.apellido,
      categoria: form.categoria as "Masculino" | "Femenino",
      dni: form.dni,
      correo: form.correo,
      equipo: clubs.find(c => c.id === form.equipoId)?.nombre || "",
    };

    const error = validarReferente(referente, []);
    if (error) {
      setMensaje({ tipo: 'error', texto: error });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: referente.nombre,
          apellido: referente.apellido,
          categoria: referente.categoria,
          dni: referente.dni,
          correo: referente.correo,
          equipo: referente.equipo,
          equipoId: form.equipoId,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registro failed:', response.status, errorText);
        setMensaje({ tipo: 'error', texto: errorText || 'Error al registrar referente.' });
        return;
      }
      const data = await response.json();
      if (data.success) {
        setMensaje({ tipo: 'exito', texto: `Referente ${referente.nombre} registrado exitosamente. Revisa tu correo.` });
        // Resetear formulario
        setForm({ nombre: '', apellido: '', categoria: 'Masculino', dni: '', correo: '', equipoId: 0 });
        onGuardar(referente);
      } else {
        setMensaje({ tipo: 'error', texto: data.message || 'Error al registrar referente.' });
      }
    } catch (err) {
      setMensaje({ tipo: 'error', texto: 'Error de conexión con el servidor.' });
    } finally {
      setLoading(false);
    }
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
        <div>
          <select
            name="equipoId"
            value={form.equipoId}
            onChange={handleChange}
            style={styles.inputOscuro}
            required
          >
            <option value={0} disabled>— Seleccione Equipo —</option>
            {clubs.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        
        {/* Botón de Enviar */}
        <button 
          type="submit" 
          // 🛑 APLICACIÓN DEL ESTILO PRIMARIO
          style={styles.botonPrimario}
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Guardar Referente'}
        </button>
      </form>
    </div>
  );
};

export default RegistrarReferente;
