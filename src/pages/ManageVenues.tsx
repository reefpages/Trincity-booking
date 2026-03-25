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
  XCircle
} from 'lucide-react';
import { LISTINGS } from '../data/listings';
import { cn } from '@/src/lib/utils';

export const ManageVenues = () => {
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
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Manage Venues</h1>
            <p className="text-slate-500 font-medium">Add, edit, or remove venue listings from the platform.</p>
          </div>
          <button className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add New Venue
          </button>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search venues by name or category..."
                className="w-full pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-all">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <div className="h-8 w-px bg-slate-200" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{filteredVenues.length} Venues Total</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venue Details</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacity</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing Model</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVenues.map((venue) => (
                  <tr key={venue.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                          <img src={venue.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">{venue.title}</h4>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                            <MapPin className="w-3 h-3" /> {venue.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest">
                        {venue.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Users className="w-4 h-4 text-slate-400" /> {venue.capacity}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Tag className="w-4 h-4 text-slate-400" /> {venue.pricingModel.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase tracking-widest">
                        <CheckCircle2 className="w-4 h-4" /> Active
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
