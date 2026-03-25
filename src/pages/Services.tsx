import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  Music, 
  Utensils, 
  ShieldCheck, 
  Camera, 
  Wifi, 
  Coffee,
  ArrowRight,
  Sparkles,
  Mic2,
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { LISTINGS } from '../data/listings';

export const Services = () => {
  const services = [
    {
      title: "Event Planning",
      description: "Professional assistance to help you plan and execute your event flawlessly.",
      icon: Sparkles,
      color: "bg-brand/10 text-brand"
    },
    {
      title: "Audio Visual Support",
      description: "State-of-the-art sound systems, projectors, and technical support for all events.",
      icon: Mic2,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Catering Services",
      description: "A wide range of menu options from coffee breaks to full banquet dinners.",
      icon: Utensils,
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Security & Safety",
      description: "Dedicated security personnel and safety protocols for peace of mind.",
      icon: ShieldCheck,
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Photography & Video",
      description: "Capture every moment with our professional media production services.",
      icon: Camera,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "High-Speed Connectivity",
      description: "Reliable fiber-optic internet and dedicated Wi-Fi for your guests.",
      icon: Wifi,
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Our Premium <span className="text-brand">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg leading-relaxed"
          >
            Beyond just venues, we provide a comprehensive suite of services to ensure your event is a resounding success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 group hover:border-brand transition-all"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8">{service.description}</p>
              <Link to="/contact" className="text-brand font-bold text-sm flex items-center gap-2 hover:underline">
                Inquire Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[48px] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Need a Custom <br /><span className="text-brand">Event Package?</span></h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                Our team can tailor a package specifically for your needs, combining multiple venues and services at a special rate.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/contact" className="px-10 py-5 bg-brand text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] text-center">
                  Contact Our Team
                </Link>
                <Link to="/venues" className="px-10 py-5 bg-white/10 text-white rounded-2xl font-bold text-lg transition-all hover:bg-white/20 text-center">
                  Browse Venues
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Events Hosted', value: '2,500+' },
                { label: 'Happy Clients', value: '1,800+' },
                { label: 'Service Staff', value: '150+' },
                { label: 'Venue Options', value: `${LISTINGS.length}+` }
              ].map((stat, idx) => (
                <div key={idx} className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
