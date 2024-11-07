import { useEffect, useState } from "react";
import ChatBubble from "./components/ChatBubble";
import Chatroom from "./components/Chatroom";
import { CiSquarePlus } from "react-icons/ci";

const ws = new WebSocket("ws://localhost:3000/cable");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [uid, setUid] = useState("");
  const [chatroom, setChatroom] = useState("");
  const [chatroomId, setChatroomId] = useState();
  const [name, setName] = useState("");
  const [chatrooms, setChatrooms] = useState([]);

  ws.onopen = () => {
    console.log("Connected to websocket server");
    setUid(Math.random().toString(36).substring(2, 15));

    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          id: uid,
          channel: chatroom,
        }),
      }),
    );
  };

  // ws.onmessage = (e) => {
  //   const data = JSON.parse(e.data);
  //   if (data.type === "ping") return;
  //   if (data.type === "welcome") return;
  //   if (data.type === "confirm_subscription") return;

  //   const newMessage = data.message;
  // };

  useEffect(() => {
    fetchChatrooms();
  }, []);

  const fetchChatrooms = async () => {
    try {
      const response = await fetch("http://localhost:3000/chatroom");
      const data = await response.json();
      setChatrooms(data);
      console.log(chatrooms);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async (chatroomId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/chatroom/messages/${chatroomId}`,
      );
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeChatroom = (name, chatroomId) => {
    setChatroom(name);
    setChatroomId(chatroomId);
    fetchMessages(chatroomId);
  };

  const handleSubmitChatroom = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/chatroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatroom: { name } }),
      });
      if (response.ok) {
        const newChatroom = await response.json();
        console.log(newChatroom);
        setName("");
        fetchChatrooms();
      } else {
        console.error("Failed to create chatroom");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: { body: message, chatroom_id: chatroomId },
        }),
      });

      const newMessage = await response.json();
      console.log(newMessage);
      setMessage("");
      // fetchMessages(chatroomId)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="h-screen p-20">
      <div className="h-full rounded-lg bg-slate-200 shadow-xl">
        <div className="test flex h-full flex-col">
          <div className="flex flex-col items-center justify-center border-b-2 border-black py-4">
            <h1>Simple Chat App</h1>
            <p className="text-xs text-gray-500">UID: {uid}</p>
          </div>
          <div className="flex min-h-0 flex-1">
            <div className="flex min-h-0 w-1/4 flex-col">
              <div className="items-center justify-center border-b border-black p-1">
                <form
                  onSubmit={handleSubmitChatroom}
                  className="grid grid-cols-5"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Create chatroom"
                    className="col-span-4 bg-slate-200"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center"
                  >
                    <CiSquarePlus />
                  </button>
                </form>
              </div>
              <div className="flex-1 overflow-y-auto">
                {chatrooms.map((chatroom, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        handleChangeChatroom(chatroom.name, chatroom.id)
                      }
                    >
                      <Chatroom chatroomName={chatroom.name} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-1 flex-col border-l-2 border-black">
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => {
                    return (
                      <div key={index}>
                        <ChatBubble message={message.body} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="">
                <form className="m-2 flex gap-2" onSubmit={handleSubmitMessage}>
                  <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 rounded-md px-2"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-orange-300 px-4 py-2"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
