import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import apiClient from "../services/ApiClient";
import * as messageService from "../services/Message";
import { useAuthContext } from "./AuthContext";
import { socket } from "../services/SocketClient";

const MessageContext = createContext();

// message={
//     id:"fasfsafasfas",
//     text:"hi ",
//     time:Date.now()
// }

export const MessageProvider = ({ children }) => {
  const { user } = useAuthContext();

  useEffect(() => {
    socket.off("receiveMessage");
    socket.on("receiveMessage", (data) => {
      setMessage((prev) => [...prev, data]);

      return () => socket.off("receiveMessage");
    });
  }, [user?.id]);

  const [message, setMessage] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [receiverData, setReceiverData] = useState();
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
      setReceiverId(id);
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
        receiverId,
        setReceiverData,
        receiverData,
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
