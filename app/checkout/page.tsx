"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleWhatsAppOrder = () => {
    const total = getCartTotal().toFixed(2);
    const itemsText = cartItems
      .map((item) => `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`)
      .join("\n");

    const message = `Hello Capsule Corp TCG, I'd like to place an order:\n\n${itemsText}\n\n*Total: $${total}*`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  if (!isClient) {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-16">
             <Card>
                <CardHeader>
                    <CardTitle>Loading...</CardTitle>
                </CardHeader>
            </Card>
        </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-16 text-center">
        <h1 className="font-headline text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-muted-foreground">You can't check out with an empty cart.</p>
        <Button asChild className="mt-6">
          <Link href="/">Go Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-16">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                   <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                </div>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <Separator />
           <div className="flex justify-between text-lg font-bold">
            <p>Total</p>
            <p>${getCartTotal().toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="gold" size="lg" className="w-full" onClick={handleWhatsAppOrder}>
            Complete Order on WhatsApp
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
