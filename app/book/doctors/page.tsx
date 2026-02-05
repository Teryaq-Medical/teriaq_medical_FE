"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import SelectionCard from "@/components/booking/SelectionCard";
import { useBooking } from "@/context/BookingContext";
import { DoctorService } from "@/services/auth.service";

// Update Interface to match your actual JSON structure
interface Doctor {
  id: number;
  name: string;
  doctor_image: string;
  specialist: {
    id: number;
    name: string;
  };
}

// Senior Tip: Move the media base URL to an environment variable later
// REPLACEME with your cloud name

export default function AddBookingPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  const router = useRouter();
  const { setEntity } = useBooking();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await DoctorService.getDoctors();
        const responseBody = res.data;
        const actualList = Array.isArray(responseBody.data)
          ? responseBody.data
          : responseBody.data?.results || [];

        setDoctors(actualList);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Helper to construct safe URLs
  // Use your actual cloud name from secrets
  const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drswiflul/";

  const getImageUrl = (path: string) => {
    if (!path) return "/default-doctor.svg"; // fallback
    // if the path is already an absolute URL
    if (path.startsWith("http")) return path;
    // combine base URL + path
    return `${CLOUDINARY_BASE_URL}${path.replace(/^\//, "")}`;
  };

  const handleProceed = () => {
    const doc = doctors.find((d) => d.id === selectedDoctorId);
    if (doc) {
      setEntity({
        name: doc.name,
        subText: doc.specialist.name, // Access .name from the object
        imageUrl: getImageUrl(doc.doctor_image),
      });
      router.push("/book/date-time");
    }
  };

  return (
    <DashboardLayout>
      <BookingLayout currentStep={2} title="إضافة حجز جديد">
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl lg:text-2xl font-bold text-[#031B4E]">
              أطباء ( {loading ? "..." : doctors.length} )
            </h2>
            <button
              disabled={!selectedDoctorId || loading}
              onClick={handleProceed}
              className="px-8 py-2.5 bg-[#00B5C1] text-white rounded-xl font-bold disabled:opacity-50 transition-all shadow-md shadow-[#00B5C1]/20"
            >
              حفظ و متابعة
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-48 bg-gray-100 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <SelectionCard
                  key={doc.id}
                  id={doc.id}
                  name={doc.name}
                  specialty={doc.specialist.name} // Access nested name
                  imageUrl={getImageUrl(doc.doctor_image)} // Construct valid URL
                  ratingText="٥٠+ تقييم"
                  isSelected={selectedDoctorId === doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                />
              ))}
            </section>
          )}
        </div>
      </BookingLayout>
    </DashboardLayout>
  );
}
