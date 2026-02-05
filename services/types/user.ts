export type UserType = "normal" | "community" | "doctors" | "clinics"; // Fixed typo

export interface BaseUser {
  email: string;
  full_name: string;
  phone_number: string;
  user_type: UserType;
  normal_profile?: { national_id: string };
  community_profile?: { community_name: string; membership_number: string };
  doctors?: {
    name: string;
    age: number;
    phone_number: number;
    address: string;
    specialist: string;
    license: string;
    doctor_image: string;
  };
  clinics?: {
    name: string;
    image: string;
    Specialist: string[];
  };
}