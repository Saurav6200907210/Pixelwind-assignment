import { products } from '../data/products';



export const searchProducts = (query) => {
  if (!query) return products;
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery)
  );
};

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};
