import { createContext, useContext, useState } from "react";
import { login } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const loginUser = async (userData) => {
    try {
      setLoading(true);
      const { data } = await login(userData);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
