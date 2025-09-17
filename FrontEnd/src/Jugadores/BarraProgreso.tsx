import { FaUser, FaFileAlt } from 'react-icons/fa';

interface BarraProgresoProps {
  fase: number;
}

const BarraProgreso = ({ fase }: BarraProgresoProps) => {
  const estiloPaso = (activo: boolean) => ({
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: activo ? '#1F3C88' : '#555',
    color: '#FFFFFF',
    fontWeight: activo ? 'bold' : 'normal',
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px',
    marginBottom: '5px',
    cursor: 'default'
  });

  const porcentaje = fase === 1 ? 50 : 100;

  return (
    <div>
      <div style={{
        width: '100%',
        backgroundColor: '#555',
        height: '10px',
        borderRadius: '5px',
        marginBottom: '10px'
      }}>
        <div style={{
          backgroundColor: '#1F3C88',
          height: '10px',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#4CAF50',
            width: `${porcentaje}%`,
            height: '100%',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={estiloPaso(fase === 1)}>
          <FaUser style={{ marginRight: '5px' }} /> 1. Datos personales
        </div>
        <div style={estiloPaso(fase === 2)}>
          <FaFileAlt style={{ marginRight: '5px' }} /> 2. Documentación
        </div>
      </div>
    </div>
  );
};

export default BarraProgreso;
