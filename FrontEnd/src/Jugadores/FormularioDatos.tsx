import React, { useState } from "react";

const estiloInput = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#0B0E19',
  color: '#FFFFFF'
};

const estiloInputError = {
  ...estiloInput,
  border: '2px solid #ff4d4f'
};

const estiloBoton = {
  padding: '10px 20px',
  margin: '5px',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const clubes = ["Club A", "Club B", "Club C"]; // Puedes pasarlos como prop si lo prefieres
const localidades = ["Localidad 1", "Localidad 2", "Localidad 3"]; // Igual que arriba

const FormularioDatos = ({ datos, setDatos, setFase, handleCancelar, jugadores }) => {
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: undefined }));
  };

  const today = new Date().toISOString().split('T')[0];

  const validarFase1 = () => {
    const nuevosErrores = {};
    if (!datos.nombre || datos.nombre.length < 2) nuevosErrores.nombre = "Nombre requerido";
    if (!datos.apellido || datos.apellido.length < 2) nuevosErrores.apellido = "Apellido requerido";
    if (!datos.dni || !/^\d{7,8}$/.test(datos.dni)) nuevosErrores.dni = "DNI inválido";
    if (jugadores && jugadores.some(j => j.dni === datos.dni)) nuevosErrores.dni = "DNI duplicado";
    if (!datos.fechaNacimiento) nuevosErrores.fechaNacimiento = "Fecha requerida";
    if (!datos.club) nuevosErrores.club = "Club requerido";
    if (!datos.localidad) nuevosErrores.localidad = "Localidad requerida";
    if (!datos.telefono || !/^\d{8,}$/.test(datos.telefono)) nuevosErrores.telefono = "Teléfono inválido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSiguiente = (e) => {
    e.preventDefault();
    if (validarFase1()) setFase(2);
  };

  return (
    <form onSubmit={handleSiguiente} aria-label="Formulario de datos personales">
      <div>
        <label htmlFor="nombre">Nombre*</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={datos.nombre || ""}
          onChange={handleChange}
          style={errores.nombre ? estiloInputError : estiloInput}
          aria-required="true"
          aria-describedby={errores.nombre ? "error-nombre" : undefined}
        />
        {errores.nombre && <span id="error-nombre" style={{ color: "#ff4d4f" }}>{errores.nombre}</span>}
      </div>
      <div>
        <label htmlFor="apellido">Apellido*</label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          value={datos.apellido || ""}
          onChange={handleChange}
          style={errores.apellido ? estiloInputError : estiloInput}
          aria-required="true"
          aria-describedby={errores.apellido ? "error-apellido" : undefined}
        />
        {errores.apellido && <span id="error-apellido" style={{ color: "#ff4d4f" }}>{errores.apellido}</span>}
      </div>
      <div>
        <label htmlFor="dni">DNI*</label>
        <input
          id="dni"
          name="dni"
          type="text"
          value={datos.dni || ""}
          onChange={handleChange}
          style={errores.dni ? estiloInputError : estiloInput}
          aria-required="true"
          aria-describedby={errores.dni ? "error-dni" : undefined}
        />
        {errores.dni && <span id="error-dni" style={{ color: "#ff4d4f" }}>{errores.dni}</span>}
      </div>
      <div>
        <label htmlFor="fechaNacimiento">Fecha de nacimiento*</label>
        <input
          id="fechaNacimiento"
          name="fechaNacimiento"
          type="date"
          value={datos.fechaNacimiento || ""}
          onChange={handleChange}
          max={today}
          style={errores.fechaNacimiento ? estiloInputError : estiloInput}
          aria-required="true"
          aria-describedby={errores.fechaNacimiento ? "error-fechaNacimiento" : undefined}
        />
        {errores.fechaNacimiento && <span id="error-fechaNacimiento" style={{ color: "#ff4d4f" }}>{errores.fechaNacimiento}</span>}
      </div>
      <div>
        <label htmlFor="club">Club*</label>
        <select
          id="club"
          name="club"
          value={datos.club || ""}
          onChange={handleChange}
          style={errores.club ? estiloInputError : estiloInput}
          aria-required="true"
          aria-describedby={errores.club ? "error-club" : undefined}
        >
          <option value="">Seleccionar club</option>
          {clubes.map((club) => (
            <option key={club} value={club}>{club}</option>
          ))}
        </select>
        {errores.club && <span id="error-club" style={{ color: "#ff4d4f" }}>{errores.club}</span>}
      </div>
      <div>
        <label htmlFor="localidad">Localidad*</label>
        <select
          id="localidad"
          name="localidad"
          value={datos.localidad || ""}
          onChange={handleChange}
          style={errores.localidad ? estiloInputError : estiloInput}
          aria-required="true"
          aria-describedby={errores.localidad ? "error-localidad" : undefined}
        >
          <option value="">Seleccionar localidad</option>
          {localidades.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        {errores.localidad && <span id="error-localidad" style={{ color: "#ff4d4f" }}>{errores.localidad}</span>}
      </div>
      <div>
        <label htmlFor="telefono">Teléfono*</label>
        <input
          id="telefono"
          name="telefono"
          type="text"
          value={datos.telefono || ""}
          onChange={handleChange}
          style={errores.telefono ? estiloInputError : estiloInput}
          aria-required="true"
          aria-describedby={errores.telefono ? "error-telefono" : undefined}
        />
        {errores.telefono && <span id="error-telefono" style={{ color: "#ff4d4f" }}>{errores.telefono}</span>}
      </div>
      <div>
        <button
          type="submit"
          style={{
            ...estiloBoton,
            backgroundColor: Object.keys(errores).length === 0 ? "#1f3c88" : "#888",
            color: "#fff"
          }}
          disabled={Object.keys(errores).length > 0}
          aria-label="Siguiente"
        >
          Siguiente
        </button>
        <button
          type="button"
          style={{ ...estiloBoton, backgroundColor: "#ff4d4f", color: "#fff" }}
          onClick={handleCancelar}
          aria-label="Cancelar"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormularioDatos;
