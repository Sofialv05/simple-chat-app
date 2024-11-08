// import React from 'react'

export default function ChatBubble({ message, username, isOwnMessage }) {
  return (
    <div
      className={`flex flex-col rounded px-3 py-2 ${isOwnMessage ? "bg-indigo-600" : "bg-gray-300"}`}
    >
      <h2 className="mb-2 text-yellow-400">{username}</h2>
      <p className="text-sm font-normal leading-snug text-white">{message}</p>
    </div>
  );
}
