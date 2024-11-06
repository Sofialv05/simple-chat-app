import ChatBubble from "./components/ChatBubble";
import Chatroom from "./components/Chatroom";

export default function App() {
  return (
    <main className="h-screen p-20">
      <div className="h-full rounded-lg bg-slate-200 shadow-xl">
        <div className="test flex h-full flex-col">
          <div className="flex items-center justify-center border-b-2 border-black py-4">
            <h1>Simple Chat App</h1>
          </div>
          <div className="flex min-h-0 flex-1">
            <div className="flex min-h-0 w-1/4 flex-col">
              <div className="flex-1 overflow-y-auto">
                <Chatroom />
                <Chatroom />
                <Chatroom />
                <Chatroom />
                <Chatroom />
                <Chatroom />
                <Chatroom />
                <Chatroom />
              </div>
            </div>
            <div className="flex flex-1 flex-col border-l-2 border-black">
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <ChatBubble />
                  <ChatBubble />
                  <ChatBubble />
                  <ChatBubble />
                  <ChatBubble />
                  <ChatBubble />
                  <ChatBubble />
                  <ChatBubble />
                  <ChatBubble />
                  <ChatBubble />
                </div>
              </div>
              <div className="">
                <form className="m-2 flex gap-2">
                  <input
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
