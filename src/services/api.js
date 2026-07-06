import axios from "axios";

const api = axios.create({
  baseURL: "https://hackathon-backend-e10l.onrender.com/api",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("recruitiq_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("recruitiq_token");
      localStorage.removeItem("recruitiq_user");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // Gemini Rate Limit
    if (error.response?.status === 429) {
      console.warn("Gemini API Rate Limit Exceeded");
    }

    // Forbidden
    if (error.response?.status === 403) {
      console.warn("Access Forbidden");
    }

    // Internal Server Error
    if (error.response?.status === 500) {
      console.error("Internal Server Error");
    }

    return Promise.reject(error);
  },
);

// ---- Auth ----
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
};

// ---- Candidate ----
export const candidateAPI = {
  getMyProfile: () => api.get("/candidates/me"),
  updateMyProfile: (data) => api.put("/candidates/me", data),
  list: (params) => api.get("/candidates", { params }),
  getById: (id) => api.get(`/candidates/${id}`),
};

// ---- Resume ----
export const resumeAPI = {
  upload: (formData) =>
    api.post("/resume/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  parse: (resumeId) => api.post(`/resume/${resumeId}/parse`),
  get: (resumeId) => api.get(`/resume/${resumeId}`),
};

// ---- Interview ----
export const interviewAPI = {
  generate(resumeId) {
    return api.post("/interview/generate", { resumeId });
  },

  get(interviewId) {
    return api.get(`/interview/${interviewId}`);
  },

  submitAnswer(interviewId, payload) {
    return api.post(`/interview/${interviewId}/answer`, payload);
  },

  saveProgress(interviewId, payload) {
    return api.post(`/interview/${interviewId}/answer`, payload);
  },

  finalize(interviewId) {
    return api.post(`/interview/${interviewId}/finalize`);
  },

  retryFinalize(interviewId) {
    return api.post(`/interview/${interviewId}/finalize`);
  },

  getByCandidate(candidateId) {
    return api.get(`/interview/candidate/${candidateId}`);
  },
};

// ---- Dashboard ----
export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
};

// ---- Report ----
export const reportAPI = {
  download: (candidateId) =>
    api.get(`/report/${candidateId}/pdf`, {
      responseType: "blob",
    }),
};

export default api;
