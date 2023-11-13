import React, { useState, useEffect } from "react";
import axios from "axios";

const VistaBodega = () => {
  const [error, setError] = useState("");
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modificarVisible, setModificarVisible] = useState(false);
  const userId = localStorage.getItem("userId");
  const [modificarProducto, setModificarProducto] = useState({
    pro_nombre: "",
    pro_marca__mar_nombre: "",
    pro_stock: 0,
    pro_precio: 0,
  });
  const [agregarVisible, setAgregarVisible] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    pro_nombre: "",
    pro_stock: 0,
    pro_marca: "",
    pro_fecha_fencimiento: "",
    pro_precio: 0,
    pro_descripcion: "",
    pro_proveedore: "",
  });
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const TraerProductos = () => {
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
  };

  const TraerMarcas = () => {
    axios.get("http://127.0.0.1:8000/Obtener_Marcas/").then((res) => {
      if (res.data.estado) {
        setMarcas(res.data.marcas);
      } else {
        setError(res.data.mensaje);
      }
    });
  };

  useEffect(() => {
    TraerProductos();
    TraerMarcas();
    console.log("ID del usuario:", userId);
  }, [userId]);

  const handleDescontar = (producto) => {
    axios
      .post("http://127.0.0.1:8000/Descontar_Producto/", {
        producto_id: producto.pro_id,
        cantidad_a_descontar: producto.cantidadDescontar,
        usu_id: userId,
      })
      .then((res) => {
        if (res.data.estado) {
          TraerProductos();
        } else {
          setError(res.data.mensaje);
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud para descontar:", error);
      });
  };

  const handleAgregar = (producto) => {
    axios
      .post("http://127.0.0.1:8000/Agregar_Stock/", {
        producto_id: producto.pro_id,
        cantidad_a_agregar: producto.cantidadAgregar,
        usu_id: userId,
      })
      .then((res) => {
        if (res.data.estado) {
          TraerProductos();
        } else {
          setError(res.data.mensaje);
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud para agregar:", error);
      });
  };

  const handleModificar = (producto) => {
    setModificarProducto({
      pro_nombre: producto.pro_nombre,
      pro_marca__mar_nombre: producto.pro_marca__mar_nombre,
      pro_stock: producto.pro_stock,
      pro_precio: producto.pro_precio,
    });
    setProductoSeleccionado(producto);
    setModificarVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/Modificar_Producto/", {
        producto_id: productoSeleccionado.pro_id,
        nuevo_nombre: modificarProducto.pro_nombre,
        nueva_marca: modificarProducto.pro_marca__mar_nombre,
        nuevo_stock: modificarProducto.pro_stock,
        nuevo_precio: modificarProducto.pro_precio,
      })
      .then((res) => {
        if (res.data.estado) {
          TraerProductos();
          setModificarVisible(false);
          setProductoSeleccionado(null);
        } else {
          setError(res.data.mensaje);
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud para modificar:", error);
      });
  };

  const toggleAgregarContainer = () => {
    setAgregarVisible(!agregarVisible);
  };

  const handleAgregarProducto = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/Agregar_Producto/", {
        pro_nombre: nuevoProducto.pro_nombre,
        pro_stock: nuevoProducto.pro_stock,
        pro_marca: marcaSeleccionada,
        pro_fecha_fencimiento: nuevoProducto.pro_fecha_fencimiento,
        pro_precio: nuevoProducto.pro_precio,
        pro_descripcion: nuevoProducto.pro_descripcion,
        pro_proveedore: nuevoProducto.pro_proveedore,
      })
      .then((res) => {
        if (res.data.estado) {
          TraerProductos();
          setAgregarVisible(false);
        } else {
          console.error("Error al agregar producto:", res.data.mensaje);
        }
      })
      .catch((error) => {
        console.error(
          "Error al enviar la solicitud para agregar producto:",
          error
        );
      });
  };
  return (
    <div className="div-bodega">
      <div className="top">
        <label>Productos en bodega:</label>
      </div>
      <div className="mid">
        <input
          type="text"
          placeholder="Buscar producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={toggleAgregarContainer}>Agregar Producto</button>
        <table className="miTabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Cantidad a Descontar</th>
              <th>Cantidad a Agregar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos
              .filter(
                (producto) =>
                  !searchTerm ||
                  (producto.pro_nombre &&
                    producto.pro_nombre
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()))
              )
              .map((producto, index) => (
                <tr key={index}>
                  <td>{producto.pro_nombre}</td>
                  <td>{producto.pro_marca__mar_nombre}</td>
                  <td>{producto.pro_stock}</td>
                  <td>{producto.pro_precio}</td>
                  <td>
                    <input
                      type="number"
                      value={producto.cantidadDescontar}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10);
                        if (!isNaN(newValue)) {
                          const updatedProductos = [...productos];
                          updatedProductos[index].cantidadDescontar = newValue;
                          setProductos(updatedProductos);
                        }
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={producto.cantidadAgregar}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10);
                        if (!isNaN(newValue)) {
                          const updatedProductos = [...productos];
                          updatedProductos[index].cantidadAgregar = newValue;
                          setProductos(updatedProductos);
                        }
                      }}
                    />
                  </td>
                  <td>
                    <div className="botones">
                      <button onClick={() => handleModificar(producto)}>
                        Modificar
                      </button>
                      <button onClick={() => handleDescontar(producto)}>
                        Descontar
                      </button>
                      <button onClick={() => handleAgregar(producto)}>
                        Agregar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="bot">
        <label>{error}</label>
      </div>
      {modificarVisible && productoSeleccionado && (
        <div className="modal-container">
          <div className="modal-content">
            <h3>Modificar Producto</h3>
            <form onSubmit={handleSubmit}>
              <label>Nombre:</label>
              <input
                type="text"
                value={modificarProducto.pro_nombre}
                onChange={(e) =>
                  setModificarProducto({
                    ...modificarProducto,
                    pro_nombre: e.target.value,
                  })
                }
              />
              <label>Marca:</label>
              <input
                type="text"
                value={modificarProducto.pro_marca__mar_nombre}
                onChange={(e) =>
                  setModificarProducto({
                    ...modificarProducto,
                    pro_marca__mar_nombre: e.target.value,
                  })
                }
              />
              <label>Stock:</label>
              <input
                type="number"
                value={modificarProducto.pro_stock}
                onChange={(e) =>
                  setModificarProducto({
                    ...modificarProducto,
                    pro_stock: parseInt(e.target.value, 10),
                  })
                }
              />
              <label>Precio:</label>
              <input
                type="number"
                value={modificarProducto.pro_precio}
                onChange={(e) =>
                  setModificarProducto({
                    ...modificarProducto,
                    pro_precio: parseFloat(e.target.value),
                  })
                }
              />
              <button type="submit">Guardar Cambios</button>
              <button onClick={() => setModificarVisible(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
      {agregarVisible && (
        <div className="transparent-background">
          <div className="modal">
            <h3>Agregar Producto</h3>
            <form onSubmit={handleAgregarProducto}>
              <label>Nombre:</label>
              <input
                type="text"
                value={nuevoProducto.pro_nombre}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    pro_nombre: e.target.value,
                  })
                }
              />
              <label>Stock:</label>
              <input
                type="number"
                value={nuevoProducto.pro_stock}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    pro_stock: parseInt(e.target.value, 10),
                  })
                }
              />
              <label>Marca:</label>
              <select
                value={marcaSeleccionada}
                onChange={(e) => setMarcaSeleccionada(e.target.value)}
              >
                <option value="">Selecciona una marca</option>
                {marcas.map((marca) => (
                  <option key={marca.mar_id} value={marca.mar_id}>
                    {marca.mar_nombre}
                  </option>
                ))}
              </select>
              <label>Fecha de Vencimiento:</label>
              <input
                type="date"
                value={nuevoProducto.pro_fecha_fencimiento}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    pro_fecha_fencimiento: e.target.value,
                  })
                }
              />
              <label>Precio:</label>
              <input
                type="number"
                value={nuevoProducto.pro_precio}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    pro_precio: parseInt(e.target.value, 10),
                  })
                }
              />
              <label>Descripción:</label>
              <textarea
                value={nuevoProducto.pro_descripcion}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    pro_descripcion: e.target.value,
                  })
                }
              />
              <label>Proveedor:</label>
              <input
                type="text"
                value={nuevoProducto.pro_proveedore}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    pro_proveedore: e.target.value,
                  })
                }
              />
              <button type="submit">Agregar Producto</button>
              <button onClick={toggleAgregarContainer}>Cerrar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaBodega;
