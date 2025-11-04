import { useState } from "react";

interface LoginModalProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

export default function LoginModal({ onLoginSuccess, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simula una pequeña demora de red
    await new Promise(resolve => setTimeout(resolve, 500));

    // Lógica de login hardcodeada
    if (username === "admin" && password === "1234") {
      setLoading(false);
      onLoginSuccess(); // Llama a la función de éxito
    } else {
      setLoading(false);
      setError("Usuario o contraseña incorrectos.");
    }
  };

  // Detiene la propagación para que al hacer clic en el modal no se cierre
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-card {
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1rem;
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          color: white;
          position: relative;
          animation: slideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          transform: translateY(-20px);
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        .modal-close-btn:hover {
          opacity: 1;
        }

        /* Reutiliza estilos de Login.tsx */
        .logo { width: 100px; height: 100px; object-fit: contain; margin-bottom: 1rem; }
        .title { font-size: 1.5rem; font-weight: bold; text-align: center; margin: 0; }
        .subtitle { color: rgba(255,255,255,0.7); text-align: center; margin: 0.5rem 0 2rem 0; }
        .modal-card form { display: flex; flex-direction: column; gap: 1.5rem; }
        .modal-card label { font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem; display: block; }
        .modal-card input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.2);
          background-color: rgba(255,255,255,0.1);
          color: white;
          font-size: 1rem;
        }
        .modal-card input::placeholder { color: rgba(255,255,255,0.5); }
        .modal-card .button {
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          background-color: #1F3C88;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .modal-card .button:hover:not(:disabled) { background-color: white; color: #0B0E19; }
        .modal-card .button:disabled { opacity: 0.6; cursor: default; }
        .modal-card .error { color: #ff7070; text-align: center; font-size: 0.9rem; }
        .modal-card .link { font-size: 0.875rem; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.2s ease; }
        .modal-card .link:hover { color: white; }
      `}</style>

      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-card" onClick={handleModalClick}>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="/Logo.png" alt="Logo" className="logo" />
            <h1 className="title">Iniciar Sesión</h1>
            <p className="subtitle">Accede al panel de gestión</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="button" disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a href="#" className="link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}