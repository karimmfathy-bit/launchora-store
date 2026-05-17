"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ClientAddToCart({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(product)} 
      className="btn-primary text-lg px-8 py-4"
    >
      Add to Cart — ${product.price} <ShoppingCart className="w-5 h-5 ml-2" />
    </button>
  );
}
