import Image from "next/image";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  user: any; 
  onLoginClick: () => void;
}
export default function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[92%] max-w-6xl bg-white rounded-2xl shadow-xl py-6 px-6 md:hidden z-50">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4 border-b pb-4">
        <Link href="/register">
          <div className="w-10 h-10 rounded-full overflow-hidden border cursor-pointer">
            <Image
              src="/avatar.png"
              alt="User"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </Link>
        <span className="font-semibold text-gray-700">هاجر</span>
      </div>

      {/* Nav Links */}
      <ul className="flex flex-col gap-4 text-gray-700 font-semibold">
        <li className="text-[#21b3d5]">الرئيسية</li>
        <li className="hover:text-[#21b3d5] cursor-pointer">خدماتنا</li>
        <li className="hover:text-[#21b3d5] cursor-pointer">عننا</li>
        <li className="hover:text-[#21b3d5] cursor-pointer">تواصل معنا</li>
      </ul>
    </div>
  );
}