import React, { useEffect, useState } from "react";
import Hero from "../components/common/Hero";
import { axiosInstance } from "../utils/axios";

const Cards = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShowDescription, setIsShowDescription] = useState(false);
  const [selectedHeroDescription, setSelectedHeroDescription] = useState("");

  const fetchUserCards = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users/user-cards");
      setHeroes(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  const toggleDescription = (description) => {
    setSelectedHeroDescription(description);
    setIsShowDescription(!isShowDescription);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-[50px] py-[30px]">
      <h1 className="text-center font-semibold text-lg">Твои герои</h1>
      {loading && <p className="text-center text-md font-semibold mt-5">Загрузка...</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-[20px]">
        {!loading && heroes.length === 0 ? (
          <p className="text-md font-semibold">У вас еще нет героев</p>
        ) : (
          heroes?.map((hero, index) => (
            <div key={index} className="cursor-pointer" onClick={() => toggleDescription(hero.description)}>
              <Hero
                name={hero.name}
                image={hero.image}
                health={hero.health}
                attack={hero.attack}
                defense={hero.defense}
                level={hero.level}
                mythology={hero.mythology}
                heroClass={hero.heroClass}
                race={hero.race}
                rarity={hero.rarity}
              />
            </div>
          ))
        )}
      </div>
      {isShowDescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-[20px]">
          <div className="bg-white p-4 rounded-lg max-w-sm mx-auto">
            <p className="text-sm font-medium italic text-black">{selectedHeroDescription}</p>
            <button
              onClick={() => setIsShowDescription(false)}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
