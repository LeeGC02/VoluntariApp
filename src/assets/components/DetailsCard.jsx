// import React from 'react'

const DetailsCard = () => {
  return (
    <div>
      <h3 className="font-extrabold text-xl">Detalles de la Tarjeta</h3>
      <p>Ingrese los datos de la Tarjeta</p>
      <div className="flex flex-col items-center justify-center bg-red-200 w-full gap-5">
        <div className="flex flex-col">
          <h4 className=" font-semibold text-center">Número de la Tarjeta</h4>
          <input
            className="w-44"
            type="number"
            name="card-number"
            id="card-number"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <h4 className=" font-semibold text-center">Mes de Expiración</h4>
            <select name="month" id="month" required className="w-fit">
              <option value="enero">01</option>
              <option value="enero">02</option>
              <option value="enero">03</option>
              <option value="enero">04</option>
              <option value="enero">05</option>
              <option value="enero">06</option>
              <option value="enero">07</option>
              <option value="enero">08</option>
              <option value="enero">09</option>
              <option value="enero">10</option>
              <option value="enero">11</option>
              <option value="enero">12</option>
            </select>
          </div>
          <div className="flex flex-col">
            <h4 className=" font-semibold text-center">Año de Expiración</h4>
            <select name="month" id="month" required className="w-fit">
              <option value="enero">2024</option>
              <option value="enero">2025</option>
              <option value="enero">2026</option>
              <option value="enero">2027</option>
              <option value="enero">2028</option>
              <option value="enero">2029</option>
              <option value="enero">2030</option>
            </select>
          </div>
          <div className="flex flex-col">
            <h4 className=" font-semibold text-center">CVV</h4>
            <input type="number" name="cvv" id="cvv" placeholder="123" required className="w-12" />
          </div>
        </div>
        <button className="border p-2 rounded-xl bg-orangePrincipal text-white hover:bg-white hover:text-orangePrincipal">Confirmar</button>
      </div>
    </div>
  );
};

export default DetailsCard;
