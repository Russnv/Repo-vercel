import Card from "@/app/card-products/Card";
import { SearchProducts } from "../../../services/Product";


//export default async function Products({ params }: { params: { id: string } }) {
//export default async function Products({ params }: Props) {
export default async function Products({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await  params;
  
  const searchTerm = decodeURIComponent(id);
  console.log('Estoy por buscar el producto: ' + searchTerm);

  const products = await SearchProducts(searchTerm);

  return (
    
    <main className="flex flex-col items-center justify-between w-full min-h-screen p-24 bg-gray-100">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">

        {products.map((product) => (
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
    </main>
  )
}
