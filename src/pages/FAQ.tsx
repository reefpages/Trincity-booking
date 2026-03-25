import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus, 
  Search, 
  HelpCircle, 
  MessageSquare, 
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Booking',
      question: "How do I book a venue?",
      answer: "You can book a venue by browsing our listings, selecting your preferred venue, choosing your dates and times on the calendar, and completing the booking form. Once submitted and paid, you'll receive a confirmation email."
    },
    {
      category: 'Payment',
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards (Visa, Mastercard), as well as bank transfers and online payment platforms. For large bookings, we also offer structured payment plans."
    },
    {
      category: 'Cancellation',
      question: "What is your cancellation policy?",
      answer: "Cancellations made more than 30 days before the event are eligible for a full refund. Cancellations between 14-30 days prior receive a 50% refund. Cancellations less than 14 days before the event are non-refundable."
    },
    {
      category: 'Venue',
      question: "Can I bring my own catering?",
      answer: "Yes, most of our venues allow outside catering. However, some premium venues have preferred catering partners. Please check the specific venue details or contact us for more information."
    },
    {
      category: 'Venue',
      question: "Is security provided for events?",
      answer: "Basic security is provided for all events. Depending on the size and nature of your event, additional security personnel may be required at an extra cost."
    },
    {
      category: 'Booking',
      question: "Can I view the venue before booking?",
      answer: "Absolutely! We encourage venue tours. You can schedule a tour by contacting our team through the 'Contact' page or by calling us directly."
    }
  ];

  const categories = ['All', 'Booking', 'Payment', 'Cancellation', 'Venue'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Frequently Asked <span className="text-brand">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg leading-relaxed"
          >
            Find answers to common questions about our booking process, venues, and policies.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
              <input 
                type="text" 
                placeholder="Search for questions..."
                className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap",
                    activeCategory === cat 
                      ? "bg-brand text-white shadow-lg shadow-brand/20" 
                      : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-card overflow-hidden"
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full p-8 flex items-center justify-between text-left hover:bg-slate-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        openIndex === idx ? "bg-brand text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      )}>
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                    </div>
                    {openIndex === idx ? (
                      <Minus className="w-5 h-5 text-brand" />
                    ) : (
                      <Plus className="w-5 h-5 text-slate-300 group-hover:text-brand" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-8 pt-0 pl-24 text-slate-500 leading-relaxed text-lg">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500">Try adjusting your search or category filters.</p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-20 p-12 bg-slate-900 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-slate-400 max-w-md">Our support team is available Mon-Fri, 8am-5pm to assist you.</p>
            </div>
            <button className="px-10 py-4 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 relative z-10">
              <MessageSquare className="w-5 h-5" /> Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
