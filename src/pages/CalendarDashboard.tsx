import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter, 
  Search,
  Clock,
  Users,
  Building2,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useApp } from '../context/AppContext';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';

export const CalendarDashboard = () => {
  const { bookings } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(b => isSameDay(new Date(b.date), date));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Calendar Dashboard</h1>
            <p className="text-slate-500 font-medium">Visual overview of venue availability and scheduled events.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-brand hover:text-brand transition-all flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filter Venues
            </button>
            <button className="px-6 py-3 bg-brand text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <Plus className="w-5 h-5" /> Block Dates
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-8">
            <div className="glass-card overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900">{format(currentDate, 'MMMM yyyy')}</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevMonth}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-brand transition-all"
                  >
                    Today
                  </button>
                  <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-600"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 border-b border-slate-100">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {calendarDays.map((day, idx) => {
                  const dayBookings = getBookingsForDate(day);
                  const isSelected = isSameDay(day, selectedDate);
                  const isCurrentMonth = isSameMonth(day, monthStart);
                  const isToday = isSameDay(day, new Date());

                  return (
                    <div 
                      key={idx}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "min-h-[120px] p-2 border-r border-b border-slate-100 transition-all cursor-pointer relative group",
                        !isCurrentMonth && "bg-slate-50/50 opacity-40",
                        isSelected && "bg-brand/5 ring-1 ring-inset ring-brand/20",
                        "hover:bg-slate-50"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={cn(
                          "w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all",
                          isToday ? "bg-brand text-white" : "text-slate-600 group-hover:text-brand",
                          isSelected && !isToday && "bg-brand/10 text-brand"
                        )}>
                          {format(day, 'd')}
                        </span>
                        {dayBookings.length > 0 && (
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {dayBookings.length} Events
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        {dayBookings.slice(0, 3).map((booking, bIdx) => (
                          <div 
                            key={bIdx}
                            className={cn(
                              "px-2 py-1 rounded-lg text-[10px] font-bold truncate",
                              booking.status === 'confirmed' ? "bg-green-50 text-green-600 border border-green-100" : 
                              booking.status === 'pending' ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-red-50 text-red-600 border border-red-100"
                            )}
                          >
                            {booking.venueName}
                          </div>
                        ))}
                        {dayBookings.length > 3 && (
                          <div className="text-[10px] font-bold text-slate-400 pl-2">
                            + {dayBookings.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar: Day View */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Events for</p>
                  <h3 className="text-2xl font-bold text-slate-900">{format(selectedDate, 'MMM do, yyyy')}</h3>
                </div>
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                {getBookingsForDate(selectedDate).length > 0 ? (
                  getBookingsForDate(selectedDate).map((booking, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 group hover:border-brand transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-brand">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{booking.venueName}</h4>
                            <p className="text-xs text-slate-500">{booking.customerName}</p>
                          </div>
                        </div>
                        <button className="p-1 text-slate-400 hover:text-brand transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <Clock className="w-3 h-3" /> 09:00 - 17:00
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <Users className="w-3 h-3" /> {booking.guests}
                          </div>
                        </div>
                        <span className={cn(
                          "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest",
                          booking.status === 'confirmed' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <p className="text-slate-400 font-bold text-sm">No events scheduled for this day.</p>
                    <button className="mt-4 text-brand font-bold text-sm hover:underline">
                      + Add Manual Booking
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="glass-card p-8 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-[60px] rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-brand" /> Calendar Sync
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Your calendar is currently synced with 3 external feeds (Google, Outlook, iCal). Last sync: 5 minutes ago.
                </p>
                <button className="w-full py-3 bg-brand text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Sync Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
