"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Gem, Hammer, Palette } from "lucide-react";
// Import Header & Footer
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const METALS = [
  { id: "gold", name: "22K Gold", color: "bg-[#FFD700]" },
  { id: "rose", name: "Rose Gold", color: "bg-[#E0BFB8]" },
  { id: "white", name: "White Gold", color: "bg-[#E8E8E8]" },
  { id: "platinum", name: "Platinum", color: "bg-[#A0A0A0]" },
];

const STONES = [
  { id: "diamond", name: "Diamond", color: "bg-blue-100" },
  { id: "ruby", name: "Ruby", color: "bg-red-600" },
  { id: "emerald", name: "Emerald", color: "bg-green-600" },
  { id: "sapphire", name: "Sapphire", color: "bg-blue-700" },
];

export default function CustomJewelleryPage() {
  const [selectedMetal, setSelectedMetal] = useState("gold");
  const [selectedStone, setSelectedStone] = useState("diamond");
  const [shape, setShape] = useState("Ring");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* --- HERO SECTION (Updated with Image Background) --- */}
      <div className="relative h-[400px] flex items-center justify-center bg-[#800020] text-center overflow-hidden">
         
         {/* 1. Background Image (Gemstones/Crafting Vibe) */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: "url('/img/slider/hero-2.avif')" }} 
         />
         {/* 2. Gradient Overlay for Text Readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#5a0016]/90 via-[#800020]/40 to-transparent" />
         
         <div className="relative z-10 container mx-auto px-4">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-serif font-bold text-[#F9F7F0] mb-4 drop-shadow-md"
            >
                Design Your Masterpiece
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[#F9F7F0]/90 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide"
            >
                Become the artist. Use our customization tools to create a piece that is uniquely yours. 
            </motion.p>
         </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- LEFT: TOOLS PANEL --- */}
          <div className="space-y-8">
            
            {/* 1. Metal Selection */}
            <div className="bg-[#F9F7F0] p-6 rounded-xl border border-[#D4AF37]/20">
              <h3 className="flex items-center gap-2 text-xl font-serif font-bold text-[#800020] mb-4">
                <Palette size={20} /> Choose Metal
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {METALS.map((metal) => (
                  <button
                    key={metal.id}
                    onClick={() => setSelectedMetal(metal.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      selectedMetal === metal.id 
                        ? "border-[#800020] bg-white shadow-md ring-1 ring-[#800020]" 
                        : "border-transparent hover:bg-white/50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full ${metal.color} shadow-inner border border-black/10`} />
                    <span className="text-sm font-medium">{metal.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Stone Selection */}
            <div className="bg-[#F9F7F0] p-6 rounded-xl border border-[#D4AF37]/20">
              <h3 className="flex items-center gap-2 text-xl font-serif font-bold text-[#800020] mb-4">
                <Gem size={20} /> Select Stone
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {STONES.map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => setSelectedStone(stone.id)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                      selectedStone === stone.id 
                        ? "border-[#800020] bg-white shadow-md ring-1 ring-[#800020]" 
                        : "border-transparent hover:bg-white/50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full ${stone.color} shadow-inner border border-black/10`} />
                    <span className="text-sm font-medium">{stone.name}</span>
                  </button>
                ))}
              </div>
            </div>

             {/* 3. Type Selection */}
             <div className="bg-[#F9F7F0] p-6 rounded-xl border border-[#D4AF37]/20">
              <h3 className="flex items-center gap-2 text-xl font-serif font-bold text-[#800020] mb-4">
                <Hammer size={20} /> Jewellery Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Ring", "Necklace", "Earring", "Bangle"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setShape(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        shape === type
                        ? "bg-[#800020] text-white" 
                        : "bg-white text-[#800020] border border-[#800020]/20"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- CENTER: PREVIEW CANVAS --- */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-square md:aspect-[16/9] bg-white rounded-2xl border-2 border-dashed border-[#D4AF37]/40 flex items-center justify-center overflow-hidden shadow-inner group">
                
                <motion.div 
                    key={`${selectedMetal}-${selectedStone}-${shape}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative text-center"
                >
                    <div className="relative w-64 h-64 mx-auto">
                         {/* Base Shape Logic */}
                         <div className={`w-full h-full rounded-full border-8 opacity-90 transition-colors duration-500
                            ${selectedMetal === 'gold' ? 'border-[#FFD700]' : ''}
                            ${selectedMetal === 'rose' ? 'border-[#E0BFB8]' : ''}
                            ${selectedMetal === 'white' ? 'border-[#E8E8E8]' : ''}
                            ${selectedMetal === 'platinum' ? 'border-[#A0A0A0]' : ''}
                            ${shape === 'Necklace' ? 'rounded-[50%_50%_50%_50%]' : 'rounded-full'}
                            ${shape === 'Bangle' ? 'border-[16px]' : ''}
                            shadow-xl
                         `}></div>
                         
                         {/* Stone Logic */}
                         <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-white shadow-[0_0_20px_rgba(0,0,0,0.3)]
                            ${selectedStone === 'diamond' ? 'bg-blue-100 animate-pulse' : ''}
                            ${selectedStone === 'ruby' ? 'bg-red-600' : ''}
                            ${selectedStone === 'emerald' ? 'bg-green-600' : ''}
                            ${selectedStone === 'sapphire' ? 'bg-blue-700' : ''}
                         `}></div>
                    </div>
                    
                    <p className="mt-8 text-xl font-serif text-[#800020]">
                        Preview: {selectedMetal} {shape} with {selectedStone}
                    </p>
                    <p className="text-sm text-gray-400">
                        *This is a conceptual preview.
                    </p>
                </motion.div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                     style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                />
            </div>

            {/* Request Form */}
            <div className="bg-[#800020] text-white p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h3 className="text-2xl font-serif font-bold mb-2 text-[#F9F7F0]">Ready to Build?</h3>
                        <p className="text-[#F9F7F0]/80 mb-6">Send this design to our artisans for a quote.</p>
                        <div className="space-y-4">
                            <Input placeholder="Your Name" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                            <Input placeholder="Phone Number" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                            <Textarea placeholder="Any specific requirements?" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                        </div>
                    </div>
                    <div className="w-full md:w-auto">
                        <Button className="w-full md:w-auto bg-[#D4AF37] text-[#800020] hover:bg-white hover:text-[#800020] px-12 py-8 text-lg font-bold rounded-xl shadow-lg">
                            Request Quote
                        </Button>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}