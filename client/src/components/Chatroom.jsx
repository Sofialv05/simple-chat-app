// import React from "react";

export default function Chatroom({ chatroomName, isCurrentChatroom }) {
  return (
    <div
      className={`flex items-center justify-center border-b border-slate-300 py-4 text-gray-700 ${isCurrentChatroom ? "rounded-sm bg-slate-200" : "bg-white"}`}
    >
      {chatroomName}
    </div>
  );
}
