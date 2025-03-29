import React from "react";
import { NavLink } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoStorefrontSharp } from "react-icons/io5";
import { TbPlayCardStarFilled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600 ${
              isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
            }`
          }
        >
          <FaMapMarkedAlt size={25} color="purple" />
          <span className="text-sm">Home</span>
        </NavLink>
        <NavLink
          to="store"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center px-5 border-e border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600 ${
              isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
            }`
          }
        >
          <IoStorefrontSharp size={25} color="purple" />
          <span className="text-sm">Store</span>
        </NavLink>
        <NavLink
          to="/cards"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
              isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
            }`
          }
        >
          <TbPlayCardStarFilled size={25} color="purple" />
          <span className="text-sm">Cards</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `inline-flex flex-col items-center justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600 ${
              isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
            }`
          }
        >
          <CgProfile size={25} color="purple" />
          <span className="text-sm">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
