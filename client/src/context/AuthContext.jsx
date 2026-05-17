import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const login = async (userData, authToken) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
        const response = await api.get("/auth/me", {
            headers: {  
                Authorization: `Bearer ${token}`
            },
        });

        setUser(response.data.user);
    } catch (error) {
        console.error("Error fetching current user:", error);
        logout();
    } finally {
        setLoading(false);
    }
  };

  fetchCurrentUser();

}, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}