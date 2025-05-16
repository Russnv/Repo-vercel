import { ENV } from "@/config/envs";

export interface CardProps {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;  
    categoryId?: number; 
    category?: {
        id: number;
        name: string;
    }; 
    }  

    export const SearchProducts = async (find: string): Promise<CardProps[]> => {
        const products = await fetchHomeProducts();
        const filteredProducts = products.filter((product: CardProps) => {
            const name = product.name.toLowerCase();
            const description = product.description.toLowerCase();
            return name.includes(find.toLowerCase()) || description.includes(find.toLowerCase());
        });
    
        return filteredProducts;
    };
    

    /*export const fetchHomeProducts = async () => {
      
      try{
        const response = await fetch(`${ENV.API_URL}/products`);
        
        if (!response.ok){
            throw new Error('Error al cargar los productos');      
      }  
         const data = await response.json();
         return data;
      
      
      }catch (error) {
         console.error("Error al cargar los productos:", error); 
      }
       return [];
    }*/

       export const fetchHomeProducts = async () => {
  try {
    const response = await fetch(`${ENV.API_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`Error al cargar los productos: ${response.status}`);
    }

    const text = await response.text();
    if (!text) {
      console.warn("Respuesta vacía desde /products");
      return [];
    }

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    return [];
  }
};

  
    export const fetchProductById = async (id: string) => {
        const response = await fetchHomeProducts();
        console.log('Response: ' + JSON.stringify(response));
        const jsonRes:CardProps[] = response;
        
        //const product = jsonRes.find((product: CardProps) => product.id === id);
        const product = jsonRes.find((product: CardProps) => String(product.id) === id);


        if (!product) {
            const emptyProduct: CardProps = {
                id: "0",
                name: "",
                description: "",
                price: 0,
                stock: 0,
                image: "",
                categoryId: 0}
                return emptyProduct;
        }
        return product;
    }


    export const Product = async (): Promise<CardProps[]> => {
        return await fetchHomeProducts();
    };
    export default Product;