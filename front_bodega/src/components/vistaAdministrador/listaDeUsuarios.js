import React, { useState, useEffect } from "react";
import axios from "axios";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);


  const traerUsuarios = () => {
    axios.get("http://127.0.0.1:8000/Traer_usuarios_lista/").then((res) => {
      setUsuarios(res.data.data);
    });
  };

  useEffect(() => {
    traerUsuarios();
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <table className="miTabla">
          <thead style={{marginBottom:"2%"}}>
            <tr>
              <th style={{width: '22%',textAlign: 'start'}}>Nombre</th>
              <th style={{width: '22%',textAlign: 'start'}}>Apellido paterno</th>
              <th style={{width: '22%',textAlign: 'start'}}>Apellido materno</th>
              <th style={{width: '22%',textAlign: 'start'}}>RUT</th>
              <th style={{width: '22%',textAlign: 'start'}}>rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usu) => (
              <tr style={{marginBottom:"2%"}} key={usu.usu_id}>
                <td style={{width: '22%',textAlign: 'start'}}>{usu.usu_nombre}</td>
                <td style={{width: '22%',textAlign: 'start'}}>{usu.usu_apellido_p}</td>
                <td style={{width: '22%',textAlign: 'start'}}>{usu.usu_apellido_m}</td>
                <td style={{width: '22%',textAlign: 'start'}}>{usu.usu_rut}</td>
                <td style={{width: '22%',textAlign: 'start'}}>{usu.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaUsuarios;
