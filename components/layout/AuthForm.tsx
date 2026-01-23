'use client'
import Image from "next/image";

export default function FormLayout({
  children,
  footerAction,
}: {
  children: React.ReactNode;
  footerAction?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* Left Side */}
      <div dir="rtl" className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative bg-white">
        <div className="w-full max-w-[550px]">
          {children}
        </div>


        {/* Right Footer Action (Continue button) */}
        {footerAction && (
          <div className="absolute bottom-10 right-10">
            {footerAction}
          </div>
        )}
      </div>

      {/* Right Image */}
      <div
        className="hidden md:flex flex-1 items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: 'url("/form.png")' }}
      >
        <div className="absolute inset-0 bg-black/5" />
        <Image
          height={20}
          width={20}
          src='/teriaq.svg'
          className="h-28 w-auto object-contain"
          alt="Teryaq Logo"
        />
      </div>

    </div>
  );
}
