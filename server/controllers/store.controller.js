import Hero from "../models/hero.model.js";

export const fetchHeroes = async (req, res) => {
  const user = req.user;
  const usersHeroes = user.cards;

  try {
    const heroes = await Hero.find({}).lean();
    if (heroes.length === 0) {
      return res.status(404).json({ message: "Герои не найдены" });
    }

    const availableHeroes = heroes.filter((hero) => !usersHeroes.includes(hero._id.toString()));

    if (availableHeroes.length === 0) {
      return res.status(404).json({ message: "Нет доступных героев для покупки" });
    }

    return res.status(200).json(availableHeroes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const buyHero = async (req, res) => {
  const user = req.user;
  const { heroId } = req.body;
  try {
    const hero = await Hero.findById(heroId);

    if (!hero) return res.status(404).json({ message: "Герой не найден" });

    if (user.coins >= hero.cost) {
      user.coins -= hero.cost;
      user.cards.push(heroId.toString());

      await user.save();
      return res.status(200).json({
        message: "Герой был успешно куплен!",
        coins: user.coins,
      });
    } else {
      return res.status(400).json({ message: "У тебя не достаточно монет" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};
