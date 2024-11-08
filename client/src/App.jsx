// App.js
import { useEffect, useRef, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import Chatroom from "./components/Chatroom";
import { CiSquarePlus } from "react-icons/ci";
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

  const uid = useWebSocket("ws://localhost:3000/cable", setMessages);

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
    <main className="h-screen p-20">
      <div className="h-full rounded-lg bg-slate-200 shadow-xl">
        <div className="flex h-full flex-col">
          <header className="flex flex-col items-center justify-center border-b-2 border-black py-4">
            <h1>Simple Chat App</h1>
            <p className="text-xs text-gray-500">username: {username}</p>
          </header>
          {!username ? (
            <div>
              <form onSubmit={handleUsernameSubmit}>
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Enter your username"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1">
              <aside className="w-1/4 border-r border-black">
                <form
                  onSubmit={handleCreateChatroom}
                  className="flex gap-1 p-1"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Create chatroom"
                    className="flex-1 bg-slate-200"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center"
                  >
                    <CiSquarePlus />
                  </button>
                </form>
                <div className="overflow-y-auto">
                  {chatrooms.map((chatroom) => (
                    <div
                      key={chatroom.id}
                      onClick={() => handleChangeChatroom(chatroom.id)}
                    >
                      <Chatroom chatroomName={chatroom.name} />
                    </div>
                  ))}
                </div>
              </aside>
              <section className="flex flex-1 flex-col">
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
                    className="flex-1 rounded-md px-2"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-orange-300 px-4 py-2"
                  >
                    Send
                  </button>
                </form>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
