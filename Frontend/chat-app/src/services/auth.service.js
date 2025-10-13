import apiClient from "./ApiClient";

export const login = async (data) => {
  try {
    return await apiClient.post("/login", data);
  } catch (error) {
    console.log("error ", error);
  }
};
