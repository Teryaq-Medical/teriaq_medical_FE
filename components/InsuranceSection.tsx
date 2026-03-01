"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { InsuranceServices } from "@/services/auth.service";

export interface Insurance {
  id: number;
  entity: string;
  status: string;
  status_display_ar: string;
}

export default function InsuranceSection() {
  const { entity } = useBooking();

  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!entity) {
      setInsurances([]);
      return;
    }

    const fetchInsurances = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await InsuranceServices.getInsurances(entity);

        if (Array.isArray(data)) {
          setInsurances(data);
        } else {
          setInsurances([]);
        }

      } catch (err: any) {
        console.error("Insurance fetch error:", err);
        setError(err.message || "Failed to fetch insurances");
      } finally {
        setLoading(false);
      }
    };

    fetchInsurances();
  }, [entity]);

  if (loading) return <p>Loading insurances...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

      {insurances.length === 0 ? (
        <p className="text-gray-500 text-center">
          No insurance providers listed for this entity.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insurances.map((insurance) => (
            <div
              key={insurance.id}
              className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#00B5C1] transition-all cursor-default group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#F0FBFC] flex items-center justify-center text-[#00B5C1] group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    {insurance.entity}
                  </p>
                  <p className="text-xs text-gray-400">
                    {insurance.status_display_ar}
                  </p>
                </div>
              </div>

              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                ACCEPTED
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-sm text-gray-400">
        Don't see your provider?{" "}
        <span className="text-[#00B5C1] font-bold cursor-pointer underline">
          Contact support
        </span>
      </p>
    </div>
  );
}