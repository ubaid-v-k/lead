import axios from "axios";

const API_URL = "http://localhost:8000/api";
const SESSION_KEY = "crm_user_token";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(SESSION_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getDashboardData = async (period = 'monthly') => {
  try {
    const response = await api.get(`/dashboard/?period=${period}`);
    return response.data;
  } catch (error) {
    console.error("Dashboard error", error);
    // Fallback to empty structure to avoid breaking the UI
    return {
      stats: [
        { title: "Total Leads", value: "0", icon: "👥", color: "#e0e7ff" },
        { title: "Active Deals", value: "0", icon: "💼", color: "#d1fae5" },
        { title: "Closed Deals", value: "0", icon: "🎒", color: "#fee2e2" },
        { title: "Monthly Revenue", value: "0", icon: "💰", color: "#fde68a" },
      ],
    };
  }
};
