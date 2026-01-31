"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // ChevronUp bhi add kiya hai
import { cn } from "@/lib/utils";

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Same Data Structure as Header for Consistency
const NAV_ITEMS = [
  {
    name: "All Jewellery",
    href: "/all-jewellery",
    subcategories: ["Finger Rings", "Nose Pins", "Bangles", "Earrings", "Mangalsutra", "Bracelets", "Necklace", "Pendants", "Chains", "Necklace Sets", "Pendants & Earring Sets"]
  },
  {
    name: "Gold",
    href: "/gold",
    subcategories: ["Gold Earrings", "Gold Rings", "Gold Nose Pins", "Gold Bangles", "Gold Chains", "Gold Engagement Rings", "Gold Kadas", "Gold Bracelets", "Gold Pendants", "Gold Necklaces", "Gold Mangalsutras"]
  },
  {
    name: "Diamond",
    href: "/diamond",
    subcategories: ["Diamond Earrings", "Diamond Necklace Set", "Diamond Pendants", "Diamond Bangles", "Diamond Rings", "Diamond Necklace", "Diamond Bracelets", "Diamond Mangalsutras", "Diamond Nose Pins"]
  },
  {
    name: "Earrings",
    href: "/earrings",
    subcategories: ["Jhumkas", "Drop & Danglers", "Studs & Tops", "Hoop & Huggies"]
  },
  {
    name: "Rings",
    href: "/rings",
    subcategories: ["Diamond Engagement Rings", "Men's Rings", "Casual Rings", "Engagement Rings", "Platinum Engagement Rings", "Couple Rings", "Gold Engagement Rings"]
  },
  {
    name: "Daily Wear",
    href: "/daily-wear",
    subcategories: ["Dailywear Jewellery", "Dailywear Rings", "Dailywear Chains", "Dailywear Mangalsutras", "Dailywear Earrings", "Dailywear Pendants"]
  },
  {
    name: "Collections",
    href: "/collections",
    subcategories: ["Elan", "Konkonkotha", "Kundan Stories", "Maithili", "Unbound", "Joy of Dressing", "Nav-raani", "Glamdays"]
  },
  {
    name: "Wedding",
    href: "/wedding",
    subcategories: ["Wedding Choker", "Wedding Haram", "Wedding Bangles", "Wedding Diamond", "Wedding Mangalsutra", "Accessories"]
  },
  {
    name: "Gifting",
    href: "/gifting",
    subcategories: ["Him", "Her", "Kids"]
  },
  {
    name: "Custom",
    href: "/custom-jewellery",
    subcategories: [] // No dropdown
  }
];

export default function Navigation({ isOpen = false, onClose }: NavigationProps) {
  // Mobile accordion state
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    if (expandedCategory === name) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(name);
    }
  };

  // Agar menu close hai toh kuch render mat karo
  if (!isOpen) return null;

  return (
    <nav className="md:hidden border-t border-[#D4AF37]/30 bg-[#F9F7F0] h-[calc(100vh-80px)] overflow-y-auto">
      <div className="container mx-auto px-4 py-4 space-y-1">
        
        {NAV_ITEMS.map((category) => {
          const hasSub = category.subcategories.length > 0;
          const isExpanded = expandedCategory === category.name;

          return (
            <div key={category.name} className="border-b border-[#D4AF37]/10 last:border-0">
              <div className="flex items-center justify-between">
                
                {/* Main Link */}
                <Link
                  href={category.href}
                  className="flex-1 py-3 text-sm font-bold text-[#800020] hover:text-[#D4AF37] uppercase tracking-wide transition-colors"
                  onClick={onClose}
                >
                  {category.name}
                </Link>

                {/* Dropdown Toggle Button (Only if subcategories exist) */}
                {hasSub && (
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="p-3 text-[#800020] hover:text-[#D4AF37] transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Subcategories Accordion */}
              {hasSub && isExpanded && (
                <div className="bg-[#D4AF37]/5 -mx-4 px-8 py-2 space-y-1 shadow-inner">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      // Routing logic: /category/sub-category (slug format)
                      href={`${category.href}/${sub.toLowerCase().replace(/ /g, '-')}`}
                      className="block py-2 text-sm text-gray-700 hover:text-[#800020] font-medium transition-colors border-b border-[#D4AF37]/10 last:border-0"
                      onClick={onClose}
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Extra Links (Contact, Login etc if needed) */}
        <div className="pt-4 mt-4 border-t border-[#D4AF37]/30">
             <Link
                href="/contact"
                className="block py-3 text-sm font-bold text-[#800020] hover:text-[#D4AF37] uppercase"
                onClick={onClose}
             >
                Contact Us
             </Link>
        </div>

      </div>
    </nav>
  );
}