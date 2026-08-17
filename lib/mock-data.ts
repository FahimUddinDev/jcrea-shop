export type Category = "Laptops" | "Accessories";

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  stock: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "MacBook Pro M2",
    category: "Laptops",
    price: 2499,
    stock: 8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Logitech MX Master 3",
    category: "Accessories",
    price: 99,
    stock: 0,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Dell XPS 15",
    category: "Laptops",
    price: 1899,
    stock: 3,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
  },
];

// Derived stock status helper — used by both API and UI so the rule
// (0 = out of stock, <5 = low stock, >=5 = normal) lives in one place.
export type StockStatus = "out" | "low" | "normal";

export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return "out";
  if (stock < 5) return "low";
  return "normal";
}
