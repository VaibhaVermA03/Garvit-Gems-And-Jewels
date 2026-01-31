import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-[#800020] text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 text-center">
          {/* Changed Heading Color to Beige */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-[#F9F7F0]">
            Our Legacy
          </h1>
          <p className="text-xl font-light tracking-wider text-[#F9F7F0]/90">
            CRAFTING ELEGANCE SINCE 2007
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-20 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-[#800020] mb-8">A Tradition of Trust</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
                Born from a passion for timeless beauty, our brand represents the pinnacle of Indian craftsmanship. 
                Every piece of jewellery we create is a labor of love, designed to be cherished for generations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                    { title: "Purity", desc: "100% BIS Hallmarked Gold & Certified Diamonds." },
                    { title: "Craftsmanship", desc: "Handcrafted by master artisans from Jaipur & Bengal." },
                    { title: "Transparency", desc: "Fair pricing with a complete breakdown of costs." }
                ].map((item, i) => (
                    <div key={i} className="p-8 border border-[#D4AF37]/30 rounded-xl bg-[#F9F7F0]">
                        <h3 className="text-2xl font-serif font-bold text-[#800020] mb-4">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}