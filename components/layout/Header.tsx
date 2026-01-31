"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Heart, ShoppingCart, User, Camera, Mic, ChevronDown, Loader2, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useAuthStore } from "@/lib/store";
import { Product } from "@/lib/store";
import { dedupedFetch } from "@/lib/fetch";
import { cn } from "@/lib/utils";

// --- NAVIGATION DATA (Fixed URLs) ---
// 1. href: Main Shop Page par le jayega (query params ke saath)
// 2. slug: Dropdown links banane ke kaam aayega (/shop/slug/subcategory)
const NAV_ITEMS = [
  { 
    label: "All Jewellery", 
    href: "/shop", 
    slug: "all-jewellery",
    dropdown: ["Finger Rings", "Nose Pins", "Bangles", "Earrings", "Mangalsutra", "Bracelets", "Necklace", "Pendants", "Chains"] 
  },
  { 
    label: "Gold", 
    href: "/shop?category=gold", 
    slug: "gold",
    dropdown: ["Gold Earrings", "Gold Rings", "Gold Nose Pins", "Gold Bangles", "Gold Chains", "Gold Engagement Rings", "Gold Kadas", "Gold Bracelets", "Gold Pendants", "Gold Necklaces", "Gold Mangalsutras"] 
  },
  { 
    label: "Diamond", 
    href: "/shop?category=diamond", 
    slug: "diamond",
    dropdown: ["Diamond Earrings", "Diamond Necklace Set", "Diamond Pendants", "Diamond Bangles", "Diamond Rings", "Diamond Necklace", "Diamond Bracelets", "Diamond Mangalsutras", "Diamond Nose Pins"] 
  },
  { 
    label: "Earrings", 
    href: "/shop?category=earrings", 
    slug: "earrings",
    dropdown: ["Jhumkas", "Drop & Danglers", "Studs & Tops", "Hoop & Huggies"] 
  },
  { 
    label: "Rings", 
    href: "/shop?category=rings", 
    slug: "rings",
    dropdown: ["Diamond Engagement Rings", "Men's Rings", "Casual Rings", "Engagement Rings"] 
  },
  { 
    label: "Daily Wear", 
    href: "/shop?category=daily", 
    slug: "daily-wear",
    dropdown: ["Dailywear Jewellery", "Dailywear Rings", "Dailywear Chains"] 
  },
  { 
    label: "Collections", 
    href: "/shop?category=collections", 
    slug: "collections",
    dropdown: ["Elan", "Konkonkotha", "Kundan Stories", "Maithili"] 
  },
  { 
    label: "Wedding", 
    href: "/shop?category=wedding", 
    slug: "wedding",
    dropdown: ["Wedding Choker", "Wedding Haram", "Wedding Bangles"] 
  },
  { 
    label: "Gifting", 
    href: "/shop?category=gifting", 
    slug: "gifting",
    dropdown: ["Him", "Her", "Kids"] 
  },
  { 
    label: "Custom", 
    href: "/custom-jewellery", 
    slug: "custom",
    dropdown: [] 
  }
];

