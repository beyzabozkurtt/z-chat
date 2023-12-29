// GroupService.js
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

const createGroupCollection = async (groupName, members) => {
  try {
    // Belgeyi sorgula
    const q = query(collection(db, "groups"), where("groupName", "==", groupName));
    const querySnapshot = await getDocs(q);

    // Belge var mı kontrol et
    if (querySnapshot.size === 0) {
      // Belge yoksa oluştur
      const groupRef = await addDoc(collection(db, "groups"), {
        groupName,
        members,
      });

      return groupRef.id;
    } else {
      // Belge varsa hatayı fırlat
      throw new Error("Belirtilen isimde zaten bir grup bulunmaktadır.");
    }
  } catch (error) {
    console.error("Grup oluşturma hatası:", error);
    throw error;
  }
};

export { createGroupCollection };
