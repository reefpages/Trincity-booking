import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  Save,
  CheckCircle2,
  Users,
  BadgeCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AccountType, VerificationStatus } from '../types';
import { cn } from '@/src/lib/utils';

export const Profile = () => {
  const { user, setUser } = useApp();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    organizationName: user?.organizationName || '',
    accountType: user?.accountType || AccountType.PUBLIC
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save
    setTimeout(() => {
      setUser({
        ...user,
        ...formData
      });
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand font-bold text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">Profile Settings</h1>
        <p className="text-slate-500">Manage your personal information and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left: Sidebar */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
            <div className="w-24 h-24 bg-brand/10 text-brand rounded-3xl flex items-center justify-center text-3xl font-bold mx-auto mb-6">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{user.firstName} {user.lastName}</h3>
            <div className="flex items-center justify-center gap-2">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                user.verificationStatus === VerificationStatus.ACTIVE ? "bg-green-50 text-green-600 border-green-100" : "bg-amber-50 text-amber-600 border-amber-100"
              )}>
                {user.verifiedRole}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Verification Details</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="w-5 h-5 text-brand" />
                <span>Account Verified</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <BadgeCheck className="w-5 h-5 text-brand" />
                <span>{user.accountType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
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
                    <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
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
                      className="w-full pl-14 pr-6 py-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 cursor-not-allowed font-medium"
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
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account Type</label>
                  <div className="relative group">
                    <Users className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                    <select 
                      disabled
                      className="w-full pl-14 pr-6 py-4 bg-slate-100 border border-slate-200 rounded-2xl text-slate-500 cursor-not-allowed font-medium appearance-none"
                      value={formData.accountType}
                    >
                      {Object.values(AccountType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Organization</label>
                  <div className="relative group">
                    <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                    <input 
                      type="text" 
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Lock className="w-4 h-4" />
                  Password can be updated in security settings.
                </div>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className={cn(
                    "px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl flex items-center gap-2",
                    isSaving 
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                      : isSaved 
                        ? "bg-green-500 text-white shadow-green-500/20"
                        : "bg-brand text-white shadow-brand/20 hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : isSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <Lock className="w-6 h-6 text-brand" /> Security Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900">Update Password</h4>
                  <p className="text-sm text-slate-500 mt-1">Change your password to keep your account secure.</p>
                </div>
                <button className="px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                  Update
                </button>
              </div>
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account.</p>
                </div>
                <button className="px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
                  Enable
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
