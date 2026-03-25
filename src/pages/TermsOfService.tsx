import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  CreditCard,
  Building2,
  Users,
  ChevronRight
} from 'lucide-react';

export const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Trincity College Limited (TRINCOL) booking platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
      icon: CheckCircle2
    },
    {
      title: "2. Booking & Reservations",
      content: "All bookings are subject to availability and confirmation by TRINCOL management. A booking is only considered confirmed once the required deposit or full payment has been received and a confirmation email has been issued. TRINCOL reserves the right to refuse any booking request at its sole discretion.",
      icon: CalendarIcon
    },
    {
      title: "3. Payment & Fees",
      content: "Payments must be made through the approved payment methods on the platform. All prices are subject to VAT (12.5%) and other applicable fees (cleaning, security, insurance). A refundable caution fee is required for most venue rentals to cover potential damages or overtime.",
      icon: CreditCard
    },
    {
      title: "4. Cancellation & Refunds",
      content: "Cancellations made more than 30 days before the event date are eligible for a full refund of the deposit. Cancellations made between 14-30 days prior are eligible for a 50% refund. Cancellations made less than 14 days before the event are non-refundable.",
      icon: Clock
    },
    {
      title: "5. Venue Usage Rules",
      content: "Users must adhere to all venue-specific rules, including noise ordinances, maximum capacity limits, and prohibited items. Any damage to the property or equipment will be deducted from the caution fee, and the user will be liable for any costs exceeding the caution fee amount.",
      icon: Building2
    },
    {
      title: "6. Liability & Insurance",
      content: "TRINCOL is not responsible for any loss, theft, or damage to personal property brought onto the premises. Users are required to have public liability insurance for certain event types, which can be purchased through our platform or provided by the user.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-20 h-20 bg-brand/10 text-brand rounded-3xl flex items-center justify-center mx-auto mb-8">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Terms of <span className="text-brand">Service</span></h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Last updated: March 25, 2026. Please read these terms carefully before using our booking platform.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-10 group hover:border-brand transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 group-hover:bg-brand group-hover:text-white rounded-xl flex items-center justify-center shrink-0 transition-all">
                    {section.icon ? <section.icon className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-lg">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-slate-900 rounded-[40px] text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full -mr-32 -mt-32" />
            <h3 className="text-2xl font-bold mb-6 relative z-10">Have questions about our terms?</h3>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
              If you have any questions or concerns regarding our terms of service, please don't hesitate to contact our legal department.
            </p>
            <button className="px-10 py-4 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] relative z-10">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper icon for the map
const CalendarIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
