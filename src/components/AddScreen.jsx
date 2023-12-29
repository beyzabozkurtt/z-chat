import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { GroupService } from "../services/firestoreService";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddScreen = () => {
  const { data } = useContext(ChatContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showAddScreen, setShowAddScreen] = useState(false);

  const navigate = useNavigate();

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

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleCreateGroup = async () => {
    try {
      const groupId = await GroupService.createGroupCollection(groupName, selectedUsers);

      // Grup oluşturulduktan sonra sayfayı başka bir yere yönlendirme
      navigate(`/chat`);

      // Grup oluşturulduktan sonra, ekranı kapatma veya başka bir işlem yapma
      setShowAddScreen(false);
    } catch (error) {
      console.error("Grup oluşturma hatası:", error);
    }
  };

  const handleSearch = () => {
    const results = availableUsers.filter((user) =>
      user.displayName.toLowerCase().includes(userSearch.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.includes(userId) ? prevUsers.filter((id) => id !== userId) : [...prevUsers, userId]
    );
    setUserSearch("");
    setSearchResults([]);
  };

  return (
    <div>
      <h2>Grup Oluştur</h2>
      <div>
        <label>Grup Adı:</label>
        <input type="text" value={groupName} onChange={handleGroupNameChange} />
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
      <div>
        <h3>Kullanıcı Ara:</h3>
        <input
          type="text"
          placeholder="Kullanıcı adı ara"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Ara</button>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id} onClick={() => handleSelectUser(result.id)}>
              {result.displayName}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleCreateGroup}>Grup Oluştur</button>
    </div>
  );
};

export default AddScreen;
