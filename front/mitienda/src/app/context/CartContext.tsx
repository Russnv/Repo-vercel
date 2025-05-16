"use client";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./userContext";

export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
};

export type CartContextType = {
  cart: Product[];
  addProduct: (product: Product) => boolean;
  removeProduct: (id: number) => boolean;
  clearCart: () => void;
  productsId: number[];
  getCart: () => Product[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [productsId, setProductsId] = useState<number[]>([]);

  const { getUser } = useAuth();

  const addProduct = (product: Product): boolean => {
    const uid = getUser().user.id;
    const exists = cart.find((p) => p.id === product.id);
    if (exists) return false;

    const updatedCart = [...cart, product];
    setCart(updatedCart);

    localStorage.setItem(`cart_${uid}`, JSON.stringify(updatedCart));
    return true;
  };

  const removeProduct = (id: number): boolean => {
    const uid = getUser().user.id;
    const exists = cart.find((p) => p.id === id);
    if (!exists) return false;

    const updatedCart = cart.filter((p) => p.id !== id);
    setCart(updatedCart);
    localStorage.setItem(`cart_${uid}`, JSON.stringify(updatedCart));
    return true;
  };

  const clearCart = () => {
    const uid = getUser().user.id;
    setCart([]);
    localStorage.removeItem(`cart_${uid}`);
  };

  const getCart = (): Product[] => {
    if (getUser().user.id) {
      const uid = getUser().user.id;
      const storedCart = JSON.parse(
        localStorage.getItem(`cart_${uid}`) || "[]"
      );
      console.log(`GET CART:  cart_${uid}`);
      setCart(storedCart);
      return storedCart;
    }
    return [];
  };

  const getArrayProducts = (): number[] => {
    const tmp: number[] = [];
    cart.forEach((element) => {
      tmp.push(element.id);
    });
    setProductsId(tmp);
    return tmp;
  };

  useEffect(() => {
    getArrayProducts();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        clearCart,
        productsId,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
