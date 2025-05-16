
import React from "react";
import Card from "@/app/card-products/Card-detail";
import { fetchProductById} from "../../services/Product";


export default async function Details({ params }: { params: { id: string } }) {
  const { id } = await params;                      
  const idNumber: number = Number(id); 
  const products = await fetchProductById (idNumber);



  const countProducts = Object.keys(products).length;
    if (countProducts == 0) {
        return <div>Loading...</div>;
    }
    if(products.id == 0) {
        return <div>Producto no encontrado 
          <img src="/noEncontrado.jpg" alt="" />
        </div>;
    }


  return (
    
    <main className="flex flex-col items-center justify-between w-full min-h-screen p-24 bg-gray-100">
        <div className="flex justify-center bg-white">
            <Card 
              key={products.id}
              name={products.name}
              description={products.description}
              price={products.price}
              stock={products.stock}
              image={products.image}
              id={products.id}
            />
        </div>
    </main>
  )
}
