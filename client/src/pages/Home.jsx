import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { PiRankingFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from "../store/authStore";
import { axiosInstance } from "../utils/axios";
import Quiz from "../components/common/Quiz";

const Home = () => {
  const { user, logout } = useAuthStore();

  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuizes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance("/quizes");
      setQuizes(response.data);
    } catch (error) {
      console.error(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizes();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-[50px] py-[30px]">
      <div className="flex justify-between items-center">
        {user?.role === "admin" && (
          <Link to={"/admin"}>
            <RiAdminFill color="purple" size={30} />
          </Link>
        )}
        <Link to={"/quiz-rankings"} className="flex items-center gap-2">
          <p className="font-medium text-md text-white">see quiz rankings</p>
          <PiRankingFill size={30} color="yellow" />
        </Link>
        <MdLogout onClick={logout} color="white" size={25} className="cursor-pointer" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white mb-4 mt-2">Welcome to the Quiztopia</h1>
        <p className="text-sm font-medium text-white">Pick a subject to get started</p>
        {loading && <p className="text-lg font-medium text-white text-center">Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {quizes?.map((quiz) => (
            <div key={quiz._id}>
              <Link to={`/quiz/${quiz._id}`}>
                <Quiz title={quiz?.title} description={quiz?.description} image={quiz?.image} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
