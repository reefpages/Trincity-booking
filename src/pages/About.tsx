import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Users, 
  History, 
  Target, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  const stats = [
    { label: 'Years of Excellence', value: '25+', icon: History },
    { label: 'Events Hosted', value: '10k+', icon: Building2 },
    { label: 'Happy Clients', value: '8k+', icon: Users },
    { label: 'Awards Won', value: '15+', icon: Award }
  ];

  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in every event we host, ensuring the highest standards of service and quality.",
      icon: Award,
      color: "bg-brand/10 text-brand"
    },
    {
      title: "Community",
      description: "We are deeply rooted in our community, providing spaces that bring people together and foster connections.",
      icon: Users,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Innovation",
      description: "We continuously innovate our services and platform to provide a seamless and modern booking experience.",
      icon: Target,
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Integrity",
      description: "We operate with integrity and transparency, building trust with our clients and partners.",
      icon: ShieldCheck,
      color: "bg-green-50 text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 bg-white text-brand rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-xl p-6"
          >
            <img 
              src="https://storage.googleapis.com/test-media-ais-dev/avr6zxhqvpqodcrngx4mkl/shekeeladesigns@gmail.com/logo.png" 
              alt="Trincity College Limited" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight"
          >
            Redefining Event <br /><span className="text-brand">Spaces & Experiences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Trincity College Limited (TRINCOL) is a premier provider of versatile venue spaces and professional event services in Trinidad & Tobago.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 text-center group hover:border-brand transition-all"
            >
              <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all">
                <stat.icon className="w-7 h-7" />
              </div>
              <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="relative">
            <div className="aspect-square rounded-[64px] overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/college/1200/1200" 
                alt="Trincity College Campus" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand rounded-[48px] p-10 text-white shadow-2xl flex flex-col justify-center">
              <Heart className="w-10 h-10 mb-4" />
              <p className="text-2xl font-bold mb-2">Built with Passion</p>
              <p className="text-white/60 text-sm font-medium">Since 2001, we've been the heart of community events.</p>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Our Story, Mission & <span className="text-brand">Vision</span></h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Founded over two decades ago, Trincity College Limited has evolved from a local educational institution into a multifaceted organization that serves the community through education and professional event hosting.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-brand" />
                  Our Mission
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  To enhance the quality of the physical structure and provide an environment that is safe, efficient and comfortable in a manner that will exceed our customers’ expectations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand" />
                  Our Vision
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  To provide world class educational facilities and becoming known for setting the benchmark in excellence and continuous improvements.
                </p>
              </div>
            </div>
            <div className="space-y-4 pt-4">
              {[
                'State-of-the-art facilities and equipment',
                'Dedicated professional support staff',
                'Commitment to safety and accessibility',
                'Sustainable and community-focused practices'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-slate-700 font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Core <span className="text-brand">Values</span></h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              These principles guide everything we do, from how we manage our venues to how we interact with our clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-10 group hover:border-brand transition-all"
              >
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-slate-900 rounded-[48px] p-12 md:p-24 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 blur-[120px] rounded-full -mr-48 -mt-48" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Join Our <span className="text-brand">Community</span></h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Whether you're planning a wedding, a corporate conference, or a small workshop, we have the perfect space for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/venues" className="px-12 py-5 bg-brand text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]">
                Browse Our Venues
              </Link>
              <Link to="/contact" className="px-12 py-5 bg-white/10 text-white rounded-2xl font-bold text-lg transition-all hover:bg-white/20">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
