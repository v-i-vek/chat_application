import React from "react";

const loginUser = "68ebd91b797d2bd22794f315";
const receiver = "68ec90dc764b42a51dc019ca";
export const ChatBox = ({ message }) => {
  if (!message) return <p>no data found</p>;

  return (
    <>
      {message.id !== loginUser ? (
        <div className="chat chat-start">
          <div className="chat-bubble">{message.text}</div>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-bubble">{message.text}</div>
        </div>
      )}
    </>
  );
};
