import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const formatTitle = (slug: string) => {
  if (!slug) return "Collection";
  return decodeURIComponent(slug)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// FIX: Page component is now async
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  // FIX: Await params
  const resolvedParams = await params;
  const title = formatTitle(resolvedParams.category);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <div className="relative h-[300px] flex flex-col items-center justify-center bg-[#800020] text-center overflow-hidden">
         <div className="absolute inset-0 bg-[url('/img/slider/hero-1.jpg')] bg-cover bg-center opacity-20" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#5a0016] via-[#800020]/60 to-transparent" />
         <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#F9F7F0] drop-shadow-md">
                {title} Collection
            </h1>
            <p className="text-[#F9F7F0]/80 mt-2 text-lg">Explore our exclusive range of {title} jewellery.</p>
         </div>
      </div>

      {/* Content */}
      <main className="flex-grow container mx-auto px-4 py-24 text-center">
        <div className="max-w-lg mx-auto border border-dashed border-[#D4AF37]/30 rounded-3xl p-12 bg-[#F9F7F0]/50">
            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37]">
                <Sparkles size={40} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#800020] mb-4">
                {title} Designs Coming Soon
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
                We are curating the finest {title} pieces for you. Stay tuned!
            </p>
            <Link href="/shop">
                <Button className="bg-[#800020] text-white hover:bg-[#5a0016] px-8 py-6 rounded-full text-base">
                    <ArrowLeft size={18} className="mr-2" /> Back to All Shop
                </Button>
            </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}