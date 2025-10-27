import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import apiClient from "../services/ApiClient";
import * as messageService from "../services/Message";
import { useAuthContext } from "./AuthContext";
import { socket } from "../services/SocketClient";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const { user } = useAuthContext();

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessage((prev) => [...prev, data]);
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [user?.id]);

  const [message, setMessage] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [receiverData, setReceiverData] = useState();
  const [msgLoading, setMsgLoading] = useState(false);
  const [contacts, setContacts] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);
  const chatContainerRef = useRef(null);

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

  const getUserMsgById = async (id, page = 1, limit = 20) => {
    try {
      setMsgLoading(true);
      setReceiverId(id);
      const { data } = await messageService.getUserMsgById(id, page, limit);
      if (data?.data?.length > 0) {
        setMessage((p) => [...data.data, ...p]);
      } else {
        setMessage([]);
      }
      return data;
    } catch (error) {
      console.log(error);
      setMessage([]);
    } finally {
      setMsgLoading(false);
    }
  };

  const handleScroll = async (id) => {
    console.log("called");
    const container = chatContainerRef.current;
    if (!container || isFetchingRef.current || !hasMore) return;
    //when scrolled at top
    if (container.scrollTop < 800) {
      isFetchingRef.current = true;
      const prevScrollHeight = container.scrollHeight;
      try {
        const moreMessages = await getUserMsgById(id, page + 1);
        console.log(moreMessages);
        if (moreMessages.data.length > 0) {
          setPage((p) => p + 1);
          setTimeout(() => {
            container.scrollTop = container.scrollHeight - prevScrollHeight;
          }, 0);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        isFetchingRef.current = false;
      }
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
        chatContainerRef,
        handleScroll,
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
