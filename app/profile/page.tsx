import ProfileInfoForm from "@/components/auth/ProfileCard";
import UserBookings from "@/components/booking/UserBookings";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfileCard(){
    return (
    <DashboardLayout>
      <ProfileInfoForm />
      <UserBookings />
    </DashboardLayout>
  );

}