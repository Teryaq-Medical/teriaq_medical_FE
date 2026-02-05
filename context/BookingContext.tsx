"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface SelectedEntity {
  name: string;
  subText: string;
  imageUrl: string;
}

export interface SelectedDoctor {
  id: string;
  name: string;
  specialty: string[];
  imageUrl: string;
}

interface BookingContextType {
  entity: SelectedEntity | null;
  setEntity: (data: SelectedEntity) => void;
  selectedDoctor: SelectedDoctor | null;
  setSelectedDoctor: (doctor: SelectedDoctor | null) => void;
  selectedSpecialties: string[];
  setSelectedSpecialties: (specialties: string[]) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [entity, setEntityState] = useState<SelectedEntity | null>(null);
  const [selectedDoctor, setSelectedDoctorState] = useState<SelectedDoctor | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Smart Setter: If clinic changes, reset EVERYTHING below it
  const setEntity = (data: SelectedEntity) => {
    setEntityState(data);
    setSelectedDoctorState(null);
    setSelectedSpecialties([]); // Clear specialties
    setSelectedDate("");         // Clear date
    setSelectedTime("");         // Clear time
  };

  // Smart Setter: If doctor changes, reset date and time
  const setSelectedDoctor = (doctor: SelectedDoctor | null) => {
    setSelectedDoctorState(doctor);
    setSelectedDate(""); 
    setSelectedTime("");
  };

  return (
    <BookingContext.Provider
      value={{
        entity,
        setEntity,
        selectedDoctor,
        setSelectedDoctor,
        selectedSpecialties,
        setSelectedSpecialties, // <--- This was likely missing in the provider value!
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
};