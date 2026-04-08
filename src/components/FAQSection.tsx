import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQ[] = [
  {
    question: "What is a vinyl listening session?",
    answer: "A 90-minute experience where you listen to vinyl on a dedicated station using high-quality headphones. Designed for slow, focused listening."
  },
  {
    question: "How much does it cost?",
    answer: "RM25 per person for a 90-minute session. Each booking includes a listening station, headphones, and access to our vinyl collection."
  },
  {
    question: "What is included in the session?",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>1 listening station</li>
        <li>Audio-Technica turntable</li>
        <li>Headphones (based on pax)</li>
        <li>Access to 100+ vinyl records</li>
      </ul>
    )
  },
  {
    question: "Do I need experience using a turntable?",
    answer: "Not at all. Beginners are welcome, and guidance is available if needed."
  },
  {
    question: "How do I book a session?",
    answer: (
      <span>
        You can book directly through our online system. <a href="#booking" className="text-brand-orange hover:underline">Book here</a>.
      </span>
    )
  },
  {
    question: "Can I walk in without a booking?",
    answer: "Walk-ins are welcome, but slots are limited. We recommend booking in advance."
  }
];

const FAQItem: React.FC<{ question: string, answer: React.ReactNode, isOpen: boolean, onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-brand-white/10">
      <button
        className="w-full py-6 flex justify-between items-center text-left group"
        onClick={onClick}
      >
        <span className={`text-lg md:text-xl font-display transition-colors ${isOpen ? 'text-brand-orange' : 'text-brand-white group-hover:text-brand-orange'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-orange"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-brand-white/70 leading-relaxed font-light">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-brand-black">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-light mb-4">
            Common <span className="editorial-text">Questions.</span>
          </h2>
          <div className="w-20 h-1 bg-brand-orange mx-auto" />
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="relative inline-block group">
            <a
              href="https://wa.me/60123456789" // Placeholder number, user can update
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center text-brand-black transition-transform duration-300 group-hover:scale-110 group-active:scale-95 shadow-lg shadow-brand-orange/20">
                <MessageCircle size={32} />
              </div>
              <span className="text-brand-white/60 text-[10px] uppercase tracking-[0.3em] font-bold">WhatsApp Us</span>
            </a>
            
            {/* Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-12 bg-brand-charcoal text-brand-white text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-white/10">
              Contact us for further questions.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
