import api from "./api";

export const loginRequest = async (credentials) => {
  const { data } = await api.post("/login", credentials);
  return data;
};

export const logoutRequest = async (refresh) => {
  const { data } = await api.post("/logout", { refresh });
  return data;
};

export const validateTokenRequest = async () => {
  const { data } = await api.get("/token/validate");
  return data;
};
