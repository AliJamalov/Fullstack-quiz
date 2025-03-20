import React from "react";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-[1440px] mx-auto px-[50px] py-[30px]">
      {user?.role === "admin" && (
        <Link to={"/admin"}>
          <RiAdminFill color="purple" size={30} />
        </Link>
      )}
      <div>
        <h1 className="text-2xl font-bold text-white mb-4 mt-2">Welcome to the Quiztopia</h1>
        <p className="text-sm font-medium text-white">Pick a subject to get started</p>
      </div>
    </div>
  );
};

export default Home;
