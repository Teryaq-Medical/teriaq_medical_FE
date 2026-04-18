import Image from "next/image";
import ReservationTypeCard from "@/components/ResevationCard";

export default function ReservationSection() {
  return (
    <section className="relative bg-[#ECF5FB] py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-center gap-8">
        <div className="flex-shrink-0">
          <Image
            src="/sec_doctors.svg"
            alt="doctors"
            width={390}
            height={500}
            className="w-full max-w-xs md:max-w-[390px] h-auto object-contain"
          />
        </div>
        <ReservationTypeCard
          title="حدد موعدًا"
          subtitle="تقدم بطلب للحصول على العلاجات"
        />
      </div>
    </section>
  );
}