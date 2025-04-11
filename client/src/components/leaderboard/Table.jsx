import React from "react";
import { useAuthStore } from "../../store/authStore";

const Table = ({ leaderboard }) => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="overflow-x-auto rounded-lg shadow-2xl ring-1 ring-white/20 backdrop-blur-sm bg-white/10">
        <table className="w-full border-collapse text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 text-cyan-200 font-semibold uppercase text-sm tracking-wider">Rank</th>
              <th className="p-4 text-cyan-200 font-semibold uppercase text-sm tracking-wider">Player</th>
              <th className="p-4 text-cyan-200 font-semibold uppercase text-sm tracking-wider">Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr
                className={`${
                  user?._id === entry._id ? "bg-indigo-700/60" : "hover:bg-white/10 transition duration-200"
                }`}
                key={entry._id || index}
              >
                <td className="p-4 border-b border-white/20 text-center font-bold">
                  <span className="inline-flex items-center">
                    {index === 0 || index === 1 || index === 2 ? null : index + 1}
                    {index === 0 && <span className="ml-2 text-xl">🏆</span>}
                    {index === 1 && <span className="ml-2 text-xl">🥈</span>}
                    {index === 2 && <span className="ml-2 text-xl">🥉</span>}
                  </span>
                </td>
                <td className="p-4 border-b border-white/20 font-medium text-center">{entry?.username}</td>
                <td className="p-4 border-b border-white/20 font-bold text-green-300 text-center">
                  {entry?.wins} wins
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
