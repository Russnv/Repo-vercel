"use client";

import { useEffect } from "react";
import Card from "../card-products/Card-favotitos";
import { useFavorite } from "../context/FavoriteContext";
import {useAuth} from "../context/userContext"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";




export const Favoritos: React.FC = () => {
  const { favorite, removeFavorite } = useFavorite();
  const { logged } = useAuth();
  const router = useRouter();


  useEffect(()=>{
if(!logged){
  toast('❌Necesitas estar logueado para ver favoritos');
  router.push('/login');
}
  },[logged])

  const handleDeleteProduct = (prodId: number) => {
    removeFavorite(prodId);
  };

 
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {logged ? (
        favorite.map((product) => (
          <Card
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            stock={product.stock}
            img={product.img}
            id={product.id}
            onDelete={handleDeleteProduct}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Cargando...</p>
      )}
    </div>
  );
};

export default Favoritos;
