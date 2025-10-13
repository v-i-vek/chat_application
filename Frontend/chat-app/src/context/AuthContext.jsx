import { createContext, useContext, useState } from "react";
import { login, register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const loginUser = async (userData) => {
    try {
      setLoading(true);
      const { data } = await login(userData);
      setUser(data);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const { data } = await register(userData);
      setUser(data);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
