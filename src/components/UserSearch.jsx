// src/components/UserSearch.jsx

import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const UserSearch = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      const q = query(
        collection(db, "users"),
        where("displayName", ">=", searchTerm),
        where("displayName", "<=", searchTerm + "\uf8ff")
      );

      try {
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setSearchResults(users);
      } catch (error) {
        console.error("Kullanıcı arama hatası:", error);
      }
    };

    searchUsers();
  }, [searchTerm]);

  return (
    <div>
      <h2>Kullanıcı Ara</h2>
      <input
        type="text"
        placeholder="Kullanıcı adı ara"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {searchResults.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.displayName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
