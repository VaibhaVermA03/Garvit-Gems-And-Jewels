import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Home } from "lucide-react"; // Icon add kiya hai better look ke liye

export default function NotFound() {
  return (
    // Added 'bg-white' here
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          
          {/* 404 Heading - Maroon & Serif */}
          <h1 className="text-9xl font-serif font-bold text-[#800020] mb-2 opacity-10 select-none">
            404
          </h1>
          
          <div className="-mt-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#800020] mb-4">
              Page Not Found
            </h2>
            
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              We looked everywhere for this page. Are you sure the website URL is correct?
            </p>

            {/* Button - Royal Style */}
            <Button 
              asChild
              className="bg-[#800020] hover:bg-[#5a0016] text-white px-8 py-6 rounded-full uppercase tracking-wider text-xs font-bold shadow-lg"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home size={16} /> Go Home
              </Link>
            </Button>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}