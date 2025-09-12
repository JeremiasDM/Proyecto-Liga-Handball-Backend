import { useEffect, useState } from "react";

// Tipos
interface Club {
  id: number;
  nombre: string;
  categoria: "masculino" | "femenino";
  correo: string;
  telefono: string;
  localidad: string;
  fechaRegistro: string;
  activo: boolean;
}

interface Localidad {
  id: number;
  nombre: string;
}

export default function VerClubes() {
  const [clubes, setClubes] = useState<Club[]>([]);
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<"" | "masculino" | "femenino">("");
  const [editando, setEditando] = useState<Club | null>(null);
  const [nuevoClub, setNuevoClub] = useState<Partial<Club>>({});
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState("");

  // Cargar clubes y localidades al montar
  useEffect(() => {
    fetch("http://localhost:3000/clubes")
      .then(res => res.json())
      .then(data => setClubes(data))
      .catch(() => setClubes([]));

    fetch("http://localhost:3000/localidades")
      .then(res => res.json())
      .then(data => setLocalidades(data))
      .catch(() => setLocalidades([]));
  }, []);

  // Filtrado
  const clubesFiltrados = clubes.filter(
    club =>
      club.activo &&
      club.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoriaFiltro ? club.categoria === categoriaFiltro : true)
  );

  // Validación
  function validarClub(club: Partial<Club>) {
    if (!club.nombre || !club.categoria || !club.correo || !club.telefono || !club.localidad || !club.fechaRegistro) {
      return "Todos los campos son obligatorios.";
    }
    if (!/^\S+@\S+\.\S+$/.test(club.correo)) return "Correo inválido.";
    if (!/^\d{7,}$/.test(club.telefono)) return "Teléfono inválido. Solo números, mínimo 7 dígitos.";
    const hoy = new Date().toISOString().split("T")[0];
    if (club.fechaRegistro > hoy) return "La fecha no puede ser posterior a hoy.";
    return "";
  }

  // Añadir club
  async function handleAddClub(e: React.FormEvent) {
    e.preventDefault();
    const err = validarClub(nuevoClub);
    if (err) return setError(err);

    const res = await fetch("http://localhost:3000/clubes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...nuevoClub, activo: true }),
    });
    if (res.ok) {
      const clubCreado = await res.json();
      setClubes([...clubes, clubCreado]);
      setNuevoClub({});
      setMostrarFormulario(false);
      setError("");
    } else {
      setError("Error al registrar el club.");
    }
  }

  // Editar club
  async function handleEditClub(e: React.FormEvent) {
    e.preventDefault();
    if (!editando) return;
    const err = validarClub(editando);
    if (err) return setError(err);

    const res = await fetch(`http://localhost:3000/clubes/${editando.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editando),
    });
    if (res.ok) {
      setClubes(clubes.map(c => (c.id === editando.id ? editando : c)));
      setEditando(null);
      setError("");
    } else {
      setError("Error al editar el club.");
    }
  }

  // Borrar club (desactivar)
  async function handleDeleteClub(id: number) {
    const res = await fetch(`http://localhost:3000/clubes/${id}`, { method: "DELETE" });
    if (res.ok) {
      setClubes(clubes.map(c => (c.id === id ? { ...c, activo: false } : c)));
    }
  }

  // Estilos
  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: 5,
    border: "1px solid #ccc",
  };

  const btnStyle = {
    padding: "0.5rem 1rem",
    borderRadius: 5,
    background: "#1f3c88",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginRight: "0.5rem",
  };

  const btnCancelStyle = {
    padding: "0.5rem 1rem",
    borderRadius: 5,
    background: "#aaa",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const cardStyle = {
    background: "#f7f7f7",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Clubes</h2>

      {/* Filtrado */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={inputStyle}
        />
        <select
          value={categoriaFiltro}
          onChange={e => setCategoriaFiltro(e.target.value as any)}
          style={inputStyle}
        >
          <option value="">Todas</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>

      {/* Lista de clubes */}
      {clubesFiltrados.map(club => (
        <div key={club.id} style={cardStyle}>
          <div>
            <h4>{club.nombre}</h4>
            <p>
              {club.localidad} | {club.categoria}
            </p>
            <p>
              {club.correo} | {club.telefono}
            </p>
            <p>Registrado: {club.fechaRegistro}</p>
          </div>
          <div>
            <button style={btnStyle} onClick={() => { setEditando(club); setError(""); }}>
              Modificar
            </button>
            <button style={btnCancelStyle} onClick={() => handleDeleteClub(club.id)}>
              Borrar
            </button>
          </div>
        </div>
      ))}

      <button style={btnStyle} onClick={() => { setMostrarFormulario(true); setError(""); }}>
        Añadir Club
      </button>

      {/* Formulario Añadir */}
      {mostrarFormulario && (
        <form onSubmit={handleAddClub} style={{ marginTop: "1rem", padding: "1rem", background: "#f0f0f0", borderRadius: 8 }}>
          {error && <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>}
          <input type="text" placeholder="Nombre" value={nuevoClub.nombre || ""} onChange={e => setNuevoClub({ ...nuevoClub, nombre: e.target.value })} style={inputStyle} required />
          <select value={nuevoClub.categoria || ""} onChange={e => setNuevoClub({ ...nuevoClub, categoria: e.target.value as any })} style={inputStyle} required>
            <option value="">Seleccionar</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <input type="email" placeholder="Correo" value={nuevoClub.correo || ""} onChange={e => setNuevoClub({ ...nuevoClub, correo: e.target.value })} style={inputStyle} required />
          <input type="tel" placeholder="Teléfono" value={nuevoClub.telefono || ""} onChange={e => setNuevoClub({ ...nuevoClub, telefono: e.target.value })} style={inputStyle} required />
          <select value={nuevoClub.localidad || ""} onChange={e => setNuevoClub({ ...nuevoClub, localidad: e.target.value })} style={inputStyle} required>
            <option value="">Seleccionar</option>
            {localidades.map(loc => <option key={loc.id} value={loc.nombre}>{loc.nombre}</option>)}
          </select>
          <input type="date" value={nuevoClub.fechaRegistro || ""} onChange={e => setNuevoClub({ ...nuevoClub, fechaRegistro: e.target.value })} style={inputStyle} required />
          <div style={{ marginTop: "0.5rem" }}>
            <button type="submit" style={btnStyle}>Registrar</button>
            <button type="button" style={btnCancelStyle} onClick={() => setMostrarFormulario(false)}>Cancelar</button>
          </div>
        </form>
      )}

      {/* Formulario Editar */}
      {editando && (
        <form onSubmit={handleEditClub} style={{ marginTop: "1rem", padding: "1rem", background: "#f0f0f0", borderRadius: 8 }}>
          {error && <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>}
          <input type="text" value={editando.nombre} onChange={e => setEditando({ ...editando, nombre: e.target.value })} style={inputStyle} required />
          <select value={editando.categoria} onChange={e => setEditando({ ...editando, categoria: e.target.value as any })} style={inputStyle} required>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
          <input type="email" value={editando.correo} onChange={e => setEditando({ ...editando, correo: e.target.value })} style={inputStyle} required />
          <input type="tel" value={editando.telefono} onChange={e => setEditando({ ...editando, telefono: e.target.value })} style={inputStyle} required />
          <select value={editando.localidad} onChange={e => setEditando({ ...editando, localidad: e.target.value })} style={inputStyle} required>
            {localidades.map(loc => <option key={loc.id} value={loc.nombre}>{loc.nombre}</option>)}
          </select>
          <input type="date" value={editando.fechaRegistro} onChange={e => setEditando({ ...editando, fechaRegistro: e.target.value })} style={inputStyle} required />
          <div style={{ marginTop: "0.5rem" }}>
            <button type="submit" style={btnStyle}>Guardar</button>
            <button type="button" style={btnCancelStyle} onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
}
