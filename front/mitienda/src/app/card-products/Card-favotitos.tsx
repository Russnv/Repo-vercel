"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {useCart,Product} from '../context/CartContext';
import {FavoriteProduct} from '../context/FavoriteContext';

import toast from "react-hot-toast";

export const Card: React.FC<FavoriteProduct & { onDelete?: (id: number) => void }> = ({
  name,
  description,
  price,
  stock,
  img,
  id,
  onDelete
  
}) => {
  const [count, setCount] = React.useState(0);
  const {addProduct, removeProduct} = useCart();
 
 

  const handleAddToCart = () => {
      const product: Product = {
        id: id,
        name: name,
        price: price,
        img: img
      };
      addProduct(product);
      setCount(1);

  };

  const handleIncrease = () => {
    if (count == 0) setCount((prev) => prev + 1);
    toast("❌No se puede agregar mas de 1 producto lo lamentamos😢");
  };

  const handleDecrease = (id: number) => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      removeProduct(id);
    }
  };



  return (
    <div className="relative flex flex-col p-4 bg-white border border-gray-300 rounded-lg shadow-md w-[250px]">
      <div className="self-end mb-2 cursor-pointer">

      </div>

      <div className="w-full h-[180px] flex items-center justify-center overflow-hidden mb-4">
        <Image
          src={img}
          alt={name}
          width={200}
          height={200}
          className="object-contain max-w-full max-h-full"
        />
      </div>

      <div className="flex flex-col items-center flex-grow text-center">
        <h2 className="text-lg font-bold text-green-600">{name}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="mt-2 text-xl font-semibold text-green-600">${price}</p>
        <p className="text-gray-500">Stock: {stock}</p>
      </div>

      <div className="flex flex-wrap justify-between gap-2 mt-4">
        {count === 0 ? (
          <button
            className="px-2 py-1 text-white transition bg-green-600 rounded-md hover:bg-green-700"
            onClick={handleAddToCart}
          >
            Añadir al Carrito
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 text-green-600 border border-green-600 rounded hover:bg-green-100"
              onClick={() => handleDecrease(id ?? 0)}
            >
              -
            </button>
            <span className="text-lg font-semibold">{count}</span>
            <button
              className="px-2 py-1 text-green-600 border border-green-600 rounded hover:bg-green-100"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        )}

        <Link href={`/productos/${id}`}>
          <button className="px-2 py-1 text-green-600 transition border border-green-600 rounded-md hover:bg-green-100">
            Ver Detalles
          </button>
        </Link>
        <div className="ml-auto">
          <button
            onClick={() => onDelete?.(id ?? 0)}
            className="text-red-600 hover:text-red-800"
          >
            <i className="mr-2 fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
