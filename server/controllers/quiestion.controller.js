import Question from "../models/question.model.js";

export const addQuestion = async (req, res) => {
  const { quizId, options, question, correctAnswer } = req.body;
  console.log(req.body);

  try {
    if (!quizId || !options || !correctAnswer || !question) {
      return res.status(404).json({ message: "invalid data" });
    }

    const createdQuestion = new Question({
      quizId,
      options,
      question,
      correctAnswer,
    });

    await createdQuestion.save();

    return res.status(201).json({ message: "Question created successfuly!", createdQuestion });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const getQuestions = async (req, res) => {
  const { quizId } = req.params;

  try {
    if (!quizId) return res.status(400).json({ message: "invalid data" });

    const questions = await Question.find({ quizId });

    if (!questions) {
      return res.status(404).json({ message: "questions not found" });
    }

    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};
