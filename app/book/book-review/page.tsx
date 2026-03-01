"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import { useBooking } from "@/context/BookingContext";
import { AppointmentService, LabsService } from "@/services/auth.service";
import { Clock, MapPin, CheckCircle2, Loader2 } from "lucide-react";

export default function ReviewBookingPage() {
  const {
    entity,
    selectedDoctor,
    selectedLabService,
    selectedDate,
    selectedTime,
    selectedScheduleId,
    assignmentId
  } = useBooking();
  
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isLab = entity?.type === "lab";

  const hasRequiredData = (() => {
    if (!entity) return false;
    if (isLab) return !!selectedLabService;
    if (!selectedDoctor || !selectedDate || !selectedTime) return false;
    if (selectedScheduleId === null || assignmentId === null) return false;
    return true;
  })();

  const handleConfirmBooking = async () => {
    if (!entity) return;
    setLoading(true);

    try {
      let response;

      if (isLab && selectedLabService) {
        response = await LabsService.createBooking({
          lab: selectedLabService.lab,
          service_name: selectedLabService.service_name,
        });
      } else {
        response = await AppointmentService.create({
          assignment: Number(assignmentId),
          schedule: Number(selectedScheduleId),
          appointment_date: selectedDate,
          appointment_time: selectedTime.length > 5 ? selectedTime.slice(0, 5) : selectedTime,
        });
      }

      console.log("Booking API response:", response);

      // ✅ Treat any successful call as success
      setIsSuccess(true);

    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      alert("حدث خطأ أثناء تأكيد الحجز.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6" dir="rtl">
          <CheckCircle2 size={80} className="text-green-500" />
          <h1 className="text-4xl font-black text-[#031B4E]">تم الحجز بنجاح!</h1>
          <Link href="/profile" className="bg-[#00B5C1] text-white px-8 py-4 rounded-2xl font-bold">
            عرض موعدي في الملف الشخصي
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <BookingLayout title="مراجعة وتأكيد الحجز" currentStep={4}>
        {!hasRequiredData ? (
          <div className="p-10 text-center text-gray-400 border-2 border-dashed rounded-2xl" dir="rtl">
            <p className="font-bold text-lg mb-2">بيانات الحجز غير مكتملة</p>
            <p className="text-sm">يرجى العودة واختيار البيانات بشكل صحيح.</p>
            <Link href="/book" className="mt-4 inline-block text-[#00B5C1] underline">العودة للبداية</Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-5 bg-white border rounded-2xl">
                <MapPin size={28} className="text-[#00B5C1]" />
                <div>
                  <p className="text-xs text-gray-400">المنشأة</p>
                  <h4 className="text-[#031B4E] font-bold">{entity?.name}</h4>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-white border rounded-2xl">
                <img
                  src={selectedDoctor?.imageUrl || entity?.imageUrl || "/lab.svg"}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
                <div>
                  <p className="text-xs text-gray-400">{isLab ? "الخدمة المختارة" : "الطبيب"}</p>
                  <h4 className="text-[#031B4E] font-bold">{isLab ? selectedLabService?.service_name : selectedDoctor?.name}</h4>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border shadow-xl flex flex-col md:flex-row justify-between items-center gap-8">
              {!isLab ? (
                <div>
                  <h2 className="text-3xl font-black text-[#031B4E]">{selectedDate}</h2>
                  <div className="flex items-center gap-2 text-[#00B5C1] text-xl">
                    <Clock size={18} />
                    {selectedTime}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-[#031B4E]">سيتم التواصل معك لتحديد التفاصيل</h2>
                </div>
              )}

              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="w-full md:w-auto px-12 py-4 bg-[#00B5C1] text-white rounded-2xl font-bold text-lg disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "تأكيد الحجز النهائي"}
              </button>
            </div>
          </div>
        )}
      </BookingLayout>
    </DashboardLayout>
  );
}