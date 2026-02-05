"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/validations/auth.schema";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (data: LoginSchema) => {
    setServerError(null);

    try {
      await AuthService.login(data);
      router.push("/book");
    } catch (err: any) {
      setServerError(err?.response?.data?.error || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5FAFC] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 text-right">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image src="/teriaq.svg" alt="Teryaq" width={60} height={60} />
        </div>

        <p className="text-center text-sm text-gray-500 mb-6">
          رعايتك الصحية... أسهل وأسرع
        </p>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {serverError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {serverError}
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#1a4b5c] mb-1">
              البريد الإلكتروني
            </label>
            <Mail className="absolute right-3 top-10 text-gray-400" size={18} />
            <Input
              {...register("email")}
              type="email"
              placeholder="email@email.com"
              className="h-12 pr-10 rounded-xl bg-[#F9F9F9] border border-gray-200 focus-visible:ring-[#21b3d5]"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-[#1a4b5c] mb-1">
              كلمة المرور
            </label>
            <Lock className="absolute right-3 top-10 text-gray-400" size={18} />
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-12 pr-10 pl-10 rounded-xl bg-[#F9F9F9] border border-gray-200 focus-visible:ring-[#21b3d5]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-10 text-gray-400"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-[#21b3d5] hover:bg-[#1ca1bf] text-white font-bold"
          >
            {isSubmitting ? "جاري الدخول..." : "ادخل"}
          </Button>
        </form>
      </div>
    </div>
  );
}
