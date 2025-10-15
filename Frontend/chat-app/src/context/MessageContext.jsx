import { createContext, useCallback, useContext, useState } from "react";
import apiClient from "../services/ApiClient";
import { getAllContacts } from "../services/Message";

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

  const getContacts = useCallback(async () => {
    try {
      setMsgLoading(true);
      const { data } = await getAllContacts();
      if (data.data) {
        setContacts(data.data);
      }
    } catch (error) {
      console.log("❌ Registration failed", error);
    } finally {
      setMsgLoading(false);
    }
  }, []);

  return (
    <MessageContext.Provider
      value={{ message, setMessage, getContacts, contacts, msgLoading }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMsgContext = () => {
  const context = useContext(MessageContext);
  return context;
};
