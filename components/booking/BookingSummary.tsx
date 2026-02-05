"use client";
import { useBooking } from "@/context/BookingContext";
import { MapPin, User, Stethoscope } from "lucide-react";

export default function BookingSummary() {
  const { entity, selectedDoctor } = useBooking();

  if (!entity && !selectedDoctor) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" dir="rtl">
      {/* Clinic Summary */}
      {entity && (
        <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#E6F7F9] flex items-center justify-center text-[#00B5C1]">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold">المنشأة المختارة</p>
            <h4 className="text-[#031B4E] font-bold">{entity.name}</h4>
          </div>
        </div>
      )}

      {/* Doctor/Option Summary */}
      {selectedDoctor && (
        <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
             <img src={selectedDoctor.imageUrl} alt={selectedDoctor.name} className="object-cover w-full h-full" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold">الطبيب / الخدمة</p>
            <h4 className="text-[#031B4E] font-bold">{selectedDoctor.name}</h4>
            <p className="text-[10px] text-[#00B5C1]">{selectedDoctor.specialty.join(" • ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}