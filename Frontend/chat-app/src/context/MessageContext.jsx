import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

// message={
//     id:"fasfsafasfas",
//     text:"hi ",
//     time:Date.now()
// }

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState([
    {
      id: "fasfsafasfas",
      text: "hi ",
      // time: Date.now(),
    },
    {
      id: "68ebd91b797d2bd22794f315",
      text: "hello",
    },
  ]);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMsgContext = () => {
  const context = useContext(MessageContext);
  return context;
};
