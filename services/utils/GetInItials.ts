export default function getInitials (name: string = ""){
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  
  const firstInitial = parts[0].charAt(0);
  const secondInitial = parts.length > 1 ? parts[1].charAt(0) : "";
  
  return (firstInitial + secondInitial).toUpperCase();
};