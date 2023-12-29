// src/services/groupChatService.js
import { collection, doc, addDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";


export const GroupChatService = {
  createGroupChat: async (groupId, groupName, members) => {
    try {
      // Yeni grup sohbetini oluştur
      const groupChatRef = collection(db, "groupChats");
      const docRef = await addDoc(groupChatRef, {
        groupId,
        groupName,
        members,
        messages: [], // İlk başta boş bir mesaj dizisi ekleyebilirsiniz
      });

      return docRef.id;
    } catch (error) {
      console.error("Grup sohbeti oluşturma hatası:", error);
      throw error;
    }
  },

  sendMessage: async (groupChatId, message) => {
    try {
      // Grup sohbetine yeni bir mesaj ekle
      const groupChatDocRef = doc(db, "groupChats", groupChatId);
      await updateDoc(groupChatDocRef, {
        messages: arrayUnion(message),
      });
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
      throw error;
    }
  },
};
