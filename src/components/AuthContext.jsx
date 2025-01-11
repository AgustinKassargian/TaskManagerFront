import React, { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Contexto no encontrado");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [authError, setAuthError] = useState();

  const signup = async (data) => {
    try {
      const res = await registerRequest(data);
      if (authError) {
        setAuthError();
      }
      setUser(res.data.newUser);
      setIsAuthenticated(true);
    } catch (error) {
      setAuthError(error.response.data.message);
      console.log("Error al iniciar sesión:", error.response.data.message);
    }
  };

  const signin = async (data) => {
    try {
      const res = await loginRequest(data);

      if (authError) {
        setAuthError("");
      }
      setUser(res.data?.user);
      setIsAuthenticated(true);
    } catch (error) {
      setAuthError(error.message);
      console.log("Error al iniciar sesión:", error.message);
    }
  };
  const logout = async () => {
    try {
      await logoutRequest(user);
      setAuthError();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checklogin = async () => {
    const cookies = Cookies.get();
    if (!cookies.authToken) {
      setIsAuthenticated(false);
      setLoading(false);
      return setUser(null);
    }
    try {
      const res = await verifyTokenRequest(cookies.authToken);
      if (!res.data) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      setUser(res.data);
      setLoading(false);
      return;
    } catch (error) {
      console.log(error.message);
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      return;
    }
  };
  useEffect(() => {
    checklogin();
  }, [loading]);
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        setUser,
        isAuthenticated,
        toDoTasks,
        setToDoTasks,
        doneTasks,
        setDoneTasks,
        logout,
        authError,
        setAuthError,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
