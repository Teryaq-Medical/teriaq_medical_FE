"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import {useBookingRedirect } from "@/services/utils/handleBookingsClick"

type Props = {
  title: string;
  subtitle: string;
};

export default function ReservationTypeCard({ title, subtitle }: Props) {
  const handleBookingClick = useBookingRedirect();
  const specialties = ["طب الأسنان", "الجلدية", "العظام", "الأطفال"];
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const inputClasses = "h-8 bg-transparent border-t-0 border-x-0 border-b border-white/60 rounded-none px-0 text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:border-white transition-all";

  return (
    <Card 
      dir="rtl" 
      className="bg-[#00B0D0] w-[22rem] p-5 text-white border-none rounded-[2rem] shadow-xl relative overflow-hidden"
    >
      <div className="text-right mb-4">
        <h3 className="text-xl mb-0">{title}</h3>
        <p className="text-xs opacity-90">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
        <div className="flex flex-col">
          <label className="text-[12px] font-medium">الاسم</label>
          <Input className={inputClasses} />
        </div>
        
        <div className="flex flex-col">
          <label className="text-[12px] font-medium">الايميل</label>
          <Input className={inputClasses} type="email" />
        </div>

        <div className="flex flex-col relative">
          <label className="text-[12px] font-medium">التخصص</label>
          <select 
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className={`${inputClasses} appearance-none cursor-pointer outline-none`}
          >
            <option value="" className="text-black" disabled hidden></option>
            {specialties.map((spec, index) => (
              <option key={index} value={spec} className="text-black">
                {spec}
              </option>
            ))}
          </select>
          <span className="absolute bottom-2 left-0 pointer-events-none text-[10px] opacity-70">
            <Image
            src="/left_icon.svg"
            alt="arrow"
            width={20}
            height={20}
            />
          </span>
        </div>
        <div className="flex flex-col">
          <label className="text-[12px] font-medium">رقم الهاتف</label>
          <Input className={inputClasses} type="tel" />
        </div>
      </div>

      <div className="w-full flex flex-col mb-6">
        <label className="text-[12px] font-medium">رسالة</label>
        <Input className={inputClasses} />
      </div>

      <div className="flex justify-start mr-52">
        <Button 
          onClick={handleBookingClick}
          className="bg-white hover:bg-white/90 text-[#00B0D0] rounded-xl h-12 px-1.5 py-1.5 flex items-center gap-3"
        >
          <span className="font-bold text-md px-2">أحجز</span>
          <div className="bg-orange-500 p-1.5 rounded-lg">
             <ArrowLeft className="w-4 h-4 text-white" />
          </div>
        </Button>
      </div>
    </Card>
  );
}