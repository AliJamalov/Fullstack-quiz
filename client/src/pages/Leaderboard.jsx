import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import Table from "../components/leaderboard/Table";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboardByQuiz = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/results/${quizId}`);
      setLeaderboard(response.data.sort((a, b) => b.score - a.score));
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardByQuiz();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4 text-pink-500 uppercase tracking-wider">Leaderboard</h1>

      <p className="font-medium text-md text-center mb-4">Quiz: {leaderboard[0]?.quizId?.title}</p>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-48">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300">Loading results...</p>
        </div>
      ) : (
        <>
          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400 italic">No results for this quiz yet</p>
            </div>
          ) : (
            <Table leaderboard={leaderboard} />
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
