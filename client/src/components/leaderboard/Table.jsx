import React from "react";
import { useAuthStore } from "../../store/authStore";

const Table = ({ leaderboard }) => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead className="bg-blue-800">
            <tr>
              <th className="p-4 text-pink-400 font-semibold uppercase text-sm tracking-wider">Rank</th>
              <th className="p-4  text-pink-400 font-semibold uppercase text-sm tracking-wider">Player</th>
              <th className="p-4  text-pink-400 font-semibold uppercase text-sm tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr className={`${user?._id === entry?.userId?._id ? "bg-violet-800" : null}`} key={entry._id || index}>
                <td className="p-4 border-b border-blue-700 text-center font-bold">
                  <span className="inline-flex items-center">
                    {index === 0 || index === 1 || index === 2 ? null : index + 1}
                    {index === 0 && <span className="ml-2 text-xl">🏆</span>}
                    {index === 1 && <span className="ml-2 text-xl">🥈</span>}
                    {index === 2 && <span className="ml-2 text-xl">🥉</span>}
                  </span>
                </td>
                <td className="p-4 border-b border-blue-700 font-medium text-center">{entry?.userId?.username}</td>
                <td className="p-4 border-b border-blue-700 font-bold text-green-400 text-center">
                  {entry?.score} score
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
