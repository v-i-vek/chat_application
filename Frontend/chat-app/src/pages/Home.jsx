import React, { useEffect, useRef } from "react";
import { ContactCard } from "../component/ContactCard";
import { ChatBox } from "../component/ChatBox";
import { useMsgContext } from "../context/MessageContext";
import { MessageInput } from "../component/MessageInput";
import { socket } from "../services/SocketClient";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 12, 32, 34, 54, 65, 77, 43];
export const Home = () => {
  const { message, setMessage } = useMsgContext();
  const messagesEndRef = useRef(null);

  const sockets = socket;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div className="flex p-5 m-5 w-[75%] mx-auto h-[90vh]">
        <div className="flex w-[25%] border-1  flex-wrap overflow-auto  p-2 overflow-y-auto scroll-smooth">
          {arr.map((item) => (
            <ContactCard key={item} />
          ))}
        </div>
        <div className="flex w-full  flex-col">
          <div className="w-full border-t flex grow flex-col overflow-y-auto scroll-smooth justify-end-safe p-3 ">
            {message.length > 0 &&
              message.map((item) => <ChatBox key={item.id} message={item} />)}
            <div ref={messagesEndRef} />
          </div>
          <div className="">
            <MessageInput />
          </div>
        </div>
      </div>
    </>
  );
};
