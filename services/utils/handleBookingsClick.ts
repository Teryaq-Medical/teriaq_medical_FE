// hooks/useBookingRedirect.ts
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export const useBookingRedirect = () => {
  const router = useRouter();
  const handleBookingClick = async () => {
    try {
      await AuthService.getMe();
      router.push("/book");
    } catch {
      router.push("/login");
    }
  };
  return handleBookingClick;
};