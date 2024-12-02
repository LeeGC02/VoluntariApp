import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase.config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import HeaderOrganization from "../components/HeaderOrganization";
import { Icon } from "@iconify/react";

const ProductOrgPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const user = auth.currentUser;
      if (user) {
        // Crear la referencia a la colección de productos
        const productosCollection = collection(db, "productos");

        // Crear una consulta para filtrar los productos por el organizacionId
        const q = query(productosCollection, where("organizacionId", "==", user.uid));

        // Ejecutar la consulta y obtener los productos
        const querySnapshot = await getDocs(q);
        
        // Mapear los documentos de la consulta a un array
        const productosList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Establecer los productos en el estado
        setProductos(productosList);
      }
    };

    fetchProductos();
  }, []); // Este efecto solo se ejecuta cuando el componente se monta

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        // Obtener la referencia de la colección de productos de la organización
        const productosCollection = collection(db, "productos");

        // Agregar el producto a la base de datos
        await addDoc(productosCollection, {
          ...formData,
          organizacionId: user.uid, // Asociamos el producto con la organización
          creadoEn: new Date(),
        });

        // Limpiar formulario después de enviar
        setFormData({
          nombre: "",
          precio: "",
          descripcion: "",
          categoria: "",
        });
        // Cerrar el modal
        setShowModal(false);

        // Actualizar la lista de productos (agregar el nuevo producto)
        setProductos(prevProductos => [
          ...prevProductos,
          { ...formData, organizacionId: user.uid, creadoEn: new Date() },
        ]);

        alert("Producto agregado correctamente");
      } catch (error) {
        console.error("Error al agregar el producto: ", error);
        alert("Hubo un error al agregar el producto.");
      }
    }
  };

  return (
    <div>
      <HeaderOrganization />
      <main className="p-6">
      <h3 className="font-bold text-2xl text-bluePrincipal py-3 text-center">Tienda de Productos</h3>

        {/* Botón para abrir el modal */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-200 text-blue-600 p-3 rounded-md hover:bg-blue-600 hover:text-blue-200 mb-6"
        >
          <Icon icon="mdi:plus-circle" className="mr-2 w-5 h-5" />
          Agregar Producto
        </button>

        {/* Modal de agregar producto */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Nombre del Producto:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Precio:</label>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Descripción:</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    rows="4"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Categoría:</label>
                  <input
                    type="text"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-200 text-blue-600 p-3 rounded-md hover:bg-blue-600 hover:text-blue-200"
                  >
                    Agregar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mostrar los productos agregados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {productos.map((producto, index) => (
            <div
              key={index}
              className="bg-white p-4 border rounded-md shadow-md"
            >
              <h3 className="text-lg font-semibold">{producto.nombre}</h3>
              <p className="text-gray-600">{producto.descripcion}</p>
              <p className="text-bluePrincipal font-semibold mt-2">{producto.precio}Bs</p>
              <p className="text-gray-500">Categoría: {producto.categoria}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductOrgPage;
