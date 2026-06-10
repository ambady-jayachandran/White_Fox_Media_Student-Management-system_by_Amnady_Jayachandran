/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { loginRequest, logoutRequest } from "../services/authService";

const AuthContext = createContext(null);

const readJson = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson("user"));
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken"));

  const persistSession = useCallback((response) => {
    localStorage.setItem("accessToken", response.access);
    localStorage.setItem("refreshToken", response.refresh);
    localStorage.setItem("user", JSON.stringify(response.user));
    setAccessToken(response.access);
    setUser(response.user);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const response = await loginRequest(credentials);
      persistSession(response);
      return response;
    },
    [persistSession],
  );

  const logout = useCallback(async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (refresh) {
      try {
        await logoutRequest(refresh);
      } catch {
        // Local logout should still complete if the token was already invalidated.
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setAccessToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(accessToken),
      login,
      logout,
    }),
    [user, accessToken, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
