import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import { Link } from "react-router-dom";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
      <Chats/>
      <Link to="/create-group">Grup Oluştur</Link>
    </div>
  );
};







export default Sidebar;