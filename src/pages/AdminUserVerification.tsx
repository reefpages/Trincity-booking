import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ShieldCheck, 
  ArrowLeft,
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Calendar,
  BadgeCheck,
  Ban,
  UserCheck,
  Edit3,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VerificationStatus, AccountType, User } from '../types';
import { cn } from '@/src/lib/utils';

export const AdminUserVerification = () => {
  const { user, users, updateUserStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [adminNote, setAdminNote] = useState('');

  if (!user?.isAdmin) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <ShieldCheck className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Access Denied</h1>
        <p className="text-slate-500 mb-8">You do not have administrative privileges to access this page.</p>
        <Link to="/dashboard" className="px-8 py-4 bg-brand text-white rounded-2xl font-bold shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] transition-all inline-block">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || u.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (userId: string, status: VerificationStatus, role: string) => {
    updateUserStatus(userId, status, role);
    setSelectedUser(null);
    setAdminNote('');
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.ACTIVE: return <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-100 rounded-full text-[10px] font-bold uppercase tracking-widest">Active</span>;
      case VerificationStatus.PENDING_REVIEW: return <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[10px] font-bold uppercase tracking-widest">Pending</span>;
      case VerificationStatus.REJECTED: return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full text-[10px] font-bold uppercase tracking-widest">Rejected</span>;
      case VerificationStatus.SUSPENDED: return <span className="px-3 py-1 bg-slate-900 text-white border border-slate-900 rounded-full text-[10px] font-bold uppercase tracking-widest">Suspended</span>;
      default: return <span className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand font-bold text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">User Verification Manager</h1>
          <p className="text-slate-500">Review and manage user account statuses and role verifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters & Search */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
              <Search className="w-4 h-4 text-brand" /> Search Users
            </h3>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
              <input 
                type="text" 
                placeholder="Name or email..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand" /> Filter Status
            </h3>
            <div className="space-y-2">
              {['all', VerificationStatus.PENDING_REVIEW, VerificationStatus.ACTIVE, VerificationStatus.REJECTED, VerificationStatus.SUSPENDED].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-xs font-bold capitalize transition-all text-left flex items-center justify-between",
                    statusFilter === status ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  {status}
                  {statusFilter === status && <CheckCircle2 className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-bottom border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Type</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand/10 text-brand rounded-xl flex items-center justify-center font-bold text-sm">
                            {u.firstName[0]}{u.lastName[0]}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{u.firstName} {u.lastName}</h4>
                            <p className="text-xs text-slate-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-slate-700">{u.accountType}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{u.verifiedRole}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {getStatusBadge(u.verificationStatus)}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => setSelectedUser(u)}
                          className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredUsers.length === 0 && (
              <div className="py-24 text-center">
                <Users className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No users found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Review User Account</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <XCircle className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-brand" /> User Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">{selectedUser.organizationName || 'No Organization'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">Joined {new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand" /> Admin Notes
                  </h3>
                  <textarea 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-sm font-medium h-32 resize-none"
                    placeholder="Add internal notes about this user..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Update Status & Role</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => handleAction(selectedUser.id, VerificationStatus.ACTIVE, `Verified ${selectedUser.accountType.split(' ')[0]}`)}
                    className="p-6 bg-green-50 border border-green-100 rounded-2xl text-center hover:bg-green-100 transition-all group"
                  >
                    <UserCheck className="w-8 h-8 text-green-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <span className="block font-bold text-green-700 text-sm">Approve</span>
                    <span className="text-[10px] text-green-600 uppercase tracking-widest font-bold mt-1 block">Active Status</span>
                  </button>

                  <button 
                    onClick={() => handleAction(selectedUser.id, VerificationStatus.REJECTED, 'Public')}
                    className="p-6 bg-red-50 border border-red-100 rounded-2xl text-center hover:bg-red-100 transition-all group"
                  >
                    <XCircle className="w-8 h-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <span className="block font-bold text-red-700 text-sm">Reject</span>
                    <span className="text-[10px] text-red-600 uppercase tracking-widest font-bold mt-1 block">Public Role</span>
                  </button>

                  <button 
                    onClick={() => handleAction(selectedUser.id, VerificationStatus.SUSPENDED, selectedUser.verifiedRole)}
                    className="p-6 bg-slate-900 border border-slate-900 rounded-2xl text-center hover:bg-slate-800 transition-all group"
                  >
                    <Ban className="w-8 h-8 text-white mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <span className="block font-bold text-white text-sm">Suspend</span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 block">Lock Account</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
