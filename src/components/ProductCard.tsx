import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types/product';
import { cartService } from '../utils/cart';
import { toast } from 'react-toastify';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = () => {
    cartService.addToCart(product);
    toast.success(`${product.name} added to cart!`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="group bg-[#2D2D2D] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 font-sora">
      <div className="relative overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          {product.category}
        </span>
      </div>

      <div className="p-6 relative">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="group/add bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            <ShoppingCart size={20} className="group-hover/add:rotate-12 transition-transform duration-200" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
