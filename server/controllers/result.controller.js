import Result from "../models/result.model.js";

export const addResult = async (req, res) => {
  const { quizId, correctAnswers } = req.body;
  const userId = req.user._id;

  try {
    if (!quizId || !correctAnswers) {
      return res.status(404).json({ message: "invalid data" });
    }

    const createdResult = new Result({
      userId,
      quizId,
      correctAnswers,
    });

    await createdResult.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.find({}).populate("quizId", "userId");

    if (!results) {
      return res.status(404).json({ message: "Results not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
