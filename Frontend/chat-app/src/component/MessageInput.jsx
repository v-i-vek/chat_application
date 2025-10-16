import React, { useState } from "react";
import { useMsgContext } from "../context/MessageContext";
import { socket } from "../services/SocketClient";

export const MessageInput = () => {
  const { message, setMessage } = useMsgContext();

  const [text, setText] = useState({
    id: "68ebd91b797d2bd22794f315",
    text: "",
  });
  function handleSendMsg(e) {
    e.preventDefault();
    if (!text.text.trim()) return;
    socket.emit("message", text.text);
    setMessage([...message, text]);
    setText({
      id: "68ebd91b797d2bd22794f315", // keep or regenerate id if needed
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
            onChange={(e) => setText({ ...text, text: e.target.value })}
          />
        </fieldset>
      </form>
    </>
  );
};
