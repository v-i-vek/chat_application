import React, { useState } from "react";
import { useMsgContext } from "../context/MessageContext";
import { socket } from "../services/SocketClient";
import { useAuthContext } from "../context/AuthContext";

export const MessageInput = () => {
  const { message, setMessage, receiverId } = useMsgContext();
  const { user } = useAuthContext();
  const [text, setText] = useState({
    senderId: user.id,
    text: "",
    receiverId: "",
  });
  function handleSendMsg(e) {
    e.preventDefault();
    if (!text.text.trim()) return;

    const newMessage = {
      senderId: user.id,
      receiverId,
      text: text.text,
    };

    socket.emit("sendMessage", newMessage);

    setMessage((prev) => [...prev, newMessage]);
    setText({
      senderId: user.id, // keep or regenerate id if needed
      text: "",
    });
  }
  return (
    <>
      <form onSubmit={handleSendMsg}>
        <fieldset className="fieldset p-4">
          <input
            type="text"
            className="input w-full "
            placeholder="My awesome page"
            value={text.text}
            onChange={(e) =>
              setText({ ...text, receiverId: receiverId, text: e.target.value })
            }
          />
        </fieldset>
      </form>
    </>
  );
};
