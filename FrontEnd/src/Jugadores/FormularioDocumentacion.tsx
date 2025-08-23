import React from 'react';

const estiloInput = {
  width: '90%',
  padding: '8px',
  margin: '5px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#0B0E19',
  color: '#FFFFFF'
};

const estiloBoton = {
  padding: '10px',
  margin: '5px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const estiloCaja = {
  flex: '1',
  minWidth: '45%',
  padding: '10px',
  margin: '5px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#0B0E19'
};

const FormularioDocumentacion = ({
  datos,
  setDatos,
  previewCarnet,
  previewFicha,
  setPreviewCarnet,
  setPreviewFicha,
  setFase,
  handleGuardar,
  handleCancelar,
  modo
}) => {
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDatos({ ...datos, [name]: files[0] });
      if (name === 'carnet') {
        setPreviewCarnet(URL.createObjectURL(files[0]));
      } else if (name === 'ficha') {
        setPreviewFicha(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={estiloCaja}>
          <strong> Carnet*</strong>
          <input type="file" name="carnet" accept="image/*" onChange={handleFileChange} style={estiloInput} />
          {previewCarnet && <img src={previewCarnet} alt="Previsualización carnet" style={{ maxWidth: '200%', maxHeight: '200px', marginTop: '5px' }} />}
        </div>

        <div style={estiloCaja}>
          <strong> Ficha Médica*</strong>
          <input type="file" name="ficha" accept="image/*" onChange={handleFileChange} style={estiloInput} />
          {previewFicha && <img src={previewFicha} alt="Previsualización ficha" style={{ maxWidth: '200%', maxHeight: '200px', marginTop: '5px' }} />}

          <label style={{ display: 'block', marginTop: '10px' }}>Fecha de vencimiento*</label>
          <input
            type="date"
            name="vencimientoFicha"
            value={datos.vencimientoFicha || ''}
            onChange={handleChange}
            style={estiloInput}
            min={today}
          />
        </div>
      </div>

      <button onClick={() => setFase(1)} style={{ ...estiloBoton, backgroundColor: 'gray', color: '#FFFFFF' }}>Volver</button>
      <button onClick={handleGuardar} style={{ ...estiloBoton, backgroundColor: 'green', color: '#FFFFFF' }}>
        {modo === 'registro' ? 'Guardar' : 'Actualizar'}
      </button>
      <button onClick={handleCancelar} style={{ ...estiloBoton, backgroundColor: 'red', color: '#FFFFFF' }}>Cancelar</button>
    </>
  );
};

export default FormularioDocumentacion;
