import { createContext, useCallback, useContext, useState } from "react";
import apiClient from "../services/ApiClient";
import * as messageService from "../services/Message";

const MessageContext = createContext();

// message={
//     id:"fasfsafasfas",
//     text:"hi ",
//     time:Date.now()
// }

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState([
    {
      id: "fasfsafasfas",
      text: "hi ",
      // time: Date.now(),
    },
    {
      id: "68ebd91b797d2bd22794f315",
      text: "hello",
    },
  ]);

  const [msgLoading, setMsgLoading] = useState(false);
  const [contacts, setContacts] = useState();

  const getAllContacts = useCallback(async () => {
    try {
      setMsgLoading(true);
      const { data } = await messageService.getAllContacts();
      if (data.data) {
        setContacts(data.data);
      }
    } catch (error) {
      console.log("❌ Registration failed", error);
    } finally {
      setMsgLoading(false);
    }
  }, []);

  const getUserMsgById = async (id) => {
    try {
      setMsgLoading(true);
      const { data } = await messageService.getUserMsgById(id);
      if (data?.data?.length > 0) {
        setMessage(data.data);
      } else {
        setMessage("");
      }
    } catch (error) {
      console.log(error);
      setMessage("");
    } finally {
      setMsgLoading(false);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        getAllContacts,
        contacts,
        msgLoading,
        getUserMsgById,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMsgContext = () => {
  const context = useContext(MessageContext);
  return context;
};
