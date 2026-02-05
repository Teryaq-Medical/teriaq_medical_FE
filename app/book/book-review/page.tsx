"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import { useBooking } from "@/context/BookingContext";
import { Calendar, Clock, MapPin, User, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReviewBookingPage() {
  const { entity, selectedDoctor, selectedSpecialties, selectedDate, selectedTime } = useBooking();

  const hasRequiredData = !!entity && !!selectedDate && !!selectedTime;

  // Final Confirmation Handler
  const handleConfirmBooking = async () => {
    // Logic to call your API goes here
    console.log("Booking Confirmed:", { entity, selectedDoctor, selectedDate, selectedTime });
  };

  return (
    <DashboardLayout>
      <BookingLayout title="مراجعة وتأكيد الحجز" currentStep={4}>
        {!hasRequiredData ? (
          <div className="p-10 text-center text-gray-400 font-bold border-2 border-dashed rounded-2xl" dir="rtl">
            <p className="text-xl mb-2">⚠️ بيانات ناقصة</p>
            <p>يرجى العودة واختيار التاريخ والوقت بشكل صحيح.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500" dir="rtl">
            
            {/* 1. The Summary Grid (Styled like Date-Time) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Place/Clinic Card */}
              <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#F0FBFC] flex items-center justify-center text-[#00B5C1]">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold mb-1">المنشأة الطبية</p>
                  <h4 className="text-[#031B4E] font-bold text-lg">{entity.name}</h4>
                </div>
              </div>

              {/* Doctor/Specialty Card */}
              <div className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img 
                    src={selectedDoctor?.imageUrl || entity.imageUrl || "/lab.svg"} 
                    alt="selection" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold mb-1">الخدمة / الطبيب</p>
                  <h4 className="text-[#031B4E] font-bold text-lg">
                    {selectedDoctor?.name || "الفحص المختار"}
                  </h4>
                  <p className="text-xs text-[#00B5C1] font-medium">
                    {selectedSpecialties.length > 0 ? selectedSpecialties.join(" • ") : entity.subText}
                  </p>
                </div>
              </div>

            </div>

            {/* 2. The Appointment Details Card */}
            <div className="bg-white rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
              {/* Background Decorative Icon */}
              <Calendar className="absolute -bottom-4 -left-4 w-32 h-32 text-white/5 rotate-12" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-sm bg-white/10 px-3 py-1 rounded-full">
                    <CheckCircle2 size={16} />
                    موعد الحجز المختار
                  </div>
                  <h2 className="text-3xl font-black mt-2 tracking-tight text-[#031B4E]">
                    {selectedDate}
                  </h2>
                  <div className="flex items-center gap-2 text-[#00B5C1]">
                    <Clock size={18} />
                    <span className="text-xl font-medium">{selectedTime}</span>
                  </div>
                </div>

                <div className="w-full md:w-auto">
                  <button 
                    onClick={handleConfirmBooking}
                    className="w-full md:w-auto px-12 py-4 bg-[#00B5C1] hover:bg-[#009ca6] text-white rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95"
                  >
                    تأكيد الحجز النهائي
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Important Notes */}
            <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl">
              <h5 className="text-orange-700 font-bold mb-2 flex items-center gap-2 text-sm">
                ⚠️ ملاحظات هامة
              </h5>
              <ul className="text-orange-600 text-xs space-y-1 list-disc list-inside">
                <li>يرجى الحضور قبل الموعد بـ ١٥ دقيقة لتأكيد البيانات.</li>
              </ul>
            </div>

          </div>
        )}
      </BookingLayout>
    </DashboardLayout>
  );
}