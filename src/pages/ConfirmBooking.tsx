import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Info,
  MapPin,
  Building2,
  Tag,
  CreditCard,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { LISTINGS, ADD_ONS, DISCOUNT_RULES } from '../data/listings';
import { cn } from '@/src/lib/utils';
import { format } from 'date-fns';

export const ConfirmBooking = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('current_booking');
    if (!saved) {
      navigate('/venues');
      return;
    }
    const data = JSON.parse(saved);
    setBookingData(data);
    setListing(LISTINGS.find(l => l.id === data.venueId));
  }, [navigate]);

  if (!listing || !bookingData) return null;

  const handleProceed = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-bold text-slate-900">Review & Confirm</h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold"><CheckCircle2 className="w-6 h-6" /></div>
              <div className="w-12 h-1 bg-green-500 rounded-full" />
              <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">2</div>
              <div className="w-12 h-1 bg-slate-200 rounded-full" />
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">3</div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Booking Summary Card */}
            <div className="glass-card p-10">
              <div className="flex justify-between items-start mb-10">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-brand" /> Booking Summary
                </h3>
                <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-brand font-bold text-sm hover:underline"
                >
                  <Edit2 className="w-4 h-4" /> Edit Details
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100">
                      <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg leading-tight mb-2">{listing.title}</h4>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                        <MapPin className="w-3 h-3" /> {listing.category}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-700">
                      <CalendarIcon className="w-5 h-5 text-brand" />
                      <span className="text-sm font-bold">{format(new Date(bookingData.selectedDate), 'EEEE, MMMM do, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <Clock className="w-5 h-5 text-brand" />
                      <span className="text-sm font-bold">{bookingData.duration} {bookingData.bookingMode === 'hourly' ? 'Hours' : 'Days'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <Users className="w-5 h-5 text-brand" />
                      <span className="text-sm font-bold">{bookingData.guests} Guests</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Customer Details</h4>
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-slate-900">{bookingData.customer.firstName} {bookingData.customer.lastName}</p>
                      <p className="text-sm text-slate-600">{bookingData.customer.email}</p>
                      <p className="text-sm text-slate-600">{bookingData.customer.phone}</p>
                      {bookingData.customer.organization && (
                        <p className="text-sm text-slate-600 font-medium italic">"{bookingData.customer.organization}"</p>
                      )}
                    </div>
                  </div>
                  {bookingData.customer.eventType && (
                    <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <Tag className="w-5 h-5 text-brand" />
                      <span className="text-sm font-bold">{bookingData.customer.eventType} Event {bookingData.customer.isTicketed && '(Ticketed)'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="glass-card p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-brand" /> Price Breakdown
              </h3>
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Base Venue Rate</span>
                  <span className="text-slate-900 font-bold">$4,500.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Cleaning & Security</span>
                  <span className="text-slate-900 font-bold">$750.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Public Liability Insurance</span>
                  <span className="text-slate-900 font-bold">$795.00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">VAT (12.5%)</span>
                  <span className="text-slate-900 font-bold">$656.25</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Caution Fee (Refundable)</span>
                  <span className="text-slate-900 font-bold">$1,000.00</span>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Grand Total Amount</p>
                  <p className="text-4xl font-bold">${bookingData.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2">
                  <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                    <ShieldCheck className="w-5 h-5" /> Secure Checkout
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Pricing Subject to Admin Confirmation</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-brand font-bold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Back to Form
              </button>
              <button 
                onClick={handleProceed}
                className="w-full sm:w-auto px-12 py-5 bg-brand text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                Proceed to Payment <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
