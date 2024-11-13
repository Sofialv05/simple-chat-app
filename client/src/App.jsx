import { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import Chatroom from "./components/Chatroom";
import { CiCirclePlus } from "react-icons/ci";
import useWebSocket from "./hooks/useWebsocket.js";

import {
  fetchChatrooms,
  fetchMessages,
  createChatroom,
  createMessage,
} from "./services/api";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatroomId, setChatroomId] = useState(null);
  const [name, setName] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const messagesContainer = useRef(null);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");

  const uid = useWebSocket(
    "wss://server-divine-fire-3387.fly.dev/cable",
    setMessages,
  );

  useEffect(() => {
    loadChatrooms();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatrooms = async () => {
    try {
      const data = await fetchChatrooms();
      setChatrooms(data);
    } catch (err) {
      console.error("Error fetching chatrooms:", err);
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (user.trim()) {
      setUsername(user);
    }
  };

  const loadMessages = async (id) => {
    try {
      const data = await fetchMessages(id);
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleChangeChatroom = (id) => {
    setChatroomId(id);
    loadMessages(id);
  };

  const handleCreateChatroom = async (e) => {
    e.preventDefault();
    try {
      await createChatroom(name);
      setName("");
      loadChatrooms();
    } catch (err) {
      console.error("Failed to create chatroom:", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await createMessage(message, chatroomId, username);
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
    }
  };

  return (
    <main className="h-screen bg-slate-200 p-20 font-Montserrat">
      <div className="h-full rounded-lg bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          <header className="flex flex-col items-center justify-center py-4">
            <h1 className="text-2xl font-bold text-gray-700">
              Simple Chat App
            </h1>
            <p className="text-sm text-gray-500">username: {username}</p>
          </header>
          {!username ? (
            <div className="flex h-full w-full items-center justify-center">
              <form
                onSubmit={handleUsernameSubmit}
                className="flex flex-col items-center gap-4"
              >
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Enter your username"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />

                <button
                  type="submit"
                  className="w-full rounded bg-indigo-600 p-2 text-white hover:bg-indigo-500"
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 gap-4 px-4 pb-4">
              <aside className="flex min-h-0 w-1/4 flex-col">
                <div className="items-center justify-center p-1">
                  <form onSubmit={handleCreateChatroom} className="flex gap-1">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Create chatroom"
                      className="flex-1 border-b-2 border-slate-200 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-1 rounded-md bg-indigo-600 px-2 py-1 text-sm text-white"
                    >
                      Add{" "}
                      <span className="text-md">
                        <CiCirclePlus />
                      </span>
                    </button>
                  </form>
                </div>
                <div className="mt-2 flex-1 overflow-y-auto">
                  {chatrooms.map((chatroom) => (
                    <div
                      key={chatroom.id}
                      onClick={() => handleChangeChatroom(chatroom.id)}
                    >
                      <Chatroom
                        chatroomName={chatroom.name}
                        isCurrentChatroom={chatroom.id === chatroomId}
                      />
                    </div>
                  ))}
                </div>
              </aside>
              {!chatroomId ? (
                <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-200 text-2xl text-gray-500">
                  Join or create a chatroom before chatting
                </div>
              ) : (
                <section className="flex flex-1 flex-col rounded-xl bg-slate-200">
                  <div
                    ref={messagesContainer}
                    className="flex flex-1 flex-col gap-4 overflow-y-auto p-4"
                  >
                    {messages.map((message) => (
                      <ChatBubble
                        key={message.id}
                        message={message.body}
                        username={message.username}
                        isOwnMessage={message.username === username}
                      />
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="m-2 flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message"
                      className="flex-1 rounded-lg px-2 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-md bg-orange-300 px-4 py-2 text-white hover:bg-orange-200"
                    >
                      Send
                    </button>
                  </form>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
