import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search,
  Filter,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BookingStatus } from '../types';
import { cn } from '@/src/lib/utils';

export const MyBookings = () => {
  const { user, bookings } = useApp();
  const [filter, setFilter] = useState<string>('all');

  if (!user) return null;

  const userBookings = bookings.filter(b => b.userId === user.id);
  
  const filteredBookings = userBookings.filter(b => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.PENDING;
    if (filter === 'past') return b.status === BookingStatus.PAID;
    if (filter === 'cancelled') return b.status === BookingStatus.CANCELLED;
    return true;
  });

  const getBookingStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case BookingStatus.PENDING: return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case BookingStatus.CANCELLED: return <XCircle className="w-4 h-4 text-red-500" />;
      case BookingStatus.PAID: return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      default: return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getBookingStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return 'bg-green-50 text-green-600 border-green-100';
      case BookingStatus.PENDING: return 'bg-amber-50 text-amber-600 border-amber-100';
      case BookingStatus.CANCELLED: return 'bg-red-50 text-red-600 border-red-100';
      case BookingStatus.PAID: return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand font-bold text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">My Bookings</h1>
          <p className="text-slate-500">View and manage your venue reservations.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          {['all', 'upcoming', 'past', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all",
                filter === f ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-brand/30 transition-all group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-brand border border-slate-100 group-hover:bg-brand/5 transition-colors">
                    <Building2 className="w-10 h-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">Booking #{booking.id}</h3>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1.5",
                        getBookingStatusColor(booking.status)
                      )}>
                        {getBookingStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> {booking.date}</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> {booking.startTime || 'All Day'}</span>
                      <span className="flex items-center gap-2 font-bold text-slate-900">${booking.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-sm font-bold">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    {booking.status === BookingStatus.PAID ? 'Paid in Full' : 'Payment Pending'}
                  </div>
                  <Link 
                    to={`/my-bookings/${booking.id}`} 
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No bookings found</h3>
            <p className="text-slate-500 mb-8">You haven't made any venue reservations in this category yet.</p>
            <Link to="/venues" className="px-8 py-4 bg-brand text-white rounded-2xl font-bold shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all inline-block">
              Browse Venues
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
