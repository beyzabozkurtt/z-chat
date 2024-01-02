// src/pages/CreateGroup.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { GroupService } from "../services/firestoreService"; // Grup servisini ekledim

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const users = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAvailableUsers(users);
    };

    fetchUsers();
  }, []);

  const handleUserToggle = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.includes(userId) ? prevUsers.filter((id) => id !== userId) : [...prevUsers, userId]
    );
  };

  const handleCreateGroup = async () => {
    try {
      // Seçilen katılımcıları kullanarak grup oluşturma işlemlerini gerçekleştir
      console.log("Seçilen Katılımcılar:", selectedUsers);

      // Grup oluşturulduktan sonra sayfayı başka bir yere yönlendirme veya başka bir işlem yapma
      const groupId = await GroupService.createGroupCollection(groupName, selectedUsers);
      console.log("Grup oluşturuldu, ID:", groupId);

      // Örnek: Grup oluşturulduktan sonra anasayfaya yönlendirme
      // history.push("/");
    } catch (error) {
      console.error("Grup oluşturma hatası:", error);
    }
  };

  return (
    <div>
      <h2>Grup Oluştur</h2>
      <div>
        <label>Grup Adı:</label>
        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      </div>
      <div>
        <h3>Katılımcılar:</h3>
        <ul>
          {availableUsers.map((user) => (
            <li key={user.id} onClick={() => handleUserToggle(user.id)}>
              {user.displayName} {selectedUsers.includes(user.id) ? "(Seçili)" : ""}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleCreateGroup}>Grup Oluştur</button>
    </div>
  );
};

export default CreateGroup;
