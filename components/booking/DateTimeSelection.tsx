"use client";

import { useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { DoctorService } from "@/services/auth.service";

export default function DateTimeSelection() {
  const router = useRouter();
  const { 
  selectedDoctor, // <--- Add this
  selectedDate, setSelectedDate, 
  selectedTime, setSelectedTime, 
  setSelectedScheduleId, selectedScheduleId,
  setAssignmentId 
} = useBooking();

  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchSchedules = async () => {
    // 2. CRITICAL: Use selectedDoctor.id (the Assignment ID), NOT entity.id
    if (!selectedDoctor?.id) return; 
    
    try {
      setLoading(true);
      // Your service already returns res.data.data
      const list = await DoctorService.getWorkSchedules(Number(selectedDoctor.id));
      
      console.log("Schedules received from BE:", list);
      setSchedules(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch failed", err);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };
  
  fetchSchedules();
}, [selectedDoctor?.id]);

  const getUpcomingDays = () => {
    const daysMap: Record<string, string> = {
      'Saturday': 'sat', 'Sunday': 'sun', 'Monday': 'mon', 
      'Tuesday': 'tue', 'Wednesday': 'wed', 'Thursday': 'thu', 'Friday': 'fri'
    };
    return Array.from({ length: 14 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return {
        date: d.toISOString().split('T')[0],
        dayCode: daysMap[d.toLocaleDateString('en-US', { weekday: 'long' })],
        dayNameAr: d.toLocaleDateString('ar-EG', { weekday: 'long' }),
        dayNum: d.getDate(),
      };
    });
  };

  const availableDays = getUpcomingDays();
  const selectedDayCode = availableDays.find(d => d.date === selectedDate)?.dayCode;
  const activeSlots = schedules.filter(s => s.day === selectedDayCode);

  const handleSlotSelection = (slot: any) => {
    setSelectedTime(slot.start_time);
    setSelectedScheduleId(slot.id);
    
    // Now that we fixed the serializer, slot.assignment_id will exist!
    const aid = slot.assignment_id || slot.assignment; 
    
    if (aid) {
        setAssignmentId(aid);
        console.log("Assignment ID Captured:", aid);
    } else {
        console.error("Critical: Slot received without an assignment ID", slot);
    }
};

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#00B5C1]" /></div>;

  return (
    <div className="space-y-8" dir="rtl">
      <div>
        <h3 className="text-lg font-bold text-[#031B4E] mb-4 flex items-center gap-2">
          <CalendarIcon size={20} className="text-[#00B5C1]" /> اختر التاريخ
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {availableDays.map((day) => {
            const hasWork = schedules.some(s => s.day === day.dayCode);
            return (
              <button
                key={day.date}
                disabled={!hasWork}
                onClick={() => {
                  setSelectedDate(day.date);
                  setSelectedTime("");
                  setSelectedScheduleId(null);
                }}
                className={cn(
                  "flex flex-col items-center min-w-[80px] p-4 rounded-2xl border-2 transition-all",
                  selectedDate === day.date ? "border-[#00B5C1] bg-[#F0FBFC]" : "border-gray-100 bg-white",
                  !hasWork && "opacity-30 cursor-not-allowed"
                )}
              >
                <span className="text-xs font-bold mb-1">{day.dayNameAr}</span>
                <span className="text-xl font-black">{day.dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={cn(!selectedDate && "opacity-50 pointer-events-none")}>
        <h3 className="text-lg font-bold text-[#031B4E] mb-4 flex items-center gap-2">
          <Clock size={20} className="text-[#00B5C1]" /> المواعيد المتاحة
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {activeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleSlotSelection(slot)}
              className={cn(
                "py-3 px-4 rounded-xl text-sm font-bold border transition-all",
                selectedScheduleId === slot.id ? "bg-[#F0FBFC] text-orange-500 border-[#031B4E]" : "bg-white border-gray-200"
              )}
            >
              {slot.start_time.slice(0, 5)}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/book/book-review")}
        disabled={!selectedScheduleId}
        className="w-full py-4 rounded-2xl font-bold bg-[#00B5C1] text-white disabled:bg-gray-100"
      >
        مراجعة تفاصيل الحجز
      </button>
    </div>
  );
}