"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "@/context/BookingContext";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import ProfileHeader from "@/components/ProfileHeader";
import SelectionCard from "@/components/booking/SelectionCard";
import DoctorFilter from "@/components/DoctorFilter";
import AboutSection from "@/components/AboutSection";
import InsuranceSection from "@/components/InsuranceSection";
import { SocialsCard } from "@/components/SidebarWidgets";

const MOCK_DOCTORS = [
  { id: "1", name: "Dr. Sarah Ahmed", specialty: ["Pediatrics", "Family Medicine"], ratingText: "4.9 (120 Reviews)", imageUrl: "" },
  { id: "2", name: "Dr. James Wilson", specialty: ["Cardiology"], ratingText: "4.8 (85 Reviews)", imageUrl: "" },
  { id: "3", name: "Dr. Laila Hassan", specialty: ["Dermatology", "Pediatrics"], ratingText: "5.0 (210 Reviews)", imageUrl: "" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { entity, setSelectedDoctor } = useBooking();
  
  const [activeTab, setActiveTab] = useState("options");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  // Safety Redirect: If no clinic is in context, go back to clinic list
  useEffect(() => {
    if (!entity) {
      router.push("/book"); 
    }
  }, [entity, router]);

  const allSpecialties = useMemo(() => {
    const specs = MOCK_DOCTORS.flatMap(d => d.specialty);
    return Array.from(new Set(specs));
  }, []);

  const filteredDoctors = useMemo(() => {
    if (filter === "All") return MOCK_DOCTORS;
    return MOCK_DOCTORS.filter(doc => doc.specialty.includes(filter));
  }, [filter]);

  const handleProceed = () => {
    const doctor = MOCK_DOCTORS.find(d => d.id === selectedId);
    if (doctor) {
      setSelectedDoctor({
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        imageUrl: doctor.imageUrl,
      });
      router.push("/book/date-time");
    }
  };

  if (!entity) return null;

  return (
    <DashboardLayout>
      <BookingLayout title="Profile Detail" currentStep={2}>
        <div className="flex flex-col gap-8" dir="rtl">
          {/* Now Dynamic! */}
          <ProfileHeader 
            name={entity.name} 
            description={entity.subText} 
            imageUrl={entity.imageUrl} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* TABS */}
              <div className="flex gap-8 border-b border-gray-200">
                {["options", "about", "insurances"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={cn(
                      "pb-4 text-sm font-bold capitalize transition-all relative",
                      activeTab === t ? "text-[#00B5C1]" : "text-gray-400"
                    )}
                  >
                    {t === "options" ? "الخيارات" : t}
                    {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00B5C1] rounded-t-full" />}
                  </button>
                ))}
              </div>
              

              {activeTab === "options" && (
                <>
                  <DoctorFilter 
                    activeFilter={filter} 
                    onFilterChange={setFilter} 
                    availableSpecialties={allSpecialties} 
                  />
                  <div className="flex justify-center sm:justify-end pt-6 border-t border-gray-100">
                    <button
                      disabled={!selectedId}
                      onClick={handleProceed}
                      className={cn(
                        "flex items-center gap-3 px-12 py-4 rounded-xl font-bold transition-all",
                        selectedId ? "bg-[#00B5C1] text-white shadow-lg" : "bg-gray-100 text-gray-400"
                      )}
                    >
                      <span>متابعة لتحديد الوقت</span>
                      <ArrowRight size={20} className="rotate-180" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                    {filteredDoctors.map((item) => (
                      <SelectionCard
                        key={item.id}
                        {...item}
                        isSelected={selectedId === item.id}
                        onClick={() => setSelectedId(item.id)}
                      />
                    ))}
                  </div>

                </>
              )}

              {activeTab === "about" && <AboutSection />}
              {activeTab === "insurances" && <InsuranceSection />}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <SocialsCard />
            </div>
          </div>
        </div>
      </BookingLayout>
    </DashboardLayout>
  );
}