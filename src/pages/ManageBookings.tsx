import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MoreVertical,
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

export const ManageBookings = () => {
  const { bookings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Manage Bookings</h1>
            <p className="text-slate-500 font-medium">Review, approve, or cancel venue bookings across the platform.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-brand hover:text-brand transition-all flex items-center gap-2">
              <Download className="w-5 h-5" /> Export CSV
            </button>
            <button className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" /> View Calendar
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search bookings by ID, customer, or venue..."
                className="w-full pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm border-none focus:ring-2 focus:ring-brand/20 transition-all appearance-none pr-10 relative"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="h-8 w-px bg-slate-200" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{filteredBookings.length} Bookings Total</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Booking ID</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venue</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-900">#BK-{booking.id.slice(0, 6)}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {booking.customerName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{booking.customerName}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Public User</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-slate-600 font-medium">{booking.venueName}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{format(new Date(booking.date), 'MMM do, yyyy')}</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 09:00 AM - 05:00 PM
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">${booking.totalPrice.toLocaleString()}</span>
                        <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Paid</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5",
                        booking.status === 'confirmed' ? "bg-green-50 text-green-600" : 
                        booking.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                      )}>
                        {booking.status === 'confirmed' && <CheckCircle2 className="w-3 h-3" />}
                        {booking.status === 'pending' && <AlertCircle className="w-3 h-3" />}
                        {booking.status === 'cancelled' && <XCircle className="w-3 h-3" />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Mail className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical className="w-5 h-5" />
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
