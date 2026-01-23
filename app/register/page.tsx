"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/layout/AuthLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type AccountType = "individual" | "syndicate" | null;

export default function RegisterPage() {
  const [selected, setSelected] = useState<AccountType>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    router.push(
      selected === "individual" ? "/register/individual" : "/register/syndicate"
    );
  };

  return (
    <AuthLayout
      footerAction={
        <Button
          onClick={handleContinue}
          disabled={!selected}
          className="px-10 py-6 bg-[#21b3d5] hover:bg-[#1ca1bf] text-white rounded-xl shadow-md transition-all"
        >
          متابعة
        </Button>
      }
    >
      <div className="flex flex-col items-center" dir="rtl">
        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl font-bold text-[#14768C]">إختر حسابك</h1>
          <p className="text-gray-500 text-sm">
            برجاء اختيار نوع الحساب للمتابعة
          </p>
        </div>

        {/* Small Selection Cards */}
        <div className="flex gap-4 justify-center w-full">
          {/* Syndicate Card */}
          <Card
            onClick={() => setSelected("syndicate")}
            className={clsx(
              "relative w-40 h-50 cursor-pointer p-4 border-spacing-0.5 rounded-sm border-[#21b3d5] transition-all flex flex-col items-center justify-center gap-3",
              selected === "syndicate"
                ? "bg-blue-50 text-gray-700" // <-- selected is gray
                : "bg-white text-white" // <-- unselected is blue
            )}
          >
            {/* Conditional Selection Dot */}
            {selected === "syndicate" && (
              <div className="absolute top-3 right-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#21b3d5] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#21b3d5]" />
                </div>
              </div>
            )}

            <img
              src="/organization.svg"
              className="w-50 ml-11 h-22 object-contain"
              alt="Syndicate"
            />

            <div className="text-center">
              <h3 className="ml-18 font-bold text-[#1a4b5c] text-[12px]">نقابة</h3>
              <p className="pt-2 text-[9px] text-gray-400 mt-0.5">
                للمؤسسات العامة والنقابات
              </p>
            </div>
          </Card>
          {/* Individual Card */}
          <Card 
            onClick={() => setSelected("individual")}
            className={clsx(
              "relative w-40 h-50 cursor-pointer p-4 border-spacing-0.5 rounded-sm border-[#21b3d5] transition-all flex flex-col items-center justify-center",
              selected === "individual"
                ? "bg-blue-50 text-gray-700" // <-- selected is gray
                : "bg-white text-white" // <-- unselected is blue
            )}
          >
            {selected === "individual" && (
              <div className="absolute top-3 right-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#21b3d5] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#21b3d5]" />
                </div>
              </div>
            )}

            <img
              src="/Boss.svg"
              className="w-50 ml-11 h-20 object-contain"
              alt="Individual"
            />

            <div className="text-center">
              <h3 className=" ml-12 font-bold text-[#1a4b5c] text-[12px]">
                أفراد غير نقابية
              </h3>
              <p className="ml-18 pt-2 text-[9px] text-gray-400 mt-0.5">
                للأفراد العاديين
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AuthLayout>
  );
}
