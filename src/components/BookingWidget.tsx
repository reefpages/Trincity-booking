import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Minus, 
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Listing, PricingModel, AddOn } from '../types';
import { ADD_ONS } from '../data/listings';
import { Calendar } from './Calendar';
import { cn } from '@/src/lib/utils';
import { format } from 'date-fns';

interface BookingWidgetProps {
  listing: Listing;
  onContinue: (data: any) => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ 
  listing, 
  onContinue,
  selectedDate,
  onDateSelect
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>();
  const [guests, setGuests] = useState(1);
  const [duration, setDuration] = useState(1);
  const [bookingMode, setBookingMode] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('hourly');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [selectedAddOns, setSelectedAddOns] = useState<{ id: string; quantity: number }[]>([]);
  const [eventType, setEventType] = useState('');
  const [isTicketed, setIsTicketed] = useState(false);
  const [technicianRequired, setTechnicianRequired] = useState(false);

  const calculatePrice = useMemo(() => {
    let base = 0;
    let vat = 0;
    let insurance = listing.insurance || 0;
    let cautionFee = listing.cautionFee || 0;
    let cleaning = listing.cleaningFee || 0;
    let cott = listing.cott || 0;
    let extraFees = 0;

    // Pricing Model Logic
    switch (listing.pricingModel) {
      case PricingModel.CAPACITY_TIER:
        const tier = listing.pricingTiers?.find(t => guests >= t.minCapacity && guests <= t.maxCapacity);
        if (tier) {
          base = tier.baseRate;
          vat = tier.vat;
          cott = tier.cott;
          insurance = tier.insurance;
          cautionFee = tier.cautionFee;
        }
        // If ticketed, maybe add some logic? User didn't specify extra cost for ticketed, 
        // just to select it. Usually COTT might change, but I'll stick to the tier data for now.
        break;
      
      case PricingModel.DURATION:
      case PricingModel.DURATION_PLUS_EXTRA:
      case PricingModel.DURATION_MANDATORY:
        const rate = listing.rates?.[bookingMode] || 0;
        base = rate * duration;
        
        if (listing.pricingModel === PricingModel.DURATION_PLUS_EXTRA) {
          if (technicianRequired) {
            extraFees += (listing.technicianFee || 0) * duration;
          }
          // Add 10 percent admin charge to auxiliary fees (extra fees)
          if (listing.adminPercent) {
            extraFees += extraFees * (listing.adminPercent / 100);
          }
        }

        if (listing.vatRate) {
          vat = (base + cleaning + extraFees) * (listing.vatRate / 100);
        }
        break;

      case PricingModel.FIXED_CAPACITY:
        base = listing.rates?.daily || 0;
        if (listing.vatRate) {
          vat = (base + cleaning) * (listing.vatRate / 100);
        }
        break;

      case PricingModel.HYBRID_RULE:
        if (bookingMode === 'hourly') {
          if (duration > (listing.hourlyLimit || 4)) {
            base = listing.rates?.daily || 0;
          } else {
            base = (listing.rates?.hourly || 0) * duration;
          }
        } else {
          base = listing.rates?.daily || 0;
        }
        if (listing.vatRate) {
          vat = base * (listing.vatRate / 100);
        }
        break;

      case PricingModel.SPORTS_FACILITY:
        base = (listing.rates?.[bookingMode] || 0) * duration;
        if (listing.vatRate) {
          vat = base * (listing.vatRate / 100);
        }
        break;

      case PricingModel.GLOBAL_SERVICE:
        base = (listing.rates?.hourly || 0) * duration;
        if (listing.vatRate) {
          vat = base * (listing.vatRate / 100);
        }
        break;
    }

    // Add-ons calculation
    const addOnsTotal = selectedAddOns.reduce((acc, curr) => {
      const addOn = ADD_ONS.find(a => a.id === curr.id);
      if (!addOn) return acc;
      return acc + (addOn.price * curr.quantity);
    }, 0);

    const addOnsVat = addOnsTotal * 0.125;

    const subtotal = base + cleaning + extraFees + cott + insurance + addOnsTotal;
    const totalVat = vat + addOnsVat;
    const grandTotal = subtotal + totalVat + cautionFee;

    return {
      base,
      cleaning,
      extraFees,
      cott,
      insurance,
      cautionFee,
      vat: totalVat,
      addOnsTotal,
      grandTotal
    };
  }, [listing, guests, duration, bookingMode, selectedAddOns, technicianRequired]);

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(a => a.id === id);
      if (exists) return prev.filter(a => a.id !== id);
      return [...prev, { id, quantity: 1 }];
    });
  };

  const updateAddOnQuantity = (id: string, delta: number) => {
    setSelectedAddOns(prev => prev.map(a => 
      a.id === id ? { ...a, quantity: Math.max(1, a.quantity + delta) } : a
    ));
  };

  return (
    <div className="glass-card p-8 sticky top-32">
      <h3 className="text-2xl font-bold text-slate-900 mb-8">Book this Venue</h3>
      
      <div className="space-y-8">
        {/* Date Selection */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Select Date</label>
          <Calendar 
            selectedDate={selectedDate} 
            onDateSelect={onDateSelect} 
            mode="compact"
            className="border-slate-100"
            showTimeSlots={bookingMode === 'hourly' && listing.category !== 'Classrooms and Labs' && (listing.pricingModel === PricingModel.DURATION || listing.pricingModel === PricingModel.DURATION_PLUS_EXTRA || listing.pricingModel === PricingModel.GLOBAL_SERVICE)}
            selectedTimeSlot={selectedTimeSlot}
            onTimeSlotSelect={setSelectedTimeSlot}
          />
        </div>

        {/* Dynamic Fields based on Pricing Model */}
        <div className="grid grid-cols-1 gap-6">
          {listing.pricingModel === PricingModel.CAPACITY_TIER && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Booking Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {['hourly', 'daily', 'weekly', 'monthly'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setBookingMode(mode as any)}
                      className={cn(
                        "py-3 rounded-xl text-sm font-bold capitalize transition-all",
                        bookingMode === mode 
                          ? "bg-brand text-white shadow-lg shadow-brand/20" 
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Number of Guests</label>
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                  <button 
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input 
                    type="number" 
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                    className="flex-1 bg-transparent text-center font-bold text-slate-900 focus:outline-none"
                  />
                  <button 
                    onClick={() => setGuests(guests + 1)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">Ticketed Event</span>
                </div>
                <button 
                  onClick={() => setIsTicketed(!isTicketed)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    isTicketed ? "bg-brand" : "bg-slate-300"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    isTicketed ? "left-7" : "left-1"
                  )} />
                </button>
              </div>
            </>
          )}

          {(listing.pricingModel === PricingModel.DURATION || 
            listing.pricingModel === PricingModel.DURATION_PLUS_EXTRA || 
            listing.pricingModel === PricingModel.DURATION_MANDATORY ||
            listing.pricingModel === PricingModel.HYBRID_RULE) && (
            <>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Booking Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {['hourly', 'daily', 'weekly', 'monthly'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setBookingMode(mode as any)}
                      className={cn(
                        "py-3 rounded-xl text-sm font-bold capitalize transition-all",
                        bookingMode === mode 
                          ? "bg-brand text-white shadow-lg shadow-brand/20" 
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              
              {bookingMode === 'hourly' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Start Time</label>
                    <input 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">End Time</label>
                    <input 
                      type="time" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                  Duration ({bookingMode === 'hourly' ? 'Hours' : bookingMode === 'daily' ? 'Days' : bookingMode === 'weekly' ? 'Weeks' : 'Months'})
                </label>
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                  <button 
                    onClick={() => setDuration(Math.max(1, duration - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input 
                    type="number" 
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    className="flex-1 bg-transparent text-center font-bold text-slate-900 focus:outline-none"
                  />
                  <button 
                    onClick={() => setDuration(duration + 1)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {listing.pricingModel === PricingModel.DURATION_PLUS_EXTRA && (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">Technician Required</span>
              </div>
              <button 
                onClick={() => setTechnicianRequired(!technicianRequired)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  technicianRequired ? "bg-brand" : "bg-slate-300"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  technicianRequired ? "left-7" : "left-1"
                )} />
              </button>
            </div>
          )}
        </div>

        {/* Add-ons Section */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Available Add-ons</label>
          <div className="space-y-3">
            {ADD_ONS.slice(0, 4).map((addOn) => {
              const selected = selectedAddOns.find(a => a.id === addOn.id);
              return (
                <div 
                  key={addOn.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-all cursor-pointer",
                    selected ? "border-brand bg-brand/5" : "border-slate-100 bg-white hover:border-slate-200"
                  )}
                  onClick={() => handleAddOnToggle(addOn.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{addOn.name}</p>
                      <p className="text-xs text-slate-500">${addOn.price} {addOn.unit === 'per_unit' ? '/ unit' : ''}</p>
                    </div>
                    {selected && addOn.unit === 'per_unit' && (
                      <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                        <button onClick={() => updateAddOnQuantity(addOn.id, -1)} className="p-1 hover:bg-white rounded-md"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold">{selected.quantity}</span>
                        <button onClick={() => updateAddOnQuantity(addOn.id, 1)} className="p-1 hover:bg-white rounded-md"><Plus className="w-3 h-3" /></button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Base Rate</span>
              <span className="font-bold">${calculatePrice.base.toFixed(2)}</span>
            </div>
            {calculatePrice.cleaning > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Cleaning Fee</span>
                <span className="font-bold">${calculatePrice.cleaning.toFixed(2)}</span>
              </div>
            )}
            {calculatePrice.cott > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">COTT Fee</span>
                <span className="font-bold">${calculatePrice.cott.toFixed(2)}</span>
              </div>
            )}
            {calculatePrice.insurance > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Insurance</span>
                <span className="font-bold">${calculatePrice.insurance.toFixed(2)}</span>
              </div>
            )}
            {calculatePrice.addOnsTotal > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Add-ons</span>
                <span className="font-bold">${calculatePrice.addOnsTotal.toFixed(2)}</span>
              </div>
            )}
            {calculatePrice.vat > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">VAT (12.5%)</span>
                <span className="font-bold">${calculatePrice.vat.toFixed(2)}</span>
              </div>
            )}
            {calculatePrice.cautionFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Caution Fee (Refundable)</span>
                <span className="font-bold">${calculatePrice.cautionFee.toFixed(2)}</span>
              </div>
            )}
          </div>
          <div className="pt-6 border-t border-white/10 flex justify-between items-end">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
              <p className="text-3xl font-bold">${calculatePrice.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Pricing Subject to</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Admin Confirmation</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onContinue({
            selectedDate,
            selectedTimeSlot,
            guests,
            duration,
            bookingMode,
            selectedAddOns,
            isTicketed,
            technicianRequired,
            startTime,
            endTime,
            totalPrice: calculatePrice.grandTotal
          })}
          disabled={!selectedDate || (bookingMode === 'hourly' && (listing.pricingModel === PricingModel.DURATION || listing.pricingModel === PricingModel.DURATION_PLUS_EXTRA) && !selectedTimeSlot)}
          className={cn(
            "w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl",
            selectedDate 
              ? "bg-brand text-white shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]" 
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          {selectedDate ? 'Continue to Booking' : 'Select a Date'}
        </button>

        <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Info className="w-3 h-3" /> No payment required yet
        </p>
      </div>
    </div>
  );
};
