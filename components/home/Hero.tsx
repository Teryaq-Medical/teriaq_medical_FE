"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import Navbar from "../layout/Navbar";
import {useBookingRedirect } from "@/services/utils/handleBookingsClick"

export default function Hero() {
  const handleBookingClick = useBookingRedirect();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/hero.svg" alt="Healthcare background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Navbar />

      <header className="flex flex-col items-center justify-center text-center px-4 pt-36 pb-40 text-white">
        <h1 className="text-lg md:text-5xl font-bold mb-6 max-w-4xl leading-tight">
          رعايتك الصحية أسهل وأقرب من أي وقت
        </h1>
        <p className="text-base md:text-lg max-w-2xl opacity-90 mb-10 leading-relaxed">
          احجز مواعيدك الطبية، تعرّف على الأطباء والمستشفيات، واستمتع بخدمات صحية متكاملة في مكان واحد.
        </p>
        <button
          onClick={handleBookingClick}
          className="bg-[#21b3d5] hover:bg-[#1da1c0] text-white px-20 py-3 border border-[#8F8F8F] rounded-lg text-lg font-bold transition shadow-xl"
        >
          أحجز الآن
        </button>
      </header>
    </section>
  );
}