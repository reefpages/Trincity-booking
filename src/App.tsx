import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/src/components/layout/Layout';
import { Home } from '@/src/pages/Home';
import { VenuesListing } from '@/src/pages/VenuesListing';
import { SingleVenue } from '@/src/pages/SingleVenue';
import { Services } from '@/src/pages/Services';
import { TermsOfService } from '@/src/pages/TermsOfService';
import { PrivacyPolicy } from '@/src/pages/PrivacyPolicy';
import { BookingForm } from '@/src/pages/BookingForm';
import { Login } from '@/src/pages/Login';
import { Register } from '@/src/pages/Register';
import { Dashboard } from '@/src/pages/Dashboard';
import { ConfirmBooking } from '@/src/pages/ConfirmBooking';
import { Payment } from '@/src/pages/Payment';
import { BookingSuccess } from '@/src/pages/BookingSuccess';
import { Contact } from '@/src/pages/Contact';
import { FAQ } from '@/src/pages/FAQ';
import { About } from '@/src/pages/About';
import { Discounts } from '@/src/pages/Discounts';
import { ForgotPassword } from '@/src/pages/ForgotPassword';
import { ResetPassword } from '@/src/pages/ResetPassword';
import { MyBookings } from '@/src/pages/MyBookings';
import { Profile } from '@/src/pages/Profile';
import { AdminDashboard } from '@/src/pages/AdminDashboard';
import { ManageVenues } from '@/src/pages/ManageVenues';
import { ManageBookings } from '@/src/pages/ManageBookings';
import { CalendarDashboard } from '@/src/pages/CalendarDashboard';
import { PricingManager } from '@/src/pages/PricingManager';
import { DiscountManager } from '@/src/pages/DiscountManager';
import { AddOnsManager } from '@/src/pages/AddOnsManager';
import { AdminUserVerification } from '@/src/pages/AdminUserVerification';
import { CalendarSyncSettings } from '@/src/pages/CalendarSyncSettings';
import { useApp } from '@/src/context/AppContext';

export default function App() {
  const { isAuthReady } = useApp();

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-100 border-t-brand rounded-full animate-spin" />
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Admin Routes - No Layout */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/venues" element={<ManageVenues />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/calendar" element={<CalendarDashboard />} />
        <Route path="/admin/pricing" element={<PricingManager />} />
        <Route path="/admin/discounts" element={<DiscountManager />} />
        <Route path="/admin/addons" element={<AddOnsManager />} />
        <Route path="/admin/users" element={<AdminUserVerification />} />
        <Route path="/admin/sync" element={<CalendarSyncSettings />} />

        {/* Public & User Routes - With Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/venues" element={<VenuesListing />} />
                <Route path="/venues/:id" element={<SingleVenue />} />
                <Route path="/services" element={<Services />} />
                <Route path="/booking/:id" element={<BookingForm />} />
                <Route path="/confirm-booking" element={<ConfirmBooking />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
