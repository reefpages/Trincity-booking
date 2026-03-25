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
  Building2,
  User as UserIcon,
  Phone,
  Briefcase,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '@/src/lib/utils';
import { AccountType, VerificationStatus, User } from '../types';

export const Register = () => {
  const navigate = useNavigate();
  const { setUser, users, setUsers } = useApp();
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    password: '', 
    confirmPassword: '',
    organization: '', 
    accountType: AccountType.PUBLIC,
    agreeTerms: false 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    // Check if email already exists
    if (users.some(u => u.email === formData.email)) {
      setError('An account with this email already exists.');
      setIsLoading(false);
      return;
    }
    
    // Simulate registration
    setTimeout(() => {
      let verificationStatus = VerificationStatus.EMAIL_UNVERIFIED;
      let verifiedRole = 'Public';

      // Staff verification logic
      if (formData.accountType === AccountType.STAFF) {
        const staffDomains = ['trincity.edu', 'trincol.edu'];
        const domain = formData.email.split('@')[1];
        if (staffDomains.includes(domain)) {
          verifiedRole = 'Verified Staff';
        } else {
          verificationStatus = VerificationStatus.PENDING_REVIEW;
          verifiedRole = 'Pending Verification';
        }
      } else if (formData.accountType === AccountType.SCHOOL) {
        verificationStatus = VerificationStatus.PENDING_REVIEW;
        verifiedRole = 'Pending Verification';
      } else if (formData.accountType === AccountType.NGO) {
        verificationStatus = VerificationStatus.PENDING_REVIEW;
        verifiedRole = 'Pending Verification';
      } else if (formData.accountType === AccountType.ALUMNI) {
        verificationStatus = VerificationStatus.PENDING_REVIEW;
        verifiedRole = 'Pending Verification';
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        organizationName: formData.organization,
        accountType: formData.accountType as AccountType,
        verificationStatus,
        verifiedRole,
        createdAt: new Date().toISOString()
      };

      setUsers([...users, newUser]);
      setUser(newUser);
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const accountTypes = Object.values(AccountType);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column: Visual */}
      <div className="hidden lg:flex lg:w-1/3 bg-slate-900 relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/college/1920/1080')] bg-cover bg-center opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/60 via-slate-900/80 to-slate-900" />
        
        <div className="relative z-10 max-w-sm">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-2xl shadow-brand/20 p-3">
            <img 
              src="https://storage.googleapis.com/test-media-ais-dev/avr6zxhqvpqodcrngx4mkl/shekeeladesigns@gmail.com/logo.png" 
              alt="Trincity College Limited" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
            Join the <span className="text-brand">TRINCOL</span> Community.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            Create an account to access our premium venues and exclusive rates.
          </p>
          <div className="space-y-4">
            {[
              "Exclusive Member Discounts",
              "Priority Booking Access",
              "Manage Multiple Events",
              "Secure Payment History"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-white font-bold text-sm">
                <div className="w-5 h-5 bg-brand/20 text-brand rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-24 bg-white overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto">
          <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand font-bold text-sm mb-12 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Login
          </Link>
          
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Create Account</h2>
            <p className="text-slate-500">Fill in the details below to set up your booking profile.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="text" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="email" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="tel" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="+1 (868) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Type</label>
                <div className="relative group">
                  <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <select 
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium appearance-none"
                    value={formData.accountType}
                    onChange={(e) => setFormData({...formData, accountType: e.target.value as AccountType})}
                  >
                    {accountTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Organization (Optional)</label>
                <div className="relative group">
                  <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="text" 
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="Company or School Name"
                    value={formData.organization}
                    onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
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
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                  />
                  <div className={cn(
                    "w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center",
                    formData.agreeTerms ? "bg-brand border-brand" : "bg-white border-slate-200 group-hover:border-brand/50"
                  )}>
                    {formData.agreeTerms && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-600">
                  I agree to the <Link to="/terms" className="text-brand hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand hover:underline">Privacy Policy</Link>
                </span>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading || !formData.agreeTerms}
              className={cn(
                "w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-3",
                isLoading || !formData.agreeTerms
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-brand text-white shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already have an account? <Link to="/login" className="text-brand font-bold hover:underline">Sign in instead</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
