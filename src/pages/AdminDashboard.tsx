import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MoreVertical,
  Building2,
  Plus,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

import { LISTINGS } from '../data/listings';

export const AdminDashboard = () => {
  const { bookings } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '$124,500', change: '+12.5%', trend: 'up', icon: TrendingUp },
    { label: 'Active Bookings', value: bookings.length.toString(), change: '+5.2%', trend: 'up', icon: CalendarIcon },
    { label: 'Pending Approvals', value: bookings.filter(b => b.status === 'pending').length.toString(), change: '-2.1%', trend: 'down', icon: AlertCircle },
    { label: 'Total Venues', value: LISTINGS.length.toString(), change: '+8.4%', trend: 'up', icon: Building2 },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium">Welcome back, Administrator. Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-brand hover:text-brand transition-all flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" /> View Calendar
            </button>
            <button className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add New Venue
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 group hover:border-brand transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 group-hover:bg-brand group-hover:text-white rounded-xl flex items-center justify-center transition-all">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                  stat.trend === 'up' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content: Recent Bookings */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Recent Bookings</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search bookings..."
                      className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand/20 w-48"
                    />
                  </div>
                  <button className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-brand hover:text-white transition-all">
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Booking ID</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venue</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentBookings.length > 0 ? recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <span className="text-sm font-bold text-slate-900">#BK-{booking.id.slice(0, 6)}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                              {booking.customerName.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-slate-900">{booking.customerName}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm text-slate-600 font-medium">{booking.venueName}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm text-slate-600 font-medium">{format(new Date(booking.date), 'MMM do, yyyy')}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                            booking.status === 'confirmed' ? "bg-green-50 text-green-600" : 
                            booking.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                          )}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <button className="p-2 text-slate-400 hover:text-brand transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-8 py-12 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <CalendarIcon className="w-12 h-12 text-slate-200" />
                            <p className="text-slate-400 font-medium">No recent bookings found.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
                <button className="text-brand font-bold text-sm hover:underline flex items-center gap-2 mx-auto">
                  View All Bookings <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: Quick Actions & Alerts */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'New Venue', icon: Building2, color: 'bg-blue-50 text-blue-600' },
                  { label: 'Users', icon: Users, color: 'bg-purple-50 text-purple-600' },
                  { label: 'Reports', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
                  { label: 'Settings', icon: AlertCircle, color: 'bg-slate-50 text-slate-600' }
                ].map((action, idx) => (
                  <button 
                    key={idx}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-100 hover:border-brand hover:shadow-lg hover:shadow-brand/5 transition-all group"
                  >
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all", action.color)}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-brand">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Pending Approvals</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">Main Hall Booking</p>
                      <p className="text-xs text-slate-500">by Sarah Williams • 2h ago</p>
                    </div>
                    <button className="p-2 text-brand hover:bg-brand/10 rounded-lg transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-brand hover:text-white transition-all">
                View All Pending
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
