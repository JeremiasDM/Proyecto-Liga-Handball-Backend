import React, { useState } from 'react';
import FormularioDatos from './FormularioDatos';
import FormularioDocumentacion from './FormularioDocumentacion';
import BarraProgreso from './BarraProgreso';
import ListaJugadores from './ListaJugadores';

const RegistroJugador = () => {
  const [fase, setFase] = useState(1);
  const [modo, setModo] = useState(null);
  const [datos, setDatos] = useState(jugadorVacio());
  const [jugadores, setJugadores] = useState([]);
  const [previewCarnet, setPreviewCarnet] = useState(null);
  const [previewFicha, setPreviewFicha] = useState(null);

  function jugadorVacio() {
    return {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      genero: '',
      localidad: '',
      club: '',
      categoria: '',
      fechaNacimiento: '',
      carnet: null,
      ficha: null,
      vencimientoFicha: '',
      sanciones: []
    };
  }

  const handleCancelar = () => {
    setDatos(jugadorVacio());
    setModo(null);
    setPreviewCarnet(null);
    setPreviewFicha(null);
    setFase(1);
  };

  const handleGuardar = () => {
    if (!datos.carnet || !datos.ficha) {
      alert('Debe subir el carnet y la ficha médica');
      return;
    }
    if (!datos.fechaNacimiento) {
      alert('Debe completar la fecha de nacimiento');
      return;
    }
    if (!datos.vencimientoFicha) {
      alert('Debe completar la fecha de vencimiento de la ficha médica');
      return;
    }

    const hoy = new Date().toISOString().split('T')[0];
    if (datos.vencimientoFicha < hoy) {
      alert('La fecha de vencimiento no puede ser pasada');
      return;
    }

    if (modo === 'registro') {
      setJugadores([...jugadores, datos]);
      alert('Jugador registrado correctamente');
    } else if (modo === 'edicion') {
      const actualizados = jugadores.map(j =>
        j.dni === datos.dni ? datos : j
      );
      setJugadores(actualizados);
      alert('Jugador actualizado correctamente');
    }

    handleCancelar();
  };

  const handleEditar = (jugador) => {
    setDatos(jugador);
    setModo('edicion');
    setFase(1);
    setPreviewCarnet(jugador.carnet ? URL.createObjectURL(jugador.carnet) : null);
    setPreviewFicha(jugador.ficha ? URL.createObjectURL(jugador.ficha) : null);
  };

  const handleEliminar = (dni) => {
    if (window.confirm('¿Está seguro que desea desactivar este jugador?')) {
      const actualizados = jugadores.filter(j => j.dni !== dni);
      setJugadores(actualizados);
      alert('Jugador desactivado');
    }
  };

  const handleAgregar = () => {
    setDatos(jugadorVacio());
    setModo('registro');
    setFase(1);
    setPreviewCarnet(null);
    setPreviewFicha(null);
  };

  const handleActualizarFichaDirecto = (dni, nuevaFicha, nuevoVencimiento) => {
    const actualizados = jugadores.map(j =>
      j.dni === dni
        ? { ...j, ficha: nuevaFicha, vencimientoFicha: nuevoVencimiento }
        : j
    );
    setJugadores(actualizados);
    alert('Ficha médica actualizada');
  };

  const handleAgregarSancion = (dni, tipo) => {
    const actualizados = jugadores.map(j =>
      j.dni === dni
        ? { ...j, sanciones: [...(j.sanciones || []), tipo] }
        : j
    );
    setJugadores(actualizados);
    alert(`Sanción "${tipo}" agregada`);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px',
      background: '#1F3C88',
      borderRadius: '10px',
      color: '#FFFFFF'
    }}>
      {modo ? (
        <>
          <h2>{modo === 'registro' ? 'Registrar Jugador' : 'Editar Jugador'}</h2>
          <BarraProgreso fase={fase} />
          {fase === 1 && (
            <FormularioDatos
              datos={datos}
              setDatos={setDatos}
              setFase={setFase}
              handleCancelar={handleCancelar}
              modo={modo}
              jugadores={jugadores}
            />
          )}
          {fase === 2 && (
            <FormularioDocumentacion
              datos={datos}
              setDatos={setDatos}
              previewCarnet={previewCarnet}
              previewFicha={previewFicha}
              setPreviewCarnet={setPreviewCarnet}
              setPreviewFicha={setPreviewFicha}
              setFase={setFase}
              handleGuardar={handleGuardar}
              handleCancelar={handleCancelar}
              modo={modo}
            />
          )}
        </>
      ) : (
        <>
          <h2>Gestión de Jugadores</h2>
          <button
            onClick={handleAgregar}
            style={{ padding: '8px 12px', marginBottom: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Agregar nuevo jugador
          </button>
          <ListaJugadores
            jugadores={jugadores}
            setJugadores={setJugadores}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
            onActualizarFicha={handleActualizarFichaDirecto}
            onAgregarSancion={handleAgregarSancion}
          />
        </>
      )}
    </div>
  );
};

export default RegistroJugador;
