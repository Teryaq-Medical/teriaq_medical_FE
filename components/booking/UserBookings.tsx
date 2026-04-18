"use client";

import React, { useEffect, useState } from "react";
import { AppointmentService, LabsService } from "@/services/auth.service";
import { Calendar, Clock, User } from "lucide-react";

const UserBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // ✅ Fetch both in parallel
        const [appointments, labBookings] = await Promise.all([
          AppointmentService.getMyBookings(),
          LabsService.getMyBookings(),
        ]);

        // ✅ Normalize lab bookings to match appointment shape
        const formattedLabBookings = labBookings.map((lab: any) => ({
          id: `lab-${lab.id}`, // prevent id collision
          assignment_display: lab.service_name,
          booking_code: lab.booking_code,
          status: lab.status,
          appointment_date: "—",
          appointment_time: "—",
          type: "lab",
        }));

        const formattedAppointments = appointments.map((app: any) => ({
          ...app,
          type: "appointment",
        }));

        // ✅ Merge
        const combined = [...formattedAppointments, ...formattedLabBookings];

        setBookings(combined);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return <p className="text-center py-10">جاري تحميل المواعيد...</p>;

  return (
    <div className="mt-12 space-y-6 text-right" dir="rtl">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        مواعيدي القادمة
      </h3>

      {!bookings || bookings.length === 0 ? (
        <div className="p-8 border-2 border-dashed rounded-3xl text-center text-gray-400">
          لا توجد حجوزات نشطة حالياً
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking: any) => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#031B4E]">
                  <User size={24} />
                </div>

                <div>
                  <h4 className="font-bold text-slate-800">
                    {booking.assignment_display}
                  </h4>

                  <h5 className="font-bold text-slate-800">
                    كود الحجز : {booking.booking_code}
                  </h5>

                  <p className="text-sm text-gray-400">
                    {booking.status === "pending"
                      ? "بانتظار التأكيد"
                      : booking.status === "confirmed"
                        ? "مؤكد"
                        : booking.status === "completed"
                          ? "تم الكشف"
                          : "غير معروف"}
                  </p>
                </div>
              </div>

              {/* Show date/time only for appointments */}
              {booking.type === "appointment" && (
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} className="text-[#00B5C1]" />
                    <span className="font-medium">
                      {booking.appointment_date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} className="text-[#00B5C1]" />
                    <span className="font-medium">
                      {booking.appointment_time}
                    </span>
                  </div>
                </div>
              )}

              {/* For lab bookings */}
              {booking.type === "lab" && (
                <div className="text-gray-500 font-medium">
                  سيتم التواصل معك لتحديد الموعد
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
