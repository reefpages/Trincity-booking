import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  History,
  Settings,
  ArrowRight,
  Plus,
  BadgeCheck,
  Building2,
  Mail,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VerificationStatus, BookingStatus } from '../types';
import { cn } from '@/src/lib/utils';

export const Dashboard = () => {
  const { user, bookings } = useApp();

  if (!user) return null;

  const userBookings = bookings.filter(b => b.userId === user.id);
  const upcomingBookings = userBookings.filter(b => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.PENDING);
  const pastBookings = userBookings.filter(b => b.status === BookingStatus.PAID || b.status === BookingStatus.CANCELLED);

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.ACTIVE: return 'bg-green-50 text-green-600 border-green-100';
      case VerificationStatus.PENDING_REVIEW: return 'bg-amber-50 text-amber-600 border-amber-100';
      case VerificationStatus.EMAIL_UNVERIFIED: return 'bg-slate-50 text-slate-600 border-slate-100';
      case VerificationStatus.REJECTED: return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getBookingStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return 'bg-green-50 text-green-600';
      case BookingStatus.PENDING: return 'bg-amber-50 text-amber-600';
      case BookingStatus.CANCELLED: return 'bg-red-50 text-red-600';
      case BookingStatus.PAID: return 'bg-blue-50 text-blue-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-slate-500">Manage your venue bookings and account settings.</p>
        </div>
        <Link 
          to="/venues" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-bold shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-5 h-5" /> New Booking
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Account Summary */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center text-2xl font-bold">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{user.firstName} {user.lastName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                    getStatusColor(user.verificationStatus)
                  )}>
                    {user.verifiedRole}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{user.phone}</span>
              </div>
              {user.organizationName && (
                <div className="flex items-center gap-3 text-slate-600">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">{user.organizationName}</span>
                </div>
              )}
            </div>

            <Link 
              to="/profile" 
              className="mt-8 w-full py-4 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
            >
              <Settings className="w-4 h-4" /> Edit Profile
            </Link>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand" /> Verification Status
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  user.verificationStatus === VerificationStatus.ACTIVE ? "bg-green-50 text-green-500" : "bg-slate-50 text-slate-400"
                )}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email Verified</h4>
                  <p className="text-xs text-slate-500 mt-1">Confirmed on {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  user.verificationStatus === VerificationStatus.ACTIVE ? "bg-green-50 text-green-500" : "bg-amber-50 text-amber-500"
                )}>
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Role Verification</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {user.verificationStatus === VerificationStatus.ACTIVE 
                      ? `Verified as ${user.verifiedRole}` 
                      : "Pending administrative review"}
                  </p>
                </div>
              </div>
            </div>

            {user.verificationStatus === VerificationStatus.PENDING_REVIEW && (
              <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-xs text-amber-700 font-medium leading-relaxed">
                  Your account is currently pending review for discount eligibility. You can still make bookings at standard rates.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Bookings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-brand" /> Upcoming Bookings
              </h3>
              <Link to="/my-bookings" className="text-brand font-bold text-sm hover:underline flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand/30 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand shadow-sm">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Venue Booking #{booking.id}</h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {booking.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {booking.startTime || 'All Day'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest",
                          getBookingStatusColor(booking.status)
                        )}>
                          {booking.status}
                        </span>
                        <Link to={`/my-bookings/${booking.id}`} className="p-2 bg-white text-slate-400 hover:text-brand rounded-lg transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No upcoming bookings found.</p>
                <Link to="/venues" className="text-brand font-bold mt-2 inline-block hover:underline">Browse Venues</Link>
              </div>
            )}
          </div>

          {/* Quick Rebook / Saved Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-brand" /> Quick Rebook
              </h3>
              <p className="text-sm text-slate-500 mb-6">Easily book your favorite venues again with saved preferences.</p>
              <button className="w-full py-4 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-all">
                View Past Venues
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand" /> Eligibility Badge
              </h3>
              <div className="p-4 bg-brand/5 rounded-2xl border border-brand/10 flex items-center gap-4">
                <div className="w-12 h-12 bg-brand text-white rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{user.verifiedRole}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Member Since {new Date(user.createdAt).getFullYear()}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                Your account type determines your eligibility for institutional discounts and priority booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
