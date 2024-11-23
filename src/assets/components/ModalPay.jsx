// import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";

const ModalPay = () => {
  return (
    <div className=" flex flex-col border rounded-md p-3 bg-beige ">
      <h3 className="font-bold text-xl py-3">Verificación</h3>
      <div className="flex flex-col gap-5">
        <p className="flex justify-center text-base">
          Elige un Método de Pago con el que realizará la Compra
        </p>
        <div className="flex justify-evenly">
          <div className="tar flex flex-col items-center bg-orangePrincipal p-3 text-white rounded-md font-semibold">

            <div className="h-32 w-32 flex items-center justify-center">
              <Icon
                icon="solar:card-2-bold-duotone"
                width="100"
                height="100"
                style={{ color: "#FFF" }}
              />
            </div>
            <span>Pago por Tarjeta</span>
          </div>
          <div className="tar flex flex-col items-center bg-orangePrincipal p-3 text-white rounded-md font-semibold">
            <div className="h-32 w-32 flex items-center justify-center">
              <Icon
                icon="bx:qr"
                width="100"
                height="100"
                style={{ color: "#FFF" }}
              />{" "}
            </div>
            <span>Pago por Tarjeta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPay;
