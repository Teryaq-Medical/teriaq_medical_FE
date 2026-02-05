import api from "./api";

export const AuthService = {
  registerIndividual: (data: {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    confirm_password: string;
    national_id: string;
  }) =>
    api.post("/register/normal/", data),

  registerCommunity: (data: {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
    community_name: string;
    membership_number: string;
  }) =>
    api.post("/register/community/", data),
  
    login: (data: {
      email: string;
      password: string;
    }) =>
      api.post("/login/", data),

    logout: () => api.post("/logout/"),

    getMe: () => api.get("/profile"),
};

export const DoctorService = {
  getDoctors: () => api.get("/doctors"),
}

