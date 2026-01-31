"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Instagram, MapPin, Phone, Mail, ArrowRight, X, Shield, FileText, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  
  // Modal States
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCookiesOpen, setIsCookiesOpen] = useState(false);

  // Cookie Toggle States
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true (locked)
    analytics: true,
    marketing: false
  });

  const toggleCookie = (key: 'analytics' | 'marketing') => {
    setCookiePreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <footer className="bg-[#F9F7F0] text-[#4a4a4a] border-t-4 border-[#800020] relative">
        
        {/* Decorative Top Pattern */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#800020] to-[#D4AF37]" />

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* --- COLUMN 1: BRAND --- */}
            <div className="space-y-6">
              <Link href="/" className="inline-block">
                 <Image 
                   src="/logo.png" 
                   alt="Brand Logo" 
                   width={300} 
                   height={120} 
                   className="h-32 w-auto object-contain"
                 />
              </Link>
              <p className="text-sm leading-relaxed text-[#5a5a5a]">
                Crafting timeless elegance since 2007. We bring you the finest handcrafted jewelry with a promise of purity and tradition.
              </p>
            </div>

            {/* --- COLUMN 2: QUICK LINKS --- */}
            <div>
              <h4 className="text-lg font-serif font-bold text-[#800020] mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><Link href="/shop" className="flex items-center gap-2 hover:text-[#800020] hover:translate-x-2 transition-all duration-300"><ArrowRight className="w-3 h-3 text-[#D4AF37]" /> Shop</Link></li>
                <li><Link href="/about" className="flex items-center gap-2 hover:text-[#800020] hover:translate-x-2 transition-all duration-300"><ArrowRight className="w-3 h-3 text-[#D4AF37]" /> About Us</Link></li>
                <li><Link href="/cart" className="flex items-center gap-2 hover:text-[#800020] hover:translate-x-2 transition-all duration-300"><ArrowRight className="w-3 h-3 text-[#D4AF37]" /> My Cart</Link></li>
                <li><Link href="/wishlist" className="flex items-center gap-2 hover:text-[#800020] hover:translate-x-2 transition-all duration-300"><ArrowRight className="w-3 h-3 text-[#D4AF37]" /> Wishlist</Link></li>
                <li><Link href="/contact" className="flex items-center gap-2 hover:text-[#800020] hover:translate-x-2 transition-all duration-300"><ArrowRight className="w-3 h-3 text-[#D4AF37]" /> Contact Us</Link></li>
              </ul>
            </div>

            {/* --- COLUMN 3: COLLECTIONS --- */}
            <div>
              <h4 className="text-lg font-serif font-bold text-[#800020] mb-6 relative inline-block">
                Collections
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
              </h4>
              <ul className="space-y-3 text-sm font-medium">
                {[
                  { name: 'Gold', link: '/shop?category=gold' },
                  { name: 'Diamond', link: '/shop?category=diamond' },
                  { name: 'Wedding', link: '/shop?category=wedding' },
                  { name: 'Daily Wear', link: '/shop?category=daily' },
                  { name: 'Gifting', link: '/shop?category=gifting' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.link} className="flex items-center gap-2 hover:text-[#800020] hover:translate-x-2 transition-all duration-300">
                      <ArrowRight className="w-3 h-3 text-[#D4AF37]" /> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- COLUMN 4: CONNECT --- */}
            <div>
              <h4 className="text-lg font-serif font-bold text-[#800020] mb-6 relative inline-block">
                Connect With Us
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D4AF37]"></span>
              </h4>
              <p className="text-sm text-[#5a5a5a] mb-6">Follow us on social media for daily inspiration.</p>
              
              <div className="flex gap-4 mb-8">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Youtube, href: '#' }
                ].map((Social, index) => (
                  <Link key={index} href={Social.href} className="w-10 h-10 rounded-full bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-all duration-300 shadow-sm">
                    <Social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>

              <div className="space-y-4 border-t border-[#D4AF37]/20 pt-6">
                <div className="flex items-start gap-3 text-sm group"><MapPin className="w-5 h-5 text-[#800020] mt-0.5 shrink-0" /><span className="text-[#5a5a5a]">New Delhi, India - 110001</span></div>
                <div className="flex items-center gap-3 text-sm group"><Phone className="w-5 h-5 text-[#800020] shrink-0" /><span className="text-[#5a5a5a]">+91 81306 75823</span></div>
                <div className="flex items-center gap-3 text-sm group"><Mail className="w-5 h-5 text-[#800020] shrink-0" /><Link href="mailto:vaibhavverma0307@gmail.com" className="text-[#5a5a5a] hover:text-[#800020] transition-colors">vaibhavverma0307@gmail.com</Link></div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#D4AF37]/20 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-[#5a5a5a] text-center md:text-left">
                <p>&copy; {new Date().getFullYear()} Garvit Gems & Jewels. All Rights Reserved.</p>
                <p className="text-xs mt-1 text-[#800020]/60 font-medium">Developed by <span className="text-[#800020]">Vaibhav Verma (B.Tech - CSE)</span></p>
              </div>
              
              {/* LEGAL BUTTONS (Now Maroon) */}
              <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-[#800020]">
                 <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-[#5a0016] transition-colors relative group">
                    Privacy Policy
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#800020] transition-all group-hover:w-full"></span>
                 </button>
                 <button onClick={() => setIsTermsOpen(true)} className="hover:text-[#5a0016] transition-colors relative group">
                    Terms of Service
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#800020] transition-all group-hover:w-full"></span>
                 </button>
                 <button onClick={() => setIsCookiesOpen(true)} className="hover:text-[#5a0016] transition-colors relative group">
                    Cookie Settings
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#800020] transition-all group-hover:w-full"></span>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODALS SECTION ================= */}

      {/* 1. Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-[#D4AF37] flex flex-col max-h-[85vh]">
                <div className="bg-[#800020] p-5 flex justify-between items-center shrink-0">
                    <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-[#F9F7F0]"><Shield size={20} className="text-[#D4AF37]" /> Privacy Policy</h3>
                    <button onClick={() => setIsPrivacyOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors text-[#F9F7F0]"><X size={24} /></button>
                </div>
                <div className="p-8 overflow-y-auto space-y-4 text-gray-600 leading-relaxed text-sm">
                    <p className="text-xs text-gray-400">Last Updated: {new Date().toLocaleDateString()}</p>
                    <p>At <strong>Garvit Gems & Jewels</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This policy describes how we collect, use, and safeguard your data.</p>
                    
                    <h4 className="font-bold text-[#800020] text-base mt-4">1. Information We Collect</h4>
                    <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, and fill out a form. Users may be asked for, as appropriate, name, email address, mailing address, phone number.</p>
                    
                    <h4 className="font-bold text-[#800020] text-base mt-4">2. How We Use Collected Information</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>To improve customer service: Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
                        <li>To process payments: We use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.</li>
                    </ul>

                    <h4 className="font-bold text-[#800020] text-base mt-4">3. Data Protection</h4>
                    <p>We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.</p>
                </div>
                <div className="p-5 border-t bg-[#F9F7F0] flex justify-end">
                    <Button onClick={() => setIsPrivacyOpen(false)} className="bg-[#800020] text-white hover:bg-[#5a0016]">I Understand</Button>
                </div>
            </div>
        </div>
      )}

      {/* 2. Terms of Service Modal */}
      {isTermsOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-[#D4AF37] flex flex-col max-h-[85vh]">
                <div className="bg-[#800020] p-5 flex justify-between items-center shrink-0">
                    <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-[#F9F7F0]"><FileText size={20} className="text-[#D4AF37]" /> Terms of Service</h3>
                    <button onClick={() => setIsTermsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors text-[#F9F7F0]"><X size={24} /></button>
                </div>
                <div className="p-8 overflow-y-auto space-y-4 text-gray-600 leading-relaxed text-sm">
                     <p>Welcome to Garvit Gems & Jewels. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Garvit Gems & Jewels if you do not agree to take all of the terms and conditions stated on this page.</p>
                    
                    <h4 className="font-bold text-[#800020] text-base mt-4">1. Intellectual Property Rights</h4>
                    <p>Other than the content you own, under these Terms, Garvit Gems & Jewels and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.</p>
                    
                    <h4 className="font-bold text-[#800020] text-base mt-4">2. Pricing and Availability</h4>
                    <p>Prices for products are described on our Website and are incorporated into these Terms by reference. All prices are in Indian Rupees (INR). Prices, products, and services may change at Garvit Gems & Jewels' discretion.</p>

                    <h4 className="font-bold text-[#800020] text-base mt-4">3. Governing Law & Jurisdiction</h4>
                    <p>These Terms will be governed by and interpreted in accordance with the laws of the State of Delhi, India, and you submit to the non-exclusive jurisdiction of the state and federal courts located in New Delhi for the resolution of any disputes.</p>
                </div>
                <div className="p-5 border-t bg-[#F9F7F0] flex justify-end">
                    <Button onClick={() => setIsTermsOpen(false)} className="bg-[#800020] text-white hover:bg-[#5a0016]">Accept Terms</Button>
                </div>
            </div>
        </div>
      )}

      {/* 3. Cookie Settings Modal (Functional Toggles) */}
      {isCookiesOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 border border-[#D4AF37] flex flex-col max-h-[85vh]">
                <div className="bg-[#800020] p-5 flex justify-between items-center shrink-0">
                    <h3 className="text-xl font-serif font-bold flex items-center gap-2 text-[#F9F7F0]"><Cookie size={20} className="text-[#D4AF37]" /> Cookie Preferences</h3>
                    <button onClick={() => setIsCookiesOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors text-[#F9F7F0]"><X size={24} /></button>
                </div>
                <div className="p-8 space-y-6">
                    <p className="text-gray-600 text-sm">We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. You can decide which cookies you want to allow.</p>
                    
                    {/* Essential - Always On */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-bold text-[#800020]">Essential Cookies</p>
                            <p className="text-xs text-gray-500">Strictly necessary for security and functionality.</p>
                        </div>
                        {/* Disabled Toggle Visual */}
                        <div className="w-12 h-6 bg-[#800020] rounded-full relative opacity-50 cursor-not-allowed">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>

                    {/* Analytics - Functional Toggle */}
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div>
                            <p className="font-bold text-[#800020]">Analytics Cookies</p>
                            <p className="text-xs text-gray-500">Help us understand how you use the site.</p>
                        </div>
                        <div 
                            onClick={() => toggleCookie('analytics')}
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out ${cookiePreferences.analytics ? 'bg-[#800020]' : 'bg-gray-300'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${cookiePreferences.analytics ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </div>
                    </div>

                    {/* Marketing - Functional Toggle */}
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div>
                            <p className="font-bold text-[#800020]">Marketing Cookies</p>
                            <p className="text-xs text-gray-500">Used to deliver relevant advertisements.</p>
                        </div>
                        <div 
                            onClick={() => toggleCookie('marketing')}
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out ${cookiePreferences.marketing ? 'bg-[#800020]' : 'bg-gray-300'}`}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${cookiePreferences.marketing ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </div>
                    </div>
                </div>
                <div className="p-5 border-t bg-[#F9F7F0] flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsCookiesOpen(false)} className="border-[#800020] text-[#800020] hover:bg-[#800020]/10">Cancel</Button>
                    <Button onClick={() => setIsCookiesOpen(false)} className="bg-[#800020] text-white hover:bg-[#5a0016]">Save Preferences</Button>
                </div>
            </div>
        </div>
      )}

    </>
  );
}