import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/authStore";
import { ImSpinner9 } from "react-icons/im";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, checkingAuthLoading, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuthLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ImSpinner9 size={35} className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
