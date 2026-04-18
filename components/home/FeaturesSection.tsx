"use client"
import Image from "next/image";
import DateCard from "@/components/DateCard";
import { CheckItem } from "../ui/CheckItem";
import {useBookingRedirect } from "@/services/utils/handleBookingsClick"

export default function FeaturesSection() {
  const handleBookingClick = useBookingRedirect();
  return (
    <section
      className="bg-white py-12 md:py-16 lg:py-24 overflow-hidden"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-[400px] lg:max-w-[480px]">
            <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden z-10">
              <Image
                src="/img1.svg"
                alt="Doctor"
                width={480}
                height={600}
                className="object-cover w-full h-auto"
              />
            </div>

            <div className="absolute -top-0.5 mt-10 -left-4 md:-top-1 md:-left-8 z-30 w-24 md:w-32 lg:w-40 animate-bounce-slow">
              <Image
                src="/Background (1).svg"
                alt="meeting icon"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 md:-bottom-6 md:-right-25 z-20 scale-75 md:scale-90 lg:scale-100 origin-bottom-right">
              <DateCard />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-right">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-medium text-[#031B4E] leading-[1.2] mb-6">
            رعاية صحية عالية المستوى ومرافق مصممة خصيصًا لك..
          </h2>
          <p className="text-gray-600 text-lg md:text-xl lg:w-[400px] leading-relaxed mb-10">
            أفضل جودة علاج تلتقي أحدث الأدوات بخبرات لا مثيل لها مما يوفر لك
            طريقاً مريحاً وفعالاً نحو صحة مثالية.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-12">
            <CheckItem text="تخصصاً شاملاً" />
            <CheckItem text="خدمات طوارئ" highlighted />
            <CheckItem text="مرافق طبية عن بُعد" highlighted />
            <CheckItem text="نهج يركز على المريض" highlighted />
            <CheckItem text="استشارات اونلاين" highlighted />
            <CheckItem text="خدمات إعادة تأهيل" highlighted />
          </div>

          <div className="relative inline-block">
            <button
              onClick={handleBookingClick}
              className="w-full sm:w-auto bg-[#21b3d5] hover:bg-[#1da1c0] text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-100 transition-all active:scale-95">
              أحجز استشارة أونلاين
            </button>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              قريباً
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
