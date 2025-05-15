"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CardProps } from "../services/Product";
import Image from "next/image";

import { useCart, Product } from "../context/CartContext";
import { useFavorite, FavoriteProduct } from "../context/FavoriteContext";

import toast from "react-hot-toast";
import { useAuth } from "../context/userContext";

export const Card: React.FC<CardProps> = ({
  name,
  description,
  price,
  stock,
  image,
  id,
}) => {
  const [count, setCount] = React.useState(0);
  const { addProduct, removeProduct } = useCart();
  const { addFavorite } = useFavorite();
  const { logged } = useAuth();

  useEffect(() => {}, []);

  const handleAddToCart = () => {
    if (logged) {
      if (id !== undefined) {
        const product: Product = {
          id: id,
          name: name,
          price: price,
          img: image,
        };
        addProduct(product);
        setCount(1);
      }
    } else {
      toast("❌Debes iniciar sesión para agregar al carrito😢");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
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

  function AgregarFavorito() {
    if (logged) {
      if (id === undefined) {
        toast.error("No se puede agregar a favoritos: ID no definido");
        return;
      }

      const productToAdd: FavoriteProduct = {
        id: id,
        name: name,
        description: description,
        price: price,
        stock: stock,
        img: image,
      };
      if (addFavorite(productToAdd)) {
        toast("✅ Se agrego a Favoritos");
      }
    } else {
      toast("❌Debes iniciar sesión para agregar a favoritos");
       setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }

  return (
    <div className="relative flex flex-col p-4 bg-white border border-gray-300 rounded-lg shadow-md w-[250px]">
      <div className="self-end mb-2 cursor-pointer">
        <Image
          onClick={AgregarFavorito}
          src="/logofavorito.png"
          alt="Agregar a favoritos"
          width={40}
          height={30}
        />
      </div>

      <div className="w-full h-[180px] flex items-center justify-center overflow-hidden mb-4">
        <Image
          src={image}
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
      </div>
    </div>
  );
};

export default Card;
