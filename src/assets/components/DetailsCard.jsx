// import React from "react";


const DetailsCard = () => {
  return (
    <div className="border rounded-md p-6 bg-beige w-[100%] max-w-md mx-auto">
      <h3 className="font-bold text-2xl text-orangePrincipal mb-4 text-center">
        Detalles de la Tarjeta
      </h3>
      <p className="text-center text-gray-700 mb-6">
        Por favor, ingresa los datos de tu tarjeta para completar la compra.
      </p>
      <div className="flex flex-col gap-1">
        {/* Número de tarjeta */}
        <div>
          <label className="block font-semibold text-gray-600 mb-1">
            Número de la Tarjeta
          </label>
          <input
            type="text"
            name="card-number"
            id="card-number"
            placeholder="1234 5678 9012 3456"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Fecha de expiración */}
        <div className="flex justify-between ">
          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Mes que Expira
            </label>
            <select
              name="month"
              id="month"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-600 mb-1">
              Año que Expira
            </label>
            <select
              name="year"
              id="year"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={2024 + i}>
                  {2024 + i}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CVV */}
        <div>
          <label className="block font-semibold text-gray-600 mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            id="cvv"
            placeholder="123"
            className="w-24 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Botón de Confirmar */}
        <button className="w-full bg-orange-500 text-white rounded-md py-3 mt-4 hover:bg-orange-600 transition duration-300">
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default DetailsCard;
