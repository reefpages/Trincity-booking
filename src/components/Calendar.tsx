import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  Info
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore, 
  startOfToday,
  isWeekend
} from 'date-fns';
import { cn } from '@/src/lib/utils';
import { BookingStatus } from '../types';

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  blockedDates?: { date: string; status: BookingStatus; timeSlots?: string[] }[];
  mode?: 'compact' | 'full';
  showTimeSlots?: boolean;
  onTimeSlotSelect?: (slot: string) => void;
  selectedTimeSlot?: string;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  selectedDate, 
  onDateSelect, 
  blockedDates = [], 
  mode = 'full',
  showTimeSlots = false,
  onTimeSlotSelect,
  selectedTimeSlot,
  className 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();

  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Trincity College//Venue Booking//EN
BEGIN:VEVENT
UID:${Date.now()}@trincitycollege.com
DTSTAMP:${format(new Date(), "yyyyMMdd'T'HHmmss'Z'")}
DTSTART:${selectedDate ? format(selectedDate, "yyyyMMdd'T'080000'Z'") : ''}
DTEND:${selectedDate ? format(selectedDate, "yyyyMMdd'T'170000'Z'") : ''}
SUMMARY:Venue Booking
DESCRIPTION:Booking for venue
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'booking.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        <h2 className={cn(
          "font-bold text-slate-900",
          mode === 'compact' ? "text-lg" : "text-2xl"
        )}>
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-4">
        {days.map((day, idx) => (
          <div key={idx} className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
        const isToday = isSameDay(day, today);
        const isPast = isBefore(day, today);
        const isCurrentMonth = isSameMonth(day, monthStart);
        
        const blockedInfo = blockedDates.find(b => isSameDay(new Date(b.date), cloneDay));
        const isBlocked = !!blockedInfo && !blockedInfo.timeSlots; // Fully blocked if no time slots
        const status = blockedInfo?.status;

        days.push(
          <div
            key={day.toString()}
            className={cn(
              "relative aspect-square flex items-center justify-center text-sm font-medium transition-all cursor-pointer rounded-xl",
              !isCurrentMonth && "text-slate-300 pointer-events-none",
              isPast && "text-slate-300 pointer-events-none",
              isSelected && "bg-brand text-white shadow-lg shadow-brand/20",
              !isSelected && isCurrentMonth && !isBlocked && "hover:bg-brand/5 hover:text-brand",
              isToday && !isSelected && "text-brand border border-brand/20",
              isBlocked && "cursor-not-allowed bg-slate-50"
            )}
            onClick={() => !isBlocked && !isPast && onDateSelect(cloneDay)}
          >
            <span className="relative z-10">{formattedDate}</span>
            
            {isBlocked && (
              <div className={cn(
                "absolute inset-0 rounded-xl opacity-10",
                status === BookingStatus.CONFIRMED ? "bg-red-500" : 
                status === BookingStatus.PENDING ? "bg-orange-500" : "bg-slate-500"
              )} />
            )}
            
            {(isBlocked || (blockedInfo && blockedInfo.timeSlots)) && (
              <div className={cn(
                "absolute bottom-1 w-1 h-1 rounded-full",
                status === BookingStatus.CONFIRMED ? "bg-red-500" : 
                status === BookingStatus.PENDING ? "bg-orange-500" : "bg-slate-500"
              )} />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-2">{rows}</div>;
  };

  const renderTimeSlots = () => {
    if (!selectedDate || !showTimeSlots) return null;

    const slots = [
      '08:00', '09:00', '10:00', '11:00', '12:00', 
      '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    const blockedInfo = blockedDates.find(b => isSameDay(new Date(b.date), selectedDate));
    const blockedSlots = blockedInfo?.timeSlots || [];

    return (
      <div className="mt-8 pt-8 border-t border-slate-100">
        <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Available Time Slots
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {slots.map(slot => {
            const isBlocked = blockedSlots.includes(slot);
            const isSelected = selectedTimeSlot === slot;
            return (
              <button
                key={slot}
                disabled={isBlocked}
                onClick={() => onTimeSlotSelect?.(slot)}
                className={cn(
                  "py-2 px-3 rounded-lg text-xs font-bold transition-all",
                  isBlocked ? "bg-slate-50 text-slate-300 cursor-not-allowed" :
                  isSelected ? "bg-brand text-white shadow-md shadow-brand/20" :
                  "bg-slate-50 text-slate-600 hover:bg-slate-100"
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("bg-white rounded-3xl p-6 border border-slate-100", className)}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderTimeSlots()}
      
      <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <div className="w-3 h-3 rounded-full bg-brand" /> Selected
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <div className="w-3 h-3 rounded-full bg-red-500" /> Booked
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <div className="w-3 h-3 rounded-full bg-orange-500" /> Pending
          </div>
        </div>
        
        {selectedDate && (
          <button 
            onClick={downloadICS}
            className="flex items-center gap-2 text-xs font-bold text-brand hover:text-brand-hover transition-colors"
          >
            <CalendarIcon className="w-4 h-4" /> Sync to iCal
          </button>
        )}
      </div>
    </div>
  );
};
