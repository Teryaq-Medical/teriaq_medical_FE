"use client";

import { useState, useEffect } from "react";
import { useBooking } from "@/context/BookingContext";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation"; // 1. Added Router

const MOCK_API_SLOTS = [
  { date: "2024-05-20", dayName: "الإثنين", slots: ["09:00 AM", "10:30 AM", "12:00 PM", "02:30 PM"] },
  { date: "2024-05-21", dayName: "الثلاثاء", slots: ["08:00 AM", "11:00 AM", "01:00 PM", "04:30 PM"] },
  { date: "2024-05-22", dayName: "الأربعاء", slots: ["10:00 AM", "11:30 AM", "03:00 PM"] },
  { date: "2024-05-23", dayName: "الخميس", slots: ["09:00 AM", "12:00 PM", "05:00 PM"] },
];

export default function DateTimeSelection() {
  const router = useRouter(); // 2. Initialize Router
  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useBooking();
  const [availableData] = useState(MOCK_API_SLOTS);

  const activeDaySlots = availableData.find(d => d.date === selectedDate)?.slots || [];

  const handleProceed = () => {
    // Navigate to step 4
    router.push("/book/book-review");
  };

  return (
    <div className="space-y-8" dir="rtl">
      {/* 1. Date Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#031B4E] flex items-center gap-2">
            <CalendarIcon size={20} className="text-[#00B5C1]" />
            اختر التاريخ
          </h3>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {availableData.map((day) => (
            <button
              key={day.date}
              onClick={() => {
                setSelectedDate(day.date);
                setSelectedTime(""); 
              }}
              className={cn(
                "flex flex-col items-center min-w-22.5 p-4 rounded-2xl border-2 transition-all",
                selectedDate === day.date 
                  ? "border-[#00B5C1] bg-[#F0FBFC] shadow-sm" 
                  : "border-gray-100 bg-white hover:border-gray-200"
              )}
            >
              <span className={cn("text-xs font-bold mb-1", selectedDate === day.date ? "text-[#00B5C1]" : "text-gray-400")}>
                {day.dayName}
              </span>
              <span className={cn("text-lg font-black", selectedDate === day.date ? "text-orange-500" : "text-[#031B4E]")}>
                {day.date.split("-")[2]}
              </span>
              <span className="text-[10px] text-gray-500">May 2024</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Time Selection */}
      <div className={cn("transition-opacity duration-300", !selectedDate && "opacity-30 pointer-events-none")}>
        <h3 className="text-lg font-bold text-[#031B4E] mb-4 flex items-center gap-2">
          <Clock size={20} className="text-[#00B5C1]" />
          المواعيد المتاحة
        </h3>

        {activeDaySlots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {activeDaySlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-3 px-4 rounded-xl text-sm font-bold border transition-all",
                  selectedTime === time
                    ? "bg-[#F0FBFC] text-orange-500 border-[#031B4E] shadow-md" // Changed text-white for readability
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#00B5C1]"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center border-2 border-dashed border-gray-100 rounded-2xl">
            <p className="text-gray-400">الرجاء اختيار تاريخ أولاً لرؤية المواعيد</p>
          </div>
        )}
      </div>

      {/* 3. Action Button */}
      <div className="pt-6">
        <button
          onClick={handleProceed} // 3. Added click handler
          disabled={!selectedDate || !selectedTime}
          className={cn(
            "w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg",
            selectedDate && selectedTime
              ? "bg-[#00B5C1] text-white hover:bg-[#009ca6]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          تأكيد الحجز ومراجعة البيانات
        </button>
      </div>
    </div>
  );
}