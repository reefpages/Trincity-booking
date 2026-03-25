import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    
    // Simulate password reset
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
                <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Reset Password</h2>
                <p className="text-slate-500 leading-relaxed">
                  Enter your new password below.
                </p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Password</label>
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
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                      <input 
                        type="password" 
                        required
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      />
                    </div>
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
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      Reset Password <ArrowRight className="w-5 h-5" />
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
              <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Password Reset Successful</h2>
              <p className="text-slate-500 leading-relaxed mb-12">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <Link 
                to="/login"
                className="w-full py-5 rounded-2xl font-bold text-lg bg-brand text-white shadow-xl shadow-brand/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Sign In Now <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}

          <div className="mt-12 flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <ShieldCheck className="w-6 h-6 text-brand" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
              Your new password must be at least 8 characters long.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
