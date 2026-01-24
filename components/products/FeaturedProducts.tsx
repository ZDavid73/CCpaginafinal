"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { getFeaturedProducts } from "@/lib/data";
import { ProductList } from "./ProductList";
import { Skeleton } from "@/components/ui/skeleton";

function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                 <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[250px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const featuredProducts = await getFeaturedProducts();
      setProducts(featuredProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Check out our hand-picked selection of the hottest TCG items.
          </p>
        </div>
        {loading ? <ProductGridSkeleton /> : <ProductList products={products} />}
      </div>
    </section>
  );
}
