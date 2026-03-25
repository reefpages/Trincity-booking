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
  Plus,
  Minus
} from 'lucide-react';
import { LISTINGS, ADD_ONS, DISCOUNT_RULES } from '../data/listings';
import { cn } from '@/src/lib/utils';
import { format } from 'date-fns';

export const BookingForm = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [listing, setListing] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    notes: '',
    eventType: '',
    isTicketed: false
  });

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

  const handleContinue = () => {
    sessionStorage.setItem('current_booking', JSON.stringify({
      ...bookingData,
      customer: formData
    }));
    navigate('/confirm-booking');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-slate-900">Complete your Booking</h1>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">1</div>
                <div className="w-12 h-1 bg-slate-200 rounded-full" />
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">2</div>
                <div className="w-12 h-1 bg-slate-200 rounded-full" />
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold">3</div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="glass-card p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Users className="w-6 h-6 text-brand" /> Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="+1 (868) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Organization (Optional)</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="Trincity College Limited"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="glass-card p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-brand" /> Event Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Event Type</label>
                  <select 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium appearance-none"
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                  >
                    <option value="">Select event type...</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Conference">Conference</option>
                    <option value="Theatre">Theatre Production</option>
                    <option value="Concert">Concert</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">Ticketed Event</span>
                  </div>
                  <button 
                    onClick={() => setFormData({...formData, isTicketed: !formData.isTicketed})}
                    className={cn(
                      "w-12 h-6 rounded-full transition-all relative",
                      formData.isTicketed ? "bg-brand" : "bg-slate-300"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      formData.isTicketed ? "left-7" : "left-1"
                    )} />
                  </button>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Additional Notes</label>
                  <textarea 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium min-h-[120px]"
                    placeholder="Tell us more about your event requirements..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-8">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-brand font-bold transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Back to Venue
              </button>
              <button 
                onClick={handleContinue}
                disabled={!formData.firstName || !formData.email || !formData.phone}
                className={cn(
                  "px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center gap-3",
                  formData.firstName && formData.email && formData.phone
                    ? "bg-brand text-white shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]" 
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                )}
              >
                Review Booking <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-4">
            <div className="glass-card p-8 sticky top-32">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Booking Summary</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100">
                    <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight mb-2">{listing.title}</h4>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3" /> {listing.category}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 py-8 border-y border-slate-100">
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

                <div className="bg-slate-900 rounded-3xl p-6 text-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Total</p>
                      <p className="text-3xl font-bold">${bookingData.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Pricing Subject to</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">Admin Confirmation</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-brand/5 rounded-2xl border border-brand/10">
                  <p className="text-xs text-brand font-bold leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                    Caution fee is refundable after the event inspection. COTT fees may vary for ticketed events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
