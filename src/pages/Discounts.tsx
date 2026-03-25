import React from 'react';
import { motion } from 'motion/react';
import { 
  Tag, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  Gift,
  Percent
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export const Discounts = () => {
  const discountTypes = [
    {
      title: "Alumni Discount",
      value: "15% OFF",
      description: "Exclusive discount for all Trincity College alumni members. Verification required.",
      icon: Users,
      color: "bg-brand/10 text-brand"
    },
    {
      title: "Early Bird Special",
      value: "10% OFF",
      description: "Book your venue at least 6 months in advance and enjoy a special rate.",
      icon: Clock,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Corporate Package",
      value: "20% OFF",
      description: "Special rates for recurring corporate bookings and multi-day conferences.",
      icon: Percent,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Non-Profit Rate",
      value: "25% OFF",
      description: "Reduced rates for registered non-profit organizations and community groups.",
      icon: ShieldCheck,
      color: "bg-amber-50 text-amber-600"
    }
  ];

  const currentPromos = [
    {
      code: "SUMMER2026",
      title: "Summer Event Special",
      description: "Get 10% off all bookings for June, July, and August.",
      expiry: "Expires Aug 31, 2026"
    },
    {
      code: "NEWYEAR15",
      title: "New Year Celebration",
      description: "Book your January event now and save 15% on venue rental.",
      expiry: "Expires Jan 31, 2027"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-brand/10 text-brand rounded-3xl flex items-center justify-center mx-auto mb-8"
          >
            <Tag className="w-10 h-10" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Special Rates & <span className="text-brand">Discounts</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg leading-relaxed"
          >
            We believe in making our spaces accessible. Explore our various discount programs and promotional offers.
          </motion.p>
        </div>

        {/* Discount Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {discountTypes.map((type, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 group hover:border-brand transition-all"
            >
              <div className={`w-14 h-14 ${type.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all`}>
                <type.icon className="w-7 h-7" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">{type.value}</p>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{type.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8">{type.description}</p>
              <Link to="/register" className="text-brand font-bold text-sm flex items-center gap-2 hover:underline">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Active Promo Codes */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-4">
              <Gift className="w-8 h-8 text-brand" /> Active Promo Codes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentPromos.map((promo, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand/20 blur-[80px] rounded-full -mr-24 -mt-24 group-hover:scale-125 transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="px-6 py-2 bg-brand text-white rounded-full font-bold text-sm tracking-widest">
                      {promo.code}
                    </div>
                    <span className="text-slate-400 text-sm font-medium">{promo.expiry}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{promo.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8">{promo.description}</p>
                  <button className="flex items-center gap-2 text-brand font-bold hover:underline">
                    Copy Code <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Verification Callout */}
        <div className="bg-white rounded-[48px] p-12 md:p-20 border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Get Verified for <br /><span className="text-brand">Maximum Savings</span></h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Certain discounts like Alumni and Non-Profit rates require a one-time verification. Once verified, these discounts will be automatically applied to all your future bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/register" className="px-10 py-5 bg-brand text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] text-center">
                Create Verified Account
              </Link>
              <Link to="/faq" className="px-10 py-5 bg-slate-50 text-slate-600 rounded-2xl font-bold text-lg transition-all hover:bg-slate-100 text-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Automatic Application', icon: Sparkles },
              { label: 'Priority Support', icon: Users },
              { label: 'Exclusive Offers', icon: Gift },
              { label: 'Flexible Payments', icon: Calendar }
            ].map((benefit, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:border-brand transition-all">
                <div className="w-12 h-12 bg-white text-slate-400 group-hover:bg-brand group-hover:text-white rounded-xl flex items-center justify-center mb-4 transition-all shadow-sm">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-900">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
