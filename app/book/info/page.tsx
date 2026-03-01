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

import { DoctorService } from "@/services/auth.service";

interface Doctor {
  id: string | number;
  name: string;
  specialty: string[];
  ratingText: string;
  imageUrl: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { entity, setSelectedDoctor, setSelectedLabService } = useBooking();

  const [activeTab, setActiveTab] = useState("options");
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Redirect if entity is missing
  useEffect(() => {
    if (!entity || !entity.type) router.push("/book");
  }, [entity, router]);

  // Fetch doctors or lab services
  useEffect(() => {
    if (!entity || !entity.type) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // LAB logic
        if (entity.type === "lab") {
          const specialists = entity.subText?.split("، ") || [];
          const normalized: Doctor[] = specialists.map((name, idx) => ({
            id: idx + 1,
            name,
            specialty: [name],
            ratingText: "",
            imageUrl: entity.imageUrl || "/lab.svg",
          }));
          setDoctors(normalized);
          return;
        }

        // HOSPITAL / CLINIC logic
        const res = await DoctorService.getAssignedDoctors(Number(entity.id), entity.type);
        const normalized: Doctor[] = res.map((assignment: any) => ({
          id: assignment.id,
          name: assignment.doctor_info?.name || "دكتور غير معروف",
          specialty: assignment.doctor_info?.specialty || [],
          ratingText: "4.8 (120 تقييم)",
          imageUrl: assignment.doctor_info?.image || "/default-doctor.svg",
        }));

        setDoctors(normalized);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [entity]);

  const allSpecialties = useMemo(() => {
    return Array.from(new Set(doctors.flatMap((d) => d.specialty)));
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    if (filter === "All") return doctors;
    return doctors.filter((d) => d.specialty.includes(filter));
  }, [filter, doctors]);

  const handleProceed = () => {
    if (!entity) return;
    const doctor = doctors.find((d) => d.id === selectedId);
    if (!doctor) return;

    if (entity.type === "lab") {
      setSelectedLabService({
        lab: Number(entity.id),
        service_name: doctor.name,
      });
      router.push("/book/book-review");
      return;
    }

    setSelectedDoctor({
      id: doctor.id,
      assignmentId: Number(doctor.id),
      name: doctor.name,
      specialty: doctor.specialty,
      imageUrl: doctor.imageUrl,
    });

    router.push("/book/date-time");
  };

  if (!entity) return null;

  return (
    <DashboardLayout>
      <BookingLayout title="Profile Detail" currentStep={2}>
        <div className="flex flex-col gap-8" dir="rtl">
          <ProfileHeader
            name={entity.name}
            description={entity.subText}
            imageUrl={entity.imageUrl}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Tabs */}
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
                    {t === "options"
                      ? "الخيارات"
                      : t === "about"
                      ? "حول"
                      : "التأمينات"}
                    {activeTab === t && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00B5C1] rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Options Tab */}
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
                        selectedId
                          ? "bg-[#00B5C1] text-white shadow-lg"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <span>
                        {entity.type === "lab"
                          ? "متابعة للمراجعة"
                          : "متابعة لتحديد الوقت"}
                      </span>
                      <ArrowRight size={20} className="rotate-180" />
                    </button>
                  </div>

                  {loading ? (
                    <div className="p-10 text-center">جاري التحميل...</div>
                  ) : filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                      {filteredDoctors.map((doc) => (
                        <SelectionCard
                          key={doc.id}
                          full_name={doc.name}
                          specialty={doc.specialty}
                          ratingText={doc.ratingText}
                          imageUrl={doc.imageUrl}
                          isSelected={selectedId === doc.id}
                          onClick={() => setSelectedId(doc.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-400">
                      لا يوجد خيارات متاحة حالياً
                    </div>
                  )}
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