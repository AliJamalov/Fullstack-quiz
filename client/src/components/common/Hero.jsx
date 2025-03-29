import React from "react";
import { useLocation } from "react-router-dom";

const Hero = ({ name, image, level, health, attack, defense, heroClass, race, rarity }) => {
  const location = useLocation();

  const isCardsPage = location.pathname.startsWith("/cards");

  return (
    <div className="relative bg-gray-900 text-white p-2 rounded-lg shadow-md border-2 border-yellow-500 max-w-50 mx-auto text-center text-xs">
      {/* Заголовок карты */}
      <h2 className="text-sm font-bold text-yellow-400">{name}</h2>

      {/* Изображение */}
      <div className="mt-2">
        <img src={image} alt={name} className="w-full h-35 object-cover rounded-md border border-yellow-400" />
      </div>

      {/* Основная информация */}
      {isCardsPage && (
        <div className="mt-2">
          <p className="text-yellow-300 font-semibold">
            Класс: <span className="text-white">{heroClass}</span>
          </p>
          <p className="text-yellow-300 font-semibold">
            Раса: <span className="text-white">{race}</span>
          </p>
          <p className="text-yellow-300 font-semibold">
            Редкость: <span className="text-white">{rarity}</span>
          </p>
        </div>
      )}

      {/* Характеристики */}
      <div className="mt-2 grid grid-cols-2 gap-1 text-center">
        <p className="bg-yellow-600 px-1 py-0.5 rounded-md font-bold">Lv: {level}</p>
        <p className="bg-red-600 px-1 py-0.5 rounded-md font-bold">HP: {health}</p>
        <p className="bg-blue-600 px-1 py-0.5 rounded-md font-bold">ATK: {attack}</p>
        <p className="bg-green-600 px-1 py-0.5 rounded-md font-bold">DEF: {defense}</p>
      </div>
    </div>
  );
};

export default Hero;
