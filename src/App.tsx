/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Music, 
  Coffee, 
  Headphones, 
  Disc, 
  Calendar, 
  MapPin, 
  Clock, 
  Instagram, 
  ArrowRight,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Concept', href: '#concept' },
    { name: 'Experience', href: '#experience' },
    { name: 'Space', href: '#space' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reserve', href: '#booking', primary: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-orange py-4 shadow-lg' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-xl font-display font-bold tracking-widest uppercase transition-colors ${isScrolled ? 'text-brand-black' : 'text-brand-white'}`}>
          Listen <span className={isScrolled ? 'text-brand-black/70' : 'text-brand-silver'}>HiFi</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] transition-colors ${isScrolled ? 'text-brand-black hover:text-brand-black/60' : 'text-brand-white/70 hover:text-brand-silver'} ${link.primary ? (isScrolled ? 'bg-brand-black text-brand-orange px-6 py-2.5 rounded-full font-medium' : 'bg-brand-white text-brand-black px-6 py-2.5 rounded-full font-medium') : ''}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-brand-black' : 'text-brand-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 w-full border-t border-white/10 p-8 md:hidden ${isScrolled ? 'bg-brand-orange' : 'bg-brand-black'}`}
          >
            <div className="flex flex-col space-y-6 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] ${isScrolled ? 'text-brand-black' : (link.primary ? 'text-brand-silver font-bold' : 'text-brand-white/70')}`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Image with Overlay */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 opacity-40 grayscale"
      >
        <img 
          src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=2000&auto=format&fit=crop" 
          alt="Vinyl Record Player" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-brand-silver uppercase tracking-[0.4em] text-xs mb-8"
        >
          Kuala Lumpur • Chow Kit
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-6xl md:text-8xl font-display font-light leading-tight mb-12"
        >
          Listen, <br />
          <span className="editorial-text text-brand-beige">not just hear.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-brand-white/60 text-sm md:text-base tracking-[0.2em] font-light max-w-lg mx-auto"
        >
          A slow space for the analog soul.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-white/40 mb-4">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-brand-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Concept = () => {
  return (
    <section id="concept" className="py-32 bg-brand-orange text-brand-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-light mb-8 leading-tight">
              The Art of <br />
              <span className="editorial-text">Intentionality.</span>
            </h2>
            <div className="space-y-6 text-brand-black/80 leading-relaxed max-w-md font-light">
              <p>
                Inspired by the Japanese <span className="text-brand-black italic font-medium">Jazz Kissa</span>. A sanctuary where time slows down to the speed of 33⅓ RPM.
              </p>
              <p>
                We believe music is a journey, not a background. A conversation between the needle and the groove.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1514525253344-f814d074e015?q=80&w=1000&auto=format&fit=crop" 
                alt="Listening Space - Afternoon Light" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 vinyl-record hidden md:block animate-[spin_10s_linear_infinite]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const features = [
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Private Sanctuary",
      desc: "13 individual stations. Audio-Technica precision. Your own world of sound, undisturbed."
    },
    {
      icon: <Disc className="w-6 h-6" />,
      title: "The Library",
      desc: "100+ curated records. From timeless jazz to contemporary whispers. Quality over quantity."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Deep Listening",
      desc: "90 minutes of uninterrupted immersion. The space to finish an entire side, and then the next."
    }
  ];

  return (
    <section id="experience" className="py-32 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <p className="text-brand-silver uppercase tracking-[0.3em] text-[10px] mb-4">The Ritual</p>
          <h2 className="text-4xl md:text-6xl font-display font-light italic font-serif">The Experience</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-panel p-10 rounded-sm hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 bg-brand-white/10 rounded-full flex items-center justify-center mb-8 text-brand-silver group-hover:text-brand-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-display font-medium mb-4">{f.title}</h3>
              <p className="text-brand-white/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Space = () => {
  return (
    <section id="space" className="py-32 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-display font-light mb-8">
              Chow Kit, <br />
              <span className="editorial-text">Reimagined.</span>
            </h2>
            <p className="text-brand-white/70 mb-12 max-w-md leading-relaxed font-light">
              Industrial textures meet the warmth of wood. Soft light. The KL skyline as your backdrop. A music sanctuary in the heart of the city.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 border border-white/5">
                <img src="https://images.unsplash.com/photo-1493676304818-8b70145cf8b3?q=80&w=600&auto=format&fit=crop" alt="Interior Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 border border-white/5">
                <img src="https://images.unsplash.com/photo-1519643381401-22c77e60520e?q=80&w=600&auto=format&fit=crop" alt="Audio Equipment" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          <div className="relative min-h-[500px] overflow-hidden rounded-sm grayscale">
            <img 
              src="https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=1000&auto=format&fit=crop" 
              alt="KL View" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-black/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const drinks = [
    { name: "Coconut Matcha Cloud", price: "18", desc: "Ceremonial grade matcha. Creamy coconut foam." },
    { name: "Black / White", price: "12/14", desc: "Single origin. Roasted for clarity." },
    { name: "Yuzu Cold Brew", price: "16", desc: "Citrus notes. 12-hour steep." },
    { name: "Signature Dirty", price: "15", desc: "Chilled milk. Double ristretto." }
  ];

  return (
    <section id="menu" className="py-32 bg-brand-charcoal">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-brand-silver uppercase tracking-[0.3em] text-[10px] mb-4">The Sensory Pairing</p>
          <h2 className="text-4xl font-display font-light italic font-serif">Coffee & Sips</h2>
        </div>

        <div className="space-y-12">
          {drinks.map((d, i) => (
            <div key={i} className="flex justify-between items-start border-b border-white/10 pb-8 group">
              <div>
                <h3 className="text-xl font-display font-medium mb-2 group-hover:text-brand-silver transition-colors">{d.name}</h3>
                <p className="text-brand-white/50 text-sm font-light">{d.desc}</p>
              </div>
              <span className="text-brand-silver font-display">RM {d.price}</span>
            </div>
          ))}
        </div>
        
        <p className="text-center mt-16 text-brand-white/40 text-xs italic font-light">
          * Specialty beans rotated monthly. Essential pairings only.
        </p>
      </div>
    </section>
  );
};

const Booking = () => {
  return (
    <section id="booking" className="py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-display font-light mb-10">
          Enter the <br />
          <span className="editorial-text">frequency.</span>
        </h2>
        <p className="text-brand-white/70 mb-12 text-lg leading-relaxed font-light">
          90-minute sessions. <br />
          RM 25 per person. Includes one curated drink.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="w-full md:w-auto bg-brand-white text-brand-black px-12 py-5 rounded-full font-display font-bold uppercase tracking-widest hover:bg-brand-silver transition-all transform hover:scale-105">
            Book Now
          </button>
          <button className="w-full md:w-auto border border-white/20 px-12 py-5 rounded-full font-display font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
            View Availability
          </button>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs uppercase tracking-[0.2em] text-brand-white/40">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>Tue — Sun</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>12PM — 8PM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Chow Kit, KL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-brand-orange text-brand-black border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <h3 className="text-2xl font-display font-bold tracking-widest uppercase mb-8">
              Listen <span className="text-brand-black/60">HiFi</span>
            </h3>
            <p className="text-brand-black/70 max-w-xs leading-relaxed text-sm">
              A space for intentional listening and specialty coffee in the heart of Kuala Lumpur.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40 mb-6 font-bold">Visit</h4>
            <address className="not-italic text-sm text-brand-black/80 space-y-2">
              <p>Chow Kit, Kuala Lumpur</p>
              <p>50350 Malaysia</p>
              <p className="pt-4">Closed on Mondays</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40 mb-6 font-bold">Connect</h4>
            <div className="flex flex-col space-y-4">
              <a href="#" className="flex items-center gap-3 text-sm text-brand-black/80 hover:text-brand-black transition-colors">
                <Instagram size={16} />
                <span>@listenhifi.cafe</span>
              </a>
              <a href="#" className="text-sm text-brand-black/80 hover:text-brand-black transition-colors">
                hello@listenhifi.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-black/10 text-[10px] uppercase tracking-[0.2em] text-brand-black/40">
          <p>© 2026 Listen HiFi Cafe. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-brand-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-black transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-silver selection:text-brand-black">
      <Navbar />
      <Hero />
      <Concept />
      <Experience />
      <Space />
      <MenuSection />
      <Booking />
      <Footer />
    </div>
  );
}
