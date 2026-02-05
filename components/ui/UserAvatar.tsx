import  getInitials  from "@/services/utils/GetInItials";


export default function UserAvatar ({ name, className = "" }: { name: string; className?: string }){
  return (
    <div 
      className={`flex items-center justify-center bg-[#26C6DA] text-white font-bold rounded-full border-2 border-white shadow-sm ${className}`}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
};