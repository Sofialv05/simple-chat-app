import { useEffect, useState } from "react";

const useWebSocket = (url, setMessages) => {
  const [uid, setUid] = useState("");

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("Connected to websocket server");
      const newUid = Math.random().toString(36).substring(2, 15);
      setUid(newUid);

      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: newUid,
            channel: "ChatChannel",
          }),
        }),
      );
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (
        !["ping", "welcome", "confirm_subscription"].includes(data.type) &&
        data.message
      ) {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    ws.onclose = () => {
      ws.send(
        JSON.stringify({
          command: "unsubscribe",
          identifier: JSON.stringify({
            id: uid,
            channel: "ChatChannel",
          }),
        }),
      );
    };

    return () => ws.close();
  }, [url]);

  return uid;
};

export default useWebSocket;
