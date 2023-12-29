// src/App.js
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { AddScreenProvider } from "./context/AddScreenContext";
import "./style.scss";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateGroup from "./pages/CreateGroup"; // Yeni eklenen dosya

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <AddScreenProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-group" element={<CreateGroup />} /> {/* Yeni eklenen rota */}
        </Routes>
      </AddScreenProvider>
    </BrowserRouter>
  );
}

export default App;
