import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const publicPaths = ["/login", "/token/refresh"];

api.interceptors.request.use((config) => {
  const requestPath = config.url || "";
  if (publicPaths.some((path) => requestPath.startsWith(path))) {
    delete config.headers.Authorization;
    return config;
  }

  const access = localStorage.getItem("accessToken");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refresh = localStorage.getItem("refreshToken");

    if (error.response?.status === 401 && refresh && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${api.defaults.baseURL}/token/refresh`, { refresh });
        localStorage.setItem("accessToken", data.access);
        if (data.refresh) {
          localStorage.setItem("refreshToken", data.refresh);
        }
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
