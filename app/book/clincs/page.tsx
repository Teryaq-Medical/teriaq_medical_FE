"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import SelectionCard from "@/components/booking/SelectionCard";
import { ClinicsService } from "@/services/auth.service";

export default function ClinicsBookingPage() {
  const router = useRouter();
  const { setEntity, setSelectedSpecialties } = useBooking();

  const [clinics, setClinics] = useState<any[]>([]);
  const [selectedClinicId, setSelectedClinicId] = useState<number | null>(null);
  const [localSpecialties, setLocalSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drswiflul/";

  const getImageUrl = (path: string) => {
    if (!path) return "/lab.svg";
    if (path.startsWith("http")) return path;
    return `${CLOUDINARY_BASE_URL}${path.replace(/^\//, "")}`;
  };

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const data = await ClinicsService.getHospitals(); // نفس اسم الفنكشن عندك
        setClinics(data);
      } catch (error) {
        console.error("Error fetching clinics:", error);
        setClinics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const handleCardClick = (clinicId: number) => {
    setSelectedClinicId(clinicId);
  };

  const handleProceed = () => {
    const clinic = clinics.find(c => c.id === selectedClinicId);
    if (!clinic) return;

    setEntity({
      id: clinic.id,
      name: clinic.name,
      subText: localSpecialties.join("، "),
      imageUrl: getImageUrl(clinic.image),
      type: "clinic", // مهم عشان الـ interface عندك
    });

    setSelectedSpecialties(localSpecialties);

    router.push(`/book/info?clinicId=${clinic.id}`);
  };

  return (
    <DashboardLayout>
      <BookingLayout currentStep={2} title="اختر معمل">
        <div className="flex flex-col gap-6" dir="rtl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              معامل ({clinics.length})
            </h2>

            <button
              disabled={!selectedClinicId || loading}
              onClick={handleProceed}
              className="px-8 py-2.5 bg-[#00B5C1] text-white rounded-xl disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
            >
              حفظ و متابعة
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B5C1]"></div>
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinics.map((clinic) => (
                <SelectionCard
                  key={clinic.id}
                  full_name={clinic.name}
                  ratingText={clinic.rating}
                  imageUrl={getImageUrl(clinic.image)}
                  isSelected={selectedClinicId === clinic.id}
                  onClick={() => handleCardClick(clinic.id)}
                  onSpecialtyChange={(spec) =>
                    setLocalSpecialties(prev =>
                      prev.includes(spec)
                        ? prev.filter(s => s !== spec)
                        : [...prev, spec]
                    )
                  }
                />
              ))}
            </section>
          )}
        </div>
      </BookingLayout>
    </DashboardLayout>
  );
}