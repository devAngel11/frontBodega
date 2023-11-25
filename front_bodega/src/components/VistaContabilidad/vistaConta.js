import React, { useState, useEffect } from "react";
import axios from "axios";
import GraficoA from "../../graficos/graficoprincipal";
import GraficoB from "../../graficos/graficoprincipal1";

const VistaContabilidad = () => {
  const [graficoSeleccionado, setGraficoSeleccionado] = useState("GraficoA");

  const mostrarGrafico = (nombre) => {
    setGraficoSeleccionado(nombre);
  };

  return (
    <div className="div-contabilidad">
      <div>
        <button onClick={() => mostrarGrafico("GraficoA")}>
          Mostrar Grafico A
        </button>
        <button onClick={() => mostrarGrafico("GraficoB")}>
          Mostrar Grafico B
        </button>
        <button onClick={() => mostrarGrafico("GraficoC")}>
          Mostrar Grafico C
        </button>
      </div>
      <div>
        {graficoSeleccionado === "GraficoA" && <GraficoA />}
        {graficoSeleccionado === "GraficoB" && <GraficoB />}
      </div>
    </div>
  );
};

export default VistaContabilidad;
