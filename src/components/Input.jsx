import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data, dispatch } = useContext(ChatContext);

  const handleSend = async () => {
    if (!data || !data.chatId) {
      console.error("data.chatId is null or undefined");
      return;
    }

    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Error during image upload:", error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

              // Null check added for img before using it
              const imgData = downloadURL ? { img: downloadURL } : {};

              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  ...imgData,
                }),
              });
            } catch (error) {
              console.error("Error updating document with image URL:", error);
            }
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      const userChatDocRef = doc(db, "userChats", currentUser.uid);
      const userChatDocSnapshot = await getDoc(userChatDocRef);
      const userChatData = userChatDocSnapshot.data();

      if (userChatData && userChatData[data.chatId]) {
        await updateDoc(userChatDocRef, {
          [data.chatId + ".lastMessage.text"]: text,
          [data.chatId + ".date"]: serverTimestamp(),
        });
      }

      const recipientChatDocRef = doc(db, "userChats", data.user.uid);
      const recipientChatDocSnapshot = await getDoc(recipientChatDocRef);
      const recipientChatData = recipientChatDocSnapshot.data();

      if (recipientChatData && recipientChatData[data.chatId]) {
        await updateDoc(recipientChatDocRef, {
          [data.chatId + ".lastMessage.text"]: text,
          [data.chatId + ".date"]: serverTimestamp(),
        });
      }

      setText("");
      setImg(null);
    } catch (error) {
      console.error("Error during handleSend:", error);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
