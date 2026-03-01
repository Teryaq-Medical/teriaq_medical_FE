import { get } from "http";
import api from "./api";




export const AuthService = {
  registerIndividual: (data: any) => api.post("/register/normal/", data),
  registerCommunity: (data: any) => api.post("/register/community/", data),
  login: (data: any) => api.post("/login/", data),
  logout: () => api.post("/logout/"),
  getMe: () => api.get("/profile/"),
};


export const HospitalService = {
  getHospitals: async () => {
    const res = await api.get("/hospitals/");
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  },
};

export const ClinicsService = {
  getHospitals: async () => {
    const res = await api.get("/clincs/");
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  },
};


export const DoctorService = {
   getAssignedDoctors: async (
    entityId: number,
    type: "hospital" | "clinic" | "lab" | "individual"
  ) => {
    if (!type) {
      console.error("Entity type is missing!");
      return [];
    }

    let url = `/doctor-assignments/`;
    let params: Record<string, number> = {};

    switch (type) {
      case "hospital":
        params = { hospital_id: entityId };
        break;
      case "clinic":
        params = { clinic_id: entityId };
        break;
      case "individual":
        params = { doctor_id: entityId };
        break;
      case "lab":
        // Labs handled separately
        return [];
      default:
        console.error("Unknown entity type:", type);
        return [];
    }

    const query = new URLSearchParams(params as any).toString();
    if (query) url += `?${query}`;

    const res = await api.get(url);
    return res.data.data || res.data || [];
  },

  getWorkSchedules: async (assignmentId: number) => {
    const res = await api.get(`/work-schedule/?assignment=${assignmentId}`);
    return res.data.data || res.data || [];
  },

  getDoctors: async () => {
    const res = await api.get("/doctors/");
    return res.data.data;
  },

  getDoctorAssignments: async (params: { doctor_id?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    const res = await api.get(`/doctor-assignments/?${query}`);
    return res.data.data;
  },
};


export const AppointmentService = {
  create: (data: {
    assignment: number;
    schedule: number;
    appointment_date: string;
    appointment_time: string;
  }) => api.post("/appointments/", data),

  getMyBookings: async () => {
    const res = await api.get("/appointments/");
    return res.data;
  },
};


export const LabsServices = {
  getLabs: async () => {
    const res = await api.get("/labs/");
    return res.data.data;
  },
};


function getEntityType(entity: { type: string }) {
  switch (entity.type) {
    case "clinic": return "clinics";
    case "lab": return "labs";
    default: return "hospitals"; // fallback
  }
}

export const AboutService = {
  getAbout: async (entity: { id: number | string; type: string }) => {
    const entityType = getEntityType(entity);
    const res = await api.get(`/${entityType}/${entity.id}/bio/`);
    return res.data.data; // Teriaq response format
  },
};

export const CertificationService = {
  getCertificates: async (entity: { id: number | string; type: string }) => {
    const entityType = getEntityType(entity);
    const res = await api.get(`/${entityType}/${entity.id}/certifications/`);
    return res.data.data; // Teriaq format
  },
};

export const InsuranceServices = {
  getInsurances:  async (entity: { id: number | string; type: string }) => {
    const entityType = getEntityType(entity);
    const res = await api.get(`/${entityType}/${entity.id}/insurance/`);
    return res.data.data;
  },
}

export const LabsService = {
  getLabs: async () => {
    const res = await api.get("/labs/");
    const data = res.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.results)) return data.results;

    return [];
  },

  // New: Create a lab booking
  createBooking: async (payload: { lab: number; service_name: string }) => {
    const res = await api.post("/lab-bookings/", payload);
    return res.data;
  },

  // Optional: Get user lab bookings
  getMyBookings: async () => {
    const res = await api.get("/lab-bookings/");
    return res.data;
  },
};

