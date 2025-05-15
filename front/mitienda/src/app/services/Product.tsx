import { ENV } from "@/config/envs";

export interface CardProps {
    id?: number;
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
    

    export const fetchHomeProducts = async () => {
        const response = await fetch(`${ENV.API_URL}/products`);
        
        if (!response.ok){
            throw new Error('Error al cargar los productos');
        }    
        return response.json();
    }
    export const fetchProductById = async (id: number) => {
        const response = await fetchHomeProducts();
    
        const products = response.find((product: CardProps) => product.id == id);
        if (!products) {
            const emptyProduct: CardProps = {
                id: 0,
                name: "",
                description: "",
                price: 0,
                stock: 0,
                image: "",
                categoryId: 0}
                return emptyProduct;
        }
        return products;
    }


    export const Product = async (): Promise<CardProps[]> => {
        return await fetchHomeProducts();
    };
    export default Product;