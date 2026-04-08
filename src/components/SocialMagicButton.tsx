import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Instagram, Disc } from 'lucide-react';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const socialLinks = [
  { 
    name: 'Instagram', 
    icon: <Instagram size={20} />, 
    href: 'https://www.instagram.com/listenhifi/',
    color: 'bg-[#E4405F]' 
  },
  { 
    name: 'TikTok', 
    icon: <TikTokIcon size={20} />, 
    href: 'https://www.tiktok.com/@listenhifi',
    color: 'bg-[#000000]' 
  },
  { 
    name: 'Facebook', 
    icon: <Facebook size={20} />, 
    href: 'https://web.facebook.com/profile.php?id=61582342982304',
    color: 'bg-[#1877F2]' 
  },
];

export default function SocialMagicButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      className="fixed bottom-8 right-8 z-[100] flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1 } 
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                className={`${social.color} text-white p-3 rounded-full shadow-xl flex items-center justify-center border border-white/20 hover:shadow-brand-orange/20`}
                title={social.name}
                onClick={(e) => e.stopPropagation()}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 bg-[#080808] rounded-full shadow-2xl flex items-center justify-center border-2 border-brand-orange group overflow-hidden"
        animate={{ rotate: isOpen ? 360 : 0 }}
        transition={{ 
          rotate: { 
            duration: isOpen ? 3 : 0.5, 
            repeat: isOpen ? Infinity : 0, 
            ease: "linear" 
          } 
        }}
      >
        {/* Vinyl Grooves Effect - More detailed */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 rounded-full border border-white/5" 
            style={{ margin: `${(i + 1) * 4}px` }}
          />
        ))}
        
        {/* Center Label */}
        <div className="absolute w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center z-10 shadow-inner">
          <div className="w-1.5 h-1.5 bg-brand-black rounded-full" />
        </div>

        <Disc 
          className={`text-brand-orange/40 transition-transform duration-500 ${isOpen ? 'scale-110' : 'scale-100'}`} 
          size={48} 
          strokeWidth={1}
        />
      </motion.button>
      
      {/* Tooltip */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
        className="absolute right-20 top-1/2 -translate-y-1/2 bg-brand-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg pointer-events-none whitespace-nowrap"
      >
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-orange">Connect with us</p>
      </motion.div>
    </div>
  );
}
