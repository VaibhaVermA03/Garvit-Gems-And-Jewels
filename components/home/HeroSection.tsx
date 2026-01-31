"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; 
import { Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

// --- LOCAL HD IMAGES (Must be in public/img/slider/) ---
const SLIDES = [
  {
    id: 1,
    image: "/img/slider/hero-1.avif", 
    title: "Timeless Gold Collection",
    subtitle: "Experience the purity and tradition handcrafted for the modern you.",
    cta: "Explore Gold",
    link: "/gold"
  },
  {
    id: 2,
    image: "/img/slider/hero-2.avif",
    title: "Forever Diamonds",
    subtitle: "Radiate elegance with our exquisite range of certified diamond jewellery.",
    cta: "Shop Diamonds",
    link: "/diamond"
  },
  {
    id: 3,
    image: "/img/slider/hero-3.avif",
    title: "The Royal Wedding Edit",
    subtitle: "Bridal masterpieces designed to make your special day unforgettable.",
    cta: "View Wedding Collection",
    link: "/wedding"
  },
  {
    id: 4,
    image: "/img/slider/hero-4.avif",
    title: "Antique Polki & Kundan",
    subtitle: "Relive the royal era with our heritage inspired intricate designs.",
    cta: "Discover Heritage",
    link: "/collections"
  },
  {
    id: 5,
    image: "/img/slider/hero-5.avif",
    title: "Contemporary Rose Gold",
    subtitle: "Chic, minimal, and modern designs for your everyday elegance.",
    cta: "Shop Daily Wear",
    link: "/daily-wear"
  },
  {
    id: 6,
    image: "/img/slider/hero-6.jpg",
    title: "Precious Gemstones",
    subtitle: "Add a splash of color to your life with Ruby, Emerald and Sapphire.",
    cta: "See Gemstones",
    link: "/all-jewellery"
  },
  {
    id: 7,
    image: "/img/slider/hero-7.avif",
    title: "Gifting Special",
    subtitle: "The perfect way to say you care. Gifts for her, him and kids.",
    cta: "Start Gifting",
    link: "/gifting"
  }
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  const sparkles = mounted
    ? [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      }))
    : [];

  return (
    <section className="relative w-full h-[600px] md:h-[750px] overflow-hidden bg-black">
      
      {/* --- BACKGROUND SLIDESHOW (Local Images) --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
           {/* Using Next.js Image component for local images */}
           <Image
            src={SLIDES[currentSlide].image}
            alt={SLIDES[currentSlide].title}
            fill
            className="object-cover opacity-90"
            priority={true} // Load fast
          />
          
          {/* Gradients for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* --- ANIMATED SPARKLES --- */}
      {mounted &&
        sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute z-10"
            style={{ left: `${sparkle.x}%`, top: `${sparkle.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: sparkle.duration, repeat: Infinity, delay: sparkle.delay }}
          >
            <Sparkles className="h-2 w-2 text-[#D4AF37]/70" />
          </motion.div>
        ))}

      {/* --- CONTENT LAYER --- */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        
        <AnimatePresence mode="wait">
            <motion.div
            key={currentSlide} 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-left pl-2 md:pl-0"
            >
            {/* Tagline */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="inline-block mb-4 px-5 py-1.5 border border-[#D4AF37] rounded-full bg-black/40 backdrop-blur-md"
            >
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Premium Collection
                </span>
            </motion.div>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] drop-shadow-2xl"
            >
                {SLIDES[currentSlide].title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-100 mb-10 max-w-xl leading-relaxed drop-shadow-md font-light"
            >
                {SLIDES[currentSlide].subtitle}
            </motion.p>

            {/* Buttons (NOW ROUNDED) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                {/* Primary Button: Maroon, Rounded Full */}
                <Button size="lg" className="bg-[#800020] hover:bg-[#5a0016] text-white border border-[#800020] px-10 py-7 text-lg uppercase tracking-wider rounded-full shadow-xl" asChild>
                <Link href={SLIDES[currentSlide].link}>
                    {SLIDES[currentSlide].cta}
                </Link>
                </Button>
                
                {/* Secondary Button: Transparent, Rounded Full */}
                <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black px-10 py-7 text-lg uppercase tracking-wider rounded-full backdrop-blur-sm"
                asChild
                >
                <Link href="/shop">View All</Link>
                </Button>
            </motion.div>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* --- MANUAL CONTROLS --- */}
      <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 border border-white/20 bg-black/20 hover:bg-black/60 text-white rounded-full transition-all hidden md:flex backdrop-blur-sm group">
        <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 border border-white/20 bg-black/20 hover:bg-black/60 text-white rounded-full transition-all hidden md:flex backdrop-blur-sm group">
        <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* --- DOTS INDICATOR --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {SLIDES.map((_, index) => (
            <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === index ? "bg-[#D4AF37] w-12" : "bg-white/40 w-3 hover:bg-white"
            }`}
            />
        ))}
      </div>

    </section>
  );
}