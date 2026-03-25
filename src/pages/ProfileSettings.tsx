import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  Lock, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Camera,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useApp } from '../context/AppContext';

export const ProfileSettings = () => {
  const { user, setUser } = useApp();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+1 (868) 555-0123',
    organization: 'Trincity College Alumni Association',
    accountType: user?.accountType || 'Public User'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Profile Settings</h1>
              <p className="text-slate-500 font-medium">Manage your personal information, security, and account preferences.</p>
            </div>
            <button className="px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold transition-all hover:bg-red-100 flex items-center gap-2">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Navigation */}
            <div className="lg:col-span-4 space-y-4">
              {[
                { label: 'Personal Info', icon: User, active: true },
                { label: 'Security & Password', icon: Lock, active: false },
                { label: 'Verification Details', icon: ShieldCheck, active: false },
                { label: 'Notification Settings', icon: AlertCircle, active: false }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  className={cn(
                    "w-full p-5 rounded-2xl flex items-center justify-between transition-all group",
                    item.active ? "bg-brand text-white shadow-xl shadow-brand/20" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={cn("w-5 h-5", item.active ? "text-white" : "text-slate-400 group-hover:text-brand")} />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  <ChevronRight className={cn("w-4 h-4", item.active ? "text-white/60" : "text-slate-300")} />
                </button>
              ))}
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-8 space-y-8">
              <div className="glass-card p-10">
                <div className="flex items-center gap-8 mb-12">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[32px] bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-400 border-4 border-white shadow-xl">
                      {formData.firstName.charAt(0)}
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all">
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{formData.firstName} {formData.lastName}</h3>
                    <p className="text-slate-500 font-medium">{formData.accountType} • Joined March 2024</p>
                  </div>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                      <div className="relative group">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                        <input 
                          type="text" 
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                      <div className="relative group">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                        <input 
                          type="text" 
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
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
                          disabled
                          className="w-full pl-14 pr-6 py-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 font-medium cursor-not-allowed"
                          value={formData.email}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                        <input 
                          type="tel" 
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Organization</label>
                      <div className="relative group">
                        <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                        <input 
                          type="text" 
                          className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                          value={formData.organization}
                          onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      {showSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-green-600 font-bold text-sm"
                        >
                          <CheckCircle2 className="w-5 h-5" /> Profile updated successfully!
                        </motion.div>
                      )}
                    </div>
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className={cn(
                        "px-10 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3",
                        isSaving 
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                          : "bg-brand text-white shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]"
                      )}
                    >
                      {isSaving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
