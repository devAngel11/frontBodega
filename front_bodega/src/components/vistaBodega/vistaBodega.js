import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VistaBodega = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "usuario") {
      setUsuario(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const validarUsuario = () => {
    axios
      .post("http://127.0.0.1:8000/Iniciar_sesion/", {
        rut: usuario,
        password: password,
      })
      .then((res) => {
        if (!res.data.estado) {
          console.error(res.data.mensaje);
          setError(res.data.mensaje);
        } else {
          setError("");
          if (res.data.rol === 3) {
            navigate("/VistaAdmin");
          } else if (res.data.rol === 2) {
            navigate("/VistaContabilidad");
          } else if (res.data.rol === 1) {
            navigate("/VistaBodega");
          }
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud POST:", error);
      });
  };

  return (
    <div className="div-bodega">
      <div className="top"></div>
      <div className="mid"></div>
      <div className="bot"></div>
    </div>
  );
};

export default VistaBodega;
