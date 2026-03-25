import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Shield, 
  Star, 
  Zap, 
  MapPin, 
  Users, 
  Calendar,
  Search,
  Building2,
  Trees,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

import { LISTINGS } from '../data/listings';

const CATEGORIES = [
  { 
    id: 'Indoor Venues', 
    title: 'Indoor Venues', 
    icon: Building2, 
    count: LISTINGS.filter(l => l.category === 'Indoor Venues').length, 
    color: 'bg-blue-50 text-blue-600' 
  },
  { 
    id: 'Outdoor Listings', 
    title: 'Outdoor Listings', 
    icon: Trees, 
    count: LISTINGS.filter(l => l.category === 'Outdoor Listings').length, 
    color: 'bg-green-50 text-green-600' 
  },
  { 
    id: 'Classrooms and Labs', 
    title: 'Classrooms & Labs', 
    icon: GraduationCap, 
    count: LISTINGS.filter(l => l.category === 'Classrooms and Labs').length, 
    color: 'bg-orange-50 text-orange-600' 
  },
  { 
    id: 'Special Rooms', 
    title: 'Special Rooms', 
    icon: Sparkles, 
    count: LISTINGS.filter(l => l.category === 'Special Rooms').length, 
    color: 'bg-purple-50 text-purple-600' 
  },
];

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl p-6">
              <img 
                src="https://storage.googleapis.com/test-media-ais-dev/avr6zxhqvpqodcrngx4mkl/shekeeladesigns@gmail.com/logo.png" 
                alt="Trincity College Limited" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="inline-block py-1 px-3 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-widest uppercase mb-6">
              Trincity College Limited
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1]">
              Find the Perfect <span className="text-brand">Venue</span> <br />
              for Your Next Event
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              From state-of-the-art classrooms to beautiful outdoor spaces, discover and book premium venues at Trincity College.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto p-2 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-2 mb-12">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search for venues..." 
                  className="w-full bg-transparent focus:outline-none text-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <MapPin className="w-5 h-5 text-slate-400" />
                <select 
                  className="w-full bg-transparent focus:outline-none text-slate-700 appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Indoor Venues">Indoor</option>
                  <option value="Outdoor Listings">Outdoor</option>
                  <option value="Classrooms and Labs">Classrooms</option>
                  <option value="Special Rooms">Special Rooms</option>
                </select>
              </div>
              <Link 
                to={`/venues?search=${searchQuery}&category=${selectedCategory}`} 
                className="btn-primary flex items-center justify-center gap-2"
              >
                Search <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2"><Users className="w-5 h-5" /> 5,000+ Users</div>
              <div className="flex items-center gap-2"><Building2 className="w-5 h-5" /> {LISTINGS.length} Venues</div>
              <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /> 10k+ Bookings</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore by Category</h2>
              <p className="text-slate-600">Find the right space for your specific needs.</p>
            </div>
            <Link to="/venues" className="hidden md:flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={`/venues?category=${cat.id}`}
                  className="glass-card p-8 flex flex-col items-center text-center group"
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", cat.color)}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{cat.title}</h3>
                  <p className="text-sm text-slate-500">{cat.count} Listings Available</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Venues</h2>
            <p className="text-slate-600">Our most popular and highly-rated spaces.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LISTINGS.filter(l => ['1', '12', '6'].includes(l.id)).map((venue, idx) => {
              const startingPrice = venue.pricingTiers?.[0]?.baseRate || venue.rates?.hourly || venue.rates?.daily;
              const unit = venue.pricingModel === 'capacity_tier_pricing' ? '' : venue.rates?.hourly ? '/hr' : '/day';
              
              return (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={venue.images[0]} 
                      alt={venue.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900">
                        {venue.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900">{venue.title}</h3>
                      <span className="text-brand font-bold">${startingPrice}{unit}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> 
                        {typeof venue.capacity === 'string' ? venue.capacity : (venue.capacity?.max || 'Varies')} People
                      </div>
                      <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Main Campus</div>
                    </div>
                    <Link to={`/venues/${venue.id}`} className="btn-secondary w-full text-center py-2.5">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-brand font-bold tracking-widest uppercase text-sm mb-6 block">Why Choose Us</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Modern Solutions for <br />
                Institutional Booking
              </h2>
              <div className="space-y-8">
                {[
                  { icon: Shield, title: "Secure Transactions", desc: "Integrated payment gateways with end-to-end encryption for all bookings." },
                  { icon: Zap, title: "Real-time Sync", desc: "iCal and ICS support ensures your calendar is always up to date across all devices." },
                  { icon: Star, title: "Premium Support", desc: "Dedicated team available to help you with your event planning and venue needs." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center flex-shrink-0 text-brand">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Office"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Verified</p>
                    <p className="text-slate-900 font-bold">Safe & Secure</p>
                  </div>
                </div>
                <p className="text-slate-500 text-sm max-w-[200px]">
                  All venues are inspected and verified by our campus safety team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">
              Ready to host your next <br />
              big event with us?
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto relative z-10">
              Join thousands of students, faculty, and external partners who trust Trincity College for their venue needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/register" className="bg-white text-brand px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-colors w-full sm:w-auto">
                Create Account
              </Link>
              <Link to="/venues" className="bg-brand-hover text-white px-8 py-4 rounded-2xl font-bold border border-white/20 hover:bg-brand/80 transition-colors w-full sm:w-auto">
                Browse Venues
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
