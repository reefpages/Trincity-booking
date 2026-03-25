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
  Package,
  Settings,
  ShieldCheck,
  DollarSign,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { ADD_ONS } from '../data/listings';
import { cn } from '@/src/lib/utils';

export const AddOnsManager = () => {
  const [addOns, setAddOns] = useState(ADD_ONS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAddOns = addOns.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Add-ons Manager</h1>
            <p className="text-slate-500 font-medium">Manage extra services, equipment rentals, and catering options available for bookings.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-brand hover:text-brand transition-all flex items-center gap-2">
              <Settings className="w-5 h-5" /> Add-on Categories
            </button>
            <button className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <Plus className="w-5 h-5" /> Create Add-on
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content: Add-ons List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search add-ons by name..."
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
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add-on Service</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAddOns.map((addOn) => (
                      <tr key={addOn.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-brand group-hover:text-white flex items-center justify-center transition-all">
                              <Package className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{addOn.name}</h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate max-w-[200px]">{addOn.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">${addOn.price.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Per {addOn.priceType}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                            {addOn.priceType === 'fixed' ? 'Service' : 'Rental'}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                            <CheckCircle2 className="w-3 h-3" /> Available
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

          {/* Sidebar: Add-on Stats & Categories */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Tag className="w-6 h-6 text-brand" /> Categories
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Catering', count: 12, color: 'bg-blue-50 text-blue-600' },
                  { label: 'Equipment', count: 8, color: 'bg-purple-50 text-purple-600' },
                  { label: 'Staffing', count: 5, color: 'bg-green-50 text-green-600' },
                  { label: 'Decor', count: 15, color: 'bg-amber-50 text-amber-600' }
                ].map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-brand transition-all">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", cat.color)}>
                        <Package className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{cat.label}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{cat.count} Items</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs hover:bg-brand hover:text-white transition-all">
                Manage Categories
              </button>
            </div>

            <div className="glass-card p-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-[60px] rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand" /> Admin-Only Add-ons
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Add-ons that can only be added by administrators during the booking approval process.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Security Detail</span>
                    <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Cleaning Surcharge</span>
                    <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Active</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-brand text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Manage Admin Add-ons
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
