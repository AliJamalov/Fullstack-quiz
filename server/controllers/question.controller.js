import Question from "../models/question.model.js";

export const addQuestion = async (req, res) => {
  const { quizId, options, question, correctAnswer } = req.body;

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

    if (questions.length === 0) {
      return res.status(404).json({ message: "questions not found" });
    }

    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }

    return res.status(200).json({ message: "question succesfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer } = req.body;

  try {
    const questionToUpdate = await Question.findById(id);

    if (!questionToUpdate) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (question) questionToUpdate.question = question;
    if (options) questionToUpdate.options = options;
    if (correctAnswer) questionToUpdate.correctAnswer = correctAnswer;

    await questionToUpdate.save();

    return res.status(200).json({ message: "Question successfully updated!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while updating the question" });
  }
};

export const getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "question not found" });
    }

    return res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
};
