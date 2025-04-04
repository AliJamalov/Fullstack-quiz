import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import Store from "./pages/Store";
import Navbar from "./components/layout/Navbar";
import Arena from "./pages/Arena";
import { useAuthStore } from "./store/authStore";
import { ImSpinner9 } from "react-icons/im";
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();

  const pathsToHide = ["/quiz", "/arena"];

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

  const hideNavbar = pathsToHide.some((path) => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/store" element={<Store />} />
        <Route path="/arena" element={user ? <Arena /> : <Navigate to="/login" />} />
      </Routes>
      {!hideNavbar && <div className="sm:hidden">{user && <Navbar />}</div>}
      <Toaster />
    </div>
  );
};

export default App;
