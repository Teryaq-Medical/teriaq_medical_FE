import api from "./api";

export const AuthService = {
  registerIndividual: (data: {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
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

    getMe: () => api.get("/profile"),
};

