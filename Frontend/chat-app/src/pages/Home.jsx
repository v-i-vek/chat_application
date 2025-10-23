import React, { useEffect, useRef } from "react";
import { ContactCard } from "../component/ContactCard";
import { ChatBox } from "../component/ChatBox";
import { useMsgContext } from "../context/MessageContext";
import { MessageInput } from "../component/MessageInput";
import { socket } from "../services/SocketClient";
import { useAuthContext } from "../context/AuthContext";

export const Home = () => {
  const {
    message,
    setMessage,
    getAllContacts,
    msgLoading,
    contacts,
    receiverData,
  } = useMsgContext();

  const { user } = useAuthContext();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  useEffect(() => {
    socket.on("onlineUsers", (data) => {});
    getAllContacts();
  }, []);

  console.log("receiverData===", receiverData);
  if (msgLoading) return <p>loading !!!</p>;
  return (
    <>
      <div className="flex p-5 m-5 w-[75%] mx-auto h-[90vh]">
        <div className="flex w-[25%] border-1  flex-col overflow-auto  p-4 overflow-y-auto scroll-smooth">
          <div className="flex bg-gray-400 border-1 rounded-lg ">
            <div className="">
              <img
                className="w-15 rounded-full"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                alt=""
              />
            </div>
            <div className="p-3">{user?.name}</div>
          </div>
          {contacts?.length > 0 ? (
            contacts?.map((item, index) => (
              <ContactCard key={index} userDetail={item} />
            ))
          ) : (
            <p>no user found</p>
          )}
        </div>
        <div className="flex w-full  flex-col">
          <div className="flex border-t-1 p-3 ">
            <div className="avatar h-15 ">
              <img
                src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp"
                alt=""
                className="w-10  rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold ml-4">
                {receiverData ? receiverData.name : "Select a contact"}
              </p>
              <p className="text-lg font-semibold ml-4">
                {receiverData ? receiverData.email : "Select a contact"}
              </p>
            </div>
          </div>
          <div className="w-full border-t flex grow flex-col overflow-y-auto scroll-smooth justify-end-safe p-3 ">
            {message.length > 0 &&
              message.map((item, index) => (
                <ChatBox key={index} message={item} />
              ))}

            <div ref={messagesEndRef} />
          </div>
          <div>
            <MessageInput />
          </div>
        </div>
      </div>
    </>
  );
};
