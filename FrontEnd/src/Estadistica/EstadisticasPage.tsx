import React from "react";
import TablaEquipos from "./TablaEquipos";

const EstadisticasPage: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "#1F3C88", marginBottom: "20px" }}>
        Estadísticas Generales
      </h2>
      <TablaEquipos />
    </div>
  );
};

export default EstadisticasPage;

