import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  RefreshCw, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Settings,
  ShieldCheck,
  Copy,
  Download,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const CalendarSyncSettings = () => {
  const [feeds, setFeeds] = useState([
    { id: '1', name: 'Google Calendar (Main)', type: 'Google', status: 'synced', lastSync: '2 mins ago', url: 'https://calendar.google.com/...' },
    { id: '2', name: 'Outlook (Staff Events)', type: 'Outlook', status: 'error', lastSync: '1 hour ago', url: 'https://outlook.office.com/...' },
    { id: '3', name: 'iCal (External Rentals)', type: 'iCal', status: 'synced', lastSync: '15 mins ago', url: 'https://ical.example.com/...' },
  ]);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">iCal / Sync Settings</h1>
            <p className="text-slate-500 font-medium">Connect external calendars and manage your booking feeds.</p>
          </div>
          <button className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add New Feed
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content: Active Feeds */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <RefreshCw className="w-6 h-6 text-brand" /> Active Calendar Feeds
              </h3>
              
              <div className="space-y-6">
                {feeds.map((feed) => (
                  <div key={feed.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-brand transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                          feed.status === 'synced' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        )}>
                          <CalendarIcon className="w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg">{feed.name}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{feed.type} Feed</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Last sync: {feed.lastSync}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5",
                          feed.status === 'synced' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                        )}>
                          {feed.status === 'synced' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {feed.status}
                        </span>
                        <button className="p-2 text-slate-400 hover:text-brand transition-colors">
                          <RefreshCw className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-mono truncate max-w-md">
                        <LinkIcon className="w-3 h-3" /> {feed.url}
                      </div>
                      <button className="text-brand font-bold text-xs flex items-center gap-1 hover:underline">
                        <Copy className="w-3 h-3" /> Copy URL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Download className="w-6 h-6 text-brand" /> Export TRINCOL Feed
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Use this URL to subscribe to the Trincity College booking calendar in your personal calendar application (Google, Apple, Outlook).
              </p>
              <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/20 text-brand rounded-xl flex items-center justify-center">
                    <LinkIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Your Public iCal Feed</p>
                    <p className="text-sm font-mono text-slate-300">https://api.trincol.edu/v1/calendar/feed/xyz-123.ics</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-brand text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
                  <Copy className="w-4 h-4" /> Copy Feed URL
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar: Sync Settings */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Settings className="w-6 h-6 text-brand" /> Sync Frequency
              </h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Automatic Refresh</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-brand/20">
                    <option>Every 15 Minutes</option>
                    <option>Every Hour</option>
                    <option>Every 6 Hours</option>
                    <option>Daily</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-sm font-bold text-slate-600">Sync on Login</span>
                  <div className="w-10 h-6 bg-brand rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-[60px] rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand" /> Conflict Prevention
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Automatically block dates in TRINCOL when an event is detected in your synced external calendars.
                </p>
                <button className="w-full py-3 bg-brand text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Configure Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
