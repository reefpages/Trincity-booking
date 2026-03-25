import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Users, 
  MapPin, 
  CheckCircle2, 
  Wifi, 
  Coffee, 
  Tv, 
  Mic2, 
  Sparkles,
  Shield,
  Info,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Calendar as CalendarIcon,
  Clock,
  Building2,
  HelpCircle
} from 'lucide-react';
import { LISTINGS } from '../data/listings';
import { BookingWidget } from '../components/BookingWidget';
import { Calendar } from '../components/Calendar';
import { cn } from '@/src/lib/utils';

export const SingleVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const listing = useMemo(() => LISTINGS.find(l => l.id === id), [id]);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Venue not found</h1>
          <button onClick={() => navigate('/venues')} className="btn-primary">Back to Venues</button>
        </div>
      </div>
    );
  }

  const handleBookingContinue = (data: any) => {
    // Store booking data in session/local storage for the flow
    sessionStorage.setItem('current_booking', JSON.stringify({
      venueId: listing.id,
      ...data
    }));
    navigate('/booking-form');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs & Actions */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/venues')}
            className="flex items-center gap-2 text-slate-500 hover:text-brand font-bold text-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Venues
          </button>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-3 rounded-xl border transition-all",
                isLiked ? "bg-red-50 border-red-100 text-red-500" : "bg-white border-slate-200 text-slate-400 hover:text-red-500"
              )}
            >
              <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-brand transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/9] rounded-[40px] overflow-hidden bg-slate-200 relative group">
                <img 
                  src={listing.images[activeImage]} 
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {listing.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all",
                      activeImage === idx ? "border-brand scale-95" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Overview */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-brand/5 text-brand rounded-full text-xs font-bold uppercase tracking-widest">
                  {listing.category}
                </span>
                <div className="flex items-center gap-1.5 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Available for Booking</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">{listing.title}</h1>
              <div className="flex flex-wrap gap-8 mb-12 py-8 border-y border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacity</p>
                    <p className="text-lg font-bold text-slate-900">
                      {typeof listing.capacity === 'string' ? listing.capacity : `${listing.capacity?.min}-${listing.capacity?.max}`} Guests
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</p>
                    <p className="text-lg font-bold text-slate-900 capitalize">{listing.pricingModel.replace('_pricing', '').replace(/_/g, ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security</p>
                    <p className="text-lg font-bold text-slate-900">On-site Staff</p>
                  </div>
                </div>
              </div>
              <div className="prose prose-slate max-w-none">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">About this Venue</h3>
                <p className="text-slate-500 text-lg leading-relaxed">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">What this venue offers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {listing.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-brand/5 text-brand rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Calendar */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Availability Calendar</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <div className="w-3 h-3 rounded-full bg-red-500" /> Booked
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <div className="w-3 h-3 rounded-full bg-orange-500" /> Pending
                  </div>
                </div>
              </div>
              <Calendar 
                selectedDate={selectedDate} 
                onDateSelect={setSelectedDate} 
                mode="full"
                className="shadow-xl shadow-slate-200/50"
              />
            </div>

            {/* Terms & Notices */}
            <div className="bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] rounded-full -mr-32 -mt-32" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Info className="w-6 h-6 text-brand" /> Important Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-brand font-bold uppercase tracking-widest text-xs mb-2">Booking Policy</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Cancellations must be made at least 48 hours in advance. Caution fees are fully refundable after event inspection.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-brand font-bold uppercase tracking-widest text-xs mb-2">Insurance</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Public liability insurance is mandatory for all events and is included in the final price breakdown.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-brand font-bold uppercase tracking-widest text-xs mb-2">Statutory Fees</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        COTT fees apply to events with music. Ticketed events may require additional external processing.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-brand font-bold uppercase tracking-widest text-xs mb-2">Venue Rules</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        No smoking indoors. All events must conclude by 11:00 PM. External catering requires prior approval.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  { q: "Is technical support available?", a: "Yes, we have on-site technicians available for AV and lighting setup at an additional cost." },
                  { q: "Can I visit the venue before booking?", a: "Absolutely! Contact our management team to schedule a site visit during business hours." },
                  { q: "Is parking available?", a: "Yes, all our venues include access to secure on-campus parking for your guests." }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-brand" /> {faq.q}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed pl-8">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-4">
            <BookingWidget 
              listing={listing} 
              onContinue={handleBookingContinue} 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
