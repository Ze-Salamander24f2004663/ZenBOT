export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  popular: boolean;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  popular: boolean;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Premium Cloud Storage Pro',
    price: 1,
    description: '10GB of secure cloud storage with advanced encryption and 24/7 access',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Storage',
    popular: true
  },
  
];

export const services: Service[] = [
  // Example service object
  // {
  //   id: 's1',
  //   name: 'Cloud Backup Service',
  //   price: 5,
  //   description: 'Automated cloud backup for your important files.',
  //   image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
  //   category: 'Backup',
  //   popular: true
  // }
];

export const getAllPopularItems = () => {
  const popularProducts = products.filter(p => p.popular);
  const popularServices = services.filter(s => s.popular);
  return [...popularProducts, ...popularServices].slice(0, 5);
};