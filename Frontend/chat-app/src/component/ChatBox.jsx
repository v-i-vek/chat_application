import React from "react";
import { useAuthContext } from "../context/AuthContext";

export const ChatBox = ({ message }) => {
  const { user, loading } = useAuthContext();

  if (!message) return <p>no data found</p>;
  if (loading) return <P>loading!!!</P>;
  return (
    <>
      {message.senderId != user.id ? (
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
