"use client"
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";
import {useBookingRedirect } from "@/services/utils/handleBookingsClick"

export default function ServicesSection() {
  const handleBookingClick = useBookingRedirect();
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between mb-20 gap-6">
          <button
            onClick={handleBookingClick}
            className="flex items-center gap-4 bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-semibold transition">
            <Image src="/Arrow 1 (Stroke).svg" alt="arrow" width={20} height={20} />
            المزيد
          </button>
          <div className="text-right max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1c4d] mb-6">
              خدمات طبية شاملة بلمسة زر
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              مجموعة واسعة من الخدمات الصحية مع سهولة الحجز والوصول السريع إلى أفضل المرافق الطبية
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          <ServiceCard title="الأطباء" image="/Doctor.svg" description="حجز مواعيد مع أطباء من مختلف التخصصات الطبية" count={25} unit="طبيب" onClick={handleBookingClick} />
          <ServiceCard title="مستشفيات" image="/Hospital.svg" description="حجز خدمات المستشفى والإجراءات الطبية" count={25} unit="مستشفى"  onClick={handleBookingClick} />
          <ServiceCard title="معامل" image="/Flask.svg" description="ترتيب المواعيد لإجراء التحاليل والفحوصات المختبرية" count={25} unit="معمل" onClick={handleBookingClick} />
          <div className="md:col-span-3 flex justify-center mt-4">
            <ServiceCard title="العيادات" image="/Medical history.svg" description="حجز المواعيد في العيادات المتخصصة" count={25} unit="عيادة" onClick={handleBookingClick} />
          </div>
        </div>
      </div>
    </section>
  );
}