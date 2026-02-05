import { Twitter, Twitch, Globe, Hash, DollarSign, Github } from "lucide-react";

export function SocialsCard() {
  const socials = [
    { icon: <Twitter size={16}/>, label: "Twitter", value: "@bsimmons" },
    { icon: <Twitch size={16}/>, label: "Twitch", value: "bsimmons" },
    { icon: <Globe size={16}/>, label: "Personal Web", value: "bsimmons.com" },
    { icon: <Hash size={16}/>, label: "Discord", value: "bsimmons#XXXX" },
    { icon: <DollarSign size={16}/>, label: "Cashapp", value: "$bsimmons" },
    { icon: <Github size={16}/>, label: "Github", value: "github.com/bsimmons" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 mb-6">
      <h3 className="font-bold text-slate-900 mb-4">Socials</h3>
      <div className="space-y-3">
        {socials.map((social, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              {social.icon} <span>{social.label}</span>
            </div>
            <span className="text-slate-800 font-medium">: {social.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SubscriptionCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-900">Subscription</h3>
        <button className="text-sm font-bold text-[#031B4E] underline">Upgrade Subscription</button>
      </div>
      <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
        <p className="font-bold text-slate-800">Free Plan</p>
        <p className="text-xs text-gray-500 mt-1">
          Users can play 100 times per day, the maximum length of a single entry is 150 characters
        </p>
      </div>
    </div>
  );
}