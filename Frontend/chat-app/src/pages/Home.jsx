import React, { useEffect, useRef } from "react";
import { ContactCard } from "../component/ContactCard";
import { ChatBox } from "../component/ChatBox";
import { useMsgContext } from "../context/MessageContext";
import { MessageInput } from "../component/MessageInput";

const arr = [1, 2, 3, 4, 5, 6];
export const Home = () => {
  const { message, setMessage } = useMsgContext();
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div className="flex p-5 m-5 w-[75%] mx-auto h-[90vh]">
        <div className="flex w-[25%]  h-full flex-wrap overflow-auto  p-4 rounded-2xl ">
          {arr.map((item) => (
            <ContactCard key={item} />
          ))}
        </div>
        <div className="flex w-full flex-col">
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
