import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import DetailsCard from "./DetailsCard"; // Importamos el componente de detalles
import QrCard from "./QrCard";

const ModalPay = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const goBack = () => setSelectedPayment(null);
  
  return (
    <div className="relative">
      {/* Modal de selección de método de pago */}
      {!selectedPayment ? (
        <div className="flex flex-col border rounded-md p-6 bg-beige w-[100%] max-w-md mx-auto">
          <h3 className="font-bold text-2xl text-orangePrincipal py-3 text-center">
            Verificación
          </h3>
          <p className="text-center text-gray-700 mb-6">
            Elige un método de pago con el que realizarás la compra.
          </p>
          <div className="flex justify-around">
            {/* Pago con Tarjeta */}
            <div
              onClick={() => setSelectedPayment("card")}
              className="flex flex-col items-center bg-orange-500 p-4 text-white rounded-md shadow-lg cursor-pointer hover:bg-orange-600 transition duration-300"
            >
              <div className="h-24 w-24 flex items-center justify-center">
                <Icon icon="solar:card-2-bold-duotone" width="80" height="80" />
              </div>
              <span className="mt-3 font-semibold">Pago por Tarjeta</span>
            </div>
            

            {/* Pago con QR */}
            <div
              onClick={() => setSelectedPayment("qr")}
              className="flex flex-col items-center bg-orange-500 p-4 text-white rounded-md shadow-lg cursor-pointer hover:bg-orange-600 transition duration-300"
            >
              <div className="h-24 w-24 flex items-center justify-center">
                <Icon icon="bx:qr" width="80" height="80" />
              </div>
              <span className="mt-3 font-semibold">Pago con QR</span>
            </div>
          </div>
        </div>
      ) : selectedPayment === "card" ? (
        <div>
          <button
            onClick={goBack}
            className="flex items-center text-gray-700 hover:text-orangePrincipal mb-4"
          >
            <Icon icon="fluent:ios-arrow-24-filled" width="20" height="20" />
            <span className="ml-2">Volver</span>
          </button>
          <DetailsCard />
        </div>
      ) : (
        <div>
          <button
            onClick={goBack}
            className="flex items-center text-gray-700 hover:text-orangePrincipal mb-4"
          >
            <Icon icon="fluent:ios-arrow-24-filled" width="20" height="20" />
            <span className="ml-2">Volver</span>
          </button>
          <QrCard />
        </div>
      )}
    </div>
  );
};

export default ModalPay;
