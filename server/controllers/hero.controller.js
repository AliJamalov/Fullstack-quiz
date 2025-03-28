import Hero from "../models/hero.model.js";

export const createHero = async (req, res) => {
  const { name, description, image, heroClass, race, level, health, attack, defense, rarity, cost, mythology } =
    req.body;

  try {
    if (
      !name ||
      !description ||
      !image ||
      !heroClass ||
      !race ||
      !level ||
      !health ||
      !attack ||
      !defense ||
      !rarity ||
      !mythology ||
      cost == null
    ) {
      return res.status(400).json({ message: "invalid data" });
    }

    const newHero = new Hero({
      name,
      description,
      image,
      mythology,
      heroClass,
      race,
      level,
      health,
      attack,
      defense,
      rarity,
      cost,
    });
    await newHero.save();
    return res.status(201).json({ message: "Hero created successfully!" });
  } catch (error) {
    console.log(error);
  }
};
