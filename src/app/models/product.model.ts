export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
