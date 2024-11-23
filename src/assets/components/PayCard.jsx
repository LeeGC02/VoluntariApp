import PropTypes from "prop-types";
const PayCard = ({ cart, onUpdateQuantity, onClose, onConfirmPayment }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t p-5">
      <button onClick={onClose} className="text-red-500">
        Cerrar
      </button>
      <h3 className="font-bold text-xl text-orangePrincipal">Tu Carrito</h3>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between">
          <p>
            {item.nameProd} - <span>{item.price} Bs</span>
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="border px-2 rounded-bl-md rounded-tl-md"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="border px-2 rounded-br-md rounded-tr-md"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-2xl font-bold">Total: {total} Bs</h2>
        <button
          onClick={onConfirmPayment} // Llama a la función para mostrar el modal
          className="border p-2 rounded-xl bg-orangePrincipal text-white hover:bg-white hover:text-orangePrincipal"
        >
          Confirmar Pago
        </button>
      </div>
    </div>
  );
};


PayCard.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nameProd: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmPayment: PropTypes.func.isRequired,
};

export default PayCard;
