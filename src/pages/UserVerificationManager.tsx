import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MoreVertical,
  User,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Eye,
  Building2,
  Briefcase,
  Users,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const UserVerificationManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+1 (868) 555-0123', accountType: 'Public User', status: 'active', role: 'Public', joined: '2024-03-15' },
    { id: '2', name: 'Dr. Sarah Smith', email: 's.smith@trincol.edu', phone: '+1 (868) 555-0124', accountType: 'Staff/Faculty', status: 'pending', role: 'Staff', joined: '2024-03-20' },
    { id: '3', name: 'Michael Chen', email: 'm.chen@ngo.org', phone: '+1 (868) 555-0125', accountType: 'NGO/Charitable Organization', status: 'pending', role: 'NGO', joined: '2024-03-22' },
    { id: '4', name: 'Emma Wilson', email: 'emma.w@corp.com', phone: '+1 (868) 555-0126', accountType: 'Corporate/Organization', status: 'active', role: 'Corporate', joined: '2024-03-10' },
    { id: '5', name: 'David Brown', email: 'd.brown@alumni.trincol.edu', phone: '+1 (868) 555-0127', accountType: 'Alumni/PSG', status: 'suspended', role: 'Alumni', joined: '2024-02-28' },
  ];

  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || u.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">User Verification</h1>
            <p className="text-slate-500 font-medium">Manage user accounts, verify roles, and approve discount eligibility.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-brand hover:text-brand transition-all flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Verification Rules
            </button>
            <button className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <Users className="w-5 h-5" /> Bulk Actions
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search users by name or email..."
                className="w-full pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm border-none focus:ring-2 focus:ring-brand/20 transition-all appearance-none pr-10 relative"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <div className="h-8 w-px bg-slate-200" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{filteredUsers.length} Users Total</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Type</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Role</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{user.name}</span>
                          <span className="text-xs text-slate-400">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-slate-600 font-medium">{user.accountType}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm text-slate-600 font-medium">{user.joined}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5",
                        user.status === 'active' ? "bg-green-50 text-green-600" : 
                        user.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                      )}>
                        {user.status === 'active' && <CheckCircle2 className="w-3 h-3" />}
                        {user.status === 'pending' && <Clock className="w-3 h-3" />}
                        {user.status === 'suspended' && <XCircle className="w-3 h-3" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
