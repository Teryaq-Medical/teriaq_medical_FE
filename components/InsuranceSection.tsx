import { ShieldCheck, Search } from "lucide-react";

export default function InsuranceSection() {
  const providers = [
    { name: "Bupa Health", type: "Full Coverage" },
    { name: "Allianz Care", type: "Standard" },
    { name: "AXA Insurance", type: "Premium" },
    { name: "MetLife", type: "Dental & Vision" },
    { name: "Cigna Global", type: "Expat Plan" },
    { name: "Aetna", type: "Full Coverage" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative mb-6">
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((p, i) => (
          <div key={i} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#00B5C1] transition-all cursor-default group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#F0FBFC] flex items-center justify-center text-[#00B5C1] group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">{p.name}</p>
                <p className="text-xs text-gray-400">{p.type}</p>
              </div>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              ACCEPTED
            </div>
          </div>
        ))}
      </div>
      
      <p className="mt-6 text-center text-sm text-gray-400">
        Don't see your provider? <span className="text-[#00B5C1] font-bold cursor-pointer underline">Contact support</span>
      </p>
    </div>
  );
}