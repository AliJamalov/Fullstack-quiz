import React from "react";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { PiCoinsFill } from "react-icons/pi";
import { GiLevelThree } from "react-icons/gi";
import { GiFrankensteinCreature } from "react-icons/gi";
import { IoStorefrontSharp } from "react-icons/io5";
import { TbPlayCardStarFilled } from "react-icons/tb";
import { PiRankingFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { useAuthStore } from "../../store/authStore";

const Topbar = () => {
  const { user } = useAuthStore();
  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GiLevelThree color="purple" size={30} />
          <p className="text-white text-md font-medium">Level: {user?.level}</p>
          <Link to={"/profile"}>
            <CgProfile className="hidden sm:block" color="purple" size={30} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <PiCoinsFill color="yellow" size={30} />
          <p className="text-black text-md font-medium">{user?.coins}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to={"/cards"}>
            <TbPlayCardStarFilled className="hidden sm:block" color="purple" size={30} />
          </Link>
          <Link to={"/leaderboard"}>
            <PiRankingFill size={30} color="red" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
