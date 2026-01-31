"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[300px] flex items-center justify-center bg-[#800020] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // Beige Heading
            className="text-5xl md:text-6xl font-serif font-bold mb-4 text-[#F9F7F0]"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-light opacity-90 tracking-wide text-[#F9F7F0]"
          >
            WE ARE HERE TO ASSIST YOU
          </motion.p>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-4 py-20 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT: Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <div>
                <h2 className="text-4xl font-serif font-bold text-[#800020] mb-6">
                    Visit Our Boutique
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                    Experience the grandeur of our collection in person. Our experts are waiting to guide you.
                </p>
            </div>

            <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-[#F9F7F0] flex items-center justify-center text-[#800020] group-hover:bg-[#800020] group-hover:text-[#D4AF37] transition-all duration-300 shrink-0 border border-[#D4AF37]/30">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-serif font-bold text-[#800020] mb-1">Our Location</h4>
                        <p className="text-gray-600">Connaught Place, Block B,<br/>New Delhi, India - 110001</p>
                    </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-[#F9F7F0] flex items-center justify-center text-[#800020] group-hover:bg-[#800020] group-hover:text-[#D4AF37] transition-all duration-300 shrink-0 border border-[#D4AF37]/30">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-serif font-bold text-[#800020] mb-1">Call Us</h4>
                        <p className="text-gray-600">+91 98765 43210</p>
                        <p className="text-gray-500 text-sm">(Mon-Sat, 10 AM - 8 PM)</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-full bg-[#F9F7F0] flex items-center justify-center text-[#800020] group-hover:bg-[#800020] group-hover:text-[#D4AF37] transition-all duration-300 shrink-0 border border-[#D4AF37]/30">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h4 className="text-xl font-serif font-bold text-[#800020] mb-1">Email Us</h4>
                        <p className="text-gray-600">contact@jewellery.com</p>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[#D4AF37]/20"
          >
             <h3 className="text-3xl font-serif font-bold text-[#800020] mb-2">Send a Message</h3>
             <p className="text-gray-500 mb-8">Fill out the form below for any queries.</p>
             
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-[#800020] tracking-wider">First Name</label>
                        <Input placeholder="John" className="h-12 border-[#D4AF37]/30 focus-visible:ring-[#800020] bg-[#F9F7F0]/30" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-[#800020] tracking-wider">Last Name</label>
                        <Input placeholder="Doe" className="h-12 border-[#D4AF37]/30 focus-visible:ring-[#800020] bg-[#F9F7F0]/30" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-[#800020] tracking-wider">Email Address</label>
                    <Input type="email" placeholder="john@example.com" className="h-12 border-[#D4AF37]/30 focus-visible:ring-[#800020] bg-[#F9F7F0]/30" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-[#800020] tracking-wider">Message</label>
                    <Textarea placeholder="How can we help you today?" className="min-h-[150px] border-[#D4AF37]/30 focus-visible:ring-[#800020] bg-[#F9F7F0]/30 resize-none text-base" />
                </div>
                <Button className="w-full h-14 bg-[#800020] hover:bg-[#5a0016] text-white text-lg font-bold rounded-lg shadow-lg transition-transform hover:scale-[1.01]">
                    Send Message <Send size={18} className="ml-2" />
                </Button>
             </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}