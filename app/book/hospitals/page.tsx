"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import SelectionCard from "@/components/booking/SelectionCard";
import { HospitalService } from "@/services/auth.service";

export default function HospitalsBookingPage() {
  const router = useRouter();
  const { setEntity, setSelectedSpecialties } = useBooking();

  const [hospitals, setHospitals] = useState<any[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  const [localSpecialties, setLocalSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drswiflul/";
  const getImageUrl = (path: string) => {
    if (!path) return "/default-doctor.svg";
    if (path.startsWith("http")) return path;

    return `${CLOUDINARY_BASE_URL}${path.replace(/^\//, "")}`;
  };
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const data = await HospitalService.getHospitals();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleCardClick = (hospitalId: number, specialties: string[]) => {
    setSelectedHospitalId(hospitalId);
  };

  const handleProceed = () => {
    const hospital = hospitals.find(h => h.id === selectedHospitalId);
    if (!hospital) return;

    setEntity({
      id: hospital.id,
      name: hospital.name,
      subText: localSpecialties.join("، "),
      imageUrl: getImageUrl(hospital.image),
      type: "hospital",
    });

    setSelectedSpecialties(localSpecialties);

    router.push(`/book/info?hospitalId=${hospital.id}`);
  };

  return (
    <DashboardLayout>
      <BookingLayout currentStep={1} title="اختر مستشفى">
        <div className="flex flex-col gap-6" dir="rtl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">مستشفيات ({hospitals.length})</h2>
            <button
              disabled={!selectedHospitalId  || loading}
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
              {hospitals.map((hospital) => (
                <SelectionCard
                  key={hospital.id}
                  full_name={hospital.name}
                  ratingText={hospital.rating}
                  imageUrl={getImageUrl(hospital.image)}
                  isSelected={selectedHospitalId === hospital.id}
                  onClick={() => handleCardClick(hospital.id, hospital.specialists)}
                  onSpecialtyChange={(spec) =>
                    setLocalSpecialties(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec])
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
