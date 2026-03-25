import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  ArrowRight, 
  LayoutGrid, 
  List,
  ChevronDown,
  Sparkles,
  Building2,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { LISTINGS } from '../data/listings';
import { PricingModel } from '@/src/types';
import { cn } from '@/src/lib/utils';

export const VenuesListing = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCapacity, setSelectedCapacity] = useState('Any');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const categories = ['All', ...new Set(LISTINGS.map(l => l.category))];
  const capacities = ['Any', '1-50', '51-100', '101-250', '251-500', '500+'];

  const filteredListings = useMemo(() => {
    return LISTINGS.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || listing.category === selectedCategory;
      
      // Basic capacity filtering logic
      let matchesCapacity = true;
      if (selectedCapacity !== 'Any') {
        const cap = typeof listing.capacity === 'string' ? parseInt(listing.capacity) : (listing.capacity?.max || 0);
        if (selectedCapacity === '1-50') matchesCapacity = cap <= 50;
        else if (selectedCapacity === '51-100') matchesCapacity = cap > 50 && cap <= 100;
        else if (selectedCapacity === '101-250') matchesCapacity = cap > 100 && cap <= 250;
        else if (selectedCapacity === '251-500') matchesCapacity = cap > 250 && cap <= 500;
        else if (selectedCapacity === '500+') matchesCapacity = cap > 500;
      }

      return matchesSearch && matchesCategory && matchesCapacity;
    });
  }, [searchQuery, selectedCategory, selectedCapacity]);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/5 text-brand rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4" /> Discover Venues
              </div>
              <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Find the Perfect Space</h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Browse our diverse range of venues, from professional auditoriums to modern classrooms and outdoor spaces.
              </p>
            </div>
            <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  viewMode === 'grid' ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-slate-400 hover:text-brand"
                )}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  viewMode === 'list' ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-slate-400 hover:text-brand"
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search & Filters Bar */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
              <input 
                type="text" 
                placeholder="Search venues by name..." 
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="lg:col-span-3 relative">
              <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select 
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-sm font-bold appearance-none text-slate-700"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="lg:col-span-2 relative">
              <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select 
                className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-sm font-bold appearance-none text-slate-700"
                value={selectedCapacity}
                onChange={(e) => setSelectedCapacity(e.target.value)}
              >
                {capacities.map(cap => <option key={cap} value={cap}>Capacity: {cap}</option>)}
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <button className="lg:col-span-2 bg-slate-900 text-white py-5 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" /> Check Availability
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className={cn(
          "grid gap-8",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {filteredListings.map((listing, idx) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "glass-card group overflow-hidden",
                viewMode === 'list' && "flex flex-col md:flex-row"
              )}
            >
              {/* Image Section */}
              <div className={cn(
                "relative overflow-hidden",
                viewMode === 'grid' ? "aspect-[4/3]" : "md:w-1/3 aspect-[4/3] md:aspect-auto"
              )}>
                <img 
                  src={listing.images[0]} 
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 shadow-sm">
                    {listing.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Section */}
              <div className={cn(
                "p-8 flex flex-col justify-between",
                viewMode === 'list' && "flex-1"
              )}>
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand transition-colors leading-tight">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-brand">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {listing.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-bold">
                        {typeof listing.capacity === 'string' ? listing.capacity : `${listing.capacity?.min}-${listing.capacity?.max}`} Guests
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs font-bold capitalize">{listing.pricingModel.replace('_pricing', '').replace(/_/g, ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Starting from</p>
                    <p className="text-xl font-bold text-slate-900">
                      ${listing.pricingTiers?.[0]?.baseRate || listing.rates?.hourly || listing.rates?.daily}
                      <span className="text-sm text-slate-400 font-medium">
                        {listing.pricingModel === PricingModel.CAPACITY_TIER ? '' : listing.rates?.hourly ? '/hr' : '/day'}
                      </span>
                    </p>
                  </div>
                  <Link 
                    to={`/venues/${listing.id}`}
                    className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-brand hover:scale-110 transition-all shadow-lg shadow-slate-900/10"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No venues found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedCapacity('Any');
              }}
              className="mt-8 text-brand font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
