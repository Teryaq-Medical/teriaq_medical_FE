"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  id: number | string
  name: string;
  specialty: string | string[]; // Accepts string or array
  ratingText: string;
  imageUrl: string;
  isSelected?: boolean;
  selectedSpecialties?: string[];
  onClick?: () => void;
  onSpecialtyChange?: (specialty: string) => void;
};

export default function SelectionCard({
  name,
  specialty,
  ratingText,
  imageUrl,
  isSelected,
  selectedSpecialties = [],
  onClick,
  onSpecialtyChange,
}: Props) {
  // Ensure specialty is always an array
  const specialties = Array.isArray(specialty) ? specialty : [specialty];
  const hasMultipleSpecialties = specialties.length > 1;

  // Scrollable if more than 5 specialties
  const isScrollable = specialties.length > 5;

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer w-full transition-all duration-300",
        "bg-[#F0FBFC] border-2 rounded-xl flex flex-col overflow-hidden shadow-sm",
        isSelected ? "border-[#00B5C1]" : "border-transparent"
      )}
    >
      {/* Card selection dot */}
      <div className="absolute top-5 right-5 z-10">
        <div
          className={cn(
            "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all",
            isSelected ? "border-[#00B5C1] bg-white" : "border-gray-200 bg-white"
          )}
        >
          {isSelected && <div className="w-4 h-4 rounded-full bg-[#00B5C1]" />}
        </div>
      </div>

      {/* Top Half */}
      <div className="flex flex-col items-center pt-10 pb-6 px-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-white shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>

        <h3 className="font-bold text-xl text-[#031B4E] mb-4 text-center">{name}</h3>

        {/* Specialties */}
        <div
          className={cn(
            "w-full flex flex-col items-center gap-2 px-2",
            isScrollable ? "max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00B5C1]/30" : ""
          )}
        >
          {specialties.map((item, index) => {
            const selected = selectedSpecialties.includes(item);
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasMultipleSpecialties) {
                    onSpecialtyChange?.(item);
                  }
                }}
                className={cn(
                  "relative w-full max-w-[200px] flex items-center gap-2 border px-4 py-2 text-sm font-medium transition-all rounded-md bg-white border-gray-300 hover:border-[#00B5C1] hover:bg-[#F0FBFC]",
                  selected && "border-[#00B5C1] bg-[#E0F8FA]"
                )}
              >
                {/* Dot only for multiple specialties */}
                {hasMultipleSpecialties && (
                  <span
                    className={cn(
                      "w-3 h-3 rounded-full border-2 flex-shrink-0 transition-all",
                      selected ? "bg-[#00B5C1] border-[#00B5C1]" : "bg-white border-gray-300"
                    )}
                  />
                )}
                <span className="flex-1 text-center">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1.5px] bg-[#00B5C1]/20 shrink-0 mt-auto" />

      {/* Bottom Half: Rating */}
      <div className="py-5 px-6 flex justify-center bg-[#F0FBFC] shrink-0">
        <div className="flex items-center gap-2 border border-[#00B5C1] rounded-2xl px-6 py-2 text-[#00B5C1] bg-white shadow-sm">
          <Star size={18} className="fill-[#00B5C1] text-[#00B5C1]" />
          <span className="text-sm font-bold">{ratingText}</span>
        </div>
      </div>
    </div>
  );
}
