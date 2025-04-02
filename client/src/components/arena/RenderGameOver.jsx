import { useNavigate } from "react-router-dom";

const RenderGameOver = ({ winner, battleMessage, handleBackMenu }) => {
  const navigate = useNavigate();

  return (
    <div className="game-over flex flex-col items-center mt-10">
      <h2 className="text-2xl text-white mb-4">{winner}</h2>
      <p className="text-white mb-6">{battleMessage}</p>
      <div className="flex gap-4">
        <button
          onClick={handleBackMenu}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer"
        >
          Играть снова
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/cards")}
        >
          К колоде
        </button>
      </div>
    </div>
  );
};

export default RenderGameOver;
