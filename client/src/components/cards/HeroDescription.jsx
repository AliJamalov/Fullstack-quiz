import React from "react";

const HeroDescription = ({ isShowDescription, selectedHeroDescription, toggleDescription }) => {
  if (!isShowDescription) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 px-4">
      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl max-w-md mx-auto relative">
        <h2 className="text-xl font-bold text-yellow-400 mb-3">{selectedHeroDescription.name}</h2>
        <p className="text-sm">
          <span className="font-semibold text-yellow-300">Раса:</span> {selectedHeroDescription.race}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-yellow-300">Класс:</span> {selectedHeroDescription.heroClass}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-yellow-300">Редкость:</span> {selectedHeroDescription.rarity}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-yellow-300">Мифология:</span> {selectedHeroDescription.mythology}
        </p>
        <p className="text-sm font-medium italic text-gray-300 mt-2">{selectedHeroDescription.description}</p>
        <button
          onClick={toggleDescription}
          className="mt-4 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition cursor-pointer"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default HeroDescription;
