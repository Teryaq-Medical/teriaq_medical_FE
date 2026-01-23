'use client'

export default function AuthLayout({
  children,
  footerAction,
}: {
  children: React.ReactNode;
  footerAction?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* Left Side: Forms and Content */}
      <div className="flex-1 flex flex-col items-center pt-20 pb-12 px-6 md:px-12 relative bg-white">
        <div className="w-full max-w-[550px]">
          {children}
        </div>

        {/* Back Button (Bottom Left) */}
        <button
          onClick={() => window.history.back()}
          className="absolute bottom-10 left-10 p-2 border-2 border-[#21b3d5] rounded-md hover:bg-gray-50 transition text-gray-400"
        >
          <svg width="60" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Footer Action (Continue button) */}
        {footerAction && (
          <div className="absolute bottom-10 right-10">
            {footerAction}
          </div>
        )}
      </div>

      {/* Right Side: Image Background with Centered Logo */}
      <div
        className="hidden md:flex flex-1 items-center justify-center relative bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: 'url("/logo.png")' }} // Your background pattern
      >
        <div className="absolute inset-0 bg-black/5" />
        
        {/* White Card for Logo */}
        <div>
          <img
            src="/teriaq.svg"
            className="h-24 w-auto object-contain"
            alt="Teryaq Logo"
          />
        </div>
      </div>

    </div>
  );
}