import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatTitle = (slug: string) => {
  if (!slug) return "Collection";
  return decodeURIComponent(slug)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default async function SubCategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string, subcategory: string }> 
}) {
  const resolvedParams = await params;
  
  const title = formatTitle(resolvedParams.subcategory);
  const parentCategory = formatTitle(resolvedParams.category);
  
  // Back link points to Main Shop page with category filter
  const backLink = `/shop?category=${resolvedParams.category}`;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* --- HERO BANNER --- */}
      <div className="relative h-[300px] flex flex-col items-center justify-center bg-[#800020] text-center overflow-hidden">
         
         {/* FIX: Updated Background Image to hero-3.avif */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: "url('/img/slider/3.jpg')" }}
         />

         {/* Gradient Overlay for text readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#5a0016] via-[#800020]/60 to-transparent" />
         
         <div className="relative z-10 px-4">
            <div className="text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-2">
                {parentCategory} Collection
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#F9F7F0] drop-shadow-md">
                {title}
            </h1>
         </div>
      </div>

      {/* --- CONTENT --- */}
      <main className="flex-grow container mx-auto px-4 py-24 text-center">
        <div className="max-w-lg mx-auto border border-dashed border-[#D4AF37]/30 rounded-3xl p-12 bg-[#F9F7F0]/50">
            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37]">
                <Clock size={40} />
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-[#800020] mb-4">
                Coming Soon
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
                We are currently curating the finest <strong>{title}</strong> for you. 
                These exclusive pieces will be available for purchase very soon.
            </p>

            <Link href={backLink}>
                <Button className="bg-[#800020] text-white hover:bg-[#5a0016] px-8 py-6 rounded-full text-base">
                    <ArrowLeft size={18} className="mr-2" /> Back to Shop
                </Button>
            </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}