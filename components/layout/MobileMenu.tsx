"use client";

import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  onLoginClick: () => void;
}

export default function MobileMenu({ isOpen, user, onLoginClick }: MobileMenuProps) {
  if (!isOpen) return null;

  const userDisplayName = user?.full_name || user?.community_profile?.community_name || "زائر";

  return (
    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[92%] max-w-6xl bg-white rounded-2xl shadow-xl py-6 px-6 md:hidden z-50">
      {/* User Info / Login Section */}
      <div className="flex items-center gap-3 mb-4 border-b pb-4">
        {user ? (
          <>
            <UserAvatar name={userDisplayName} className="w-10 h-10 text-sm" />
            <span className="font-semibold text-gray-700">{userDisplayName}</span>
          </>
        ) : (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-2 bg-[#21b3d5] text-white px-4 py-2 rounded-full text-sm font-semibold w-full justify-center"
          >
            <LogIn size={16} />
            <span>تسجيل الدخول</span>
          </button>
        )}
      </div>

      {/* Nav Links */}
      <ul className="flex flex-col gap-4 text-gray-700 font-semibold">
        <li className="text-[#21b3d5]">
          <Link href="/">الرئيسية</Link>
        </li>
        <li className="hover:text-[#21b3d5] cursor-pointer">
          <Link href="/services">خدماتنا</Link>
        </li>
        <li className="hover:text-[#21b3d5] cursor-pointer">
          <Link href="/about">عننا</Link>
        </li>
        <li className="hover:text-[#21b3d5] cursor-pointer">
          <Link href="/contact">تواصل معنا</Link>
        </li>
      </ul>
    </div>
  );
}