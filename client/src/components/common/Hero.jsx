import React from "react";

const Hero = ({ name, image, level, health, attack, defense }) => {
  return (
    <div className="relative bg-gray-900 text-white p-2 rounded-lg shadow-md border-2 border-yellow-500 w-37 md:w-45 mx-auto text-center text-xs">
      {/* Заголовок карты */}
      <h2 className="text-sm font-bold text-yellow-400">{name}</h2>

      {/* Изображение */}
      <div className="mt-2">
        <img src={image} alt={name} className="w-full h-27 md:h-35 object-cover rounded-md border border-yellow-400" />
      </div>

      {/* Характеристики */}
      <div className="mt-2 grid grid-cols-2 gap-1 text-center">
        <p className="bg-yellow-600 px-1 py-0.5 rounded-md font-medium text-xs">Lv: {level}</p>
        <p className="bg-red-600 px-1 py-0.5 rounded-md font-medium text-xs">HP: {health}</p>
        <p className="bg-blue-600 px-1 py-0.5 rounded-md font-medium text-xs">ATK: {attack}</p>
        <p className="bg-green-600 px-1 py-0.5 rounded-md font-medium text-xs">DEF: {defense}</p>
      </div>
    </div>
  );
};

export default Hero;
