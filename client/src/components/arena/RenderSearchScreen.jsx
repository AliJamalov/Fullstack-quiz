const RenderSearchScreen = ({ battleMessage, handleBackMenu }) => (
  <div className="searching flex flex-col items-center mt-10">
    <div className="animate-bounce mb-4">
      <svg
        className="w-10 h-10 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    <p className="text-white text-lg mb-4">{battleMessage}</p>
    <button
      onClick={handleBackMenu}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg cursor-pointer"
    >
      Отменить поиск
    </button>
  </div>
);

export default RenderSearchScreen;
