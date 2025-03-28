import { calculateStars } from "../../client/src/utils/utils.js";
import Hero from "../models/hero.model.js";

export const updateUserProfile = async (req, res) => {
  const { username, profilePic } = req.body;
  const user = req.user;

  try {
    if (username) user.username = username;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    return res.status(200).json({ message: "user updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const savePassedQuizResult = async (req, res) => {
  const { quizId, score, heroId, level } = req.body;
  const user = req.user;

  try {
    if (!quizId || score === undefined || !level) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const stars = calculateStars(score);
    const passed = stars > 0;

    const existingQuiz = user.quizProgress.find((quiz) => quiz.quizId.toString() === quizId);

    if (existingQuiz) {
      const previousStars = existingQuiz.stars;

      if (previousStars < stars) {
        existingQuiz.stars = stars;

        if (stars === 3 && previousStars === 1) {
          user.coins += 100;
        } else if (stars === 3 && previousStars === 2) {
          user.coins += 50;
        } else if (stars === 2 && previousStars === 1) {
          user.coins += 50;
        }
      }

      if (existingQuiz.score < score) {
        existingQuiz.score = score;
      }

      existingQuiz.passed = passed;
    } else {
      user.quizProgress.push({ quizId, score, stars, passed, level });

      switch (stars) {
        case 3:
          user.coins += 150;
          break;
        case 2:
          user.coins += 100;
          break;
        case 1:
          user.coins += 50;
          break;
        default:
          break;
      }

      if (passed) user.experiences += 50;
    }

    if (stars === 3 && !user.cards.includes(heroId)) {
      user.cards.push(heroId);
    }

    await user.save();

    return res.status(201).json({
      message: "Saved to DB successfully!",
      quizProgress: user.quizProgress,
      coins: user.coins,
      experiences: user.experiences,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchUserCards = async (req, res) => {
  const userCards = req.user.cards;

  try {
    const cards = await Hero.find({ _id: { $in: userCards } });

    if (cards.length === 0) {
      return res.status(404).json({ message: "Карты не найдены" });
    }

    return res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка на сервере" });
  }
};
