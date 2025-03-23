import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Quiz from "../components/common/Quiz";
import { axiosInstance } from "../utils/axios";

const QuizRankings = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuizes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance("/quizes");
      setQuizes(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizes();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-[50px] py-[30px]">
      <h1 className="text-2xl font-bold text-white mb-4 mt-2">Click on the quiz to see user ratings.</h1>
      {loading && <p className="text-lg font-medium text-white text-center">Loading...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {quizes?.map((quiz) => (
          <div key={quiz._id}>
            <Link to={`/leaderboard/${quiz._id}`}>
              <Quiz title={quiz?.title} description={quiz?.description} image={quiz?.image} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizRankings;
