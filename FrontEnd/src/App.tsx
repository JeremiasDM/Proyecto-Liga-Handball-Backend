import React, { useState } from "react";
import Login from "./components/Login";
import HudPrincipal from "./components/Menu";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isAuthenticated ? (
        <HudPrincipal />
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;
