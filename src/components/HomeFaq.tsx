import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: string;
  num: string;
  category: string;
  question: string;
  answer: string;
}

export default function HomeFaq() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      num: "01",
      category: "Technical Specifications",
      question: "What is J/G Construction Services' typical turnaround time for a proposal?",
      answer: "We deliver initial feasibility analyses and comprehensive bidding proposals within 3 to 5 business days from the receipt of project blueprint assets, geotechnical reports, and structural metadata. For site emergency audits or structural stamp validations, we can deploy engineers for physical site reviews within 24 hours of notification."
    },
    {
      id: "faq-2",
      num: "02",
      category: "Compliance",
      question: "Are your calculations and designs certified under local regional building codes?",
      answer: "Absolutely. All engineering calculations, structural models, and drawing stamps strictly comply with the National Structural Code of the Philippines (NSCP), the International Building Code (IBC), and municipal zoning ordinances. Every blueprint is reviewed and wet-sealed by a licensed professional Civil & Structural Engineer."
    },
    {
      id: "faq-3",
      num: "03",
      category: "Logistics",
      question: "How does J/G prevent project delays and ensure efficient material delivery?",
      answer: "We employ highly structured pre-construction workflows and detailed Build Information Modeling (BIM) programs to detect structural clashes before fabrication begins. Additionally, we coordinate hand-in-hand with logistical suppliers using 'Just-In-Time' steel and concrete dispatch protocols, avoiding congested build sites in dense commercial centers."
    },
    {
      id: "faq-4",
      num: "04",
      category: "Procurement",
      question: "How do you achieve material cost-efficiency without compromising structural safety?",
      answer: "Through precise value engineering. Instead of standard high-margin raw material bulk over-ordering, our estimators use 3D laser-point topography mapping and structural stress distribution models. This allows us to optimize gusset plates, steel truss configurations, and concrete volume ratios perfectly to trim material waste by up to 15%."
    },
    {
      id: "faq-5",
      num: "05",
      category: "Technical Specifications",
      question: "Can J/G perform capacity ratings and retrofitting designs on pre-existing structures?",
      answer: "Yes, we have specialized credentials in structural forensic evaluation and seismic retrofitting. We conduct on-site core compression testing, ultrasonic non-destructive weld reviews, and finite element analysis to design robust carbon-fiber polymer (CFRP) wrapping or structural steel jacketing to restore stability."
    },
    {
      id: "faq-6",
      num: "06",
      category: "Compliance",
      question: "What safety protocols are practiced on J/G active engineering project fields?",
      answer: "Safety is our absolute foundational baseline. We maintain a proud zero-incident field record through daily pre-operations risk assessments, mandatory certified safety officer walkovers, strict double-locking scaffolding tieback protocols, and comprehensive hot-work permit guidelines."
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-black pb-4 mb-12 text-center">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black uppercase tracking-tight">
            Frequently Asked Questions (FAQs)
          </h2>
        </div>

        {/* Interactive Structural Accordion List */}
        <div className="space-y-4 text-left">
          {faqs.map((f) => {
            const isOpen = openFaqId === f.id;
            return (
              <div 
                key={f.id}
                className="border border-black bg-white transition-all duration-300 hover:shadow-[4px_4px_0px_#111111]"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFaq(f.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4 pr-4">
                    {/* Numeric Indicator */}
                    <span className="font-mono text-xs font-black text-[#1B49B8] bg-gray-50 border border-gray-200 px-2 py-0.5 shrink-0">
                      {f.num}
                    </span>
                    {/* Question Text */}
                    <span className="font-display font-extrabold text-[#111111] text-sm sm:text-base leading-snug">
                      {f.question}
                    </span>
                  </div>

                  {/* Expand Icons in red on active */}
                  <div className="shrink-0 ml-2">
                    <div className={`p-1.5 border border-black rounded-none transition-colors ${
                      isOpen ? 'bg-black text-white' : 'bg-white text-black'
                    }`}>
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Collapsible Answer area */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-[#444444] font-sans text-xs sm:text-sm leading-relaxed space-y-3">
                        <p>{f.answer}</p>
                        <div className="flex items-center gap-3 pt-3">
                          <span className="font-mono text-[9px] text-[#D41D1D] font-black uppercase tracking-widest bg-red-50 border border-red-200 px-2 py-0.5">
                            CATEGORY: {f.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
