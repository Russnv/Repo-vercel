
'use client';
// Hook
import React, { useEffect, useState } from 'react';
//component
import {   Product} from '../context/CartContext';
import {useAuth} from '../context/userContext';


type Historials = {
  Price: number;
  Date: string;
  Products:  Product[];
};


export function addHistorial(price: number, products: Product[], uid:number) {

  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('es-ES', options).replace(/\//g, '-');

  const history: Historials = {
    Price: price,
    Date: formattedDate,
    Products: products,
  };

  const historialKey = `historial_${uid}`;
  const storedHistorial = localStorage.getItem(historialKey);

  if (!storedHistorial) {

    localStorage.setItem(historialKey, JSON.stringify([history]));
  } else {
    const parsedHistorial: Historials[] = JSON.parse(storedHistorial);
    parsedHistorial.push(history);
    localStorage.setItem(historialKey, JSON.stringify(parsedHistorial));
  } 
}


export const Historial: React.FC = () => {
  const [historial, setHistorial] = useState<Historials[]>([]);
  
  const {user, logged} = useAuth();
  

  useEffect(() => {

    console.log('Estado del usuaroi:' + logged);
    if (logged) {
      const historialKey = `historial_${user?.user.id}`;
      
      const storedHistorial = JSON.parse(localStorage.getItem(historialKey) || "[]");
      setHistorial(storedHistorial);

      console.log('Historial UseEffect' + historial);
    }
  }, []);
  
  

  return (
    logged && (
      <div className="flex flex-col items-center justify-between w-full p-24 bg-gray-100 min-w-screen">
      <h1 className="mb-10 text-4xl font-bold text-gray-800">Historial de Compras</h1>
    
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {historial.length > 0 ? (
          historial.map((entry, index) => (
            <div
              key={index}
              className="p-6 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg"
            >
              <p className="mb-2 text-sm text-gray-500">
                <strong>Fecha:</strong> {entry.Date}
              </p>
              <p className="mb-4 text-lg font-semibold text-gray-800">
                <strong>Total:</strong> ${entry.Price}
              </p>
    
              <div>
                <p className="mb-2 font-medium text-gray-700">Productos:</p>
                <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                  {entry.Products.map((product, idx) => (
                    <li key={idx}>
                      {product.name} - ${product.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay compras registradas.</p>
        )}
      </div>
    </div>
    
    )
  );
}
export default Historial;