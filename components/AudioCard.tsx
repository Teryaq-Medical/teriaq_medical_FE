import { Play, Share2, Heart, Bookmark, Users } from "lucide-react";

interface AudioCardProps {
  title: string;
  author: string;
  time: string;
  samples: number;
  stats: { used: string; shares: string; likes: string; bookmarks: string };
  image: string;
}

export default function AudioCard({ title, author, time, samples, stats, image }: AudioCardProps) {
  return (
    <div className="p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow mb-4">
      <div className="flex gap-4">
        <img src={image} className="w-24 h-24 rounded-lg object-cover" alt={title} />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-800">{title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <span>{author}</span> • <span>{time}</span> • <span>{samples} Audio Samples</span>
                <span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[10px]">En</span>
                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px]">Fictional</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <button className="bg-[#031B4E] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all">
              Use Voice
            </button>
            <div className="flex items-center gap-4 text-gray-400 text-xs">
              <span className="flex items-center gap-1"><Users size={14} /> {stats.used} Used</span>
              <span className="flex items-center gap-1"><Share2 size={14} /> {stats.shares}</span>
              <span className="flex items-center gap-1"><Heart size={14} /> {stats.likes}</span>
              <span className="flex items-center gap-1"><Bookmark size={14} /> {stats.bookmarks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}