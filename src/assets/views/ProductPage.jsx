import { useState } from "react";
import HeaderWebApp from "../components/HeaderWebApp";
import { Icon } from "@iconify/react/dist/iconify.js";
import ProductCard from "../components/ProductCard";
import PayCard from "../components/PayCard";
import ModalPay from "../components/ModalPay";
import DetailsCard from "../components/DetailsCard";

const ProductPage = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const [sortOption, setSortOption] = useState("default"); // Estado para el ordenamiento
  const [showModal, setShowModal] = useState(false);

  const dataProduct = [
    {
      id: 1,
      imgProd: "/polera.jpg",
      nameProd: "VolApp - Camiseta",
      price: 80,
      sizes: ["S", "M", "L", "XL"], // Tiene tallas
    },
    {
      id: 2,
      imgProd: "/taza.jpg",
      nameProd: "VolApp - Taza",
      price: 50,
      // Sin tallas
    },
    {
      id: 3,
      imgProd: "/llavero.jpg",
      nameProd: "VolApp - Llavero",
      price: 25,
      // Sin tallas
    },
    {
      id: 4,
      imgProd: "/pines.jpg",
      nameProd: "VolApp - Pin",
      price: 10,
      // Sin tallas
    },
  ];

  const handleAddToCart = (product) => {
    setShowCart(true);
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, increment) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + increment }
            : item
        )
        .filter((item) => item.quantity > 0) // Eliminar si cantidad llega a 0
    );
  };

  // Manejo de búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejo de ordenamiento
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filtrar y ordenar productos
  const filteredAndSortedProducts = dataProduct
    .filter((product) =>
      product.nameProd.toLowerCase().includes(searchTerm.toLowerCase())
    ) // Filtrar por término de búsqueda
    .sort((a, b) => {
      if (sortOption === "low") return a.price - b.price; // Ordenar por precio bajo
      if (sortOption === "high") return b.price - a.price; // Ordenar por precio alto
      return 0; // Sin ordenamiento
    });

  return (
    <div>
      <HeaderWebApp />
      <main>
        {/* Barra de búsqueda y filtro */}
        <div className="search-sort flex justify-between items-center">
          <div className="search flex gap-4 items-center m-5">
            <Icon
              icon="line-md:search-twotone"
              width="24"
              height="24"
              style={{ color: "#FF6E52" }}
            />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded-md p-2"
            />
          </div>
          <div className="sort">
            <select
              name="sort-price"
              id="sort-price"
              value={sortOption}
              onChange={handleSortChange}
              className="border rounded-md p-2"
            >
              <option value="default">Todos los Productos</option>
              <option value="low">Productos a Precio Bajo</option>
              <option value="high">Productos a Precio Alto</option>
            </select>
          </div>
        </div>

        {/* Productos filtrados y ordenados */}
        <div className="product-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 bg-beige border rounded-md justify-center items-center">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              imgProd={product.imgProd}
              nameProd={product.nameProd}
              price={product.price}
              sizes={product.sizes}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>

        {/* Carrito de compras */}
        {showCart && (
          <PayCard
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClose={() => setShowCart(false)}
            onConfirmPayment={() => setShowModal(true)} // Muestra el modal
          />
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg">
              <ModalPay />
              <button
                onClick={() => setShowModal(false)} // Cierra el modal
                className="mt-5 px-4 py-2 bg-orangePrincipal text-white rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <DetailsCard/> 
      </main>

    </div>

  );
};

export default ProductPage;
