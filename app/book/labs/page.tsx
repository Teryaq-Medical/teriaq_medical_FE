"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import SelectionCard from "@/components/booking/SelectionCard";
import { LabsService } from "@/services/auth.service";

export default function LabsBookingPage() {
  const router = useRouter();
  const { setEntity, setSelectedSpecialties } = useBooking();

  const [labs, setLabs] = useState<any[]>([]);
  const [selectedLabId, setSelectedLabId] = useState<number | null>(null);
  const [localSpecialties, setLocalSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drswiflul/";

  const getImageUrl = (path: string) => {
    if (!path) return "/lab.svg";
    if (path.startsWith("http")) return path;
    return `${CLOUDINARY_BASE_URL}${path.replace(/^\//, "")}`;
  };

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setLoading(true);
        const data = await LabsService.getLabs();
        setLabs(data);
      } catch (error) {
        console.error("Error fetching labs:", error);
        setLabs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  const handleCardClick = (labId: number, specialists: any[]) => {
    setSelectedLabId(labId);

    if (specialists?.length === 1) {
      setLocalSpecialties([specialists[0].name]);
    } else {
      setLocalSpecialties([]);
    }
  };

  const handleProceed = () => {
    const lab = labs.find((l) => l.id === selectedLabId);
    if (!lab) return;

    setEntity({
      id: lab.id,
      name: lab.name,
      subText: localSpecialties.join("، "),
      imageUrl: getImageUrl(lab.image),
      type: "lab", // 🔥 مهم
    });

    setSelectedSpecialties(localSpecialties);

    router.push("/book/info");
  };

  return (
    <DashboardLayout>
      <BookingLayout currentStep={2} title="اختر معمل">
        <div className="flex flex-col gap-6" dir="rtl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              معامل ({labs.length})
            </h2>

            <button
              disabled={!selectedLabId || localSpecialties.length === 0 || loading}
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
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {labs.map((lab) => (
                <SelectionCard
                  key={lab.id}
                  full_name={lab.name}
                  specialty={
                    lab.specialists?.map((s: any) => s.name) || []
                  }
                  ratingText="أعلى من ٥٠+ تقييم"
                  imageUrl={getImageUrl(lab.image)}
                  isSelected={selectedLabId === lab.id}
                  selectedSpecialties={
                    selectedLabId === lab.id ? localSpecialties : []
                  }
                  onClick={() =>
                    handleCardClick(lab.id, lab.specialists)
                  }
                  onSpecialtyChange={(spec) =>
                    setLocalSpecialties((prev) =>
                      prev.includes(spec)
                        ? prev.filter((s) => s !== spec)
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