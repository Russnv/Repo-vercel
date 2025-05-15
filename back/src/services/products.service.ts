import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};

export const getProductsService = async (): Promise<Product[]> => {
  return await ProductRepository.find();
};




// Suponiendo que ProductRepository es un repositorio de TypeORM y Product es tu entidad
//export const getProductsServiceById = async (id: number): Promise<Product | null> => {
//  return await ProductRepository.findOneBy({ id });  // findOneBy es adecuado para obtener un solo producto por su id
//};
