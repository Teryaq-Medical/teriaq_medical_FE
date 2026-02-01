"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export default function IndividualForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (password !== confirmPassword) {
      setError("كلمة المرور غير متطابقة");
      setLoading(false);
      return;
    }

    try {
      await AuthService.registerIndividual({
        full_name: formData.get("full_name") as string,
        email: formData.get("email") as string,
        phone_number: formData.get("phone") as string,
        password,
        national_id: formData.get("national_id") as string,
      });

      router.push("/book");

    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
        "حدث خطأ أثناء إنشاء الحساب"
      );
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = "block text-right text-sm font-bold text-[#1a4b5c] mb-1.5";
  const inputStyle =
    "bg-[#F9F9F9] border-gray-100 rounded-xl h-12 text-right focus-visible:ring-[#21b3d5] pr-4 pl-10";

  return (
    <div dir="rtl" className="w-full">
      <form onSubmit={submit} className="space-y-4">

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className={labelStyle}>الاسم بالكامل</label>
          <Input name="full_name" placeholder="هاجر" className={inputStyle} required />
        </div>

        <div>
          <label className={labelStyle}>الرقم القومي</label>
          <Input name="national_id" placeholder="ادخل رقمك القومي" className={inputStyle} required />
        </div>

        <div>
          <label className={labelStyle}>البريد الإلكتروني</label>
          <Input name="email" type="email" placeholder="email@email.com" className={inputStyle} required />
        </div>

        <div>
          <label className={labelStyle}>رقم موبايل</label>
          <Input name="phone" placeholder="123 4567 1234" className={inputStyle} required />
        </div>

        <div className="relative">
          <label className={labelStyle}>الرقم السري</label>
          <Input
            placeholder="••••"
            type={showPassword ? "text" : "password"}
            name="password"
            className={inputStyle}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <label className={labelStyle}>تأكيد الرقم السري</label>
          <Input
            placeholder="أدخل الرقم السري"
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            className={inputStyle}
            required
          />
          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Button
          disabled={loading}
          className="w-full bg-[#21b3d5] hover:bg-[#1ca1bf] text-white h-12 rounded-xl font-bold"
        >
          {loading ? "جاري الإرسال..." : "متابعة"}
        </Button>
      </form>
    </div>
  );
}
