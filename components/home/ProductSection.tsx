"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
// --- FIX: Import from Prisma Client instead of Store ---
import { Product } from "@prisma/client"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductSectionProps {
  title: string;
  products: Product[]; // Ab ye Database wala type accept karega
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  const displayProducts = products || [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase block mb-3">
            Discover Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#800020] mb-6 capitalize">
            {title}
          </h2>
           <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-2 h-2 rotate-45 bg-[#800020]" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-10">
              <p className="text-xl text-gray-400 font-serif">Our artisans are crafting new pieces.</p>
              <p className="text-sm text-gray-400 mt-2">Check back soon for {title}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="transition-transform duration-500 group-hover:-translate-y-2">
                    <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {displayProducts.length > 0 && (
             <div className="text-center mt-16">
             <Button variant="link" className="text-[#800020] hover:text-[#D4AF37] text-lg font-serif decoration-[#D4AF37]" asChild>
                 <Link href="/shop">Explore All {title} &rarr;</Link>
             </Button>
         </div>
        )}

      </div>
    </section>
  );
}