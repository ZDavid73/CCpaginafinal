// src/pages/Landing.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';
import { mockProducts } from '../utils/supabase';

const Landing: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  useEffect(() => {
    // aquí luego cambias mockProducts por tu llamada real a Supabase
    const visible = mockProducts.filter(p => !p.is_hidden);
    // por ejemplo, mostrar las últimas 6 cartas
    const sorted = [...visible].sort((a, b) =>
      (b.created_at ?? '').localeCompare(a.created_at ?? '')
    );
    setLatestProducts(sorted.slice(0, 6));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Cartas recientes
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Mira las últimas cartas que han salido en la tienda. Entra a Products para ver todo el catálogo.
          </p>
        </section>

        <section>
          {latestProducts.length === 0 ? (
            <p className="text-gray-400 text-center">
              Aún no hay cartas disponibles.
            </p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {latestProducts.map(product => (
                <ProductCard key={product.uuid} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
