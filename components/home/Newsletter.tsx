"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ShieldCheck, Scale, RefreshCw, Truck, Sparkles, Gem } from "lucide-react";

const PROMISES = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Pure 22K Hallmark",
    desc: "Government certified purity you can trust blindly."
  },
  {
    icon: <Scale size={28} />,
    title: "Transparent Pricing",
    desc: "Best market value with zero hidden charges."
  },
  {
    icon: <RefreshCw size={28} />,
    title: "Lifetime Exchange",
    desc: "Easy upgrade policy across all our stores worldwide."
  },
  {
    icon: <Truck size={28} />,
    title: "Secure & Insured",
    desc: "Tamper-proof packaging delivered safely to you."
  }
];

export default function Newsletter() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#590009] to-[#3d0005] overflow-hidden text-[#F9F7F0]">
      
      {/* --- Background Pattern --- */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none" 
        style={{ 
            backgroundImage: `radial-gradient(circle at center, #D4AF37 0.5px, transparent 1px), rounded-full`,
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* === PART 1: THE ROYAL INVITE === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          {/* Crown/Gem Icon */}
          <div className="flex justify-center mb-6">
             <motion.div 
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
             >
                <Gem size={32} className="md:w-10 md:h-10" />
             </motion.div>
          </div>

          <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-[#D4AF37] tracking-tight">
            An Invitation to Elegance
          </h3>
          <p className="text-[#F9F7F0]/90 mb-8 font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Join our exclusive circle. Be the first to witness new bridal collections, royal heirlooms, and member-only privileges.
          </p>

          {/* === RESPONSIVE FORM === */}
          {/* Mobile: Vertical Stack | Desktop: Merged Capsule */}
          <form className="
            relative flex flex-col gap-4 max-w-lg mx-auto transition-all duration-300
            sm:flex-row sm:gap-0 sm:bg-white/10 sm:p-1 sm:rounded-full sm:border sm:border-[#D4AF37]/30 sm:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
          ">
            
            {/* Input Field */}
            <Input
              type="email"
              placeholder="Enter your email for royal updates..."
              className="
                h-12 w-full pl-6 text-white placeholder:text-white/60
                bg-white/10 border border-[#D4AF37]/30 rounded-full focus-visible:ring-[#D4AF37]
                sm:border-none sm:bg-transparent sm:focus-visible:ring-0 sm:rounded-none
              "
            />
            
            {/* Submit Button */}
            <Button 
                type="submit" 
                className="
                  h-12 w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#b89225] text-[#3d0005] font-bold uppercase tracking-wider text-xs shadow-md flex items-center justify-center gap-2
                  hover:from-white hover:to-white hover:shadow-lg transition-all
                  sm:w-auto sm:px-8 sm:shrink-0 sm:m-[2px]
                "
            >
              Subscribe <Sparkles size={14} />
            </Button>
          </form>

          <p className="text-[#F9F7F0]/50 mt-4 text-[10px] md:text-xs tracking-widest">
             We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>


        {/* === PART 2: ORNAMENTAL DIVIDER === */}
        <div className="relative flex items-center justify-center py-6 md:py-10 mb-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
            <div className="mx-4 text-[#D4AF37] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60"></span>
                <div className="w-3 h-3 border border-[#D4AF37] rotate-45 bg-[#590009]"></div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60"></span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent"></div>
        </div>


        {/* === PART 3: THE BRAND PROMISE === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROMISES.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="
                      group relative p-6 rounded-2xl border border-[#D4AF37]/10 bg-white/5 
                      hover:bg-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 
                      text-center flex flex-col items-center
                    "
                >
                    {/* Icon Ring */}
                    <div className="w-12 h-12 md:w-14 md:h-14 mb-4 rounded-full flex items-center justify-center text-[#D4AF37] bg-gradient-to-br from-[#5a0016] to-[#3d0005] border border-[#D4AF37]/30 shadow-inner group-hover:scale-110 group-hover:text-white group-hover:border-[#D4AF37] transition-all duration-300">
                        {item.icon}
                    </div>
                    
                    <h4 className="text-lg md:text-xl font-serif font-bold text-[#F9F7F0] mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {item.title}
                    </h4>
                    <p className="text-sm text-[#F9F7F0]/70 leading-relaxed font-light">
                        {item.desc}
                    </p>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}