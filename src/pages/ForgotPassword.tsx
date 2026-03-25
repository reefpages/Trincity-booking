import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-12">
          <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand font-bold text-sm mb-12 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Login
          </Link>

          {!isSubmitted ? (
            <>
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Forgot Password?</h2>
                <p className="text-slate-500 leading-relaxed">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                    <input 
                      type="email" 
                      required
                      className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
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
                      Sending Link...
                    </>
                  ) : (
                    <>
                      Send Reset Link <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Check Your Email</h2>
              <p className="text-slate-500 leading-relaxed mb-12">
                We've sent a password reset link to <span className="font-bold text-slate-900">{email}</span>. Please check your inbox and spam folder.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-brand font-bold hover:underline"
              >
                Didn't receive the email? Try again
              </button>
            </motion.div>
          )}

          <div className="mt-12 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <ShieldCheck className="w-6 h-6 text-brand" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
              For security reasons, reset links expire after 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
