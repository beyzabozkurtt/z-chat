import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { GroupService } from "../services/firestoreService";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    const getGroups = async () => {
      const fetchedGroupNames = await GroupService.getAllGroups();
      setGroupNames(fetchedGroupNames);
    };

    currentUser.uid && getChats();
    getGroups();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleCreateGroupChat = async () => {
    try {
      const newGroupChatId = await GroupService.createGroupChat();
      console.log("New group chat ID:", newGroupChatId);

      dispatch({ type: "SET_GROUP_CHAT_ID", payload: newGroupChatId });
    } catch (error) {
      console.error("Error creating group chat:", error);
    }
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {
        const userInfo = chat[1].userInfo || {};
        return (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(userInfo)}
          >
            <img src={userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        );
      })}

      {groupNames.map((group) => (
        <div
          className="userChat"
          key={group.id}
          onClick={() => handleSelect(group)}
        >
          <div className="userChatInfo">
            <span>{group.name}</span>
          </div>
        </div>
      ))}

      
     
    </div>
  );
};

export default Chats;
