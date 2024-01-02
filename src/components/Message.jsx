import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatTime = (timestamp) => {
    if (!timestamp || isNaN(timestamp)) {
      return "Invalid Timestamp";
    }

    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  console.log("message:", message); // Kontrol için konsola yazdır

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* Önemli kısım burası, eğer message içindeki zaman damgası farklı bir özellikse, onu kullanmalısınız */}
        <span>{formatTime(message.date.seconds)}</span>
        {/* Eğer date nesnesinin seconds özelliği varsa bu şekilde kullanabilirsiniz, eğer başka bir şekilde saklanıyorsa buna göre ayarlayın */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;