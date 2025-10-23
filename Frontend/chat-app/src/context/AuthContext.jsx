import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { checkUser, login, logout, register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const didCheckRef = useRef(false);

  const [loading, setLoading] = useState(true); // start as true for initial check

  // 🔹 LOGIN
  const loginUser = async (userData) => {
    try {
      setLoading(true);
      const { data } = await login(userData);
      setUser(data.data);
      navigate("/home");
    } catch (error) {
      console.log("❌ Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 REGISTER
  const registerUser = async (userData) => {
    try {
      setLoading(true);
      await register(userData);
      navigate("/login");
    } catch (error) {
      console.log("❌ Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 CHECK USER (validate token/session)
  const isValidUser = useCallback(async () => {
    try {
      const { data } = await checkUser();
      if (data?.data) {
        setUser(data.data);
      } else {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.log("⚠️ User validation failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // LOGOUT

  const logoutUser = async () => {
    try {
      setLoading(true);
      const data = await logout();
      if (data) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Run once on mount to restore session
  useEffect(() => {
    if (didCheckRef.current) return; // 🛑 prevents multiple calls
    didCheckRef.current = true;
    isValidUser();
  }, [isValidUser]);

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        registerUser,
        user,
        isValidUser,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
