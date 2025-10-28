import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as messageService from "../services/Message";
import { useAuthContext } from "./AuthContext";
import { socket } from "../services/SocketClient";

const MessageContext = createContext();
const sortMessagesByDate = (messages) => {
  return [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
};

export const MessageProvider = ({ children }) => {
  const { user } = useAuthContext();

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      // when new message arrives -> append to end (latest)
      setMessage((prev) => sortMessagesByDate([...prev, data]));
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => socket.off("receiveMessage", handleReceiveMessage);
  }, [user?.id]);

  const [message, setMessage] = useState([]);
  const [receiverId, setReceiverId] = useState();
  const [contactsLoading, setContactsLoading] = useState(false);
  const [receiverData, setReceiverData] = useState();
  const [msgLoading, setMsgLoading] = useState(false);
  const [contacts, setContacts] = useState();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);
  const chatContainerRef = useRef(null);
  const [noMsg, setNoMsg] = useState(false);

  const getAllContacts = useCallback(async () => {
    try {
      setContactsLoading(true);
      const { data } = await messageService.getAllContacts();
      if (data.data) {
        setContacts(data.data);
      }
    } catch (error) {
      console.log("❌ Registration failed", error);
    } finally {
      setContactsLoading(false);
    }
  }, []);

  // keep behavior: page===1 -> replace, page>1 -> prepend
  const getUserMsgById = async (id, pageArg = 1, limit = 20) => {
    try {
      setMsgLoading(true);
      // set receiver id right away so UI knows which chat is active
      setReceiverId(id);
      const { data } = await messageService.getUserMsgById(id, pageArg, limit);

      if (data?.data?.length > 0) {
        if (pageArg === 1) {
          // latest messages replace
          setMessage(sortMessagesByDate(data.data));
        } else {
          // prepend older messages
          setMessage((prev) => sortMessagesByDate([...data.data, ...prev]));
        }
        setNoMsg(false);
      } else if (pageArg === 1) {
        setNoMsg(true);
      }

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setMsgLoading(false);
    }
  };

  // OPEN CHAT: reset state, fetch page 1 and scroll to bottom
  const openChat = async (userData) => {
    setMessage([]);
    setPage(1);
    setHasMore(true);
    setNoMsg(false);
    setReceiverData(userData);

    // fetch latest messages
    const res = await getUserMsgById(userData._id, 1);

    // wait for next paint(s) to ensure messages are rendered, then jump to bottom
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const container = chatContainerRef.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    });

    return res;
  };
  const handleScroll = async (id) => {
    const container = chatContainerRef.current;
    if (!container || isFetchingRef.current || !hasMore || !id) return;

    // When user reaches top (reverse scroll)
    if (container.scrollTop <= 5) {
      isFetchingRef.current = true;
      const prevScrollHeight = container.scrollHeight;

      try {
        const nextPage = page + 1;
        const moreMessages = await getUserMsgById(id, nextPage);

        if (moreMessages?.data?.length > 0) {
          // only increase page when we actually received messages
          setPage(nextPage);

          // keep the user's view stable (preserve offset)
          setTimeout(() => {
            const containerNow = chatContainerRef.current;
            if (containerNow) {
              containerNow.scrollTop =
                containerNow.scrollHeight - prevScrollHeight;
            }
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
        noMsg,
        setHasMore,
        setNoMsg,
        setPage,
        page, // expose page so home can decide auto-scroll behavior
        openChat, // <-- expose openChat
        contactsLoading,
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
