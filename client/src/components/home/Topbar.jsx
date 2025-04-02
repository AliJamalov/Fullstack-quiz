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
import { GiBattleGear } from "react-icons/gi";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";

const Topbar = () => {
  const { user } = useAuthStore();
  const { cardNotification } = useNotificationStore();
  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link className="bg-white p-1 rounded-full sm:hidden" to={"/arena"}>
            <GiBattleGear color="purple" size={30} />
          </Link>
          <Link className="bg-white p-1 rounded-full hidden sm:block" to={"/profile"}>
            <CgProfile className="hidden sm:block" color="purple" size={30} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <PiCoinsFill color="yellow" size={30} />
          <p className="text-black text-md font-medium">{user?.coins}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to={"/arena"}>
            <GiBattleGear className="hidden sm:block" color="purple" size={30} />
          </Link>
          <Link to={"/store"}>
            <IoStorefrontSharp className="hidden sm:block" color="purple" size={30} />
          </Link>
          <Link className="relative" to={"/cards"}>
            {cardNotification !== 0 && <p className="text-green-500 absolute right-1 top-4">{cardNotification}</p>}
            <TbPlayCardStarFilled className="hidden sm:block" color="purple" size={30} />
          </Link>
          <Link to={"/leaderboard"}>
            <PiRankingFill size={30} color="purple" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
