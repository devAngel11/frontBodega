import React, { useState, useEffect } from "react";
import axios from "axios";
import CrearUsuario from "./crearUsuario";
import ListaUsuarios from "./listaDeUsuarios";
import ListaProveedores from "./listaProveedores";

const VistaAministrador = () => {
  const [error, setError] = useState("");
  const [accionAdmin, setAccionAdmin] = useState(1);

  /* const TraerProductos = () => {
    axios
      .get("http://127.0.0.1:8000/Traer_Productos/")
      .then((res) => {
        if (!res.data.estado) {
          setError(res.data.mensaje);
        } else {
          setProductos(
            res.data.data.map((producto) => ({
              ...producto,
              cantidadDescontar: 1,
              cantidadAgregar: 1,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud get:", error);
      });
  }; */

  /* useEffect(() => {
  }, []); */

  const cambiarVista = (vista) =>{
    setAccionAdmin(vista)
  }

  return (
    <>
    <div style={{width: '100%',
    height: '100%',
    marginBottom: '5%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5%'}}>
      <button className={accionAdmin == 1 ? "botonAdministrador-seleccionado":"botonAdministrador-seleccionable"} onClick={()=>cambiarVista(1)}>Crear Usuarios</button>
      <button className={accionAdmin == 2 ? "botonAdministrador-seleccionado":"botonAdministrador-seleccionable"} onClick={()=>cambiarVista(2)}>Lista de Usuarios</button>
      <button className={accionAdmin == 3 ? "botonAdministrador-seleccionado":"botonAdministrador-seleccionable"} onClick={()=>cambiarVista(3)}>Lista de proveedores</button>

    </div>
    <div style={{width:'100%', height:'100%' }}>
      {accionAdmin == 1 ?(
        <CrearUsuario/>
      ): accionAdmin == 2 ?(
        <ListaUsuarios/>
      ): accionAdmin == 3 ?(
        <ListaProveedores/>
      ):null}
    </div>
    </>
  );
};

export default VistaAministrador;
