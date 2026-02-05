interface ProfileHeaderProps {
  name: string;
  description: string;
  imageUrl: string;
}

export default function ProfileHeader({ name, description, imageUrl }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start justify-between bg-white p-6 rounded-t-xl border-b border-gray-100">
      <div className="flex gap-4 items-center">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-200">
           <img src={imageUrl || "https://api.dicebear.com/7.x/initials/svg?seed=H"} alt="Avatar" className="object-cover w-full h-full" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
          <p className="mt-2 text-gray-600 max-w-md leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}