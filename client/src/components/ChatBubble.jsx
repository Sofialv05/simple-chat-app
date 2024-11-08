// import React from 'react'

export default function ChatBubble({ message, username, isOwnMessage }) {
  return (
    <div
      className={`flex flex-col rounded px-3 py-2 ${isOwnMessage ? "ml-28 bg-indigo-600" : "mr-28 bg-gray-300"}`}
    >
      <h2
        className={`mb-2 ${isOwnMessage ? "text-yellow-400" : "text-indigo-600"}`}
      >
        {username}
      </h2>
      <p
        className={`text-sm font-normal leading-snug ${isOwnMessage ? "text-white" : ""}`}
      >
        {message}
      </p>
    </div>
  );
}
