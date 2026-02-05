import { Award, BookOpen, Clock } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { icon: <Clock size={20} />, label: "Experience", value: "12+ Years" },
    { icon: <Award size={20} />, label: "Operations", value: "500+" },
    { icon: <BookOpen size={20} />, label: "Education", value: "PhD, MD" },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
        <h3 className="text-xl font-bold text-[#031B4E] mb-4">Professional Biography</h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          Dr. Sarah Ahmed is a board-certified pediatrician with over 12 years of experience in specialized child care and family medicine. 
          She graduated from the Royal Academy of Medicine and has dedicated her career to providing integrated health solutions. 
          Her approach combines modern clinical practices with a deep empathy for patient well-being.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-[#F0FBFC] rounded-xl border border-[#00B5C1]/10">
              <div className="text-[#00B5C1]">{stat.icon}</div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{stat.label}</p>
                <p className="text-[#031B4E] font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-[#031B4E] mb-4">Certifications & Education</h3>
        <ul className="space-y-4">
          <li className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-[#00B5C1] mt-2 shrink-0" />
            <div>
              <p className="font-bold text-slate-800">Board Certified in Pediatric Medicine</p>
              <p className="text-sm text-gray-500">American Board of Pediatrics • 2018</p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-[#00B5C1] mt-2 shrink-0" />
            <div>
              <p className="font-bold text-slate-800">Doctor of Medicine (MD)</p>
              <p className="text-sm text-gray-500">Johns Hopkins University • 2012</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}