import apiClient from "./ApiClient";

export const getAllContacts = async () => {
  try {
    return await apiClient.get("/message/contacts");
  } catch (error) {
    console.log("error ", error);
  }
};
