export type FieldSource = "user" | "normal_profile" | "community_profile" | "doctors" | "clinics";

export type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "number" | "list";
  source: FieldSource;
};

export const profileFieldsByType: Record<string, FieldConfig[]> = {
  normal: [
    { name: "full_name", label: "الاسم الكامل", source: "user" },
    { name: "email", label: "البريد الإلكتروني", source: "user" },
    { name: "phone_number", label: "رقم الهاتف", source: "user" },
    { name: "national_id", label: "الرقم القومي", source: "normal_profile" },
  ],
  community: [
    { name: "full_name", label: "الاسم الكامل", source: "user" },
    { name: "email", label: "البريد الإلكتروني", source: "user" },
    { name: "community_name", label: "اسم المجتمع", source: "community_profile" },
    { name: "membership_number", label: "رقم العضوية", source: "community_profile" },
  ],
  doctors: [
    { name: "name", label: "اسم الطبيب", source: "doctors" },
    { name: "age", label: "العمر", type: "number", source: "doctors" },
    { name: "specialist", label: "التخصص", source: "doctors" },
    { name: "phone_number", label: "رقم الهاتف", source: "doctors" },
    { name: "address", label: "العنوان", source: "doctors" },
  ],
  clinics: [ // Fixed typo
    { name: "name", label: "اسم العيادة", source: "clinics" },
    { name: "Specialist", label: "التخصصات", type: "list", source: "clinics" },
  ],
};