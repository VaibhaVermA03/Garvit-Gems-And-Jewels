"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/store";
import { dedupedFetch } from "@/lib/fetch";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductSectionProps {
  title: string;
  limit?: number;
}

export default function ProductSection({
  title,
  limit = 8,
}: ProductSectionProps) {
  // --- LOGIC STARTS (UNCHANGED) ---
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent duplicate calls in React Strict Mode
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchProducts = async () => {
      try {
        const data = await dedupedFetch<{ success: boolean; data: Product[] }>('/api/products?limit=8');
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  // --- LOGIC ENDS ---

  return (
    <section className="py-20 bg-white">
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
            Discover Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#800020] mb-6 capitalize">
            {title}
          </h2>
           {/* Decorative Divider */}
           <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-2 h-2 rotate-45 bg-[#800020]" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </motion.div>

        {/* --- CONTENT --- */}
        {loading ? (
          // Updated Skeleton to match styling
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(limit)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4">
                 <div className="aspect-[3/4] bg-gray-100 animate-pulse rounded-t-xl" />
                 <div className="h-4 bg-gray-100 animate-pulse w-3/4 mx-auto rounded" />
                 <div className="h-4 bg-gray-100 animate-pulse w-1/2 mx-auto rounded" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10">
              <p className="text-xl text-gray-400 font-serif">Our artisans are crafting new pieces.</p>
              <p className="text-sm text-gray-400 mt-2">Check back soon for {title}.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.slice(0, limit).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {/* Product Card Container with Hover Lift */}
                <div className="transition-transform duration-500 group-hover:-translate-y-2">
                    <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer Button if needed */}
        {!loading && products.length > 0 && (
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