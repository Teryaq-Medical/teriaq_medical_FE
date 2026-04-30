"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import SelectionCard from "@/components/booking/SelectionCard";
import DoctorFilter from "@/components/DoctorFilter";
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
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

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

  // Collect unique specialties for the filter chips
  const allSpecialties = useMemo(() => {
    return Array.from(
      new Set(doctors.map((d) => d.specialist?.name).filter(Boolean))
    );
  }, [doctors]);

  // Apply specialty filter + search together
  const filteredDoctors = useMemo(() => {
    let result = doctors;

    if (filter !== "All") {
      result = result.filter((d) => d.specialist?.name === filter);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (d) =>
          d.full_name.toLowerCase().includes(q) ||
          d.specialist?.name?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [doctors, filter, search]);

  const handleProceed = async () => {
    if (!selectedDoctorId) return;

    const doc = doctors.find((d) => d.id === selectedDoctorId);
    if (!doc) return;

    try {
      setLoading(true);
      const assignments = await DoctorService.getDoctorAssignments({
        doctor_id: doc.id,
      });

      if (!assignments || assignments.length === 0) {
        alert("هذا الطبيب لا يملك مواعيد متاحة حالياً");
        return;
      }

      const assignment = assignments[0];

      setEntity({
        id: doc.id,
        name: doc.full_name,
        subText: doc.specialist?.name || "تخصص عام",
        imageUrl: getImageUrl(doc.profile_image),
        type: "hospital",
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

          {/* ── Header row ── */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              أطباء ({filteredDoctors.length})
            </h2>
            <button
              disabled={!selectedDoctorId || loading}
              onClick={handleProceed}
              className="px-8 py-2.5 bg-[#00B5C1] text-white rounded-xl disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
            >
              حفظ و متابعة
            </button>
          </div>

          {/* ── Search field ── */}
          <div className="relative">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو التخصص..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-right placeholder:text-gray-400 focus:outline-none focus:border-[#00B5C1] transition-colors"
            />
          </div>

          {/* ── Specialty filter chips ── */}
          <DoctorFilter
            activeFilter={filter}
            onFilterChange={(val) => {
              setFilter(val);
              setSelectedDoctorId(null); // reset selection on filter change
            }}
            availableSpecialties={allSpecialties}
          />

          {/* ── Doctor grid ── */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B5C1]" />
            </div>
          ) : filteredDoctors.length > 0 ? (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
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
            <div className="text-center py-20 text-gray-400">
              {search || filter !== "All"
                ? "لا توجد نتائج مطابقة للبحث"
                : "لا يوجد أطباء متاحين حالياً"}
            </div>
          )}

        </div>
      </BookingLayout>
    </DashboardLayout>
  );
}