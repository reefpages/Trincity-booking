import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  CheckCircle2, 
  Mail, 
  Database,
  Building2,
  Users,
  ChevronRight,
  FileText
} from 'lucide-react';

export const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as your name, email address, phone number, organization details, and payment information when you make a booking or create an account. We also collect data about your usage of our platform through cookies and similar technologies.",
      icon: Database
    },
    {
      title: "2. How We Use Your Information",
      content: "We use your information to process bookings, facilitate payments, communicate with you about your reservations, and improve our services. We may also use your data for marketing purposes, but only if you have explicitly opted in to receive such communications.",
      icon: CheckCircle2
    },
    {
      title: "3. Sharing of Information",
      content: "We do not sell your personal information to third parties. We may share your data with trusted service providers who assist us in operating our platform, such as payment processors and security personnel, but only to the extent necessary for them to perform their functions.",
      icon: Users
    },
    {
      title: "4. Data Security",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. This includes encryption of sensitive data and regular security audits of our systems.",
      icon: Lock
    },
    {
      title: "5. Your Rights & Choices",
      content: "You have the right to access, update, or delete your personal information at any time through your account settings. You can also opt out of marketing communications or request a copy of the data we hold about you.",
      icon: ShieldCheck
    },
    {
      title: "6. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on our platform and updating the 'Last updated' date.",
      icon: Eye
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="w-20 h-20 bg-brand/10 text-brand rounded-3xl flex items-center justify-center mx-auto mb-8">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Privacy <span className="text-brand">Policy</span></h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Last updated: March 25, 2026. Your privacy is our priority. Please read this policy carefully.
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
                    <section.icon className="w-6 h-6" />
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
            <h3 className="text-2xl font-bold mb-6 relative z-10">Questions about your data?</h3>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
              If you have any questions or concerns regarding our privacy policy or how we handle your data, please don't hesitate to contact our privacy officer.
            </p>
            <button className="px-10 py-4 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] relative z-10">
              Contact Privacy Officer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
