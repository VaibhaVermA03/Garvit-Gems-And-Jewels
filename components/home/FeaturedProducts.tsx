"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { mockProducts } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturedProducts() {
  // Logic remains exactly same
  const featuredProducts = mockProducts.slice(0, 6);

  return (
    <section className="py-20 bg-[#F9F7F0]"> {/* Beige Background */}
      <div className="container mx-auto px-4">
        
        {/* --- ORNAMENTAL HEADER --- */}
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
          
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-2 h-2 rotate-45 bg-[#800020]" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* --- GRID (Styled) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Wrapping ProductCard to add extra lift effect */}
              <div className="transition-all duration-500 hover:-translate-y-2">
                <ProductCard product={product} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button (Optional Aesthetic Add-on) */}
        <div className="text-center mt-12">
            <Button variant="outline" className="border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white rounded-full px-8 uppercase tracking-widest" asChild>
                <Link href="/shop">View All Featured</Link>
            </Button>
        </div>

      </div>
    </section>
  );
}