import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ChevronLeft,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '@/src/lib/utils';

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, users } = useApp();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Simulate login
    setTimeout(() => {
      const foundUser = users.find(u => u.email === formData.email);
      
      if (foundUser) {
        setUser(foundUser);
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column: Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-24">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/campus/1920/1080')] bg-cover bg-center opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/60 via-slate-900/80 to-slate-900" />
        
        <div className="relative z-10 max-w-lg">
          <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-12 shadow-2xl shadow-brand/20 p-4">
            <img 
              src="https://storage.googleapis.com/test-media-ais-dev/avr6zxhqvpqodcrngx4mkl/shekeeladesigns@gmail.com/logo.png" 
              alt="Trincity College Limited" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
            Premium Venue <span className="text-brand">Booking</span> for Trincity College.
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-12">
            Access our world-class facilities and manage your events with ease.
          </p>
          <div className="space-y-6">
            {[
              "Real-time Availability",
              "Secure Online Payments",
              "Instant Confirmation",
              "Professional Support"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 text-white font-bold">
                <div className="w-6 h-6 bg-brand/20 text-brand rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand font-bold text-sm mb-12 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500">Sign in to manage your venue bookings and account settings.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="/forgot-password" title="Reset your password" name="forgot-password" id="forgot-password" className="text-xs font-bold text-brand hover:underline">Forgot Password?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                  />
                  <div className={cn(
                    "w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center",
                    formData.rememberMe ? "bg-brand border-brand" : "bg-white border-slate-200 group-hover:border-brand/50"
                  )}>
                    {formData.rememberMe && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-600">Remember me</span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3",
                isLoading 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-brand text-white shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Don't have an account? <Link to="/register" className="text-brand font-bold hover:underline">Create an account</Link>
            </p>
          </div>

          <div className="mt-12 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <ShieldCheck className="w-6 h-6 text-brand" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
              Your data is protected by industry-standard encryption and security protocols.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
