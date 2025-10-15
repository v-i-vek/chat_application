import React from "react";

export const ContactCard = ({ name }) => {
  const user = "offline";
  return (
    <>
      <div className="flex p-2 h-[12%] bg-gray-800 shadow-lg shadow-gray-9 m-1 rounded-lg transition duration-300 ease-in-out hover:scale-105 hover:opacity-90 w-full overflow-hidden  ">
        <div className="flex">
          <div
            className={`avatar ${
              user == "online" ? "avatar-online" : "avatar-offline"
            }`}
          >
            <div className="w-15 h-15 rounded-full">
              <img
                src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col ml-3 my-4">
          <p>{name}</p>
        </div>
      </div>
    </>
  );
};
