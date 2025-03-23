import Result from "../models/result.model.js";

export const addResult = async (req, res) => {
  const { quizId, score } = req.body;
  const userId = req.user._id;

  try {
    if (!quizId || !score) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const userScore = await Result.findOne({ userId, quizId });

    if (!userScore) {
      const newResult = new Result({
        quizId,
        score,
        userId,
      });
      await newResult.save();
      return res.status(201).json({ message: "Result created" });
    } else {
      if (userScore.score < score) {
        userScore.score = score;
        await userScore.save();
        return res.status(200).json({ message: "Score updated" });
      } else {
        return res.status(200).json({ message: "Score is not better than previous" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getResults = async (req, res) => {
  const { quizId } = req.params;
  try {
    const results = await Result.find({ quizId }).populate("quizId", "title").populate("userId", "username");
    console.log(results);

    if (results.length === 0) {
      return res.status(404).json({ message: "Results not found" });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
