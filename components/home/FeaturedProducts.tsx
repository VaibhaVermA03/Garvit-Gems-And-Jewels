"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const displayProducts = products || [];

  return (
    <section className="py-20 bg-[#F9F7F0]">
      <div className="container mx-auto px-4">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-3">
            Handpicked For You
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#800020] mb-6">
            Featured Collection
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-2 h-2 rotate-45 bg-[#800020]" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* --- CHANGE 3: Grid Limit Increased to 8 --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Pehle slice(0,4) tha, ab slice(0,8) kar diya */}
          {displayProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="transition-all duration-500 hover:-translate-y-2">
                <ProductCard product={product} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- CHANGE 4: Button Style Updated (Like ProductSection) --- */}
        <div className="text-center mt-16">
            <Button 
                variant="link" 
                className="text-[#800020] hover:text-[#D4AF37] text-lg font-serif decoration-[#D4AF37]" 
                asChild
            >
                <Link href="/shop">View All Featured Products &rarr;</Link>
            </Button>
        </div>

      </div>
    </section>
  );
}