"use client";

import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { Check, ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";

function ProductPageSkeleton() {
    return (
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-16">
             <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                <div>
                    <Skeleton className="aspect-square w-full rounded-xl" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-12 w-1/2" />
                </div>
            </div>
        </div>
    )
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const fetchedProduct = await getProductBySlug(params.slug);
      setProduct(fetchedProduct || null);
      setLoading(false);
    };
    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <ProductGallery images={[{ src: product.image, alt: product.name }]} />
        </div>
        <div className="flex flex-col">
          <h1 className="font-headline text-3xl font-bold tracking-tight lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold">${product.price.toFixed(2)}</p>
          <div className="mt-6 space-y-4 text-base text-muted-foreground">
            <p>{product.description}</p>
          </div>
          <div className="mt-8">
             <Button 
                size="lg" 
                variant={added ? "secondary" : "gold"} 
                onClick={handleAddToCart}
                disabled={added}
                className="w-full sm:w-auto"
                aria-label={added ? "Added to cart" : "Add to cart"}
            >
                {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
                <span className="ml-2">{added ? "Added to Cart" : "Add to Cart"}</span>
            </Button>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
        </div>
      </div>
    </div>
  );
}
