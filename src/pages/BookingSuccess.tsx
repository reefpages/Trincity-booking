import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  Mail, 
  LayoutDashboard,
  Sparkles,
  Building2,
  Users
} from 'lucide-react';
import { LISTINGS } from '../data/listings';
import { format } from 'date-fns';
import { cn } from '@/src/lib/utils';

export const BookingSuccess = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [listing, setListing] = useState<any>(null);
  const [referenceNumber, setReferenceNumber] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('current_booking');
    if (!saved) {
      navigate('/venues');
      return;
    }
    const data = JSON.parse(saved);
    setBookingData(data);
    setListing(LISTINGS.find(l => l.id === data.venueId));
    setReferenceNumber(`TCB-${Math.floor(100000 + Math.random() * 900000)}`);
    
    // Clear the current booking from session storage after showing success
    // sessionStorage.removeItem('current_booking');
  }, [navigate]);

  if (!listing || !bookingData) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/20">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Booking Confirmed!</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Your venue booking has been successfully submitted. We've sent a confirmation email to <span className="text-slate-900 font-bold">{bookingData.customer.email}</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Booking Details */}
          <div className="md:col-span-8 space-y-8">
            <div className="glass-card p-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Reference Number</p>
                  <h3 className="text-2xl font-bold text-slate-900">{referenceNumber}</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Payment Status</p>
                  <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest">Paid</span>
                </div>
              </div>

              <div className="flex gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-10">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-200">
                  <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{listing.title}</h4>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <MapPin className="w-4 h-4" /> {listing.category}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-100">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Date
                  </p>
                  <p className="text-lg font-bold text-slate-900">{format(new Date(bookingData.selectedDate), 'MMM do, yyyy')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Duration
                  </p>
                  <p className="text-lg font-bold text-slate-900">{bookingData.duration} {bookingData.bookingMode === 'hourly' ? 'Hours' : 'Days'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-3 h-3" /> Guests
                  </p>
                  <p className="text-lg font-bold text-slate-900">{bookingData.guests} Persons</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Building2 className="w-3 h-3" /> Event Type
                  </p>
                  <p className="text-lg font-bold text-slate-900">{bookingData.customer.eventType || 'N/A'}</p>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                <button className="flex items-center gap-2 text-brand font-bold text-sm hover:underline">
                  <Download className="w-4 h-4" /> Download Receipt (PDF)
                </button>
                <button className="flex items-center gap-2 text-brand font-bold text-sm hover:underline">
                  <Mail className="w-4 h-4" /> Resend Confirmation
                </button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full -mr-32 -mt-32" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">What's Next?</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Our venue manager will review your booking details and contact you if any additional information is required. You can track your booking status in your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-6">
            <Link 
              to="/dashboard"
              className="glass-card p-8 flex flex-col items-center text-center group hover:border-brand transition-all"
            >
              <div className="w-14 h-14 bg-slate-100 text-slate-400 group-hover:bg-brand group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-all">
                <LayoutDashboard className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Go to Dashboard</h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">Manage all your bookings and account settings in one place.</p>
              <div className="text-brand font-bold text-sm flex items-center gap-2">
                Dashboard <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link 
              to="/venues"
              className="glass-card p-8 flex flex-col items-center text-center group hover:border-brand transition-all"
            >
              <div className="w-14 h-14 bg-slate-100 text-slate-400 group-hover:bg-brand group-hover:text-white rounded-2xl flex items-center justify-center mb-6 transition-all">
                <Building2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Book Another Venue</h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-6">Explore our other premium venues for your next event.</p>
              <div className="text-brand font-bold text-sm flex items-center gap-2">
                Browse Venues <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
