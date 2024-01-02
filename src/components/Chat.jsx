// src/components/Chat.jsx
import React, { useContext, useState } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { useAddScreenContext } from "../context/AddScreenContext"; // AddScreenContext ekledik

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { setShowAddScreen } = useAddScreenContext(); // setShowAddScreen ekledik

  const handleAddClick = () => {
    setShowAddScreen(true); // AddScreen'i göster
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" onClick={handleAddClick} />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
