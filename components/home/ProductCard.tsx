"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
// --- FIX 1: Import type from Prisma Client ---
import { Product } from "@prisma/client";

interface ProductCardProps {
  product: Product;
}

// --- FIX 2: Helper to prevent Image Crash ---
const getImageUrl = (image: string | null) => {
  if (!image) return "/placeholder.jpg";
  if (image.startsWith("http") || image.startsWith("/")) {
    return image;
  }
  return `/${image}`;
};

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  // 'as any' fix: Store aur Prisma ke types slight match nahi karte kabhi kabhi
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const [wishlistClicked, setWishlistClicked] = useState(false);

  const handleWishlistClick = () => {
    addToWishlist(product as any);
    setWishlistClicked(true);
    setTimeout(() => setWishlistClicked(false), 500);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product as any);
      toast.success(`${product.name} added to cart!`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <Image
              // --- FIX 3: Using helper function here ---
              src={getImageUrl(product.image)}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>
          
          {/* Sale Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded z-10"
            >
              SALE
            </motion.div>
          )}

          {/* Wishlist Button */}
          <motion.div
            className="absolute top-2 right-2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            animate={wishlistClicked ? { scale: [1, 1.3, 1] } : {}}
          >
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/90 backdrop-blur-sm hover:bg-background"
              onClick={handleWishlistClick}
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-all",
                  isInWishlist && "fill-primary text-primary"
                )}
              />
            </Button>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.div
            className="absolute bottom-2 left-2 right-2 z-10"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          {product.rating ? (
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating!) ? "fill-primary text-primary" : "text-muted"
                  )}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.rating})
              </span>
            </div>
          ) : null}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">₹{String(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{String(product.originalPrice)}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}