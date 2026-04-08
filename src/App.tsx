/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronDown,
  Users,
  Info,
  Phone,
  Utensils,
  Facebook,
  Mail,
  MessageCircle
} from 'lucide-react';

import CinematicSwitch from './components/ui/cinematic-glow-toggle';
import { PolaroidStack } from './components/ui/PolaroidStack';
import LoadingScreen from './components/LoadingScreen';
import SocialMagicButton from './components/SocialMagicButton';
import FAQSection from './components/FAQSection';

// --- Constants ---

const ALL_DRINKS = [
  { name: "Matcha Strawberry", image: "https://i.postimg.cc/tgQjpNpR/Screenshot_2026_04_08_143740.png" },
  { name: "Coconut Matcha Cloud", image: "https://i.postimg.cc/nLbJpGpZ/Screenshot_2026_04_08_143744.png" },
  { name: "Black Yuzu", image: "https://i.postimg.cc/tgQjpNpX/Screenshot_2026_04_08_143749.png" },
  { name: "Soleil Bleu", image: "https://i.postimg.cc/zfZr8F88/Screenshot_2026_04_08_143753.png" },
  { name: "Shirley Temple", image: "https://i.postimg.cc/FK54NVNh/Screenshot_2026_04_08_143757.png" },
  { name: "Tunku Sunrise", image: "https://i.postimg.cc/ZqtS4x4K/Screenshot_2026_04_08_143802.png" },
  { name: "Americano", image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=800&auto=format&fit=crop" },
  { name: "Cappuccino", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop" },
  { name: "Latte", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop" },
  { name: "Caramel Latte", image: "https://images.unsplash.com/photo-1599398054066-846f28917f38?q=80&w=800&auto=format&fit=crop" },
  { name: "Hazelnut Latte", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop" },
  { name: "Mocha Latte", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=800&auto=format&fit=crop" },
  { name: "Flat White", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop" },
  { name: "Chocolate", image: "https://images.unsplash.com/photo-1544787210-2827448b312c?q=80&w=800&auto=format&fit=crop" },
  { name: "Double Chocolate", image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=800&auto=format&fit=crop" },
  { name: "Matcha", image: "https://images.unsplash.com/photo-1515823662273-ad951e6f327c?q=80&w=800&auto=format&fit=crop" },
  { name: "Hojicha", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop" },
  { name: "English Breakfast", image: "https://images.unsplash.com/photo-1544787210-2827448b312c?q=80&w=800&auto=format&fit=crop" },
  { name: "Earl Grey", image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=800&auto=format&fit=crop" },
  { name: "Chamomile", image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800&auto=format&fit=crop" },
];

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
    { name: 'Space', href: '#space' },
    { name: 'Tiers', href: '#pricing' },
    { name: 'Menu', href: '#menu' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Guidelines', href: '#guidelines' },
    { name: 'Location', href: '#location' },
    { name: 'Reserve', href: '#booking', primary: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-orange py-4 shadow-lg' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="transition-opacity hover:opacity-80">
          <img 
            src="https://i.postimg.cc/zfCwyxrL/Screenshot-2026-04-08-184553-(1).png" 
            alt="Listen HiFi Cafe Logo" 
            className={`h-12 w-auto object-contain ${isScrolled ? 'brightness-0' : 'brightness-0 invert'}`}
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                link.primary 
                  ? (isScrolled 
                      ? 'bg-brand-black text-brand-orange px-6 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95' 
                      : 'bg-brand-orange text-brand-black px-6 py-2.5 rounded-full font-bold hover:bg-brand-white transition-colors')
                  : (isScrolled 
                      ? 'text-brand-black hover:text-brand-black/60 font-medium' 
                      : 'text-brand-white/70 hover:text-brand-white font-medium')
              }`}
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
                  className={`text-xs uppercase tracking-[0.3em] font-bold py-2 ${
                    link.primary 
                      ? (isScrolled ? 'bg-brand-black text-brand-orange px-8 py-3 rounded-full mt-4' : 'bg-brand-orange text-brand-black px-8 py-3 rounded-full mt-4')
                      : (isScrolled ? 'text-brand-black' : 'text-brand-white')
                  }`}
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
        className="absolute inset-0 z-0 opacity-40"
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
          className="text-brand-white/60 text-sm md:text-base tracking-[0.2em] font-light max-w-lg mx-auto mt-6"
        >
          A slow space for the analog soul.
        </motion.p>
      </div>

      {/* Scroll Indicator - Moved outside the centered div to prevent overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-white/40 mb-4">Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-brand-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};

const Concept = () => {
  return (
    <section id="concept" className="relative min-h-[80vh] flex items-center justify-center py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://inline.imgix.net/branch/-OmSbhJ-IC30vZ_qe63h:inline-live-4--OmSbhRf0EEih2U0R_rC-d74f36d7-5d74-4a92-beac-1b21469953d6.png?auto=format&dpr=1&fit=crop&fm=jpg&h=456&w=1140" 
          alt="Listen HiFi Cafe Interior" 
          className="w-full h-full object-cover opacity-40 brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/60 to-brand-black" />
        <div className="absolute inset-0 bg-brand-black/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl font-display font-light mb-12 leading-tight text-brand-white">
            The Art of <br />
            <span className="editorial-text text-brand-orange">Intentionality.</span>
          </h2>
          <div className="space-y-6 text-brand-white/70 leading-relaxed max-w-2xl mx-auto font-light text-lg md:text-xl">
            <p>
              A listening space for slowing down with music. Listen HiFi Cafe is a small vinyl listening cafe designed for slow moments with music, coffee, and conversation. Each listening station is prepared for a focused vinyl listening experience.
            </p>
          </div>
          
          {/* Decorative Vinyl Record */}
          <div className="mt-20 flex justify-center">
            <div className="w-32 h-32 vinyl-record animate-[spin_15s_linear_infinite] opacity-30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-black rounded-full border border-white/10" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Space = () => {
  return (
    <section id="space" className="py-32 bg-brand-orange">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center p-8 md:p-16 bg-brand-black rounded-sm shadow-2xl border border-white/5"
          >
            <h2 className="text-4xl md:text-5xl font-display font-light mb-8 text-brand-white">
              Chow Kit, <br />
              <span className="editorial-text text-brand-orange">Reimagined.</span>
            </h2>
            <p className="text-brand-white/70 mb-12 max-w-md leading-relaxed font-light text-lg">
              Industrial textures meet the warmth of wood. Soft light. The KL skyline as your backdrop. A music sanctuary in the heart of the city.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden rounded-sm transition-all duration-700 border border-white/10">
                <img src="https://inline.imgix.net/branch/-OmSbhJ-IC30vZ_qe63h:inline-live-4--OmSbhRf0EEih2U0R_rC-4bdb757c-06c4-4640-a83a-d9b8616d19a9.png?auto=format&dpr=1&fit=crop&fm=jpg&h=456&w=1140" alt="Interior Texture" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square overflow-hidden rounded-sm transition-all duration-700 border border-white/10">
                <img src="https://inline.imgix.net/branch/-OmSbhJ-IC30vZ_qe63h:inline-live-4--OmSbhRf0EEih2U0R_rC-2668699a-4dc4-4956-92ed-b9f1aca7d187.png?auto=format&dpr=1&fit=crop&fm=jpg&h=456&w=1140" alt="Warm Wood Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[500px] overflow-hidden rounded-sm border border-black/10 shadow-2xl"
          >
            <img 
              src="https://inline.imgix.net/branch/-OmSbhJ-IC30vZ_qe63h:inline-live-4--OmSbhRf0EEih2U0R_rC-8c825cca-fd27-4dd1-8859-ea10e0dc58a5.png?auto=format&dpr=1&fit=crop&fm=jpg&h=456&w=1140" 
              alt="Listen HiFi Space" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-orange/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PricingTable = () => {
  const tiers = [
    {
      name: "Solo",
      price: "RM 25",
      pax: "1 Pax",
      headphones: "1 Pair",
      desc: "If you're coming solo",
      isPopular: false
    },
    {
      name: "Duo",
      price: "RM 50",
      pax: "2 Pax",
      headphones: "2 Pairs",
      desc: "Listen together",
      isPopular: true
    },
    {
      name: "Trio",
      price: "RM 75",
      pax: "3 Pax",
      headphones: "Up to 3",
      desc: "Shared listening",
      isPopular: false
    }
  ];

  const features = [
    { label: "Session Duration", values: ["90 Mins", "90 Mins", "90 Mins"] },
    { label: "Vinyl Listening Station", values: ["1 Station", "1 Station", "1 Station"] },
    { label: "Audio-Technica Turntable", values: ["1 Unit", "1 Unit", "1 Unit"] },
    { label: "Closed-back Headphones", values: ["1 Pair", "2 Pairs", "Up to 3"] },
    { label: "Vinyl Library Access", values: ["100+ Records", "100+ Records", "100+ Records"] },
    { label: "Shared Setup", values: ["No", "No", "Yes"] }
  ];

  return (
    <section id="pricing" className="py-32 bg-brand-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-brand-silver uppercase tracking-[0.3em] text-[10px] mb-4">The Sessions</p>
          <h2 className="text-4xl md:text-5xl font-display font-light italic font-serif">Listening Tiers</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px] rounded-sm border border-white/5 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 border-b border-white/10 p-12 bg-white/[0.05]">
              <div className="flex items-end pb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-white/40">Features</span>
              </div>
              {tiers.map((tier, i) => (
                <div key={i} className="text-center px-4 flex flex-col items-center">
                  <div className="relative w-24 h-20 mb-6 flex items-center justify-center">
                    {[...Array(i + 1)].map((_, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8, x: -10 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + idx * 0.1 }}
                        className="absolute w-14 h-14 vinyl-record flex items-center justify-center border border-white/40 shadow-2xl"
                        style={{ 
                          left: `calc(50% - 28px + ${idx * 8}px)`,
                          top: `calc(50% - 28px - ${idx * 4}px)`,
                          zIndex: 10 - idx 
                        }}
                      >
                        {/* White Inner Label */}
                        <div className="w-5 h-5 bg-brand-white rounded-full flex items-center justify-center shadow-inner">
                          {/* Spindle Hole */}
                          <div className="w-1 h-1 bg-brand-black rounded-full" />
                        </div>
                        {/* Subtle Grooves Effect */}
                        <div className="absolute inset-1 rounded-full border border-white/10 pointer-events-none" />
                        <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
                      </motion.div>
                    ))}
                  </div>
                  <h3 className="text-xl font-display font-medium mb-1">{tier.name}</h3>
                  <p className="text-brand-silver font-display text-sm">{tier.price}</p>
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className={`grid grid-cols-4 py-5 px-12 transition-colors hover:bg-white/5 ${i % 2 === 1 ? 'bg-white/[0.05]' : ''}`}
                >
                  <div className="text-xs text-brand-white/60 flex items-center">
                    {feature.label}
                  </div>
                  {feature.values.map((val, j) => (
                    <div key={j} className="text-center text-xs font-light text-brand-white/80 flex items-center justify-center">
                      {val === "Yes" ? <div className="w-1.5 h-1.5 bg-brand-orange rounded-full" /> : 
                       val === "No" ? <span className="opacity-20">—</span> : val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-brand-white/50 text-sm font-light italic">
            You’re also welcome to enjoy our coffee / non-coffee drinks with light bites while listening ☕️🎧
          </p>
        </div>
      </div>
    </section>
  );
};

const MenuSection = ({ 
  onDrinkClick, 
  selectedDrinkIndex 
}: { 
  onDrinkClick: (name: string) => void,
  selectedDrinkIndex: number
}) => {
  const [isFullMenu, setIsFullMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const featuredDrinks = [
    { name: "Matcha Strawberry", hot: "15", iced: "16.5", image: "https://i.postimg.cc/tgQjpNpR/Screenshot_2026_04_08_143740.png" },
    { name: "Coconut Matcha Cloud", iced: "16.5", image: "https://i.postimg.cc/nLbJpGpZ/Screenshot_2026_04_08_143744.png" },
    { name: "Black Yuzu", iced: "13.5", image: "https://i.postimg.cc/tgQjpNpX/Screenshot_2026_04_08_143749.png" },
    { name: "Soleil Bleu", iced: "14.5", image: "https://i.postimg.cc/zfZr8F88/Screenshot_2026_04_08_143753.png" },
    { name: "Shirley Temple", iced: "14.5", image: "https://i.postimg.cc/FK54NVNh/Screenshot_2026_04_08_143757.png" },
    { name: "Tunku Sunrise", iced: "16.5", image: "https://i.postimg.cc/ZqtS4x4K/Screenshot_2026_04_08_143802.png" },
  ];

  const fullMenu = {
    coffee: [
      { name: "Americano", hot: "9", iced: "10" },
      { name: "Cappuccino", hot: "12", iced: "13.5" },
      { name: "Latte", hot: "12", iced: "13.5" },
      { name: "Caramel Latte", hot: "13", iced: "14.5" },
      { name: "Hazelnut Latte", hot: "13", iced: "14.5" },
      { name: "Mocha Latte", hot: "14", iced: "15.5" },
      { name: "Flat White", hot: "12" },
    ],
    nonCoffee: [
      { name: "Chocolate", hot: "14", iced: "15.5" },
      { name: "Double Chocolate", iced: "16.5" },
      { name: "Matcha", hot: "14", iced: "15.5" },
      { name: "Hojicha", hot: "15", iced: "16.5" },
    ],
    teas: [
      { name: "English Breakfast", hot: "9" },
      { name: "Earl Grey", hot: "9" },
      { name: "Chamomile", hot: "9" },
    ]
  };

  return (
    <section id="menu" className="py-32 bg-brand-charcoal overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="text-center md:text-left">
            <p className="text-brand-silver uppercase tracking-[0.3em] text-[10px] mb-4">The Sensory Pairing</p>
            <h2 className="text-4xl md:text-5xl font-display font-light italic font-serif">Coffee & Sips</h2>
          </div>
          
          <CinematicSwitch 
            isOn={isFullMenu} 
            onToggle={() => setIsFullMenu(!isFullMenu)} 
          />
        </div>

        <AnimatePresence mode="wait">
          {!isFullMenu ? (
            <motion.div 
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16"
            >
              {featuredDrinks.map((d, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => onDrinkClick(d.name)}>
                  <div className="aspect-[3/4] overflow-hidden rounded-sm mb-6 transition-all duration-700 border border-white/5">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-display font-medium mb-2 group-hover:text-brand-orange transition-colors">{d.name}</h3>
                    <div className="flex justify-center gap-4 text-[10px] uppercase tracking-widest text-brand-white/40">
                      {d.hot && <span>hot <span className="text-brand-orange ml-1">rm {d.hot}</span></span>}
                      {d.iced && <span>iced <span className="text-brand-orange ml-1">rm {d.iced}</span></span>}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-3 gap-16 mb-24">
                {/* Coffee */}
                <div>
                  <h3 className="text-brand-orange text-[10px] uppercase tracking-[0.3em] font-bold mb-10 border-b border-brand-orange/20 pb-4">Coffee</h3>
                  <div className="space-y-6">
                    {fullMenu.coffee.map((item, i) => (
                      <div key={i} className="flex justify-between items-end group cursor-pointer" onClick={(e) => { e.stopPropagation(); onDrinkClick(item.name); }}>
                        <span className="text-brand-white/80 font-display group-hover:text-brand-white transition-colors">{item.name}</span>
                        <div className="flex gap-4 text-xs font-mono text-brand-orange">
                          {item.hot && <div className="flex flex-col items-center"><span className="text-[8px] text-brand-white/20 uppercase mb-1">hot</span>{item.hot}</div>}
                          {item.iced && <div className="flex flex-col items-center"><span className="text-[8px] text-brand-white/20 uppercase mb-1">iced</span>{item.iced}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Non-Coffee */}
                <div>
                  <h3 className="text-brand-orange text-[10px] uppercase tracking-[0.3em] font-bold mb-10 border-b border-brand-orange/20 pb-4">Non-Coffee</h3>
                  <div className="space-y-6">
                    {fullMenu.nonCoffee.map((item, i) => (
                      <div key={i} className="flex justify-between items-end group cursor-pointer" onClick={(e) => { e.stopPropagation(); onDrinkClick(item.name); }}>
                        <span className="text-brand-white/80 font-display group-hover:text-brand-white transition-colors">{item.name}</span>
                        <div className="flex gap-4 text-xs font-mono text-brand-orange">
                          {item.hot && <div className="flex flex-col items-center"><span className="text-[8px] text-brand-white/20 uppercase mb-1">hot</span>{item.hot}</div>}
                          {item.iced && <div className="flex flex-col items-center"><span className="text-[8px] text-brand-white/20 uppercase mb-1">iced</span>{item.iced}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teas */}
                <div className="flex flex-col h-full">
                  <h3 className="text-brand-orange text-[10px] uppercase tracking-[0.3em] font-bold mb-10 border-b border-brand-orange/20 pb-4">Classic Teas</h3>
                  <div className="space-y-6 mb-12">
                    {fullMenu.teas.map((item, i) => (
                      <div key={i} className="flex justify-between items-end group cursor-pointer" onClick={(e) => { e.stopPropagation(); onDrinkClick(item.name); }}>
                        <span className="text-brand-white/80 font-display group-hover:text-brand-white transition-colors">{item.name}</span>
                        <div className="flex gap-4 text-xs font-mono text-brand-orange">
                          {item.hot && <div className="flex flex-col items-center"><span className="text-[8px] text-brand-white/20 uppercase mb-1">hot</span>{item.hot}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Polaroid Stack positioned at the bottom of the 3rd column */}
                  <div className="mt-auto pt-12">
                    <PolaroidStack items={ALL_DRINKS} selectedIndex={selectedDrinkIndex} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <p className="text-center mt-24 text-brand-white/40 text-[10px] uppercase tracking-[0.2em] font-light italic">
          * Specialty beans rotated monthly. Essential pairings only.
        </p>
      </div>
    </section>
  );
};

const Booking = () => {
  return (
    <section id="booking" className="py-32 bg-brand-black relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://inline.imgix.net/branch/-OmSbhJ-IC30vZ_qe63h:inline-live-4--OmSbhRf0EEih2U0R_rC-1e1cea88-8f23-4e4b-b6a2-bbc18d93622d.png?auto=format&dpr=1&fit=crop&fm=jpg&h=456&w=1140" 
          alt="Listen HiFi Cafe Atmosphere" 
          className="w-full h-full object-cover opacity-30 brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/40 to-brand-black" />
      </div>
      
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
          <a 
            href="https://inline.app/booking/listenhifi/cafe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-brand-white text-brand-black px-12 py-5 rounded-full font-display font-bold uppercase tracking-widest hover:bg-brand-silver transition-all transform hover:scale-105 text-center"
          >
            Book Now
          </a>
          <a 
            href="#pricing"
            className="w-full md:w-auto border border-white/20 px-12 py-5 rounded-full font-display font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-center"
          >
            Session details
          </a>
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

const Press = () => {
  const logos = [
    { name: "The Rakyat Post", url: "https://www.therakyatpost.com/wp-content/webp-express/webp-images/uploads/2019/12/TRP_SW-scaled-min.png.webp" },
    { name: "EatDrinkKL", url: "https://www.eatdrinkkl.com/assets/edkl-logo-9696bb3351897f330936927f06a5f53444fec18d3c9078e8fbea532dac6d5234.png" },
    { name: "Says", url: "https://says.com/my/_next/image?url=%2Fmy%2Fimages%2Flogo.png&w=1920&q=75" },
    { name: "Newswav", url: "https://newswav.com/_ipx/q_80&s_127x24/https://cdn.newswav.com/branding/logo/newswav.png" }
  ];

  return (
    <section className="py-20 bg-brand-black border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-brand-white/30 mb-12">Featured In</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="h-8 md:h-10 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="max-h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const navLinks = [
    { name: "Concept", href: "#concept" },
    { name: "Space", href: "#space" },
    { name: "Tiers", href: "#pricing" },
    { name: "Menu", href: "#menu" },
    { name: "FAQ", href: "#faq" },
    { name: "Guidelines", href: "#guidelines" },
    { name: "Location", href: "#location" }
  ];

  return (
    <footer className="py-20 bg-brand-orange text-brand-black border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <div className="mb-8">
              <img 
                src="https://i.postimg.cc/zfCwyxrL/Screenshot-2026-04-08-184553-(1).png" 
                alt="Listen HiFi Cafe Logo" 
                className="h-16 w-auto object-contain brightness-0"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-brand-black/70 max-w-xs leading-relaxed text-sm">
              A space for intentional listening and specialty coffee in the heart of Kuala Lumpur.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40 mb-6 font-bold">Visit</h4>
            <address className="not-italic text-sm text-brand-black/80 space-y-2">
              <p>10, Jalan Kamunting,</p>
              <p>Chow Kit, 50300 Kuala Lumpur,</p>
              <p>Wilayah Persekutuan Kuala Lumpur</p>
              <p className="pt-4 font-medium">Closed on Mondays</p>
            </address>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40 mb-6 font-bold">Explore</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm text-brand-black/80 hover:text-brand-black transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-black/40 mb-6 font-bold">Connect</h4>
            <div className="flex flex-col space-y-4">
              <a href="https://www.instagram.com/listenhifi.cafe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-brand-black/80 hover:text-brand-black transition-colors">
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@listenhifi.cafe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-brand-black/80 hover:text-brand-black transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                <span>TikTok</span>
              </a>
              <a href="https://www.facebook.com/listenhifi.cafe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-brand-black/80 hover:text-brand-black transition-colors">
                <Facebook size={16} />
                <span>Facebook</span>
              </a>
              <a href="https://wa.me/60126442264" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-brand-black/80 hover:text-brand-black transition-colors pt-2 border-t border-black/5">
                <MessageCircle size={16} />
                <span>Contact Us</span>
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

const GuidelinesSection = () => {
  const guidelines = [
    {
      title: "Food and Drinks",
      icon: <Coffee className="w-5 h-5" />,
      content: [
        "Listen offers a curated selection of coffee, specialty drinks, teas, and seasonal beverages, along with a small selection of pastries.",
        "Guests will place their first order during check-in before the listening session starts.",
        "Additional drinks or food may be ordered during the session by scanning the QR code assigned to your table.",
        "To maintain a comfortable listening environment, outside food and drinks are not allowed."
      ]
    },
    {
      title: "Listening Sessions",
      icon: <Music className="w-5 h-5" />,
      content: [
        "Each vinyl listening session runs for 90 minutes. Your session begins at the reserved booking time.",
        "We recommend arriving about 10 minutes early for check-in and to settle in before the music starts.",
        "For hygiene purposes, a disposable headphone cover will be provided for each guest.",
        "A quick guide and instruction video will be available at your table to help you get started."
      ]
    },
    {
      title: "Group Bookings",
      icon: <Users className="w-5 h-5" />,
      content: [
        "Each listening station is designed for 1–3 guests to keep the experience comfortable.",
        "For 4 guests, please make 2 bookings (2+2). For 5 guests, make 2 bookings (3+2).",
        "Walk-ins are welcome depending on seat availability.",
        <span>For special inquiries, feel free to contact us via <a href="https://wa.me/60126442264" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">WhatsApp</a>.</span>
      ]
    },
    {
      title: "General Info",
      icon: <Info className="w-5 h-5" />,
      content: [
        "Age Guideline: Listen welcomes guests aged 13 and above.",
        "Reservation Confirmation: A confirmation email will be sent once your booking is completed.",
        "Please confirm your reservation at least one day before your visit.",
        "Kindly present the confirmation email during check-in."
      ]
    }
  ];

  return (
    <section id="guidelines" className="py-32 bg-brand-orange">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 p-10 md:p-12 bg-brand-black rounded-sm border border-white/5 shadow-2xl"
        >
          <p className="text-brand-white/40 uppercase tracking-[0.3em] text-[10px] mb-4">House Rules</p>
          <h2 className="text-4xl md:text-5xl font-display font-light italic font-serif text-brand-white">Booking Guidelines</h2>
          <p className="mt-6 text-brand-white/70 max-w-2xl font-light text-lg">
            Sessions are limited to maintain a calm listening environment. Reservations are recommended, especially during peak hours.
          </p>
        </motion.div>

        {/* Guidelines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {guidelines.map((group, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-brand-black rounded-sm border border-white/5 flex flex-col h-full hover:scale-[1.02] transition-all duration-500 shadow-xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-6">
                <div className="text-brand-orange">{group.icon}</div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-white">{group.title}</h3>
              </div>
              <ul className="space-y-5 flex-grow">
                {group.content.map((item, j) => (
                  <li key={j} className="text-sm leading-relaxed font-light text-brand-white/70 flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section id="location" className="py-32 bg-brand-charcoal text-brand-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Map Column - Smaller and on the left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-2xl transition-all duration-700"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.765636363243!2d101.6974228!3d3.1567167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc499f256f1a11%3A0x191bf47f7cb4535e!2sListen%20HiFi%20Cafe!5e0!3m2!1sen!2smy!4v1712568000000!5m2!1sen!2smy" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="eager" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Listen HiFi Cafe Location"
            ></iframe>
          </motion.div>

          {/* Info Column - On the right */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-10"
          >
            <div>
              <p className="text-brand-orange uppercase tracking-[0.3em] text-[10px] mb-4">Find Us</p>
              <h2 className="text-4xl md:text-5xl font-display font-light italic font-serif">Restaurant information</h2>
            </div>

            <div className="grid gap-y-8">
              <div className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-orange border border-white/10 group-hover:bg-brand-orange group-hover:text-brand-black transition-all duration-500">
                  <MapPin size={20} />
                </div>
                <div className="pt-1">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-brand-white/40">Location</h3>
                  <p className="text-sm text-brand-white/70 font-light leading-relaxed">
                    Level 3, 2, Jalan Kamunting, Chow Kit, <br />
                    50300 Kuala Lumpur, Wilayah Persekutuan <br />
                    Kuala Lumpur, Malaysia
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-orange border border-white/10 group-hover:bg-brand-orange group-hover:text-brand-black transition-all duration-500">
                  <Phone size={20} />
                </div>
                <div className="pt-1">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-brand-white/40">Phone number</h3>
                  <p className="text-sm text-brand-white/70 font-light">0126442264</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-orange border border-white/10 group-hover:bg-brand-orange group-hover:text-brand-black transition-all duration-500">
                  <Clock size={20} />
                </div>
                <div className="pt-1">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-brand-white/40">Hours</h3>
                  <p className="text-sm text-brand-white/70 font-light">Tue — Sun: 12PM — 8PM</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-pulse" />
                    <p className="text-[10px] text-brand-orange uppercase tracking-wider font-bold">Open until 20:00</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-orange border border-white/10 group-hover:bg-brand-orange group-hover:text-brand-black transition-all duration-500">
                  <Utensils size={20} />
                </div>
                <div className="pt-1">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-brand-white/40">Cuisine</h3>
                  <p className="text-sm text-brand-white/70 font-light">Cafe</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [selectedDrinkIndex, setSelectedDrinkIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectedDrinkIndex(-1);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDrinkClick = (name: string) => {
    const index = ALL_DRINKS.findIndex(d => d.name === name);
    setSelectedDrinkIndex(index);
  };

  return (
    <div className="min-h-screen selection:bg-brand-silver selection:text-brand-black">
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <Navbar />
        <Hero />
        <Concept />
        <Space />
        <PricingTable />
        <MenuSection onDrinkClick={handleDrinkClick} selectedDrinkIndex={selectedDrinkIndex} />
        <FAQSection />
        <GuidelinesSection />
        <Booking />
        <Press />
        <MapSection />
        <Footer />
        <SocialMagicButton />
      </motion.div>
    </div>
  );
}
