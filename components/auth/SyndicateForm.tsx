"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/auth.service";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SyndicateForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem("user_session", JSON.stringify({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      national_id: data.national_id,
      dob: "2000-01-01",
      gender: "ذكر"
    }));

    router.push("/book");
    setLoading(false);
  };

  const labelStyle =
    "block text-right text-sm font-bold text-[#1a4b5c] mb-1.5";

  const inputStyle =
    "bg-[#F9F9F9] border-gray-100 rounded-xl h-12 text-right pr-4 pl-10 focus-visible:ring-[#21b3d5]";

  return (
    <div dir="rtl" className="w-full">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className={labelStyle}>الاسم بالكامل</label>
          <Input name="full_name" placeholder="أدخل اسمك" className={inputStyle} required />
        </div>
        {/* Syndicate Name */}
        <div>
          <label className={labelStyle}>اسم النقابة</label>
          <Input
            name="syndicate_name"
            placeholder="اختر النقابة"
            className={inputStyle}
          />
        </div>

        {/* Membership Number */}
        <div>
          <label className={labelStyle}>رقم العضوية</label>
          <Input
            name="membership_number"
            placeholder="ادخل رقم العضوية"
            className={inputStyle}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelStyle}>البريد الإلكتروني</label>
          <Input
            name="email"
            placeholder="email@email.com"
            className={inputStyle}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className={labelStyle}>الرقم السري</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••"
              className={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className={labelStyle}>تأكيد الرقم السري</label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              placeholder="ادخل الرقم السري"
              className={inputStyle}
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          disabled={loading}
          className="w-full bg-[#21b3d5] hover:bg-[#1ca1bf] text-white h-12 rounded-xl font-bold mt-4 shadow-md transition-all"
        >
          {loading ? "جاري الإرسال..." : "متابعة"}
        </Button>
      </form>
    </div>
  );
}
