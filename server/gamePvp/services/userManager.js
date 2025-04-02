import User from "../../models/user.model.js";

// Получение колоды пользователя
export const getUserDeck = async (userId) => {
  try {
    const user = await User.findById(userId).populate("deck").exec();

    if (!user || !user.deck || user.deck.length === 0) {
      console.log(`Пользователь ${userId} не найден или колода пуста`);
      return null;
    }

    return user.deck.map((hero) => ({
      id: hero._id.toString(),
      name: hero.name,
      health: hero.health,
      attack: hero.attack,
      defense: hero.defense,
      heroClass: hero.heroClass,
      race: hero.race,
      level: hero.level,
      rarity: hero.rarity,
      image: hero.image,
    }));
  } catch (error) {
    console.error("Ошибка при получении колоды пользователя:", error);
    return null;
  }
};

// Обновление статистики игроков после окончания игры
export const updatePlayerStats = async (winnerId, loserId) => {
  try {
    // Обновляем победителя
    await User.findByIdAndUpdate(winnerId, {
      $inc: { wins: 1, experiences: 20, coins: 15 },
    });

    // Обновляем проигравшего
    await User.findByIdAndUpdate(loserId, {
      $inc: { losses: 1, experiences: 5 },
    });
  } catch (error) {
    console.error("Ошибка при обновлении статистики:", error);
  }
};
