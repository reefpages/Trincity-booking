import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Info,
  CreditCard,
  ShieldCheck,
  Lock,
  Building2,
  Calendar as CalendarIcon,
  Clock,
  MapPin
} from 'lucide-react';
import { LISTINGS } from '../data/listings';
import { PricingModel } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { format } from 'date-fns';

export const Payment = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<any>(null);
  const [listing, setListing] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/booking-success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-bold text-slate-900">Secure Payment</h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold"><CheckCircle2 className="w-6 h-6" /></div>
              <div className="w-12 h-1 bg-green-500 rounded-full" />
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold"><CheckCircle2 className="w-6 h-6" /></div>
              <div className="w-12 h-1 bg-green-500 rounded-full" />
              <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">3</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Payment Methods */}
            <div className="lg:col-span-7 space-y-8">
              <div className="glass-card p-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-brand" /> Payment Method
                </h3>
                
                <div className="space-y-4">
                  {[
                    { id: 'credit_card', label: 'Credit or Debit Card', icon: CreditCard, subtitle: 'Visa, Mastercard, Amex' },
                    { id: 'bank_transfer', label: 'Bank Transfer / ACH', icon: Building2, subtitle: 'Direct deposit to TRINCOL account' },
                    { id: 'campus_pay', label: 'Campus Pay (Staff/Students)', icon: ShieldCheck, subtitle: 'Payroll deduction or student account' }
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between",
                        paymentMethod === method.id ? "border-brand bg-brand/5" : "border-slate-100 bg-white hover:border-slate-200"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          paymentMethod === method.id ? "bg-brand text-white" : "bg-slate-100 text-slate-400"
                        )}>
                          <method.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{method.label}</p>
                          <p className="text-xs text-slate-500">{method.subtitle}</p>
                        </div>
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        paymentMethod === method.id ? "border-brand bg-brand" : "border-slate-200"
                      )}>
                        {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>

                {paymentMethod === 'credit_card' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 pt-8 border-t border-slate-100 space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                          placeholder="0000 0000 0000 0000"
                        />
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Expiry Date</label>
                        <input 
                          type="text" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">CVC / CVV</label>
                        <input 
                          type="text" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-3 p-6 bg-slate-900 rounded-[32px] text-white">
                <ShieldCheck className="w-8 h-8 text-brand" />
                <div>
                  <p className="text-sm font-bold">Your payment is 100% secure</p>
                  <p className="text-xs text-slate-400">We use industry-standard encryption to protect your data.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Recap */}
            <div className="lg:col-span-5">
              <div className="glass-card p-8 sticky top-32">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Booking Recap</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100">
                      <img src={listing.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 leading-tight mb-2">{listing.title}</h4>
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                        <MapPin className="w-3 h-3" /> {listing.category}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 py-6 border-y border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Date</span>
                      <span className="font-bold text-slate-900">{format(new Date(bookingData.selectedDate), 'MMM do, yyyy')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-bold text-slate-900">{bookingData.duration} {bookingData.bookingMode === 'hourly' ? 'Hours' : 'Days'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Guests</span>
                      <span className="font-bold text-slate-900">{bookingData.guests} Persons</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-bold text-slate-900">$6,000.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">VAT (12.5%)</span>
                      <span className="font-bold text-slate-900">$750.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Caution Fee</span>
                      <span className="font-bold text-slate-900">$1,000.00</span>
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                      <span className="text-lg font-bold text-slate-900">Total Amount</span>
                      <span className="text-2xl font-bold text-brand">${bookingData.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={cn(
                    "w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3",
                    isProcessing 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                      : "bg-brand text-white shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay Now <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest mt-6">
                  By clicking "Pay Now", you agree to our Terms of Service and Booking Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
