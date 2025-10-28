import React from "react";
import { useMsgContext } from "../context/MessageContext";

export const ContactCard = ({ userDetail }) => {
  const {
    getUserMsgById,
    setReceiverData,
    receiverData,
    receiverId,
    openChat,
  } = useMsgContext();

  const user = "offline";
  function hanldeContactDetail(data) {
    openChat(data);
  }

  const isSelected = receiverId === userDetail?._id;

  return (
    <>
      <div
        onClick={() => hanldeContactDetail(userDetail)}
        className={`flex p-2 h-[12%] m-1 rounded-lg transition duration-300 ease-in-out hover:scale-105 hover:opacity-90 w-full overflow-hidden
        shadow-lg shadow-gray-900 cursor-pointer
        ${isSelected ? "bg-blue-700 border-2 border-blue-400" : "bg-gray-800"}
      `}
      >
        <div className="flex">
          <div
            className={`avatar ${
              user == "online" ? "avatar-online" : "avatar-offline"
            }`}
          >
            <div className="w-10 h-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col ml-3 my-4 justify-center">
          <p>{userDetail?.name}</p>
        </div>
      </div>
    </>
  );
};
