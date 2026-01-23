"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';

const ProfileInfoForm = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Read the static data from storage
    const savedUser = localStorage.getItem("user_session");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-50 w-full max-w-4xl" dir="rtl">
      {/* Profile Header */}
      <div className="flex items-center gap-5 mb-12">
        <div className="relative">
          <Image
            src="/avatar.png" 
            alt="Profile"
            height={20}
            width={20}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-slate-800">{user?.full_name || "تحميل..."}</h2>
          <p className="text-gray-400 text-sm mt-1">{user?.email || "email@example.com"}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        <div className="space-y-3 text-right">
          <label className="text-slate-700 text-base font-medium block pr-1">الإسم بالكامل</label>
          <input
            type="text"
            defaultValue={user?.full_name}
            className="w-full p-4 bg-[#F9FAFB] rounded-2xl border-none text-right text-gray-500"
          />
        </div>

        <div className="space-y-3 text-right">
          <label className="text-slate-700 text-base font-medium block pr-1">رقم الموبايل</label>
          <input
            type="text"
            defaultValue={user?.phone}
            className="w-full p-4 bg-[#F9FAFB] rounded-2xl border-none text-right text-gray-500"
          />
        </div>

        <div className="space-y-3 text-right">
          <label className="text-slate-700 text-base font-medium block pr-1">تاريخ الميلاد</label>
          <div className="relative">
            <input
              type="text"
              defaultValue={user?.dob}
              className="w-full p-4 bg-[#F9FAFB] rounded-2xl border-none text-right text-gray-500"
            />
            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="space-y-3 text-right">
          <label className="text-slate-700 text-base font-medium block pr-1">الجنس</label>
          <div className="relative">
            <select className="w-full p-4 bg-[#F9FAFB] rounded-2xl border-none appearance-none text-right text-gray-500">
              <option selected={user?.gender === "ذكر"}>ذكر</option>
              <option selected={user?.gender === "أنثى"}>أنثى</option>
            </select>
            <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-start">
        <button className="bg-[#26C6DA] text-white px-12 py-3.5 rounded-2xl font-semibold shadow-md">
          تعديل
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoForm;