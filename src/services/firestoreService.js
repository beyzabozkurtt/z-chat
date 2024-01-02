// src/services/firestoreService.js

import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

import { db } from "../firebase";


export const GroupService = {
  // ... diğer fonksiyonlar
  

  getAllGroups: async () => {
    const groupsCollectionRef = collection(db, "groups");
    const groupsSnapshot = await getDocs(groupsCollectionRef);
    const groups = groupsSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
    }));
    return groups;
  },

  createGroupCollection: async (groupName, memberIds) => {
    const groupCollectionRef = collection(db, "groups");

    const docRef = await addDoc(groupCollectionRef, {
      name: groupName,
      members: memberIds,
    });

    return docRef.id;
  },

  getUserGroups: async (userId) => {
    const q = query(collection(db, "groups"), where("members", "array-contains", userId));
    const querySnapshot = await getDocs(q);
    const userGroups = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    return userGroups;
  },
};
