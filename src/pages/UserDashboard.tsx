import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Building2,
  Users,
  ShieldCheck,
  CreditCard,
  Settings,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const UserDashboard = () => {
  const { user, bookings } = useApp();
  const userBookings = bookings.filter(b => b.customerName === `${user?.firstName} ${user?.lastName}`);

  const stats = [
    { label: 'Total Bookings', value: userBookings.length, icon: CalendarIcon },
    { label: 'Verification Status', value: user?.verificationStatus || 'Pending', icon: ShieldCheck, color: user?.verificationStatus === 'active' ? 'text-green-600' : 'text-amber-600' },
    { label: 'Upcoming Events', value: userBookings.filter(b => b.status === 'confirmed').length, icon: Clock },
    { label: 'Account Type', value: user?.accountType || 'Public', icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {user?.firstName}!</h1>
            <p className="text-slate-500 font-medium">Manage your venue bookings and account details from your personal dashboard.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/settings" className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-brand hover:text-brand transition-all flex items-center gap-2">
              <Settings className="w-5 h-5" /> Profile Settings
            </Link>
            <Link to="/venues" className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <Plus className="w-5 h-5" /> Book New Venue
            </Link>
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
              <div className="w-12 h-12 bg-slate-100 text-slate-400 group-hover:bg-brand group-hover:text-white rounded-xl flex items-center justify-center mb-6 transition-all">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className={cn("text-2xl font-bold text-slate-900 tracking-tight", stat.color)}>{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content: Upcoming Bookings */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Your Bookings</h3>
                <Link to="/my-bookings" className="text-brand font-bold text-sm hover:underline flex items-center gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {userBookings.length > 0 ? userBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="p-8 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                          <img src="https://picsum.photos/seed/venue/200/200" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-slate-900 text-lg">{booking.venueName}</h4>
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                              booking.status === 'confirmed' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                            )}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5" /> {format(new Date(booking.date), 'MMM do, yyyy')}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 09:00 - 17:00</span>
                            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {booking.guests} Guests</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Paid</p>
                          <p className="text-lg font-bold text-slate-900">${booking.totalPrice.toLocaleString()}</p>
                        </div>
                        <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-brand hover:text-white transition-all">
                          <ArrowUpRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CalendarIcon className="w-8 h-8" />
                    </div>
                    <p className="text-slate-400 font-bold text-sm">No bookings found.</p>
                    <Link to="/venues" className="mt-4 inline-block text-brand font-bold text-sm hover:underline">
                      Browse Venues to Book
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Account Info & Quick Rebook */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-brand" /> Verification Status
              </h3>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    user?.verificationStatus === 'active' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                  )}>
                    {user?.verificationStatus === 'active' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user?.verificationStatus === 'active' ? 'Verified Account' : 'Verification Pending'}</p>
                    <p className="text-xs text-slate-500">{user?.accountType}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {user?.verificationStatus === 'active' 
                    ? "Your account is verified. You are eligible for role-based discounts and priority booking."
                    : "Our team is reviewing your account details. You will be notified once your verification is complete."}
                </p>
                {user?.verificationStatus !== 'active' && (
                  <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-xs text-brand hover:border-brand transition-all">
                    Update Verification Info
                  </button>
                )}
              </div>
            </div>

            <div className="glass-card p-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-[60px] rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-brand" /> Saved Payments
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Manage your saved credit cards and billing information for faster checkouts.
                </p>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                  <span className="text-xs font-bold text-slate-300">•••• 4242</span>
                  <span className="text-[10px] text-slate-500 ml-auto">Expires 12/26</span>
                </div>
                <button className="w-full mt-6 py-3 bg-brand text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Manage Payments
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
