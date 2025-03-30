import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const Deck = ({ selectedHero, setSelectedHero }) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [deck, setDeck] = useState([null, null, null]);
  const [usersDeck, setUsersDeck] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsersDeck = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users/get-deck");
      setUsersDeck(response.data);
      setDeck(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersDeck();
  }, []);

  const handleSaveDeckToDB = async () => {
    const usersDeckIds = new Set(usersDeck.map((hero) => hero._id));
    const isHeroAlreadyInDeck = deck.some((hero) => hero && usersDeckIds.has(hero._id));

    if (isHeroAlreadyInDeck) {
      toast.error("Эти герои уже в колоде!");
      return;
    }
    setSaveLoading(true);
    try {
      await axiosInstance.post("/users/save-deck", {
        deck: deck.filter((hero) => hero !== null).map((hero) => hero._id),
      });
      toast.success("Колода сохранена!");
      fetchUsersDeck();
    } catch (error) {
      console.log(error);
      toast.error("Ошибка сохранения колоды!");
    } finally {
      setSaveLoading(false);
    }
  };

  const setHeroToDeck = (index) => {
    if (!selectedHero) {
      toast.error("Сначала выберите героя!");
      return;
    }

    if (deck.some((hero) => hero?._id === selectedHero._id)) {
      toast.error("Герой уже в колоде!");
      return;
    }

    const newDeck = [...deck];
    newDeck[index] = selectedHero;
    setDeck(newDeck);
  };

  return (
    <div className="flex flex-col items-center mt-7 sm:pb-[100px]">
      <p>Твоя колода карт</p>
      <div className="flex items-center gap-2 mt-2">
        {deck.map((hero, index) => (
          <div
            key={index}
            onClick={() => {
              setHeroToDeck(index);
              setSelectedHero(null);
            }}
            className="w-20 h-30 sm:w-30 sm:h-40 border-2 border-blue-500 rounded-md flex items-center justify-center cursor-pointer"
          >
            {hero ? (
              <img className="w-full h-full rounded-md" src={hero.image} alt={hero.name} />
            ) : usersDeck[index] ? (
              <img className="w-full h-full rounded-md" src={usersDeck[index].image} alt="hero" />
            ) : (
              <p className="text-gray-400">Пусто</p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleSaveDeckToDB}
        disabled={saveLoading}
        className="mt-3 p-2 bg-yellow-500 rounded-md cursor-pointer text-white text-md"
      >
        {saveLoading ? "Загрузка" : "Сохранить колоду"}
      </button>
    </div>
  );
};

export default Deck;
