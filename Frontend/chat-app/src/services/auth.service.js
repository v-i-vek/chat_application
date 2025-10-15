import apiClient from "./ApiClient";

export const login = async (data) => {
  try {
    return await apiClient.post("/login", data);
  } catch (error) {
    console.log("error ", error);
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post("/register", data);
  } catch (error) {
    console.log("error ", error);
  }
};
export const checkUser = async () => {
  try {
    return await apiClient.get("/check-user");
  } catch (error) {
    console.log("error", error);
  }
};
