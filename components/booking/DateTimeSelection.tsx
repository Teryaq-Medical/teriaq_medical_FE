"use client";

import { useState, useEffect, useRef } from "react";
import { useBooking } from "@/context/BookingContext";
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { DoctorService } from "@/services/auth.service";

const DAYS_MAP: Record<string, string> = {
  Saturday: "sat", Sunday: "sun", Monday: "mon",
  Tuesday: "tue", Wednesday: "wed", Thursday: "thu", Friday: "fri",
};

const DAYS_AR: Record<string, string> = {
  sat: "السبت", sun: "الأحد", mon: "الاثنين",
  tue: "الثلاثاء", wed: "الأربعاء", thu: "الخميس", fri: "الجمعة",
};

const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToDisplay(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

interface DayEntry {
  date: string;
  code: string;
  num: number;
  month: string;
  nameAr: string;
}

export default function DateTimeSelection() {
  const router = useRouter();
  const {
    selectedDoctor,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime,
    setSelectedScheduleId, selectedScheduleId,
    setAssignmentId,
  } = useBooking();

  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSchedule, setActiveSchedule] = useState<any | null>(null);
  const [chosenMinutes, setChosenMinutes] = useState<number | null>(null);
  const clockRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!selectedDoctor?.id) return;
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const list = await DoctorService.getWorkSchedules(Number(selectedDoctor.id));
        setSchedules(Array.isArray(list) ? list : []);
      } catch {
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [selectedDoctor?.id]);

  // Only return days that have a matching schedule, up to 8 upcoming
  const getAvailableDays = (): DayEntry[] => {
    const availableCodes = new Set(schedules.map((s) => s.day));
    const result: DayEntry[] = [];
    for (let i = 0; i < 60; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const nameEn = d.toLocaleDateString("en-US", { weekday: "long" });
      const code = DAYS_MAP[nameEn];
      if (availableCodes.has(code)) {
        result.push({
          date: d.toISOString().split("T")[0],
          code,
          num: d.getDate(),
          month: MONTHS_AR[d.getMonth()],
          nameAr: DAYS_AR[code],
        });
      }
      if (result.length >= 8) break;
    }
    return result;
  };

  const availableDays = getAvailableDays();

  const handleDateSelect = (day: DayEntry) => {
    setSelectedDate(day.date);
    setSelectedTime("");
    setSelectedScheduleId(null);
    setChosenMinutes(null);
    setActiveSchedule(null);

    const schedule = schedules.find((s) => s.day === day.code) ?? null;
    if (schedule) {
      setActiveSchedule(schedule);
      const startMin = timeToMinutes(schedule.start_time);
      setChosenMinutes(startMin);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mins = parseInt(e.target.value);
    setChosenMinutes(mins);
  };

  const handleConfirmTime = () => {
    if (!activeSchedule || chosenMinutes === null) return;
    const timeStr = minutesToDisplay(chosenMinutes) + ":00";
    setSelectedTime(timeStr);
    setSelectedScheduleId(activeSchedule.id);
    const aid = activeSchedule.assignment_id ?? activeSchedule.assignment;
    if (aid) setAssignmentId(aid);
  };

  // Derived values for the clock
  const startMin = activeSchedule ? timeToMinutes(activeSchedule.start_time) : 0;
  const endMin = activeSchedule ? timeToMinutes(activeSchedule.end_time) : 60;
  const progress = endMin > startMin ? ((chosenMinutes ?? startMin) - startMin) / (endMin - startMin) : 0;

  // Clock drawing
  const CX = 90, CY = 90, R = 72, INNER_R = 52;
  const toRad = (angle: number) => (angle - 90) * (Math.PI / 180);
  const arcDeg = progress * 360;
  const arcEndX = CX + R * Math.cos(toRad(arcDeg));
  const arcEndY = CY + R * Math.sin(toRad(arcDeg));
  const startX = CX, startY = CY - R;
  const largeArc = arcDeg > 180 ? 1 : 0;
  const minuteOfHour = chosenMinutes !== null ? chosenMinutes % 60 : 0;
  const handDeg = minuteOfHour * 6;
  const handX = CX + INNER_R * Math.cos(toRad(handDeg));
  const handY = CY + INNER_R * Math.sin(toRad(handDeg));

  const isTimeConfirmed = selectedScheduleId !== null;

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-[#00B5C1]" />
      </div>
    );
  }

  return (
    <div className="space-y-8" dir="rtl">
      {/* ── Date Selection ── */}
      <div>
        <h3 className="text-lg font-bold text-[#031B4E] mb-4 flex items-center gap-2">
          <CalendarIcon size={20} className="text-[#00B5C1]" />
          اختر التاريخ
        </h3>

        {availableDays.length === 0 ? (
          <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-2xl">
            لا توجد مواعيد متاحة
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {availableDays.map((day) => (
              <button
                key={day.date}
                onClick={() => handleDateSelect(day)}
                className={cn(
                  "flex flex-col items-center min-w-[76px] p-4 rounded-2xl border-2 transition-all",
                  selectedDate === day.date
                    ? "border-[#00B5C1] bg-[#F0FBFC]"
                    : "border-gray-100 bg-white hover:border-[#00B5C1]/40"
                )}
              >
                <span className="text-xs font-bold mb-1 text-gray-500">{day.nameAr}</span>
                <span className="text-2xl font-black text-[#031B4E]">{day.num}</span>
                <span className="text-xs text-gray-400 mt-1">{day.month}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Time Selection — Clock ── */}
      <div className={cn("transition-opacity", !activeSchedule && "opacity-40 pointer-events-none")}>
        <h3 className="text-lg font-bold text-[#031B4E] mb-4 flex items-center gap-2">
          <Clock size={20} className="text-[#00B5C1]" />
          اختر الوقت
        </h3>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
          {/* Chosen time display */}
          <p className="text-center text-3xl font-black tracking-widest text-[#00B5C1]">
            {chosenMinutes !== null ? minutesToDisplay(chosenMinutes) : "--:--"}
          </p>
          <p className="text-center text-xs text-gray-400">
            {activeSchedule
              ? `من ${minutesToDisplay(startMin)} إلى ${minutesToDisplay(endMin)}`
              : ""}
          </p>

          {/* Analog clock */}
          <div className="flex justify-center">
            <svg
              ref={clockRef}
              width="180"
              height="180"
              viewBox="0 0 180 180"
              className="overflow-visible"
            >
              {/* Track */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="#E5E7EB" strokeWidth="10" />
              {/* Progress arc */}
              {progress > 0 && (
                <path
                  d={`M ${startX},${startY} A ${R},${R} 0 ${largeArc} 1 ${arcEndX},${arcEndY}`}
                  fill="none"
                  stroke="#00B5C1"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              )}
              {/* Hour markers */}
              {[12, 3, 6, 9].map((label, i) => {
                const deg = i * 90;
                const mx = CX + 60 * Math.cos(toRad(deg));
                const my = CY + 60 * Math.sin(toRad(deg));
                return (
                  <text key={label} x={mx} y={my + 4} textAnchor="middle" fontSize="11" fill="#D1D5DB">
                    {label}
                  </text>
                );
              })}
              {/* Minute hand */}
              <line x1={CX} y1={CY} x2={handX} y2={handY} stroke="#00B5C1" strokeWidth="2.5" strokeLinecap="round" />
              {/* Center dot */}
              <circle cx={CX} cy={CY} r={4} fill="#00B5C1" />
            </svg>
          </div>

          {/* Range slider */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs text-gray-400 min-w-[40px] text-right">
              {activeSchedule ? minutesToDisplay(startMin) : ""}
            </span>
            <input
              type="range"
              min={startMin}
              max={endMin}
              step={5}
              value={chosenMinutes ?? startMin}
              onChange={handleSliderChange}
              className="flex-1 accent-[#00B5C1]"
            />
            <span className="text-xs text-gray-400 min-w-[40px]">
              {activeSchedule ? minutesToDisplay(endMin) : ""}
            </span>
          </div>

          {/* Confirm time button */}
          <button
            onClick={handleConfirmTime}
            disabled={chosenMinutes === null}
            className={cn(
              "w-full py-3 rounded-xl text-sm font-bold border transition-all",
              isTimeConfirmed
                ? "bg-[#00B5C1] text-white border-[#00B5C1]"
                : "bg-white border-gray-200 text-[#031B4E] hover:border-[#00B5C1]"
            )}
          >
            {isTimeConfirmed
              ? `✓ تم تحديد ${minutesToDisplay(chosenMinutes!)}` 
              : "تأكيد الوقت"}
          </button>
        </div>
      </div>

      {/* ── Proceed button ── */}
      <button
        onClick={() => router.push("/book/book-review")}
        disabled={!isTimeConfirmed}
        className="w-full py-4 rounded-2xl font-bold bg-[#00B5C1] text-white disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
      >
        مراجعة تفاصيل الحجز
      </button>
    </div>
  );
}