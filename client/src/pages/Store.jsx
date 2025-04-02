import React, { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import HeroDescription from "../components/common/HeroDescription";
import Hero from "../components/common/Hero";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import { PiSpinner } from "react-icons/pi";

const Store = () => {
  const { updateGameData } = useAuthStore();
  const { setCardNotification, cardNotification } = useNotificationStore();
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHeroes, setLoadingHeroes] = useState({});
  const [isShowDescription, setIsShowDescription] = useState(false);
  const [selectedHeroDescription, setSelectedHeroDescription] = useState("");

  const fetchHeroes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/store");
      setHeroes(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleByHero = async (heroId) => {
    setLoadingHeroes((prev) => ({ ...prev, [heroId]: true }));
    try {
      const response = await axiosInstance.post("/store", { heroId });
      updateGameData({
        coins: response.data.coins,
      });
      setCardNotification(cardNotification + 1);
      toast.success("Герой был успешно куплен!");
      fetchHeroes();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoadingHeroes((prev) => ({ ...prev, [heroId]: false }));
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const toggleDescription = (description) => {
    setSelectedHeroDescription(description);
    setIsShowDescription(!isShowDescription);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-[10px] pt-[30px] pb-[100px] sm:pb-0 sm:px-[50px]">
      <h1 className="text-white font-medium text-md md:text-2xl text-center">Магазин</h1>
      {loading && <p className="text-center font-medium text-md text-white mt-5">Загрузка...</p>}
      {!loading && heroes.length === 0 && (
        <p className="text-center font-medium text-md text-white mt-5">Вы купили всех героев</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 mt-[20px]">
        {heroes?.map((hero) => (
          <div key={hero._id}>
            <p className="text-center font-medium text-white">Цена: {hero.cost}</p>
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
            <div className="px-4">
              <button
                disabled={loadingHeroes[hero._id]}
                onClick={() => handleByHero(hero._id)}
                className="text-white flex justify-center p-1 bg-gray-900 rounded-md cursor-pointer w-full mt-2"
              >
                {loadingHeroes[hero._id] ? <PiSpinner size={20} className="animate-spin" /> : "купить"}
              </button>
            </div>
            <p
              onClick={() => toggleDescription(hero)}
              className="mt-2 font-medium text-white text-center cursor-pointer"
            >
              Прочитать описание
            </p>
          </div>
        ))}
      </div>
      <HeroDescription
        isShowDescription={isShowDescription}
        selectedHeroDescription={selectedHeroDescription}
        toggleDescription={toggleDescription}
      />
    </div>
  );
};

export default Store;
