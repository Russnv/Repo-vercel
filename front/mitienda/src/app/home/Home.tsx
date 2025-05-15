import Card from "@/app/card-products/Card";
import { Product } from "../services/Product";
import Carousel from "../../component/Carousel";
import Link from "next/link";


export default async function Home() {
  const products = await Product();

  return (
    
    <main className="flex flex-col items-center justify-between w-full min-h-screen p-24 bg-gray-100">
      
      <div className="flex flex-col items-center justify-center bg-gray-100 min-w-screen">
        <h1 className="mb-4 text-4xl font-bold">Bienvenidos A Mi Tienda</h1>
        <p className="mb-8 text-lg">Todo lo que necesites en un solo lugar😉</p>
        <Carousel />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {products.slice(0, 4).map((product) => (
            <Card
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              image={product.image}
              id={product.id}
            />
          ))}
      
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <Link href="/productos" className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
            Ver Todos los Productos
          </Link>
      </div>
      </div>
    </main>
  )
}
