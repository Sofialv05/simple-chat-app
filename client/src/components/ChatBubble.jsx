// import React from 'react'

export default function ChatBubble({ message }) {
  return (
    <div className="flex flex-col rounded bg-indigo-600 px-3 py-2">
      <h2 className="mb-2 text-yellow-400">username</h2>
      <p className="text-sm font-normal leading-snug text-white">{message}</p>
    </div>
  );
}