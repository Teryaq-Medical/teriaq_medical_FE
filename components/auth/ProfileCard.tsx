"use client";

import React, { useEffect, useState } from "react";
import UserAvatar from "@/components/ui/UserAvatar";
import { AuthService } from "@/services/auth.service";
import { profileFieldsByType, FieldConfig } from "@/services/types/profileFields";
import { BaseUser } from "@/services/types/user";

const getFieldValue = (user: BaseUser, field: FieldConfig) => {
  if (field.source === "user") {
    return (user as any)?.[field.name];
  }
  // This correctly accesses user.normal_profile.national_id, etc.
  return (user as any)?.[field.source]?.[field.name];
};

const ProfileInfoForm = () => {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AuthService.getMe();
        // Crucial: Set the entire data object so user_type is present
        setUser(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-12 text-center text-gray-400">جاري تحميل البيانات...</div>;
  if (!user) return <div className="p-12 text-center text-red-400">لا يوجد مستخدم</div>;

  // Lookup the fields based on the user type
  const fields = profileFieldsByType[user.user_type] || [];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-50 w-full max-w-4xl" dir="rtl">
      <div className="flex items-center gap-5 mb-12">
        <UserAvatar
          name={user.full_name || user.community_profile?.community_name || user.doctors?.name || ""}
          className="w-20 h-20 text-2xl"
        />
        <div className="text-right">
          <h2 className="text-2xl font-bold text-slate-800">
            {user.full_name || user.community_profile?.community_name || "مستخدم"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {fields.map((field) => {
          const value = getFieldValue(user, field);

          if (field.type === "list" && Array.isArray(value)) {
            return (
              <div key={field.name} className="space-y-3 text-right">
                <label className="text-slate-700 font-medium">{field.label}</label>
                <div className="flex flex-wrap gap-2">
                  {value.map((v, i) => (
                    <span key={i} className="px-4 py-1 bg-[#F9FAFB] rounded-full text-sm">{v}</span>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <div key={field.name} className="space-y-3 text-right">
              <label className="text-slate-700 font-medium">{field.label}</label>
              <input
                type={field.type || "text"}
                value={value ?? ""}
                readOnly
                className="w-full p-4 bg-[#F9FAFB] rounded-2xl outline-none border border-transparent focus:border-[#26C6DA]"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-start">
        <button className="bg-[#26C6DA] text-white px-12 py-3 rounded-2xl font-semibold hover:bg-[#1fb1c4] transition-colors">
          تعديل
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoForm;