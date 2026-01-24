"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { Check, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Card className="flex h-full w-full flex-col overflow-hidden rounded-lg border-border/60 transition-all hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="border-b p-0">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square relative w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4">
         <Link href={`/products/${product.slug}`}>
          <CardTitle className="text-base font-semibold leading-snug tracking-tight hover:text-primary">
            {product.name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
        <Button 
          size="sm"
          variant={added ? "secondary" : "default"} 
          onClick={handleAddToCart}
          disabled={added}
          aria-label={added ? "Added to cart" : "Add to cart"}
        >
          {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">{added ? "Added" : "Add to Cart"}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
