import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  MoreVertical,
  Building2,
  Users,
  MapPin,
  Tag,
  CheckCircle2,
  XCircle,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Save,
  ChevronRight,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { LISTINGS } from '../data/listings';
import { cn } from '@/src/lib/utils';

export const PricingManager = () => {
  const [venues, setVenues] = useState(LISTINGS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = venues.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Pricing & Fees Manager</h1>
            <p className="text-slate-500 font-medium">Configure pricing models, operational fees, and global tax settings.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-brand hover:text-brand transition-all flex items-center gap-2">
              <Settings className="w-5 h-5" /> Global Settings
            </button>
            <button className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add Fee Rule
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content: Venue Pricing */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search venues to manage pricing..."
                    className="w-full pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand/20 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all">
                    <Filter className="w-4 h-4" /> Filter
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venue</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Rate</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fees</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredVenues.map((venue) => (
                      <tr key={venue.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                              <img src={venue.images[0]} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{venue.title}</h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{venue.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                            {venue.pricingModel.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">${venue.basePrice.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Per {venue.pricingModel.includes('DURATION') ? 'Hour' : 'Day'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-500" /> Cleaning
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-500" /> Security
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar: Global Fees & Tax */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-brand" /> Global Fee Rules
              </h3>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">VAT (Tax)</span>
                    <span className="text-sm font-bold text-slate-900">12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Service Fee</span>
                    <span className="text-sm font-bold text-slate-900">$150.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Caution Fee</span>
                    <span className="text-sm font-bold text-slate-900">$1,000.00</span>
                  </div>
                  <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-xs text-brand hover:border-brand transition-all">
                    Edit Global Fees
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operational Surcharges</h4>
                  {[
                    { label: 'After Hours (Post 10PM)', value: '+$500/hr' },
                    { label: 'Weekend Premium', value: '+15%' },
                    { label: 'Public Holiday', value: '+25%' }
                  ].map((fee, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-xl border border-slate-100 hover:border-brand transition-all group">
                      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{fee.label}</span>
                      <span className="text-sm font-bold text-brand">{fee.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand/20 blur-[60px] rounded-full -ml-16 -mb-16" />
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand" /> Dynamic Pricing
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Enable dynamic pricing to automatically adjust rates based on demand, season, and occupancy levels.
                </p>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-xs font-bold uppercase tracking-widest">Status</span>
                  <span className="text-xs font-bold text-brand uppercase tracking-widest">Disabled</span>
                </div>
                <button className="w-full mt-6 py-3 bg-brand text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Configure Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
