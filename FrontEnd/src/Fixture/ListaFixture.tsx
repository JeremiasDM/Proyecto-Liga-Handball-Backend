import React, { type CSSProperties } from "react";

// Definiciones de interfaces (Necesarias para el componente)
interface Club {
    id: number;
    nombre: string;
}

interface EncuentroAPI {
    id: number;
    jornada: number;
    grupo?: string;
    fecha?: string;
    resultado: string;
    club1Id: number;
    club2Id: number;
    club1?: Club; // Opcional
    club2?: Club; // Opcional
}

interface FixtureAPI {
    id: number;
    fecha: string;
    lugar: string;
    partidos: EncuentroAPI[];
}

// ⚠️ Asumimos que PartidoItem existe y recibe 'partido: EncuentroAPI'
const PartidoItem: React.FC<{ partido: EncuentroAPI }> = ({ partido }) => {
    const club1Name = partido.club1?.nombre || `ID: ${partido.club1Id}`;
    const club2Name = partido.club2?.nombre || `ID: ${partido.club2Id}`;

    return (
        <li style={{ 
            listStyleType: 'disc', 
            marginLeft: 20, 
            marginBottom: 4,
            color: '#555' 
        }}>
            J{partido.jornada} | **{club1Name}** vs **{club2Name}** (Resultado: {partido.resultado})
        </li>
    );
};


type Props = {
    fixtures: FixtureAPI[];
    onEdit: (fixture: FixtureAPI) => void;
};

// --- 👇 ESTILOS PARA LISTA FIXTURE 👇 ---
const styles: { [key: string]: CSSProperties } = {
    listContainer: {
        padding: "1rem 0",
        backgroundColor: "transparent",
        fontFamily: 'Arial, sans-serif',
    },
    fixtureCard: {
        marginBottom: 20,
        background: "#ffffff",
        borderRadius: 10,
        padding: 15,
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        borderLeft: '5px solid #007bff',
        transition: 'transform 0.2s',
    },
    fixtureHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee',
    },
    headerInfo: {
        fontSize: '1.1rem',
        color: '#333',
    },
    // 🚨 BOTÓN EDITAR ACTUALIZADO 🚨
    editButton: {
        padding: "0.5rem 1rem", // Relleno interno vertical y horizontal.
        borderRadius: "5px", // Bordes ligeramente redondeados.
        background: "#1f3c88", // Fondo Azul Fuerte.
        color: "white", // Color del texto blanco.
        border: "none", // Sin borde.
        cursor: "pointer", // Indica que es un elemento interactivo.
        fontSize: '0.9rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
        // Nota: No se necesita marginRight ya que es el único botón a la derecha.
    },
    partidosList: {
        paddingLeft: 0,
        marginTop: 10,
        listStyle: 'none',
    },
    noPartidos: {
        fontStyle: 'italic',
        color: '#888',
        paddingLeft: '5px',
        fontSize: '0.9rem'
    }
};
// --- 👆 FIN DE ESTILOS ---


const ListaFixture: React.FC<Props> = ({ fixtures, onEdit }) => {
    if (!fixtures || fixtures.length === 0) {
        // Mensaje sin icono
        return <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>No hay fixtures registrados.</p>;
    }

    return (
        <div style={styles.listContainer}>
            {fixtures.map((fixture) => (
                <div
                    key={fixture.id} 
                    style={styles.fixtureCard} 
                >
                    <div style={styles.fixtureHeader}>
                        <span style={styles.headerInfo}>
                            **ID:** {fixture.id} | **Fecha:** **{fixture.fecha}** | **Lugar:** **{fixture.lugar}**
                        </span>
                        <button
                            style={styles.editButton}
                            onClick={() => onEdit(fixture)} 
                        >
                            Editar
                        </button>
                    </div>

                    {fixture.partidos && fixture.partidos.length > 0 ? (
                        <>
                            <p style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#555', marginBottom: '5px' }}>Partidos registrados ({fixture.partidos.length}):</p>
                            <ul style={styles.partidosList}>
                                {fixture.partidos.map((p) => (
                                    <PartidoItem key={p.id} partido={p} /> 
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p style={styles.noPartidos}>Sin partidos registrados.</p>
                    )}

                </div>
            ))}
        </div>
    );
};

export default ListaFixture;
