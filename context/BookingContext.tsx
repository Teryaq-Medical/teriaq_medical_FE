"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface SelectedEntity {
  id: string | number;
  name: string;
  subText: string;
  imageUrl: string;
  type: "hospital" | "clinic" | "lab"; // always required
}

export interface SelectedDoctor {
  id: string | number;
  assignmentId: number;
  name: string;
  specialty: string[];
  imageUrl: string;
}

export interface SelectedLabService {
  lab: number;
  service_name: string;
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
  selectedScheduleId: number | null;
  setSelectedScheduleId: (id: number | null) => void;
  assignmentId: number | null;
  setAssignmentId: (id: number | null) => void;
  selectedLabService: SelectedLabService | null;
  setSelectedLabService: (data: SelectedLabService | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [entity, setEntityState] = useState<SelectedEntity | null>(null);
  const [selectedDoctor, setSelectedDoctorState] = useState<SelectedDoctor | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [assignmentId, setAssignmentId] = useState<number | null>(null);
  const [selectedLabService, setSelectedLabServiceState] = useState<SelectedLabService | null>(null);

  const setEntity = (data: SelectedEntity) => {
    if (!data.type) data.type = "hospital";
    setEntityState(data);
    setSelectedDoctorState(null);
    setSelectedSpecialties([]);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedScheduleId(null);
    setAssignmentId(null);
    setSelectedLabServiceState(null);
  };

  const setSelectedDoctor = (doctor: SelectedDoctor | null) => {
    setSelectedDoctorState(doctor);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedScheduleId(null);
    setAssignmentId(doctor?.assignmentId || null); // automatically set
    setSelectedLabServiceState(null);
  };

  const setSelectedLabService = (data: SelectedLabService | null) => {
    setSelectedLabServiceState(data);
    setSelectedDoctorState(null);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedScheduleId(null);
    setAssignmentId(null);
  };

  return (
    <BookingContext.Provider
      value={{
        entity, setEntity,
        selectedDoctor, setSelectedDoctor,
        selectedSpecialties, setSelectedSpecialties,
        selectedDate, setSelectedDate,
        selectedTime, setSelectedTime,
        selectedScheduleId, setSelectedScheduleId,
        assignmentId, setAssignmentId,
        selectedLabService, setSelectedLabService,
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