import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductSection from "@/components/home/ProductSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Newsletter from "@/components/home/Newsletter";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {

  const newProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 12, 
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <ProductSection title="New Products" products={newProducts} />
        
        <FeaturedProducts products={newProducts.slice(0, 8)} />
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}