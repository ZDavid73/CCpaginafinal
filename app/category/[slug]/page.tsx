"use client";

import { useEffect, useState } from "react";
import type { Product, Category } from "@/lib/types";
import { getProducts, getCategories } from "@/lib/data";
import { ProductList } from "@/components/products/ProductList";
import { Skeleton } from "@/components/ui/skeleton";

function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts(params.slug);
      const allCategories = await getCategories();
      const currentCategory = allCategories.find(c => c.slug === params.slug);
      
      setProducts(fetchedProducts);
      setCategory(currentCategory || null);
      setLoading(false);
    };
    fetchProducts();
  }, [params.slug]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-16">
      <div className="mb-12">
        {loading ? (
            <Skeleton className="h-10 w-1/3" />
        ) : (
             <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                {category?.name || "Products"}
            </h1>
        )}
      </div>
      {loading ? <ProductGridSkeleton /> : <ProductList products={products} />}
    </div>
  );
}
