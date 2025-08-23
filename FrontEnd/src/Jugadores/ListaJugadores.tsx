import React, { useState } from 'react';

const ListaJugadores = ({
  jugadores,
  onEditar,
  onEliminar,
  onActualizarFicha,
  onAgregarSancion
}) => {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroClub, setFiltroClub] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nuevaFicha, setNuevaFicha] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const filtrados = jugadores.filter(j =>
    (filtroCategoria ? j.categoria === filtroCategoria : true) &&
    (filtroClub ? j.club === filtroClub : true)
  );

  const handleGuardarFicha = (j) => {
    if (nuevaFicha[j.dni]?.file && nuevaFicha[j.dni]?.vencimiento) {
      onActualizarFicha(j.dni, nuevaFicha[j.dni].file, nuevaFicha[j.dni].vencimiento);
      setEditandoId(null);
      setNuevaFicha(prev => {
        const nuevo = { ...prev };
        delete nuevo[j.dni];
        return nuevo;
      });
    } else {
      alert('Debe seleccionar archivo y fecha');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>Filtrar por categoría: </label>
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">Todas</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>

        <label>Filtrar por club: </label>
        <select
          value={filtroClub}
          onChange={(e) => setFiltroClub(e.target.value)}
        >
          <option value="">Todos</option>
          {[...new Set(jugadores.map(j => j.club))].map(club => (
            <option key={club} value={club}>{club}</option>
          ))}
        </select>
      </div>

      <table style={{ width: '100%', background: '#1F3C88', color: '#fff', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Club</th>
            <th>Categoría</th>
            <th>Ficha Médica</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(j => (
            <tr key={j.dni}>
              <td>{j.nombre} {j.apellido}</td>
              <td>{j.dni}</td>
              <td>{j.club}</td>
              <td>{j.categoria}</td>
              <td>
                {j.vencimientoFicha ? (
                  j.vencimientoFicha < today ? (
                    <span style={{ color: 'red' }}>⚠ Vencida</span>
                  ) : (
                    <span style={{ color: 'white' }}>{j.vencimientoFicha}</span>
                  )
                ) : 'Sin ficha'}
              </td>
              <td>
                {editandoId === j.dni ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setNuevaFicha(prev => ({
                          ...prev,
                          [j.dni]: {
                            ...prev[j.dni],
                            file: e.target.files[0]
                          }
                        }))
                      }
                      style={{ marginBottom: '5px' }}
                    />
                    <input
                      type="date"
                      onChange={(e) =>
                        setNuevaFicha(prev => ({
                          ...prev,
                          [j.dni]: {
                            ...prev[j.dni],
                            vencimiento: e.target.value
                          }
                        }))
                      }
                      style={{ backgroundColor: '#FFFFFF', color: '#000', marginBottom: '5px' }}
                    />
                    <div>
                      <button onClick={() => handleGuardarFicha(j)} style={{ marginRight: '5px' }}>Guardar</button>
                      <button onClick={() => setEditandoId(null)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button onClick={() => setEditandoId(j.dni)} style={{ marginRight: '5px' }}>
                      Actualizar Ficha
                    </button>
                    <button onClick={() => onEditar(j)} style={{ marginRight: '5px' }}>Editar</button>
                    <button onClick={() => onEliminar(j.dni)} style={{ marginRight: '5px' }}>Desactivar</button>
                    <button onClick={() => onAgregarSancion(j.dni, 'Amarilla')} style={{ marginRight: '2px' }}>Amarilla</button>
                    <button onClick={() => onAgregarSancion(j.dni, '2 Min')} style={{ marginRight: '2px' }}>2 Min</button>
                    <button onClick={() => onAgregarSancion(j.dni, 'Roja')}>Roja</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaJugadores;