export default function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Search Logic
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Voice & Image Logic States
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  const itemCount = useCartStore((state) => state.getItemCount());
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []); 

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
            setShowSearchResults(false);
        }
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-nav-container')) {
             setActiveCategory(null);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  // Search Debounce Logic
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (searchQuery.trim().length >= 2) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const data = await dedupedFetch<{ success: boolean; data: Product[]; }>(`/api/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
          if (data.success) {
            setSearchResults(data.data);
            setShowSearchResults(true);
          }
        } catch (error) {
          console.error("Search failed:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleMobileCategoryClick = (e: React.MouseEvent, item: typeof NAV_ITEMS[0]) => {
      if (item.dropdown && item.dropdown.length > 0) {
          e.preventDefault();
          if (activeCategory === item.label) {
              setActiveCategory(null); 
          } else {
              setActiveCategory(item.label); 
          }
      }
  };

  // --- FEATURE 1: VOICE SEARCH ---
  const handleVoiceSearch = () => {
    // FIX: Using window as any to bypass TypeScript check
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      // --- UPDATED ERROR HANDLER ---
      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error); // Error ko Warn mein badal diya
        setIsListening(false);
        
        if (event.error === 'network') {
            alert("Voice search requires an active internet connection. Please check your network.");
        } else if (event.error === 'not-allowed') {
            alert("Microphone permission denied. Please allow microphone access.");
        } else if (event.error === 'no-speech') {
            // User ne kuch bola nahi, ignore karein
        } else {
            alert("Voice search failed. Please try again.");
        }
      };
      // -----------------------------

      recognition.onend = () => {
        setIsListening(false);
      };

      try {
          recognition.start();
      } catch (err) {
          console.error("Recognition start failed", err);
      }
      
    } else {
      alert("Voice search is not supported in this browser. Try Google Chrome.");
    }
  };
  // --- FEATURE 2: IMAGE SEARCH ---
  const handleImageSearchClick = () => fileInputRef.current?.click();
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIsAnalyzingImage(true);
      setTimeout(() => {
        setIsAnalyzingImage(false);
        setSearchQuery("Gold Ring");
      }, 2000);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9F7F0]/85 backdrop-blur-md shadow-sm border-b border-[#D4AF37]/20 transition-all duration-300">
      
      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="Logo" width={160} height={50} className="h-16 w-auto object-contain" priority />
            </Link>

            {/* Search Bar */}
            <div ref={searchContainerRef} className="flex-1 max-w-2xl relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#D4AF37]" />
                  <input
                    type="text"
                    placeholder={isListening ? "Listening..." : "Search for Gold, Diamond, Jewellery..."}
                    className={`w-full h-12 pl-12 pr-28 rounded-full border-2 border-[#D4AF37]/60 bg-white/80 text-[#800020] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:bg-white transition-all placeholder:text-gray-400 ${isListening ? 'ring-2 ring-red-500 border-red-500 animate-pulse' : ''}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  <div className="absolute right-4 top-1/2 -translate-x-0 -translate-y-1/2 flex items-center gap-2 text-gray-400">
                    {searchQuery && (
                        <button type="button" onClick={() => { setSearchQuery(""); setSearchResults([]); setShowSearchResults(false); }}>
                            <X size={18} className="hover:text-[#800020] transition-colors" />
                        </button>
                    )}
                    <div className="relative flex items-center">
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageFileChange} />
                        {isAnalyzingImage ? <Loader2 size={20} className="text-[#D4AF37] animate-spin" /> : <button type="button" className="hover:text-[#D4AF37] transition-colors p-1" onClick={handleImageSearchClick} title="Search by Image"><Camera size={20} /></button>}
                    </div>
                    <button type="button" className={`transition-colors p-1 ${isListening ? 'text-red-500 scale-110' : 'hover:text-[#D4AF37]'}`} onClick={handleVoiceSearch} title="Voice Search"><Mic size={20} /></button>
                  </div>
                </div>
              </form>
              
              {showSearchResults && (
                 <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                        <div className="p-2">
                             {searchResults.map((product) => (
                                <div key={product.id} onClick={() => handleProductClick(product.id)} className="flex items-center gap-3 p-2 hover:bg-[#F9F7F0] cursor-pointer rounded-lg">
                                    <div className="relative w-10 h-10"><Image src={product.image} alt={product.name} fill className="object-cover rounded"/></div>
                                    <div className="text-sm text-[#800020] font-medium">{product.name}</div>
                                </div>
                             ))}
                        </div>
                    ) : <div className="p-4 text-center text-gray-500">No results found</div>}
                 </div>
              )}
            </div>

            <div className="flex items-center gap-6 text-[#800020]">
                <Link href="/wishlist" className="hover:text-[#D4AF37] hover:scale-110 transition-all duration-300" title="Wishlist"><Heart className="h-5 w-5" /></Link>
                <Link href={user ? "/account" : "/login"} className="hover:text-[#D4AF37] hover:scale-110 transition-all duration-300" title={user ? "Profile" : "Login"}><User className="h-5 w-5" /></Link>
                <Link href="/cart" className="hover:text-[#D4AF37] hover:scale-110 transition-all duration-300 relative" title="Cart">
                    <ShoppingCart className="h-5 w-5" />
                    {mounted && itemCount > 0 && <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-[#800020] text-white text-[9px] rounded-full flex items-center justify-center border border-white animate-in zoom-in">{itemCount}</span>}
                </Link>
            </div>
        </div>

        {/* Navigation Row */}
        <div className="border-t border-[#D4AF37]/20 mt-4 pt-3">
            <ul className="flex justify-center flex-wrap gap-x-10 gap-y-2">
                {NAV_ITEMS.map((item) => (
                    <li key={item.label} className="group relative py-2">
                        {/* MAIN LINK: Now points to /shop?category=... (Main Shop Page) */}
                        <Link 
                            href={item.href} 
                            className="text-[#800020] text-base font-medium hover:text-[#D4AF37] transition-colors relative"
                        >
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                        </Link>

                        {/* Dropdown Links */}
                        {item.dropdown.length > 0 && (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-60 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50">
                             <div className="bg-white/95 backdrop-blur-xl border border-[#D4AF37]/20 shadow-xl rounded-xl overflow-hidden p-2 flex flex-col gap-1 ring-1 ring-black/5">
                               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 border-t border-l border-[#D4AF37]/20 rotate-45"></div>
                               {item.dropdown.map((subItem) => (
                                 // DROPDOWN LINK: Points to /shop/[category]/[subcategory] (Empty Page)
                                 <Link 
                                    key={subItem} 
                                    href={`/shop/${item.slug}/${subItem.toLowerCase().replace(/ /g, '-')}`} 
                                    className="block px-3 py-2.5 text-sm text-gray-700 hover:text-[#800020] hover:bg-[#F9F7F0] rounded-lg transition-colors text-left relative z-10"
                                 >
                                   {subItem}
                                 </Link>
                               ))}
                             </div>
                          </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
      </div>


      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden flex flex-col w-full mobile-nav-container relative">
        {/* Mobile Header Top (Logo, Search, Icons) */}
        <div className="flex items-center justify-between px-3 py-3 gap-2 border-b border-[#D4AF37]/10 z-20 relative">
            <Link href="/" className="flex-shrink-0">
               <Image src="/logo.png" alt="Logo" width={100} height={40} className="h-10 w-auto object-contain" priority />
            </Link>
            <div className="flex-1 max-w-[50%] mx-1">
                 <form onSubmit={handleSearchSubmit} className="relative">
                    <input type="text" placeholder="Search..." className="w-full h-9 pl-8 pr-2 rounded-full border border-[#D4AF37]/60 bg-white/60 text-xs text-[#800020] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#D4AF37]" />
                 </form>
            </div>
            <div className="flex items-center gap-2 text-[#800020] flex-shrink-0">
                <Link href="/wishlist"><Heart className="h-5 w-5 hover:text-[#D4AF37]" /></Link>
                <Link href={user ? "/account" : "/login"}><User className="h-5 w-5 hover:text-[#D4AF37]" /></Link>
                <Link href="/cart" className="relative">
                    <ShoppingCart className="h-5 w-5 hover:text-[#D4AF37]" />
                    {mounted && itemCount > 0 && <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-[#800020] text-white text-[9px] rounded-full flex items-center justify-center border border-white">{itemCount}</span>}
                </Link>
            </div>
        </div>

        {/* Mobile Sliding Nav */}
        <div className="bg-[#F9F7F0]/90 backdrop-blur-md shadow-sm z-10 relative border-b border-[#D4AF37]/10">
             <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide px-3 py-3 gap-3">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeCategory === item.label;
                    return (
                        <Link key={item.label} href={item.href} onClick={(e) => handleMobileCategoryClick(e, item)} className={cn("inline-flex items-center px-4 py-1.5 border rounded-lg text-xs font-bold tracking-wide transition-all", isActive ? "bg-[#800020] text-[#F9F7F0] border-[#800020]" : "bg-white/50 text-[#800020] border-[#D4AF37] hover:bg-white/80")}>
                            {item.label}
                            {item.dropdown.length > 0 && (<ChevronDown className={cn("ml-1 h-3 w-3 transition-transform", isActive ? "rotate-180" : "")} />)}
                        </Link>
                    )
                })}
            </div>
            {activeCategory && (
                <div className="w-full bg-[#F9F7F0]/95 backdrop-blur-md border-t border-b border-[#D4AF37]/20 shadow-inner animate-in slide-in-from-top-2 duration-200">
                    {NAV_ITEMS.find(i => i.label === activeCategory)?.dropdown.map((subItem) => {
                         const parentItem = NAV_ITEMS.find(i => i.label === activeCategory);
                         if (!parentItem) return null;
                         
                         return (
                            <Link 
                                key={subItem}
                                href={`/shop/${parentItem.slug}/${subItem.toLowerCase().replace(/ /g, '-')}`}
                                onClick={() => setActiveCategory(null)}
                                className="block px-6 py-3 text-sm text-[#800020] font-medium border-b border-[#D4AF37]/10 last:border-0 hover:bg-[#D4AF37]/10 flex justify-between items-center"
                            >
                                {subItem}
                                <span className="text-[#D4AF37] text-lg">›</span>
                            </Link>
                         )
                    })}
                    <div className="p-3 bg-white/50">
                        <Button variant="outline" className="w-full text-[#800020] border-[#800020] hover:bg-[#800020] hover:text-white" onClick={() => { const href = NAV_ITEMS.find(i => i.label === activeCategory)?.href; if(href) router.push(href); setActiveCategory(null); }}>
                            View All {activeCategory}
                        </Button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
}