import React, { useState } from "react";
import type { Jugador } from "../types/types";
import { validarJugador } from "../utils/validaciones";

type Props = {
  onRegistrar: (jugador: Jugador) => void;
};

const RegistroJugador: React.FC<Props> = ({ onRegistrar }) => {
  const [jugador, setJugador] = useState<Jugador>({
    id: Date.now(),
    nombre: "",
    apellido: "",
    dni: "",
    club: "",
    categoria: "",
    telefono: "",
    vencimiento: "",
    carnetUrl: undefined,
    fichaMedicaUrl: undefined,
    estado: "activo"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJugador({ ...jugador, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validarJugador(jugador, []);
    if (error) {
      alert(error);
      return;
    }
    onRegistrar({ ...jugador, id: Date.now(), estado: "activo" });
    setJugador({
      id: Date.now(),
      nombre: "",
      apellido: "",
      dni: "",
      club: "",
      categoria: "",
      telefono: "",
      vencimiento: "",
      carnetUrl: undefined,
      fichaMedicaUrl: undefined,
      estado: "activo"
    });
  };

  return (
    <>
      <style>{`
        /* Definiciones de color y variables */
        :root {
          --primary-blue: #1f3c88;
          --hover-blue: #1a326b;
          --shadow-color: rgba(0, 0, 0, 0.2);
          --input-border: #d1d5db; /* Gris suave */
        }

        /* Contenedor principal (Tarjeta) */
        .card-container {
          max-width: 1200px; /* ¡AÚN MÁS ANCHO! */
          margin-left: auto;
          margin-right: auto;
          background-color: white;
          box-shadow: 0 10px 25px -3px var(--shadow-color);
          border-radius: 1.5rem;
          padding: 2rem;
          transition: transform 0.3s ease;
          border: 1px solid #e5e7eb;
          /* NOTA: Para que *todo* el formulario sea fijo, debes aplicar
             'position: fixed' o 'position: sticky' en el componente padre (JugadoresPage)
             o aquí, pero ten en cuenta que puede interferir con otros elementos de la página.
             Si deseas que sea fijo:
             position: sticky; 
             top: 20px; 
          */
        }

        .card-container:hover {
          transform: translateY(-2px);
        }

        /* Título */
        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
          color: var(--primary-blue);
        }

        /* Formulario y GRID de dos columnas */
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* Crea dos columnas de igual ancho */
          gap: 1.5rem 3rem; /* Aumentado el gap horizontal a 3rem */
          align-items: center; 
        }
        
        /* Estilo para los elementos que ocupan todo el ancho (ej: el botón) */
        .full-width {
            grid-column: 1 / -1; /* Ocupa desde la primera hasta la última columna */
        }

        /* Estilo de Inputs y Selects */
        .form-input, .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--input-border);
          border-radius: 0.5rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          font-size: 1rem;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(31, 60, 136, 0.2);
        }

        /* Botón de Guardar */
        .btn-submit {
          background-color: var(--primary-blue);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s, transform 0.1s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
        }

        .btn-submit:hover {
          background-color: var(--hover-blue);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .btn-submit:active {
          transform: scale(0.99);
        }
        
        /* Media Query: En pantallas pequeñas, volvemos a una sola columna */
        @media (max-width: 800px) { /* Aumenté el breakpoint para esta tarjeta más grande */
            .form-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
      
      <div className="card-container">
        <h2 className="form-title">✍️ Registro de Jugador</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          {/* Columna 1 */}
          <input name="nombre" placeholder="Nombre" value={jugador.nombre} onChange={handleChange} className="form-input" required />
          <input name="apellido" placeholder="Apellido" value={jugador.apellido} onChange={handleChange} className="form-input" required />
          
          {/* Columna 2 */}
          <input name="dni" placeholder="DNI" value={jugador.dni} onChange={handleChange} className="form-input" required />
          <input name="club" placeholder="Club" value={jugador.club} onChange={handleChange} className="form-input" required />
          
          {/* Fila con un solo elemento (Categoría), que se extenderá */}
          <select name="categoria" value={jugador.categoria} onChange={handleChange} className="form-select full-width" required>
            <option value="">Seleccione Categoría</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
          </select>
          
          {/* Última fila con dos elementos */}
          <input name="telefono" placeholder="Teléfono" value={jugador.telefono || ""} onChange={handleChange} className="form-input" />
          <input type="date" name="vencimiento" value={jugador.vencimiento || ""} onChange={handleChange} className="form-input" />
          
          {/* Botón (Ocupa todo el ancho) */}
          <button type="submit" className="btn-submit full-width">Guardar</button>
        </form>
      </div>
    </>
  );
};

export default RegistroJugador;
