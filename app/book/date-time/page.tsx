"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import BookingLayout from "@/components/layout/BookingLayout";
import DateTimeSelection from "@/components/booking/DateTimeSelection";
import BookingSummary from "@/components/booking/BookingSummary"; // Import the new summary

export default function DateTimeSelectionPage() {
  return (
    <DashboardLayout>
      <BookingLayout currentStep={3} title="تحديد الوقت والتاريخ">
        {/* Shows both the Clinic and the Doctor selected in previous steps */}
        <BookingSummary />
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <DateTimeSelection />
        </div>
      </BookingLayout>
    </DashboardLayout>
  );
}