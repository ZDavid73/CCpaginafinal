import React, { useState, useEffect, useCallback } from 'react';
import { Key, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import LoginModal from '../components/LoginModal';
import type { Product } from '../types/product';
import { productService } from '../utils/supabase';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      applyFilters();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, products]);

  const applyFilters = useCallback(() => {
    let results = products;
    
    if (selectedCategory) {
      results = results.filter((product) => product.category === selectedCategory);
    }
    
    if (searchTerm.trim()) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(results);
  }, [products, selectedCategory, searchTerm]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 gap-6">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Catálogo Completo</h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Todos los productos disponibles (TCG, Juegos de mesa, Miniaturas, etc.)
            </p>
          </div>

          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors self-start lg:self-center"
            aria-label="Login de propietario"
          >
            <Key className="h-5 w-5" />
            <span>Propietario</span>
          </button>
        </div>

<div className="mb-12">
  <div className="relative max-w-2xl mx-auto"> 
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/70 transition-colors duration-200 pointer-events-none" />
    <input
      type="text"
      placeholder="Buscar productos por nombre..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="group w-full pl-12 pr-5 py-3.5 bg-[#0f0f0f] border-2 border-primary/100 hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-2xl text-white placeholder-gray-500 text-base font-normal transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
    />
  </div>
  {searchTerm && (
    <p className="text-sm text-gray-400 text-center mt-2">
      Mostrando resultados para: "<span className="text-primary">{searchTerm}</span>"
    </p>
  )}
</div>
        <div className="flex flex-col lg:flex-row gap-12 products-custom-grid">
          <div className="w-full lg:w-64 lg:flex-shrink-0 lg:sticky lg:top-28 self-start lg:min-h-[500px]">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div className="flex-1 min-h-[600px]">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <span className="text-3xl">🛒</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-300 mb-4">
                  Sin productos
                </h2>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                  No hay productos disponibles {selectedCategory && `en la categoría "${selectedCategory}"`}.
                  {searchTerm && ` Intenta con otro término de búsqueda.`}
                </p>
              </div>
            ) : (
              <div className="grid gap-12 grid grid-cols-1 md:grid-cols-2 custom-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.uuid} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Products;
