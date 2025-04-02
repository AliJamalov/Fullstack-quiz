import React, { useEffect, useState } from "react";
import Hero from "../components/common/Hero";
import Deck from "../components/cards/Deck";
import { axiosInstance } from "../utils/axios";
import { GrCheckboxSelected } from "react-icons/gr";
import HeroDescription from "../components/common/HeroDescription";
import { useNotificationStore } from "../store/notificationStore";

const Cards = () => {
  const { setCardNotification, cardNotification } = useNotificationStore();

  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShowDescription, setIsShowDescription] = useState(false);
  const [selectedHeroDescription, setSelectedHeroDescription] = useState("");
  const [selectedHero, setSelectedHero] = useState(null);

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

  const toggleSelectHero = (hero) => {
    if (selectedHero !== null && selectedHero._id === hero._id) {
      setSelectedHero(null);
    } else {
      setSelectedHero(hero);
    }
  };

  useEffect(() => {
    setCardNotification(cardNotification === 0);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-[10px] pt-[30px] pb-[100px] sm:pb-0">
      <h1 className="text-center font-semibold text-lg text-white">Твои герои</h1>
      {loading && <p className="text-center text-md font-semibold mt-5 text-white">Загрузка...</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-[20px]">
        {!loading && heroes.length === 0 ? (
          <p className="text-md font-semibold">У вас еще нет героев</p>
        ) : (
          heroes?.map((hero, index) => (
            <div key={index} onClick={() => toggleSelectHero(hero)} className="cursor-pointer">
              {selectedHero?._id === hero._id && (
                <div className="flex justify-center mb-2">
                  <GrCheckboxSelected color="green" size={25} />
                </div>
              )}
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
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDescription(hero);
                }}
                className="mt-2 text-white text-center font-medium"
              >
                Прочитать описание
              </p>
            </div>
          ))
        )}
      </div>
      <HeroDescription
        isShowDescription={isShowDescription}
        selectedHeroDescription={selectedHeroDescription}
        toggleDescription={toggleDescription}
      />
      <Deck selectedHero={selectedHero} setSelectedHero={setSelectedHero} />
    </div>
  );
};

export default Cards;
