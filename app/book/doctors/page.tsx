"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import SelectionCard from "@/components/booking/SelectionCard";
import { useBooking } from "@/context/BookingContext";
import { DoctorService } from "@/services/auth.service";

interface Doctor {
  id: number;
  full_name: string;
  profile_image: string;
  specialist: {
    id: number;
    name: string;
  };
}

export default function AddBookingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  const router = useRouter();
  const { setSelectedDoctor, setEntity } = useBooking();

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drswiflul/";

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await DoctorService.getDoctors();
        setDoctors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch doctors error:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const getImageUrl = (path: string) => {
    if (!path) return "/default-doctor.svg";
    if (path.startsWith("http")) return path;
    return `${CLOUDINARY_BASE_URL}${path.replace(/^\//, "")}`;
  };

  const handleProceed = async () => {
    if (!selectedDoctorId) return;

    const doc = doctors.find(d => d.id === selectedDoctorId);
    if (!doc) return;

    try {
      setLoading(true);
      const assignments = await DoctorService.getDoctorAssignments({ doctor_id: doc.id });

      if (!assignments || assignments.length === 0) {
        alert("هذا الطبيب لا يملك مواعيد متاحة حالياً");
        return;
      }

      const assignment = assignments[0];

      // ✅ Set temporary entity for individual doctors
      setEntity({
        id: doc.id,
        name: doc.full_name,
        subText: doc.specialist?.name || "تخصص عام",
        imageUrl: getImageUrl(doc.profile_image),
        type: "hospital", // placeholder
      });

      setSelectedDoctor({
        id: assignment.id,
        assignmentId: assignment.id,
        name: doc.full_name,
        specialty: [doc.specialist?.name || "تخصص عام"],
        imageUrl: getImageUrl(doc.profile_image),
      });

      router.push("/book/date-time");
    } catch (error) {
      console.error("Assignment fetch error:", error);
      alert("حدث خطأ أثناء تحميل بيانات الطبيب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <BookingLayout currentStep={2} title="إضافة حجز جديد">
        <div className="flex flex-col gap-6" dir="rtl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">أطباء ({doctors.length})</h2>
            <button
              disabled={!selectedDoctorId || loading}
              onClick={handleProceed}
              className="px-8 py-2.5 bg-[#00B5C1] text-white rounded-xl disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
            >
              حفظ و متابعة
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B5C1]" />
            </div>
          ) : doctors.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <SelectionCard
                  key={doc.id}
                  full_name={doc.full_name}
                  specialty={doc.specialist?.name || "تخصص عام"}
                  imageUrl={getImageUrl(doc.profile_image)}
                  ratingText="٥٠+ تقييم"
                  isSelected={selectedDoctorId === doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                />
              ))}
            </section>
          ) : (
            <div className="text-center py-20 text-gray-400">لا يوجد أطباء متاحين حالياً</div>
          )}
        </div>
      </BookingLayout>
    </DashboardLayout>
  );
}