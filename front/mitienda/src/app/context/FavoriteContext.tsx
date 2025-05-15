"use client";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  ReactNode,
} from "react";
import {useAuth} from './userContext'

export type FavoriteProduct = {
  id: number;
  name: string;
  description:string,
  price: number;
  stock:number;
  img: string;
};



export type FavoriteContextType = {
  favorite: FavoriteProduct[];
  addFavorite: (product: FavoriteProduct) => boolean;
  removeFavorite: (id: number) => boolean;  

};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorite, setFavorite] = useState<FavoriteProduct[]>([]);
  const {user} = useAuth();


  const addFavorite = (product: FavoriteProduct): boolean => {
    const exists = favorite.find(p => p.id === product.id);
    if (exists) return false;

    const updatedFavorite = [...favorite, product];    
    setFavorite(updatedFavorite);
    localStorage.setItem(`favorite_${user?.user.id}`, JSON.stringify(updatedFavorite));
    return true;
  };


  const removeFavorite = (id: number): boolean => {
    const exists = favorite.find(p => p.id === id);
    if (!exists) return false;

    const updatedFavorite = favorite.filter(p => p.id !== id);
    setFavorite(updatedFavorite);
    localStorage.setItem(`favorite_${user?.user.id}`, JSON.stringify(updatedFavorite));
    return true;
  };


  useEffect(() => {
    
  }, [favorite]);

  return (
    <FavoriteContext.Provider value={{favorite,addFavorite,removeFavorite}}>
      {children}
    </FavoriteContext.Provider>
  );

};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};