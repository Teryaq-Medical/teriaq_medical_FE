"use client";

import { useEffect, useState } from "react";
import { useBooking } from "@/context/BookingContext";
import { Clock, Award, BookOpen } from "lucide-react";
import { AboutService, CertificationService } from "@/services/auth.service";

export interface EntityBio {
  id: number;
  bio: string;
  bio_details: string;
  experiance: number;
  operaiton: number;
  education?: string;
}

export interface Certification {
  id: number;
  name: string;
  entity: string;
}

export default function AboutSection() {
  const { entity } = useBooking();

  const [bio, setBio] = useState<EntityBio | null>(null);
  const [certificates, setCertificates] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!entity) {
      setBio(null);
      setCertificates([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const bioData = await AboutService.getAbout(entity);
        const certData = await CertificationService.getCertificates(entity);

        // Handle biography
        if (Array.isArray(bioData) && bioData.length > 0) {
          setBio(bioData[0]);
        } else {
          setBio(null);
        }

        // Handle certifications
        if (Array.isArray(certData)) {
          setCertificates(certData);
        } else {
          setCertificates([]);
        }

      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [entity]);

  if (loading) return <p>Loading information...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!bio) return <p>No biography available for this entity.</p>;

  const stats = [
    {
      icon: <Clock size={20} />,
      label: "Experience",
      value: `${bio.experiance}+ Years`,
    },
    {
      icon: <Award size={20} />,
      label: "Operations",
      value: `${bio.operaiton}+`,
    },
    {
      icon: <BookOpen size={20} />,
      label: "Education",
      value: bio.education || "N/A",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Biography Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
        <h3 className="text-xl font-bold text-[#031B4E] mb-4">
          Professional Biography
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6">
          {bio.bio_details || bio.bio}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-[#F0FBFC] rounded-xl border border-[#00B5C1]/10"
            >
              <div className="text-[#00B5C1]">{stat.icon}</div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  {stat.label}
                </p>
                <p className="text-[#031B4E] font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-[#031B4E] mb-4">
          Certifications & Qualifications
        </h3>

        {certificates.length === 0 ? (
          <p className="text-gray-500">
            No certifications available for this entity.
          </p>
        ) : (
          <ul className="space-y-4">
            {certificates.map((cert) => (
              <li key={cert.id} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-[#00B5C1] mt-2 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800">
                    {cert.name}
                  </p>
                  <p>{cert.entity}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}