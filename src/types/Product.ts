export interface Product {
    id: string;
    title: string;
    subtitle?: string;
    price?: number;
    currentprice: number;
    image: string;
    quantity: number; 
    stock: number; 
    slug?: string; 
    discount?: number;
    new?: string;
  }