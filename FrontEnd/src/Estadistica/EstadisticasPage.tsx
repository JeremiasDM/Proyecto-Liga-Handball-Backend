import React from "react";
import TablaEquipos from "./TablaEquipos";

const EstadisticasPage: React.FC = () => {
  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "#f4f7f6", // Fondo suave
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#007bff", // Azul primario
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "2.5em",
          fontWeight: 600,
          borderBottom: "3px solid #007bff",
          paddingBottom: "5px",
          margin: "0 auto 30px auto", // Centrar el título
          display: "block",
          width: "fit-content"
        }}
      >
        Estadísticas Generales
      </h2>
      <TablaEquipos />
    </div>
  );
};

export default EstadisticasPage;
