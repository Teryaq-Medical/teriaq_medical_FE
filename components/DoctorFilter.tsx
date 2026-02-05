"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DoctorFilterProps {
  activeFilter: string;
  onFilterChange: (specialty: string) => void;
  availableSpecialties: string[];
}

export default function DoctorFilter({ 
  activeFilter, 
  onFilterChange, 
  availableSpecialties 
}: DoctorFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 py-2">
      {/* Main Filter Button */}
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#031B4E] hover:border-[#00B5C1] transition-all shadow-sm">
        <SlidersHorizontal size={16} className="text-[#00B5C1]" />
        <span>Filter</span>
      </button>

      <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />

      {/* Quick Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => onFilterChange("All")}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all",
            activeFilter === "All" 
              ? "bg-[#00B5C1] text-white" 
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          )}
        >
          All Doctors
        </button>
        
        {availableSpecialties.map((spec) => (
          <button
            key={spec}
            onClick={() => onFilterChange(spec)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2",
              activeFilter === spec 
                ? "bg-orange-500 text-white" 
                : "bg-white border border-gray-200 text-gray-600 hover:border-[#00B5C1]"
            )}
          >
            {spec}
            {activeFilter === spec && <X size={12} onClick={(e) => { e.stopPropagation(); onFilterChange("All"); }} />}
          </button>
        ))}
      </div>
    </div>
  );
}