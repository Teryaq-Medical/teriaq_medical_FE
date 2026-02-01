"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { AuthService } from "@/services/auth.service";

const ProfileInfoForm = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AuthService.getMe();
        setUser(res.data.profile);
      } catch (err) {
        console.log("No user logged in");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-400">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-50 w-full max-w-4xl"
      dir="rtl"
    >
      {/* Profile Header */}
      <div className="flex items-center gap-5 mb-12">
        <Image
          src="/avatar.png"
          alt="Profile"
          height={80}
          width={80}
          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
        />

        <div className="text-right">
          <h2 className="text-2xl font-bold text-slate-800">
            {user?.full_name}
          </h2>
          <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        <div className="space-y-3 text-right">
          <label className="text-slate-700 font-medium">الإسم بالكامل</label>
          <input
            type="text"
            defaultValue={user?.full_name}
            className="w-full p-4 bg-[#F9FAFB] rounded-2xl"
          />
        </div>

        <div className="space-y-3 text-right">
          <label className="text-slate-700 font-medium">رقم الموبايل</label>
          <input
            type="text"
            defaultValue={user?.phone}
            className="w-full p-4 bg-[#F9FAFB] rounded-2xl"
          />
        </div>

        <div className="space-y-3 text-right">
          <label className="text-slate-700 font-medium">تاريخ الميلاد</label>
          <div className="relative">
            <input
              type="text"
              defaultValue={user?.dob}
              className="w-full p-4 bg-[#F9FAFB] rounded-2xl"
            />
            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="space-y-3 text-right">
          <label className="text-slate-700 font-medium">الجنس</label>
          <div className="relative">
            <select
              defaultValue={user?.gender}
              className="w-full p-4 bg-[#F9FAFB] rounded-2xl appearance-none"
            >
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
            <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-start">
        <button className="bg-[#26C6DA] text-white px-12 py-3 rounded-2xl font-semibold">
          تعديل
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
