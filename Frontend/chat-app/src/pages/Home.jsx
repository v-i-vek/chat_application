import React, { useEffect, useRef } from "react";
import { ContactCard } from "../component/ContactCard";
import { ChatBox } from "../component/ChatBox";
import { useMsgContext } from "../context/MessageContext";
import { MessageInput } from "../component/MessageInput";

export const Home = () => {
  const { message, setMessage, getContacts, msgLoading, contacts } =
    useMsgContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    getContacts();
  }, []);
  if (msgLoading) return <p>loading !!!</p>;
  return (
    <>
      <div className="flex p-5 m-5 w-[75%] mx-auto h-[90vh]">
        <div className="flex w-[25%] border-1  flex-col overflow-auto  p-4 overflow-y-auto scroll-smooth">
          {contacts?.length > 0 ? (
            contacts?.map((item) => (
              <ContactCard key={item.id} name={item.name} />
            ))
          ) : (
            <p>no user found</p>
          )}
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
