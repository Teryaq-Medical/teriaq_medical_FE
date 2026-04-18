"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X, LogIn } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import MobileMenu from "./MobileMenu";
import { useBookingRedirect } from "@/services/utils/handleBookingsClick";
import UserAvatar from "@/components/ui/UserAvatar";

export default function Navbar() {
  const handleBookingClick = useBookingRedirect();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await AuthService.getMe();
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

  const handleLoginClick = () => {
    setMenuOpen(false); // Close menu on click
    router.push("/login");
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const userDisplayName = user?.full_name || user?.community_profile?.community_name || "";

  return (
    <div className="flex justify-center pt-6 relative z-50">
      <nav className="flex items-center justify-between w-[92%] max-w-6xl py-1 bg-white rounded-full px-6 shadow-xl">
        
        {/* Desktop User Section */}
        <div className="hidden md:flex items-center gap-2 text-gray-700 font-semibold ml-10 mr-10">
          {!loading && user ? (
            <>
              <ChevronDown size={16} />
              <button onClick={handleBookingClick}>
                <UserAvatar name={userDisplayName} className="w-8 h-8 text-sm" />
              </button>
              <button
                onClick={handleLogout}
                className="text-xs text-red-500 hover:text-red-700 mr-2"
              >
                تسجيل خروج
              </button>
            </>
          ) : (
            !loading && (
              <button
                onClick={handleLoginClick}
                className="flex items-center gap-1 bg-[#21b3d5] text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#1da1c0] transition"
              >
                <LogIn size={14} />
                <span>تسجيل الدخول</span>
              </button>
            )
          )}
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-600 font-semibold text-sm">
          <li className="hover:text-[#21b3d5] cursor-pointer">تواصل معنا</li>
          <li className="hover:text-[#21b3d5] cursor-pointer">عننا</li>
          <li className="hover:text-[#21b3d5] cursor-pointer">خدماتنا</li>
          <li className="text-[#21b3d5]">الرئيسية</li>
        </ul>

        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <button
            className="md:hidden text-[#21b3d5]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={32} /> : <Menu size={24} />}
          </button>
          <div className="flex justify-end md:justify-center w-full md:w-auto ml-12 mr-10">
            <Image
              src="/teriaq.svg"
              alt="Logo"
              width={60}
              height={20}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Props will now be accepted without error */}
      <MobileMenu 
        isOpen={menuOpen} 
        user={user} 
        onLoginClick={handleLoginClick} 
      />
    </div>
  );
}