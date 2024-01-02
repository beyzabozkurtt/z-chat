import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data && data.chatId) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        if (doc.exists()) {
          const messagesData = doc.data().messages || [];
          setMessages(messagesData);
        } else {
          setMessages([]);
        }
      });
  
      return () => {
        unSub();
      };
    }
  }, [data]);
  

  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;