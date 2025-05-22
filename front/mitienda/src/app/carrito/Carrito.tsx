"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
//import { ENV } from "@/config/envs";
import { useAuth } from "../context/userContext";
import { useCart } from "../context/CartContext";
import { addHistorial } from "../historial/Historial";
import { useRouter } from "next/navigation";
import { newOrder } from "../services/orders";

export const Carrito: React.FC = () => {
  const { user, logged } = useAuth();
  const { cart, removeProduct, productsId, getCart, clearCart } = useCart();
  const [deleteproduct, setDeleteproduct] = useState<number | null>(null);
  const router = useRouter();

  const handleCompra = async () => {
    const userId: number = user?.user.id || 0;
    const token = user?.token;
    const products = productsId;

    if (cart.length > 0) {
      try {
        const order = await newOrder(
          products,
          userId,
          token || "token not found"
        );

        if (!order) {
          throw new Error("Error en la compra");
        }

        const total = cart.reduce(
          (accumulator, currentValue) => accumulator + currentValue.price,
          0
        );

        addHistorial(total, cart, userId);
        clearCart();

        toast.success("✅ ¡Compra realizada con éxito!");
      } catch (error) {
        console.error("Error al realizar la compra:", error);
        toast.error("❌ Error al realizar la compra");
      }
    }
  };

  const handleDelete = (id: number) => {
    removeProduct(id);
  };

  useEffect(() => {
    if (!logged) {
      toast("❌Debes iniciar sesión para agregar al carrito😢");
      router.push("/login");
    }
    getCart();
  }, [logged]);

  return (
    logged && (
      <div className="w-full max-w-screen-lg p-4 mx-auto">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">Carrito</h1>
          <p className="mb-4 text-lg text-gray-600">
            Tenés {cart.length} productos en tu carrito
          </p>

          {cart.length > 0 ? (
            <div className="w-full max-w-2xl space-y-4">
              {cart.map((producto, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white rounded shadow"
                >
                  <Image
                    src={producto.img}
                    alt={producto.name}
                    width={80}
                    height={80}
                    className="object-cover w-20 h-20 mr-4 rounded"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{producto.name}</h2>
                    <p className="text-gray-600">${producto.price}</p>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => {
                        setDeleteproduct(producto.id);
                        document
                          .getElementById("popup-modal")
                          ?.classList.remove("hidden");
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <i className="mr-2 fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}

              <div
                id="popup-modal"
                tabIndex={-1}
                className="absolute inset-0 z-50 flex items-center justify-center hidden"
              >
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-700">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      ¿Estás seguro de que deseas eliminar este producto?
                    </h3>
                    <button
                      onClick={() => {
                        if (deleteproduct !== null) {
                          handleDelete(deleteproduct);
                          setDeleteproduct(null);
                        }
                        document
                          .getElementById("popup-modal")
                          ?.classList.add("hidden");
                      }}
                      className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                    >
                      Sí, eliminar
                    </button>
                    <button
                      onClick={() => {
                        setDeleteproduct(null);
                        document
                          .getElementById("popup-modal")
                          ?.classList.add("hidden");
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      No, cancelar
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between p-4 bg-white rounded shadow">
                <h2 className="text-lg font-semibold">Total:</h2>
                <p className="text-lg font-semibold">
                  ${cart.reduce((total, producto) => total + producto.price, 0)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-lg text-gray-600">Tu carrito está vacío.</p>
          )}

          <div className="mt-4">
            <button
              onClick={handleCompra}
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              {cart.length > 0 ? "Realizar Compra" : "Carrito Vacio"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Carrito;
