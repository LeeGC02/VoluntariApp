import { useState, useEffect } from "react";
import { db, auth } from "../../firebase/firebase.config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import HeaderOrganization from "../components/HeaderOrganization";
import { Icon } from "@iconify/react";

const ProductOrgPage = () => {
  const [formData, setFormData] = useState({
    imgProd: "",
    nameProd: "",
    price: "",
    sizes: [],
    stock: "",
    onAddToCart: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const user = auth.currentUser;
      if (user) {
        const productosCollection = collection(db, "productos");
        const q = query(productosCollection, where("organizacionId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const productosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosList);
      }
    };

    fetchProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSize = (size) => {
    if (size && !formData.sizes.includes(size)) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      try {
        const productosCollection = collection(db, "productos");
        await addDoc(productosCollection, {
          ...formData,
          organizacionId: user.uid,
          creadoEn: new Date(),
        });

        setFormData({
          imgProd: "",
          nameProd: "",
          price: "",
          sizes: [],
          stock: "",
          onAddToCart: "",
        });
        setShowModal(false);

        setProductos((prevProductos) => [
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
        <h2 className="text-2xl font-semibold mb-6">Tienda de Productos</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-200 text-blue-600 p-3 rounded-md hover:bg-blue-600 hover:text-blue-200 mb-6"
        >
          <Icon icon="mdi:plus-circle" className="mr-2 w-5 h-5" />
          Agregar Producto
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">URL de la Imagen:</label>
                  <input
                    type="text"
                    name="imgProd"
                    value={formData.imgProd}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Nombre del Producto:</label>
                  <input
                    type="text"
                    name="nameProd"
                    value={formData.nameProd}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Precio:</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Tamaños (opcional):</label>
                  <input
                    type="text"
                    placeholder="Ejemplo: S, M, L"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSize(e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <p className="mt-1 text-gray-500">
                    Presiona *Enter* para agregar cada tamaño.
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {formData.sizes.map((size, idx) => (
                      <li
                        key={idx}
                        className="bg-gray-200 px-3 py-1 rounded-md text-sm"
                      >
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Stock:</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">On Add To Cart:</label>
                  <input
                    type="text"
                    name="onAddToCart"
                    value={formData.onAddToCart}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white p-4 border rounded-md shadow-md"
            >
              <img
                src={producto.imgProd}
                alt={producto.nameProd}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{producto.nameProd}</h3>
              <p className="text-gray-600">{producto.price}Bs</p>
              <p className="text-gray-500">Stock: {producto.stock}</p>
              <p className="text-gray-500">
                Tamaños: {producto.sizes?.join(", ") || "No especificado"}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductOrgPage;
