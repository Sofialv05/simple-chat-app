export const fetchChatrooms = async () => {
  const response = await fetch(
    "https://server-divine-fire-3387.fly.dev/chatroom",
  );
  if (!response.ok) throw new Error("Failed to fetch chatrooms");
  return response.json();
};

export const fetchMessages = async (chatroomId) => {
  const response = await fetch(
    `https://server-divine-fire-3387.fly.dev/chatroom/messages/${chatroomId}`,
  );
  if (!response.ok) throw new Error("Failed to fetch messages");
  return response.json();
};

export const createChatroom = async (name) => {
  const response = await fetch(
    "https://server-divine-fire-3387.fly.dev/chatroom",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatroom: { name } }),
    },
  );
  if (!response.ok) throw new Error("Failed to create chatroom");
  return response.json();
};

export const createMessage = async (message, chatroomId, username) => {
  const response = await fetch(
    "https://server-divine-fire-3387.fly.dev/message",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: { body: message, chatroom_id: chatroomId, username },
      }),
    },
  );
  if (!response.ok) throw new Error("Failed to send message");
  return response.json();
};
