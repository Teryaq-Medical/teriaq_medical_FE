"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import SelectionCard from "@/components/booking/SelectionCard";

const HOSPITALS_DATA = [
  {
    id: 1,
    name: "مستشفى الأمل",
    specialties: ["مخ وأعصاب","باطنة","مسالك بولية","طب نفسي","أسنان","رمد"],
    imageUrl: "/hos1.svg",
    rating: "أعلى من ٥٠+ تقييم",
  },
  {
    id: 2,
    name: "مستشفى الرجاء الدولي",
    specialties: ["مخ وأعصاب","باطنة","مسالك بولية"],
    imageUrl: "/hos1.svg",
    rating: "٥٠+ تقييم",
  },
  {
    id: 3,
    name: "مستشفى السعودي الألماني",
    specialties: ["مخ وأعصاب","باطنة","مسالك بولية"],
    imageUrl: "/hos1.svg",
    rating: "٥٠+ تقييم",
  },
];

export default function AddHospitalsBookingPage() {
  const router = useRouter();
  const { setEntity, setSelectedSpecialties } = useBooking();

  const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null);
  const [localSpecialties, setLocalSpecialties] = useState<string[]>([]);

  const handleCardClick = (hospitalId: number, specialties: string[]) => {
    setSelectedHospitalId(hospitalId);
    if (specialties.length === 1) {
      setLocalSpecialties([specialties[0]]);
    } else {
      setLocalSpecialties([]);
    }
  };

  const handleProceed = () => {
    const hospital = HOSPITALS_DATA.find((h) => h.id === selectedHospitalId);
    if (!hospital) return;

    // 1. Save Hospital (Triggers context reset for doctor/date)
    setEntity({
      name: hospital.name,
      subText: localSpecialties.join("، "),
      imageUrl: hospital.imageUrl,
    });

    // 2. Save chosen specialties to context
    setSelectedSpecialties(localSpecialties);

    // 3. Navigate to Info page (Consistency!)
    router.push("/book/info");
  };

  return (
    <DashboardLayout>
      <BookingLayout currentStep={2} title="إضافة حجز جديد">
        <div className="flex flex-col gap-6 animate-in fade-in duration-500" dir="rtl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#031B4E]">
              مستشفيات ( {HOSPITALS_DATA.length} )
            </h2>

            <button
              disabled={!selectedHospitalId || localSpecialties.length === 0}
              onClick={handleProceed}
              className="w-full md:w-auto px-8 py-2.5 bg-[#00B5C1] text-white rounded-xl font-bold hover:bg-[#009ca6] disabled:opacity-50 transition-all shadow-md shadow-[#00B5C1]/20"
            >
              حفظ و متابعة
            </button>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOSPITALS_DATA.map((hospital) => (
              <SelectionCard
                key={hospital.id}
                name={hospital.name}
                specialty={hospital.specialties}
                ratingText={hospital.rating}
                imageUrl={hospital.imageUrl}
                isSelected={selectedHospitalId === hospital.id}
                selectedSpecialties={selectedHospitalId === hospital.id ? localSpecialties : []}
                onClick={() => handleCardClick(hospital.id, hospital.specialties)}
                onSpecialtyChange={(spec) => 
                  setLocalSpecialties(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec])
                }
              />
            ))}
          </section>
        </div>
      </BookingLayout>
    </DashboardLayout>
  );
}