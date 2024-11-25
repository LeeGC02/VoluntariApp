// import React from 'react'
import PropTypes from "prop-types";

const ProductCard = ({ imgProd, nameProd, price, sizes, stock, onAddToCart }) => {
  return (
    <div className=" g border rounded-md border-orange-600 p-4">
      <div className="flex justify-center text-center w-full h-50"> 
        <img
          className="w-40 h-40"
          src={imgProd}
          alt="x"
        />
      </div>
      <div className="py-4 flex justify-between items-center ">
        <div className="nose">
          <h3 className=" font-bold text-2xl">{nameProd}</h3>
          <div className="prices">
            <span className=" font-medium text-lg">Precio: </span>
            <span className="text-orange-600 font-semibold text-lg">{price}Bs</span>
          </div>
        </div>
        {Array.isArray(sizes) && sizes.length > 0 && (
          <div className="size">
            <select
              name="size-shirt"
              id="size-shirt"
              className=" border-orange-600 border rounded-md w-full focus:outline-none bg-transparent text--rose-600"
              defaultValue="default"
            >
              <option value="default">Tallas disponibles</option>
              <option value="s">{sizes[0]}</option>
              <option value="m">{sizes[1]}</option>
              <option value="l">{sizes[2]}</option>
              <option value="xl">{sizes[3]}</option>
            </select>
          </div>
        )}
      </div>
      <button
        onClick={onAddToCart}
        disabled={stock === 0} // Botón deshabilitado si no hay stock
        className={`p-3 rounded-md w-full ${
          stock === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed" // Estilo deshabilitado
            : "bg-orange-200 text-orange-600 hover:bg-orange-600 hover:text-orange-200"
        }`}
      >
        {stock === 0 ? "Agotado" : "Añadir al Carrito"}
      </button>
      {stock === 0 && (
        <p className="text-red-600 font-semibold text-center mt-3">
          Producto agotado
        </p>
      )}
    </div>
  );
};
ProductCard.propTypes = {
  imgProd: PropTypes.string.isRequired,
  nameProd: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string),
  stock: PropTypes.number.isRequired,
  onAddToCart: PropTypes.string.isRequired,
};

export default ProductCard;
